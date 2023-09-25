const pool = require("../models/DB");
const { throwError } = require("../middlewares/throwError");

// ===================== GET ALL POSTS =====================
exports.getAllPosts = (req, res, next) => {
  let images = [];
  let posts = [];
  const { active } = req.params;
  const query = `SELECT posts.id, posts.description, posts.category_id, posts.sub_category_id, posts.created_at, users.first_name, users.last_name, users.image FROM posts JOIN users ON users.id = posts.poster_id WHERE posts.active = $1`;
  pool
    .query(query, [active])
    .then((result) => {
      if (result.command === `SELECT`) {
        posts = result.rows;
        const newQuery = `SELECT * FROM serverices_images`;
        return pool.query(newQuery);
      }
      return throwError(400, "Something went wrong");
    })
    .then((result2) => {
      images = result2.rows;
      posts = posts.map((post) => ({
        id: post.id,
        user: {
          fullName: `${post.first_name} ${post.last_name}`,
          userImage: post.image,
        },
        description: post.description,
        category_id: post.category_id,
        sub_category_id: post.sub_category_id,
        created_at: post.created_at,
        images: images.filter((image) => {
          return image.service_id === post.id;
        }),
      }));
      return res.status(200).json({
        error: false,
        posts: posts, // each post has images key
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// ===================== GET ALL POSTS BY USER =====================
exports.getAllPostsByUser = (req, res, next) => {
  const { active } = req.body;
  const { posterId } = req.params;
  let images = [];
  let posts = [];
  const query = `SELECT posts.*, users.id AS userId ,users.first_name, users.last_name, users.image FROM posts JOIN users ON users.id = posts.poster_id WHERE posts.active = $1 AND posts.poster_id = $2`;
  pool
    .query(query, [active, posterId])
    .then((result) => {
      if (result.command === `SELECT`) {
        posts = result.rows;
        const imageQuery = `SELECT * FROM serverices_images`;
        return pool.query(imageQuery);
      }
      return throwError(400, "Something went wrong");
    })
    .then((result2) => {
      images = result2.rows;
      posts = posts.map((post) => ({
        id: post.id,
        user: {
          fullName: `${post.first_name} ${post.last_name}`,
          userImage: post.image,
        },
        description: post.description,
        category_id: post.category_id,
        sub_category_id: post.sub_category_id,
        created_at: post.created_at,
        images: images.filter((image) => {
          return image.service_id === post.id;
        }),
      }));
      return res.status(200).json({
        error: false,
        posts: posts,
      });
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
  const { title, description, images, category_id, sub_category_id } = req.body;

  if (!req.file) {
    return throwError(422, "No Image provided");
  }

  const image = req.file.path.replace("\\", "/");

  const data = [id, description, image, category_id, sub_category_id];

  const query = `INSERT INTO posts (poster_id,
    description,
    main_image,
    category_id,
    sub_category_id) VALUES ($1, $2, $3, $4, $5)`;

  pool
    .query(query, data)
    .then((result) => {
      if (result.rowCount !== 0) {
        if (images.length === 0) {
          res.status(201).json({
            error: false,
            message: "New post created",
          });
        } else {
          return pool.query(`SELECT id FROM posts ORDER BY id DESC LIMIT 1`);
        }
      }
      return throwError(400, "Something went wrong");
    })
    .then(async (result2) => {
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
