//importing sevices
import {
  createParentService,
  getParentListService,
  getParentWithId,
  deleteParentService,
  updateParentService,
} from "../service/parent.service.js";
import { deleteChildWithParentIdService } from "../service/children.service.js";

// controller methods to create, update, fetch and delete data

const parentDataEntry = async (req, res) => {
  const { address, ...parentData } = req.body;
  const parentInfo = { ...parentData, ...address };
  const response = await createParentService(parentInfo);
  if (response.error) {
    res.status(409).send(response);
  } else {
    res.status(201).send(response);
  }
};

const getParent = async (req, res) => {
  const response = await getParentWithId(req.params.parentID);
  res.status(200).send(response);
};

const getParentList = async (req, res) => {
  const response = await getParentListService();
  res.status(200).send(response);
};

const parentDataUpdate = async (req, res) => {
  const parentData = await getParentWithId(req.body.parentID);
  if (parentData.length > 0) {
    const response = await updateParentService(req.body);
    res.status(202).send(response);
  } else {
    res.status(404).send({ error: "parent not found!" });
  }
};

const parentDataDelete = async (req, res) => {
  const deleteChildData = await deleteChildWithParentIdService(
    req.body.parentID
  );
  const response = await deleteParentService(req.body.parentID);
  res.status(202).send(response);
};

export {
  getParentList,
  parentDataEntry,
  getParent,
  parentDataUpdate,
  parentDataDelete,
};
