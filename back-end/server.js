const express = require("express");
require("dotenv").config();
const cors = require("cors");
// require("./models/DB");

const app = express();

app.use(express.json());
app.use(cors());

// ===================== ROUTERS =====================
const rolesRouter = require("./routes/roles");
const permissionsRouter = require("./routes/permissions");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const servericesRouter = require("./routes/services");
const categoryRouter = require("./routes/categories");
const subCategoryRouter = require("./routes/sub-category");


app.use("/roles", rolesRouter);
app.use("/permissions", permissionsRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/services", servericesRouter);
app.use("/categories", categoryRouter);
app.use("/subcategories", subCategoryRouter);


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
app.listen(PORT, () => {
  console.log(` project five server connected will...`);
});
