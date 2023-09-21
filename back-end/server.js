const express = require("express")
require("dotenv").config();
const cors = require("cors");
require("./models/DB");



const app = express()

app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 5000;




;
// will log to the command line when the server starts
app.listen(PORT, () => {
  console.log(` project five server connected will....`);
});