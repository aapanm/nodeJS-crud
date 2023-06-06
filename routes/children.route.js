import express from "express";
import {
  getChildrenList,
  childrenDataEntry,
  getChildren,
  childrenDataDelete,
  childrenDataUpdate,
} from "../controller/children.controller.js";
import { contentTypeSetup } from "../middleware/validate.middleware.js";

const route = express.Router();

route.get("/children", contentTypeSetup, getChildrenList);
route.get("/children/:childrenID", contentTypeSetup, getChildren);
route.post("/createChildren", contentTypeSetup, childrenDataEntry);
route.put("/updateChildren", contentTypeSetup, childrenDataUpdate);
route.delete("/children", contentTypeSetup, childrenDataDelete);

export default route;
