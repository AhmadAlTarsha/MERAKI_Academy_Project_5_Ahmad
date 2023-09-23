const pool = require("../models/DB");
const { throwError } = require("../middlewares/throwError");

// ===================== GET ALL POSTS =====================
exports.getAllPosts = (req, res, next) => {
  const { active } = req.body;
  const query = `SELECT * FROM posts WHERE active = $1;`;
  pool
    .query(query, [active])
    .then((result) => {
      if (result.command === `SELECT`) {
        return res.status(200).json({
          error: false,
          posts: result.rows,
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

exports.getAllPostsByUser = (req, res, next) => {
  const { active } = req.body;
  const { posterId } = req.params;
  const query = `SELECT * FROM posts WHERE active = $1 AND poster_id=$2;`;
  pool
    .query(query, [active, posterId])
    .then((result) => {
      if (result.command === `SELECT`) {
        return res.status(200).json({
          error: false,
          posts: result.rows,
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

// ===================== CREATE NEW POST =====================
exports.createPost = async (req, res, next) => {
  const { title, description, main_image, category_id, sub_category_id } =
    req.body;
  const data = [title, description, main_image, category_id, sub_category_id];

  const query = `INSERT INTO posts (title, description,main_image,
    category_id,
    sub_category_id,) VALUES ($1, $2, $3, $4, $5)`;

  pool
    .query(query, data)
    .then((result) => {
      if (result.rowCount !== 0) {
        return res.status(201).json({
          error: false,
          message: "New post created",
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

// ===================== UPDATE POST =====================
exports.updatePostById = async (req, res, next) => {
  const { id } = req.params;

  const { title, description, main_image, category_id, sub_category_id } =
    req.body;

  const data = [
    title,
    description,
    main_image,
    category_id,
    sub_category_id,
    id,
  ];

  const query = `UPDATE posts SET title = $1, description = $2, main_image = $3, category_id = $4, sub_category_id = $5 WHERE id=$6 RETURNING *`;

  pool
    .query(query, data)
    .then((result) => {
      console.log(result);
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
  const query = `UPDATE posts SET active = $1 WHERE id=$2`;
  pool
    .query(query, value)
    .then((result) => {
      if (result.rowCount !== 0) {
        return res.status(200).json({
          error: false,
          message:
            active === 0
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
