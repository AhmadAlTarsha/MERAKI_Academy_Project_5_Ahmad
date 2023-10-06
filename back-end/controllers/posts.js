const pool = require("../models/DB");
const io = require("../socket");
const { throwError } = require("../middlewares/throwError");

// ===================== GET ALL POSTS =====================
exports.getAllPosts = (req, res, next) => {
  const perPage = Number(req.query.limit);
  const currentPage = Number(req.query.offset);
  const isDeleted = req.query.is_deleted;
  const categoryId = Number(req.query.category);
  const subCategoryId = Number(req.query.sub_category);
  let data = [];
  let images = [];
  let posts = [];
  let query = `SELECT posts.id, posts.description, posts.category_id, posts.sub_category_id, posts.created_at, posts.is_deleted, posts.main_image,
  users.first_name, users.last_name, users.image FROM posts JOIN users ON users.id = posts.poster_id`;

  //website

  if (categoryId) {
    query += ` WHERE posts.is_deleted = $1 AND posts.category_id = $2 ORDER BY posts.id DESC LIMIT $3 OFFSET $4`;
    data = [isDeleted, categoryId, perPage, (currentPage - 1) * perPage];
  } else if (subCategoryId) {
    query += ` WHERE posts.is_deleted = $1 AND posts.sub_category_id = $2 ORDER BY posts.id DESC LIMIT $3 OFFSET $4`;
    data = [isDeleted, subCategoryId, perPage, (currentPage - 1) * perPage];
  } else if (isDeleted == 0) {
    query += ` WHERE posts.is_deleted = $1 ORDER BY posts.id DESC LIMIT $2 OFFSET $3`;
    data = [isDeleted, perPage, (currentPage - 1) * perPage];
  } else {
    //Admin

    query += ` ORDER BY posts.id DESC LIMIT $1 OFFSET $2`;
    data = [perPage, (currentPage - 1) * perPage];

    //Admin
  }
  //website
  pool
    .query(query, data)
    .then(async (result) => {
      if (result.command === `SELECT`) {
        posts = result.rows;
        const newQuery = `SELECT * FROM serverices_images`;
        try {
          return await pool.query(newQuery);
        } catch (error) {
          throw error;
        }
      }
      return throwError(400, "Something went wrong");
    })
    .then(async (result2) => {
      if (result2.command === "SELECT") {
        images = result2.rows;

        posts = posts.map((post) => ({
          id: post.id,
          user: {
            fullName: `${post.first_name} ${post.last_name}`,
            userImage: `http://localhost:5000/images/${post.image}`,
          },
          is_deleted: post.is_deleted,
          description: post.description,
          main_image: `http://localhost:5000/${post.main_image}`,
          category_id: post.category_id,
          sub_category_id: post.sub_category_id,
          created_at: post.created_at,
          images: images.filter((image) => {
            return image.service_id === post.id;
          }),
        }));

        return res.status(200).json({
          error: false,
          posts,
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

exports.getAllPostsByUser = (req, res, next) => {
  const { posterId } = req.params;
  const perPage = Number(req.query.limit);
  const currentPage = Number(req.query.offset);
  const { active } = req.query;

  let posts = [];

  // SELECT * FROM posts WHERE is_deleted = $1 AND poster_id = $2 LIMIT $3 OFFSET $4;

  const query = `SELECT posts.id, posts.description, posts.category_id, posts.sub_category_id, posts.created_at, posts.is_deleted, posts.main_image,
  users.first_name, users.last_name, users.image 
  FROM posts JOIN users ON users.id = posts.poster_id 
  WHERE posts.is_deleted = $1 AND posts.poster_id = $2 
  ORDER BY posts.id DESC 
  LIMIT $3 OFFSET $4`;
  pool
    .query(query, [active, posterId, perPage, (currentPage - 1) * perPage])
    .then((result) => {
      if (result.command === `SELECT`) {
        posts = result.rows.map((post) => ({
          id: post.id,
          user: {
            fullName: `${post.first_name} ${post.last_name}`,
            userImage: `http://localhost:5000/images/${post.image}`,
          },
          is_deleted: post.is_deleted,
          description: post.description,
          main_image: `http://localhost:5000/${post.main_image}`,
          category_id: post.category_id,
          sub_category_id: post.sub_category_id,
          created_at: post.created_at,
        }));
        return res.status(200).json({
          error: false,
          posts,
          // posts: result.rows,
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

// ===================== CREATE NEW POST =====================
exports.createPost = async (req, res, next) => {
  const { id } = req.token.user;
  const { description, images, category_id, sub_category_id } = req.body;

  if (!req.file) {
    return res.status(400).json({
      error: false,
      message: "No Image provided",
    });
  }

  const image = req.file.path.replace("\\", "/");

  const data = [id, description, image, category_id, sub_category_id];

  const query = `INSERT INTO posts (poster_id,  description,main_image,
    category_id,
    sub_category_id) VALUES ($1, $2, $3, $4, $5)`;

  pool
    .query(query, data)
    .then((result) => {
      if (result.rowCount !== 0) {
        if (!images) {
          return Promise.resolve({ status: 201, message: "New post created" });
        } else {
          return pool.query(`SELECT id FROM posts ORDER BY id DESC LIMIT 1`);
        }
      }
      return throwError(400, "Something went wrong");
    })
    .then(async (result2) => {
      if (result2.status === 201) {
        io.getIo().emit("posts", { action: "create" });
        return res.status(201).json({
          error: false,
          message: result2.message,
        });
      }
      try {
        const newPostId = result2.rows[0].id;
        for (let i = 0; i < images.length; i++) {
          await pool.query(
            `INSERT INTO serverices_images (service_id, image) VALUES ($1, $2)`,
            [newPostId, images[i]]
          );
        }
        res.json({
          error: false,
          message: "New post created",
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

// ===================== UPDATE POST =====================
exports.updatePostById = async (req, res, next) => {
  const { id } = req.params;

  const { description, category_id, sub_category_id } = req.body;

  let image;

  if (req.file) {
    image = req.file.path.replace("\\", "/");
  }

  const data = image
    ? [description, image, category_id, sub_category_id, id]
    : [description, category_id, sub_category_id, id];

  const query = image
    ? `UPDATE posts SET description = $1, main_image = $2, category_id = $3, sub_category_id = $4 WHERE id=$5 RETURNING *`
    : `UPDATE posts SET description = $1, category_id = $2, sub_category_id = $3 WHERE id=$4 RETURNING *`;

  pool
    .query(query, data)
    .then((result) => {
      if (result.rowCount !== 0) {
        return res.status(200).json({
          error: false,
          message: `Post with id: ${id} updated successfully`,
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

// ===================== DELETE POST =====================
exports.activationPostById = (req, res, next) => {
  const { id } = req.params;
  const { active } = req.body;
  const value = [active, id];
  const query = `UPDATE posts SET is_deleted = $1 WHERE id=$2`;
  pool
    .query(query, value)
    .then((result) => {
      if (result.rowCount !== 0) {
        return res.status(200).json({
          error: false,
          message:
            active == 1
              ? `Post with id: ${id} deleted successfully`
              : `Post with id: ${id} Activated successfully`,
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
