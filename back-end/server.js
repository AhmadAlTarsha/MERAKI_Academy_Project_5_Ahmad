const express = require("express");
require("dotenv").config();
const cors = require("cors");
// require("./models/DB");

const app = express();

app.use(express.json());
app.use(cors());

const rolesRouter = require("./routes/roles");
const permissionsRouter = require("./routes/permissions");

app.use("/roles", rolesRouter);
app.use("/permissions", permissionsRouter);

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
  console.log(` project five server connected will....`);
});
