import express from "express";

//importing children controllers
import {
  getChildrenList,
  getChildrenListWithParentId,
  childrenDataEntry,
  getChildren,
  childrenDataDelete,
  childrenDataUpdate,
} from "../controller/children.controller.js";

//improting middlewares
import { contentTypeSetup } from "../middleware/validate.middleware.js";

const route = express.Router();

//all children  routes with parameters

route.get("/children", contentTypeSetup, getChildrenList);
route.get("/children/:childrenID", contentTypeSetup, getChildren);
route.get(
  "/childrenWithParent/:parentID",
  contentTypeSetup,
  getChildrenListWithParentId
);
route.post("/createChildren", contentTypeSetup, childrenDataEntry);
route.patch("/updateChildren", contentTypeSetup, childrenDataUpdate);
route.delete("/children", contentTypeSetup, childrenDataDelete);

export default route;
