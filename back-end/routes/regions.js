const express = require("express");
const {getAllRegions} =require("../controllers/regions")

const regionsRout = express.Router();


regionsRout.get("/",getAllRegions)



module.exports=regionsRout