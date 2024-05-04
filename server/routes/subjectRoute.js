import express from "express";
import {create, deleteSubject, getAll, getOne, update} from "../controller/subjectController.js";

const route = express.Router();

route.post("/create", create);
route.get("/getall", getAll);
route.get("/getone/:id", getOne);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteSubject);

export default route;