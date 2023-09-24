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
    return throwError(422, "No Image provided");
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
        if (images.length === 0) {
          return res.status(200).json({
            error: false,
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

// ===================== GET ALL SERVICES ON CATEGORY =====================
exports.getAllServicesOnCategory = (req, res, next) => {
  let services = [];
  let images = [];

  pool
    .query(
      `SELECT serverices.id, serverices.service_provider_id, serverices.category_id, serverices.sub_category_id, serverices.title, serverices.description, serverices.status_id, serverices.default_image, serverices.created_at, users.first_name, users.last_name, users.image FROM serverices JOIN users ON users.id = serverices.service_provider_id WHERE category_id = $1 AND is_deleted = '0'`,
      [req.params.categoryId]
    )
    .then((result) => {
      if (result.command === `SELECT`) {
        return res.status(200).json({
          error: false,
          services: result.rows,
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
  pool
    .query(`SELECT * FROM serverices WHERE sub_category_id = $1`, [
      req.params.subCategoryId,
    ])
    .then((result) => {
      if (result.command === `SELECT`) {
        return res.status(200).json({
          error: false,
          services: result.rows,
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
    .query(`SELECT * FROM serverices WHERE id = $1`, [req.params.id])
    .then((result) => {
      if (result.command === `SELECT`) {
        return res.status(200).json({
          error: false,
          services: result.rows[0],
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
