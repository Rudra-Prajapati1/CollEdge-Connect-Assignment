import express from "express";
import {
  deleteForm,
  getForms,
  saveForm,
} from "../controllers/contactController.js";

const contactRouter = express.Router();

contactRouter.get("/contacts", getForms);
contactRouter.post("/contacts", saveForm);
contactRouter.delete("/contacts/:id", deleteForm);

export default contactRouter;
