const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./models/DB");
const path = require("path");
const multer = require("multer");
require("dotenv").config();
const cors = require("cors");
require("./models/DB");

const app = express();

const rolesRouter = require("./routes/roles");
const permissionsRouter = require("./routes/permissions");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const servericesRouter = require("./routes/services");
const categoryRouter = require("./routes/categories");
const subCategoryRouter = require("./routes/sub-category");
const commentsRoute = require("./routes/comments");
const regionsRoure = require("./routes/regions");
const ordersRouter = require("./routes/Orders");
const chatRouter = require("./routes/chats");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getMilliseconds().toString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "images")));

// const userTypes = require(`./models/user_type`);
// const Permissions = require(`./models/permission`);
// const Users = require(`./models/user`);
// const Chat = require(`./models/Chat`);
// const Regions = require(`./models/regions`);
// const Categories = require(`./models/Category`);
// const Sub_Category = require(`./models/Sub_categories`);
// const Status = require(`./models/Status`);
// const Service = require(`./models/services`);
// const Posts = require(`./models/Post`);
// const Comments = require(`./models/Comment`);
// const Order = require(`./models/Order`);
// const Conversations = require(`./models/Chat_Conversation`);

// ===================== ROUTERS =====================

app.use("/roles", rolesRouter);
app.use("/permissions", permissionsRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/services", servericesRouter);
app.use("/categories", categoryRouter);
app.use("/subcategories", subCategoryRouter);
app.use("/comment", commentsRoute);
app.use("/regions", regionsRoure);
app.use("/orders", ordersRouter);
app.use("/chats", chatRouter);

app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.use((err, req, res, next) => {
  const { statusCode, message } = err;
  if (statusCode == 500) {
    err.statusCode = 500;
    return res.status(statusCode).json({
      error: true,
      message: "Server Error",
      err: message,
    });
  }
  return res.status(statusCode).json({
    error: true,
    message: message,
  });
});

const PORT = process.env.PORT || 5000;

// will log to the command line when the server starts
// const server = app.listen(PORT);

sequelize
  // .sync({ force: false })
  .sync()
  .then((result) => {
    const server = app.listen(PORT);
    const io = require("./socket").init(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
      },
    });
    io.on("connection", (socket) => {
      console.log("Client connected");
    });
  })
  .catch((err) => {
    console.log("ERROR", err);
  });
