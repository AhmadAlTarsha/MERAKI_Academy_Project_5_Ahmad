// const pool = require("../models/DB");
const { throwError } = require("../middlewares/throwError");
const Comment = require("../models/Comment");
const User = require("../models/user");
const Post = require("../models/Post");

// ===================== This Function To CREATE NEW comment =====================
exports.createNewComment = async (req, res, next) => {
  const { comment } = req.body;
  const post_id = req.params.id;

  try {
    const newComment = await Comment.create({
      comment,
      commenter_id: req.token.user.id,
      post_id,
    });

    if (newComment._options.isNewRecord) {
      // io.getIo().emit("posts", { action: "create" });
      return res.status(201).json({
        error: true,
        message: "Comment Created Successfully",
      });
    }
    return throwError(404, "Something went wrong");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

  // const query = `INSERT INTO comments (comment, commenter_id, post_id) VALUES ($1,$2,$3) RETURNING *`;
  // const data = [comment, id, post_id];

  // pool
  //   .query(query, data)
  //   .then((result) => {
  //     if (result.command === "INSERT") {
  //       return res.status(200).json({
  //         error: false,
  //         message: "comment created successfully",
  //       });
  //     }
  //     return throwError(400, "Something went wrong");
  //   })

  //   .catch((err) => {

  //   });
};
// ===================== This Function To Get  Comment  By Post=====================
exports.getCommentsByPostId = async (req, res, next) => {
  const perPage = Number(req.query.limit);
  const currentPage = Number(req.query.offset);
  const { is_deleted } = req.query;
  const { post_id } = req.params;

  try {
    const commentsData = await Comment.findAndCountAll({
      include: [
        { model: User, required: true },
        { model: Post, required: true },
      ],
      order: [["id", "DESC"]],
      offset: (currentPage - 1) * perPage,
      limit: perPage,
      where: { post_id, is_deleted },
    });

    const comments = commentsData.rows.map((comment) => {
      return {
        ...comment.dataValues,
        user: {
          id: comment.dataValues.user.id,
          full_name: `${comment.dataValues.user.first_name} ${comment.dataValues.user.last_name}`,
          email: comment.dataValues.user.email,
          image: `http://localhost:5000/images/${comment.dataValues.user.image}`,
        },
        post: {
          ...comment.dataValues.post.dataValues,
        },
      };
    });

    res.status(200).json({
      error: false,
      comments,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// ===================== This Function To Update comment =====================

exports.updateCommentById = async (req, res, next) => {
  const { id } = req.params;
  let { comment } = req.body;

  try {
    const updateComment = await Comment.update({ comment }, { where: { id } });

    if (typeof updateComment[0] === "number") {
      return res.status(200).json({
        error: false,
        message: "Comment Updated Successfully",
      });
    }

    return throwError(400, "Something went wrong");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// ===================== This Function To Delete  comment By Id =====================

exports.activateOrDeActivateCommentById = async (req, res, next) => {
  const { id, is_deleted } = req.params;

  try {
    const result = await Comment.update({ is_deleted }, { where: { id } });

    if (typeof result[0] === "number") {
      return res.status(200).json({
        error: false,
        message:
          is_deleted == 1
            ? "Comment Deleted Successfully"
            : "Comment Restored Successfully",
      });
    }
    return throwError(404, "Something went wrong");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
