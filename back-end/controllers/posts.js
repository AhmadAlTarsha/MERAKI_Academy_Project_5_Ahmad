// const pool = require("../models/DB");
const io = require("../socket");
const Post = require("../models/Post");
const Category = require("../models/Category");
const SubCategory = require("../models/Sub_categories");
const User = require("../models/user");
const { throwError } = require("../middlewares/throwError");

// ===================== GET ALL POSTS =====================
exports.getAllPosts = async (req, res, next) => {
  const perPage = Number(req.query.limit);
  const currentPage = Number(req.query.offset);
  const { is_deleted } = req.query;

  const data = is_deleted
    ? {
        include: [
          { model: User, required: true },
          { model: Category, required: true },
          { model: SubCategory, required: true },
        ],
        order: [["id", "DESC"]],
        offset: (currentPage - 1) * perPage,
        limit: perPage,
        where: { is_deleted },
      }
    : {
        include: [
          { model: User, required: true },
          { model: Category, required: true },
          { model: SubCategory, required: true },
        ],
        order: [["id", "DESC"]],
        offset: (currentPage - 1) * perPage,
        limit: perPage,
      };

  try {
    const postsData = await Post.findAndCountAll(data);
    const posts = postsData.rows.map((post) => {
      return {
        ...post.dataValues,
        main_image: `http://localhost:5000/${post.dataValues.main_image}`,
        user: {
          ...post.dataValues.user.dataValues,
          image: `http://localhost:5000/images/${post.dataValues.user.dataValues.image}`,
        },
        Category: {
          ...post.dataValues.Category.dataValues,
          image: `http://localhost:5000/${post.dataValues.Category.dataValues.image}`,
        },
        sub_category: {
          ...post.dataValues.sub_category.dataValues,
          image: `http://localhost:5000/${post.dataValues.sub_category.dataValues.image}`,
        },
      };
    });

    res.status(200).json({
      error: false,
      posts: {
        count: postsData.count,
        rows: posts,
      },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAllPostsByCategory = async (req, res, next) => {
  const perPage = Number(req.query.limit);
  const currentPage = Number(req.query.offset);
  const { is_deleted } = req.query;
  const { category_id } = req.params;

  const data = is_deleted
    ? {
        include: [
          { model: User, required: true },
          { model: Category, required: true },
          { model: SubCategory, required: true },
        ],
        order: [["id", "DESC"]],
        offset: (currentPage - 1) * perPage,
        limit: perPage,
        where: { is_deleted, category_id },
      }
    : {
        include: [
          { model: User, required: true },
          { model: Category, required: true },
          { model: SubCategory, required: true },
        ],
        order: [["id", "DESC"]],
        offset: (currentPage - 1) * perPage,
        limit: perPage,
        where: { category_id },
      };

  try {
    const postsData = await Post.findAndCountAll(data);
    const posts = postsData.rows.map((post) => {
      return {
        ...post.dataValues,
        main_image: `http://localhost:5000/${post.dataValues.main_image}`,
        user: {
          ...post.dataValues.user.dataValues,
          image: `http://localhost:5000/images/${post.dataValues.user.dataValues.image}`,
        },
        Category: {
          ...post.dataValues.Category.dataValues,
          image: `http://localhost:5000/${post.dataValues.Category.dataValues.image}`,
        },
        sub_category: {
          ...post.dataValues.sub_category.dataValues,
          image: `http://localhost:5000/${post.dataValues.sub_category.dataValues.image}`,
        },
      };
    });

    res.status(200).json({
      error: false,
      posts: {
        count: postsData.count,
        rows: posts,
      },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAllPostsBySubCategory = async (req, res, next) => {
  const perPage = Number(req.query.limit);
  const currentPage = Number(req.query.offset);
  const { is_deleted } = req.query;
  const { sub_category_id } = req.params;

  const data = is_deleted
    ? {
        include: [
          { model: User, required: true },
          { model: Category, required: true },
          { model: SubCategory, required: true },
        ],
        order: [["id", "DESC"]],
        offset: (currentPage - 1) * perPage,
        limit: perPage,
        where: { is_deleted, sub_category_id },
      }
    : {
        include: [
          { model: User, required: true },
          { model: Category, required: true },
          { model: SubCategory, required: true },
        ],
        order: [["id", "DESC"]],
        offset: (currentPage - 1) * perPage,
        limit: perPage,
        where: { sub_category_id },
      };

  try {
    const postsData = await Post.findAndCountAll(data);
    const posts = postsData.rows.map((post) => {
      return {
        ...post.dataValues,
        main_image: `http://localhost:5000/${post.dataValues.main_image}`,
        user: {
          ...post.dataValues.user.dataValues,
          image: `http://localhost:5000/images/${post.dataValues.user.dataValues.image}`,
        },
        Category: {
          ...post.dataValues.Category.dataValues,
          image: `http://localhost:5000/${post.dataValues.Category.dataValues.image}`,
        },
        sub_category: {
          ...post.dataValues.sub_category.dataValues,
          image: `http://localhost:5000/${post.dataValues.sub_category.dataValues.image}`,
        },
      };
    });

    res.status(200).json({
      error: false,
      posts: {
        count: postsData.count,
        rows: posts,
      },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getPostById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const post = await Post.findByPk(id, {
      include: [
        { model: User, required: true },
        { model: Category, required: true },
        { model: SubCategory, required: true },
      ],
    });
    if (post?.dataValues?.id) {
      res.status(200).json({
        error: false,
        post: {
          ...post.dataValues,
          main_image: `http://localhost:5000/${post.dataValues.main_image}`,
          user: {
            ...post.dataValues.user.dataValues,
            image: `http://localhost:5000/images/${post.dataValues.user.dataValues.image}`,
          },
          Category: {
            ...post.dataValues.Category.dataValues,
            image: `http://localhost:5000/${post.dataValues.Category.dataValues.image}`,
          },
          sub_category: {
            ...post.dataValues.sub_category.dataValues,
            image: `http://localhost:5000/${post.dataValues.sub_category.dataValues.image}`,
          },
        },
      });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAllPostsByUser = async (req, res, next) => {
  const perPage = Number(req.query.limit);
  const currentPage = Number(req.query.offset);
  const { is_deleted } = req.query;
  const { poster_id } = req.params;

  const data = is_deleted
    ? {
        include: [
          { model: User, required: true },
          { model: Category, required: true },
          { model: SubCategory, required: true },
        ],
        order: [["id", "DESC"]],
        offset: (currentPage - 1) * perPage,
        limit: perPage,
        where: { is_deleted, poster_id },
      }
    : {
        include: [
          { model: User, required: true },
          { model: Category, required: true },
          { model: SubCategory, required: true },
        ],
        order: [["id", "DESC"]],
        offset: (currentPage - 1) * perPage,
        limit: perPage,
        where: { poster_id },
      };

  try {
    const postsData = await Post.findAndCountAll(data);
    const posts = postsData.rows.map((post) => {
      return {
        ...post.dataValues,
        main_image: `http://localhost:5000/${post.dataValues.main_image}`,
        user: {
          ...post.dataValues.user.dataValues,
          image: `http://localhost:5000/images/${post.dataValues.user.dataValues.image}`,
        },
        Category: {
          ...post.dataValues.Category.dataValues,
          image: `http://localhost:5000/${post.dataValues.Category.dataValues.image}`,
        },
        sub_category: {
          ...post.dataValues.sub_category.dataValues,
          image: `http://localhost:5000/${post.dataValues.sub_category.dataValues.image}`,
        },
      };
    });

    res.status(200).json({
      error: false,
      posts: {
        count: postsData.count,
        rows: posts,
      },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// ===================== CREATE NEW POST =====================
exports.createPost = async (req, res, next) => {
  const { description, category_id, sub_category_id } = req.body;

  if (!req.file) {
    return res.status(400).json({
      error: false,
      message: "No Image provided",
    });
  }

  const image = req.file.path.replace("\\", "/");

  try {
    const newPost = await Post.create({
      description,
      main_image: image,
      poster_id: req.token.user.id,
      category_id,
      sub_category_id,
    });

    if (newPost._options.isNewRecord) {
      io.getIo().emit("posts", { action: "create" });
      return res.status(201).json({
        error: true,
        message: "Post Created Successfully",
      });
    }
    clearImage(image);
    return throwError(404, "Something went wrong");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// ===================== UPDATE POST =====================
exports.updatePostById = async (req, res, next) => {
  const { id } = req.params;

  const { description, category_id, sub_category_id } = req.body;

  let image;

  if (req.file) {
    image = req.file.path.replace("\\", "/");
  }

  try {
    const updatePost = await Post.update(
      { description, category_id, sub_category_id, image },
      { where: { id } }
    );

    if (typeof updatePost[0] === "number") {
      return res.status(200).json({
        error: false,
        message: "Post Updated Successfully",
      });
    }

    return throwError(400, "Something went wrong");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

  // const data = image
  //   ? [
  //       description || null,
  //       image || null,
  //       category_id || null,
  //       sub_category_id || null,
  //       id,
  //     ]
  //   : [description || null, category_id || null, sub_category_id || null, id];

  // const query = image
  //   ? `UPDATE posts SET description = COALESCE($1,description), main_image =COALESCE($2,image), category_id =COALESCE($3,category_id), sub_category_id =COALESCE($4,sub_category_id) WHERE id=$5 RETURNING *`
  //   : `UPDATE posts SET description =COALESCE($1,description), category_id =COALESCE($2,category_id), sub_category_id = COALESCE($3,sub_category_id) WHERE id=$4 RETURNING *`;

  // pool
  //   .query(query, data)
  //   .then((result) => {
  //     if (result.rowCount !== 0) {
  //       return res.status(200).json({
  //         error: false,
  //         message: `Post with id: ${id} updated successfully`,
  //       });
  //     }
  //     return throwError(400, "Something went wrong");
  //   })
  //   .catch((err) => {

  //   });
};

// ===================== DELETE POST =====================
exports.activationPostById = async (req, res, next) => {
  const { id, is_deleted } = req.params;

  try {
    const isDeleted = await Post.update({ is_deleted }, { where: { id } });

    if (typeof isDeleted[0] === "number") {
      return res.status(200).json({
        error: false,
        message:
          is_deleted == 1
            ? "Post Deleted Successfully"
            : "Post Restored Successfully",
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
