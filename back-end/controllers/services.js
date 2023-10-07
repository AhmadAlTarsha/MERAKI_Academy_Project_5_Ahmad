const pool = require("../models/DB");
const { throwError } = require("../middlewares/throwError");

// ===================== ADD NEW SERVICE =====================
exports.addService = (req, res, next) => {
  let {
    service_provider_id,
    category_id,
    sub_category_id,
    title,
    description,
    images,
  } = req.body;

  if (!req.file) {
    return res.status(400).json({
      error: false,
      message: "No Image provided",
    });
  }

  const image = req.file.path.replace("\\", "/");

  const values = [
    service_provider_id,
    category_id,
    sub_category_id,
    title,
    description,
    image,
  ];

  pool
    .query(
      `INSERT INTO serverices (service_provider_id, category_id, sub_category_id, title, description, default_image)
    VALUES ($1, $2, $3, $4, $5, $6)`,
      values
    )
    .then((result) => {
      if (result.command === "INSERT") {
        if (!images) {
          return Promise.resolve({
            status: 201,
            message: "Service Added succefully",
          });
        } else {
          return pool.query(
            `SELECT id FROM serverices ORDER BY id DESC LIMIT 1`
          );
        }
      }
      return throwError(400, "Something went wrong");
    })
    .then(async (result2) => {
      if (result2.status === 201) {
        return res.status(201).json({
          error: false,
          message: result2.message,
        });
      }

      try {
        const newServiceId = result2.rows[0].id;
        for (let i = 0; i < images.length; i++) {
          await pool.query(
            `INSERT INTO serverices_images (service_id, image) VALUES ($1, $2)`,
            [newServiceId, images[i]]
          );
        }
        res.json({
          error: false,
          message: "New service created",
        });
      } catch (err) {
        throw err;
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// ===================== UPDATE SERVICE =====================
exports.updateService = (req, res, next) => {
  let {
    service_provider_id,
    category_id,
    sub_category_id,
    title,
    description,
    status_id,
  } = req.body;

  let image;

  if (req.file) {
    image = req.file.path.replace("\\", "/");
  }

  const { id } = req.params;

  const values = image
    ? [
        service_provider_id,
        category_id,
        sub_category_id,
        title,
        description,
        status_id,
        image,
        id,
      ]
    : [
        service_provider_id,
        category_id,
        sub_category_id,
        title,
        description,
        status_id,
        id,
      ];

  pool
    .query(
      image
        ? `UPDATE serverices SET service_provider_id = $1, category_id = $2, sub_category_id = $3, 
      title = $4, description = $5, status_id = $6, default_image = $7 WHERE id = $8`
        : `UPDATE serverices SET service_provider_id = $1, category_id = $2, sub_category_id = $3, 
      title = $4, description = $5, status_id = $6 WHERE id = $7`,
      values
    )
    .then((result) => {
      if (result.command === "UPDATE") {
        return res.status(200).json({
          error: false,
          message: "Service Updated succefully",
        });
      }
      return throwError(400, "Something went wrong");
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateServiceStatus = (req, res, next) => {
  const { status } = req.body;
  const { id } = req.params;

  pool
    .query(`UPDATE serverices SET status_id = $1 WHERE id = $2`, [status, id])
    .then((result) => {
      if (result.rowCount !== 0) {
        let message = ``;
        if (status == 2) {
          message = `Service Accepted`;
        } else if (status == 3) {
          message = `Service Rejected`;
        } else if (status == 4) {
          message = `Service Canceled`;
        }

        return res.status(200).json({
          error: false,
          message,
        });
      }
      return throwError(400, "Something went wrong");
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getAllServices = (req, res, next) => {
  const perPage = Number(req.query.limit);
  const currentPage = Number(req.query.offset);
  let totalItems;
  const { is_deleted } = req.query;
  let query = `SELECT serverices.id, serverices.service_provider_id, serverices.category_id, serverices.sub_category_id, serverices.title, serverices.description, serverices.status_id, 
  serverices.default_image, serverices.created_at, serverices.is_deleted,
  users.first_name, users.last_name, users.image, users.id AS userId,
  statuses.name, categories.name AS categoryName, sub_categories.name AS subCategoryName
  FROM serverices 
  JOIN users ON users.id = serverices.service_provider_id
  JOIN statuses ON statuses.id = serverices.status_id
  JOIN categories ON categories.id = serverices.category_id
  JOIN sub_categories ON sub_categories.id = serverices.sub_category_id`;

  is_deleted
    ? (query += ` WHERE serverices.is_deleted = 0 ORDER BY id ASC LIMIT $1 OFFSET $2`)
    : (query += ` ORDER BY id ASC LIMIT $1 OFFSET $2`);

  pool
    .query(query, [perPage, (currentPage - 1) * perPage])
    .then((result) => {
      const serverices = result.rows.map((service) => ({
        id: service.id,
        status_id: service.status_id,
        status_name: service.name,
        provider: {
          id: service.userid,
          full_name: `${service.first_name} ${service.last_name}`,
          image: service.image,
        },
        category_id: service.category_id,
        category_name: service.categoryname,
        sub_category_id: service.sub_category_id,
        sub_categories_name: service.subcategoryname,
        title: service.title,
        description: service.description,
        is_deleted: service.is_deleted,
        default_image: `http://localhost:5000/${service.default_image}`,
        created_at: service.created_at,
      }));
      if (result.command === `SELECT`) {
        return res.status(200).json({
          error: false,
          serverices,
        });
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// ===================== GET ALL SERVICES ON CATEGORY =====================
exports.getAllServicesOnCategory = (req, res, next) => {
  const { is_deleted } = req.query;
  let query = `SELECT serverices.id, serverices.service_provider_id, serverices.category_id, serverices.sub_category_id, serverices.title, serverices.description, serverices.status_id, 
  serverices.default_image, serverices.created_at,
  users.first_name, users.last_name, users.image,
  statuses.name, categories.name AS categoryName, sub_categories.name AS subCategoryName
  FROM serverices 
  JOIN users ON users.id = serverices.service_provider_id
  JOIN statuses ON statuses.id = serverices.status_id
  JOIN categories ON categories.id = serverices.category_id
  JOIN sub_categories ON sub_categories.id = serverices.sub_category_id
  WHERE serverices.category_id = $1`;

  is_deleted ? (query += ` AND serverices.is_deleted = 0`) : "";

  pool
    .query(query, [req.params.categoryId])
    .then((result) => {
      const serverices = result.rows.map((service) => ({
        id: service.id,
        status_id: service.status_id,
        status_name: service.name,
        provider: {
          full_name: `${service.first_name} ${service.last_name}`,
          image: service.image,
        },
        category_id: service.category_id,
        category_name: service.categoryname,
        sub_category_id: service.sub_category_id,
        sub_categories_name: service.subcategoryname,
        title: service.title,
        description: service.description,
        default_image: `http://localhost:5000/${service.default_image}`,
        created_at: service.created_at,
      }));
      if (result.command === `SELECT`) {
        return res.status(200).json({
          error: false,
          serverices,
        });
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// ===================== GET ALL SERVICES ON SUB-CATEGORY =====================
exports.getAllServicesOnSubCategory = (req, res, next) => {
  const { is_deleted } = req.query;
  let query = `SELECT serverices.id, serverices.service_provider_id, serverices.category_id, serverices.sub_category_id, serverices.title, serverices.description, serverices.status_id, 
  serverices.default_image, serverices.created_at,
  users.first_name, users.last_name, users.image,
  statuses.name, categories.name AS categoryName, sub_categories.name AS subCategoryName
  FROM serverices 
  JOIN users ON users.id = serverices.service_provider_id
  JOIN statuses ON statuses.id = serverices.status_id
  JOIN categories ON categories.id = serverices.category_id
  JOIN sub_categories ON sub_categories.id = serverices.sub_category_id
  WHERE serverices.sub_category_id = $1`;

  is_deleted ? (query += ` AND serverices.is_deleted = 0`) : "";

  pool
    .query(query, [req.params.subCategoryId])
    .then((result) => {
      const serverices = result.rows.map((service) => ({
        id: service.id,
        status_id: service.status_id,
        status_name: service.name,
        provider: {
          full_name: `${service.first_name} ${service.last_name}`,
          image: service.image,
        },
        category_id: service.category_id,
        category_name: service.categoryname,
        sub_category_id: service.sub_category_id,
        sub_categories_name: service.subcategoryname,
        title: service.title,
        description: service.description,
        default_image: `http://localhost:5000/${service.default_image}`,
        created_at: service.created_at,
      }));
      if (result.command === `SELECT`) {
        return res.status(200).json({
          error: false,
          serverices,
        });
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// ===================== GET SERVICE BY ID =====================
exports.getServiceOnId = (req, res, next) => {
  pool
    .query(
      `SELECT serverices.id, serverices.service_provider_id, serverices.category_id, serverices.sub_category_id, serverices.title, serverices.description, serverices.status_id, 
    serverices.default_image, serverices.created_at,
    users.first_name, users.last_name, users.image,
    statuses.name, categories.name AS categoryName
    FROM serverices 
    JOIN users ON users.id = serverices.service_provider_id
    JOIN statuses ON statuses.id = serverices.status_id
    JOIN categories ON categories.id = serverices.category_id
    WHERE serverices.id = $1`,
      [req.params.id]
    )
    .then((result) => {
      if (result.command === `SELECT`) {
        const serverices = result.rows.map((service) => ({
          id: service.id,
          status_id: service.status_id,
          status_name: service.name,
          provider: {
            full_name: `${service.first_name} ${service.last_name}`,
            image: service.image,
          },
          category_id: service.category_id,
          category_name: service.categoryname,
          sub_category_id: service.sub_category_id,
          sub_categories_name: service.subcategoryname,
          title: service.title,
          description: service.description,
          default_image: `http://localhost:5000/${service.default_image}`,
          created_at: service.created_at,
        }));
        return res.status(200).json({
          error: false,
          serverices: serverices[0],
        });
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteService = (req, res, next) => {
  const { id } = req.params;
  const { active } = req.body;
  const value = [active, id];
  const query = `UPDATE serverices SET is_deleted = $1 WHERE id=$2`;

  pool
    .query(query, value)
    .then((result) => {
      if (result.rowCount !== 0) {
        return res.status(200).json({
          error: false,
          message:
            active == 1
              ? `Service with id: ${id} deleted successfully`
              : `Service with id: ${id} Activated successfully`,
        });
      }
      return throwError(400, "Something went wrong");
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
