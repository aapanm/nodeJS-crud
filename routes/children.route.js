import express from "express";
import {
  getChildrenList,
  childrenDataEntry,
  getChildren,
  childrenDataDelete,
  childrenDataUpdate,
} from "../controller/children.controller.js";

const route = express.Router();

route.get("/children", getChildrenList);
route.get("/children/:childrenID", getChildren);
route.post("/createChildren", childrenDataEntry);
route.put("/updateChildren", childrenDataUpdate);
route.delete("/children", childrenDataDelete);

export default route;
