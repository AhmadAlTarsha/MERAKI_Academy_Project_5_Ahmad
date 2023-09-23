const pool = require("../models/DB");

// ===================== GET ALL POSTS =====================
exports.getAllPosts = (req, res, next) => {
  const query = `SELECT * FROM posts WHERE active = '1';`;
  pool
    .query(query)
    .then((result) => {
      if (result.rows.length !== 0) {
        return res.status(200).json({
          error: false,
          message: "All the posts",
          result: result.rows,
        });
      } else {
        return res.status(200).json({
          error: true,
          message: "No posts found",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: true,
        message: "Server error",
        error: error,
      });
    });
};

// ===================== CREATE NEW POST =====================
exports.createPost = async (req, res, next) => {
  const { title, description, main_image, category_id, sub_category_id } =
    req.body;
  const data = [title, description, main_image, category_id, sub_category_id];

  const query = `INSERT INTO posts (title, description,main_image,
    category_id,
    sub_category_id,) VALUES ($1, $2, $3,$4,$5)`;

  pool
    .query(query, data)
    .then((result) => {
      if (result.rowCount !== 0) {
        return res.status(201).json({
          error: false,
          message: "New post created",
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

  const query = `UPDATE posts SET title = $1, description = $2 WHERE id=$3 AND active = '1' RETURNING *`;

  pool
    .query(query, data)
    .then((result) => {
      console.log(result);
      if (result.rowCount !== 0) {
        return res.status(200).json({
          error: false,
          message: `Post with id: ${id} updated successfully`,
        });
      } else {
        return res.status(500).json({
          error: true,
          message: "Failed to update",
          result: result,
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

// ===================== DELETE POST =====================
exports.deletePostById = (req, res, next) => {
  const { id } = req.params;
  const value = [id];
  const query = `UPDATE posts SET active = 0 WHERE id=$1`;
  pool
    .query(query, value)
    .then((result) => {
      if (result.rowCount !== 0) {
        res.status(200).json({
          error: false,
          message: `Article with id: ${id} deleted successfully`,
        });
      } else {
        throw new Error("Error happened while deleting article");
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: true,
        message: "Server error",
        err: error,
      });
    });
};
