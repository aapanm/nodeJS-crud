import express from "express";

//importing parent controllers
import {
  getParentList,
  parentDataEntry,
  getParent,
  parentDataDelete,
  parentDataUpdate,
} from "../controller/parent.controller.js";

//importing middlewares
import {
  validateJSON,
  contentTypeSetup,
} from "../middleware/validate.middleware.js";

const route = express.Router();

//parent routes with parameters
//middlware with routes to validate and set content type

route.get("/parent", contentTypeSetup, getParentList);
route.get("/parent/:parentID", contentTypeSetup, getParent);
route.post("/createParent", [validateJSON, contentTypeSetup], parentDataEntry);
route.patch("/updateParent", contentTypeSetup, parentDataUpdate);
route.delete("/parent", contentTypeSetup, parentDataDelete);

export default route;
