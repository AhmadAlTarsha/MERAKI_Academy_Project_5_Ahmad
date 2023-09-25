const pool = require("../models/DB");
const { throwError } = require("../middlewares/throwError");

// ===================== This Function To CREATE NEW comment =====================
exports.createNewComment = (req, res, next) => {
  const { id } = req.token.user;

  const { comment } = req.body;
  const { post_id } = req.params;

  const query = `INSERT INTO comments (comment, commenter_id, post_id) VALUES ($1,$2,$3) RETURNING *`;
  const data = [comment, id, post_id];

  pool
    .query(query, data)
    .then((result) => {
      if (result.command === "INSERT") {
        return res.status(200).json({
          error: true,
          message: "comment created successfully",
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
// ===================== This Function To Get  Comment  By Post=====================
exports.getCommentsByPostId = (req, res, next) => {
  const { post_id } = req.params;
  const query = `SELECT c.comment,c.post_id,u.first_name, c.commenter_id FROM comments c JOIN users u ON u.id=c.commenter_id WHERE c.post_id_id=$1 AND c.is_deleted=0;`;
  const data = [post_id];
  pool
    .query(query, data)
    .then((result) => {
      if (result.command === "SELECT") {
        return res.status(200).json({
          error: true,
          message: "All comment From This Post",
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

// ===================== This Function To Update comment =====================

exports.updateCommentById = (req, res, next) => {
  const id = req.params.id;
  let { comment } = req.body;

  const query = `UPDATE comments SET comment = COALESCE($1,comment), WHERE id=$2 AND is_deleted = 0  RETURNING *;`;
  const data = [comment || null, id];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length !== 0) {
        return res.status(200).json({
          error: true,
          message: "comment created successfully",
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

// ===================== This Function To Delete  comment By Id =====================

exports.deleteCommentById = (req, res, next) => {
  const { id } = req.params;
  const { commenter_id } = req.token;
  const query = `UPDATE comments SET is_deleted= 1 WHERE id = $1 AND commenter_id=$2;`;
  const data = [id, commenter_id];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rowCount !== 0) {
        return res.status(200).json({
          error: false,
          message: `your comment deleted successfully`,
        });
      }
      return throwError(400, "something went rowing");
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
