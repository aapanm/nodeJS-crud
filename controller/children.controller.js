//importing services
import {
  getChildListService,
  getChildListWithParentIdService,
  createChildService,
  getChildWithId,
  deleteChildService,
  updateChildService,
} from "../service/children.service.js";
import { getParentWithId } from "../service/parent.service.js";

//all children controller to create, update, fetch and deletetion
const getChildrenList = async (req, res) => {
  const response = await getChildListService();
  res.status(200).send(response);
};

const getChildrenListWithParentId = async (req, res) => {
  const response = await getChildListWithParentIdService(req.params.parentID);
  res.status(200).send(response);
};

const getChildren = async (req, res) => {
  const response = await getChildWithId(req.params.childrenID);
  res.status(200).send(response);
};

const childrenDataEntry = async (req, res) => {
  const parentData = await getParentWithId(req.body.parentIdx);
  if (parentData.length > 0) {
    const response = await createChildService(req.body);
    res.status(201).send(response);
  } else {
    res.status(404).send({ error: "parent not found!" });
  }
};

const childrenDataUpdate = async (req, res) => {
  const response = await updateChildService(req.body);
  res.status(202).send(response);
};

const childrenDataDelete = async (req, res) => {
  const response = await deleteChildService(req.body.childrenID);
  res.status(202).send(response);
};

export {
  getChildrenList,
  childrenDataEntry,
  getChildren,
  childrenDataUpdate,
  childrenDataDelete,
  getChildrenListWithParentId,
};
