const pool = require("../models/DB");
const { throwError } = require("../middlewares/throwError");

// ===================== This Function To CREATE NEW comment =====================
exports.createNewComment = (req, res, next) => {
  const { id } = req.token.user;

  const { comment } = req.body;
  const post_id = req.params.id;

  const query = `INSERT INTO comments (comment, commenter_id, post_id) VALUES ($1,$2,$3) RETURNING *`;
  const data = [comment, id, post_id];

  pool
    .query(query, data)
    .then((result) => {
      if (result.command === "INSERT") {
        return res.status(200).json({
          error: false,
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
  const post_id = req.params.id;
  const query = `SELECT comments.id, comments.comment, comments.commenter_id, comments.created_at, comments.post_id,
  users.first_name, users.last_name, users.image 
  FROM comments 
  INNER JOIN users ON users.id = comments.commenter_id
  WHERE comments.post_id = $1`;
  const data = [post_id];
  pool
    .query(query, data)
    .then((result) => {
      const comments = result.rows.map((comment) => ({
        id: comment.id,
        post_id: comment.post_id,
        comment: comment.comment,
        commenter: {
          fullName: `${comment.first_name} ${comment.last_name}`,
          userImage: comment.image,
        },
        created_at: comment.created_at,
      }));
      if (result.command === "SELECT") {
        return res.status(200).json({
          error: false,
          comments,
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

  const query = `UPDATE comments SET comment = COALESCE($1,comment) WHERE id = $2;`;
  const data = [comment ?? null, id];
  pool
    .query(query, data)
    .then((result) => {
      if (result.command === "UPDATE") {
        return res.status(200).json({
          error: false,
          message: "Comment updated successfully",
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

  const query = `UPDATE comments SET is_deleted= 1 WHERE id = $1 ;`;
  const data = [id];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rowCount !== 0) {
        return res.status(200).json({
          error: false,
          message: `Your comment is deleted successfully`,
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
