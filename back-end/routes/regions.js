const express = require("express");
const {getAllRegions,addNewRegions} =require("../controllers/regions")

const regionsRout = express.Router();


regionsRout.get("/",getAllRegions)
regionsRout.post("/",addNewRegions)



module.exports=regionsRout