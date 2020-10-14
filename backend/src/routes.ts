import { Router } from "express";
import multer from "multer";
import OrphanagesController from "./controllers/OrphanagesController";
import uploadConfig from "./config/upload";

const route = Router();
const upload = multer(uploadConfig);

route.get("/orphanages", OrphanagesController.index);
route.get("/orphanages/:id", OrphanagesController.show);
route.post("/orphanages", upload.array("images"), OrphanagesController.create);

export default route;