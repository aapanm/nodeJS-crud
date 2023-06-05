import express from "express";
import {
  getParentList,
  parentDataEntry,
  getParent,
  parentDataDelete,
  parentDataUpdate,
} from "../controller/parent.controller.js";

const route = express.Router();

route.get("/parent", getParentList);
route.get("/parent/:parentID", getParent);
route.post("/createParent", parentDataEntry);
route.put("/updateParent", parentDataUpdate);
route.delete("/parent", parentDataDelete);

export default route;
