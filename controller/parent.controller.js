import {
  createParentService,
  getParentListService,
  getParentWithId,
  deleteParentService,
  updateParentService,
} from "../service/parent.service.js";

const validateJSON = (data) => {
  // Check if all required fields exist
  if (
    data.parentId === null ||
    data.firstName === null ||
    data.lastName === null ||
    data.address === null ||
    data.address.street === null ||
    data.address.city === null ||
    data.address.state === null ||
    data.address.zip === null
  ) {
    return false;
  }
  return true;
};

const parentDataEntry = async (req, res) => {
  const isValid = validateJSON(req.body);

  if (isValid) {
    const { address, ...parentData } = req.body;
    const parentInfo = { ...parentData, ...address };
    const response = await createParentService(parentInfo);
    if (response.error) {
      res.status(409).send(response);
    } else {
      res.status(201).send(response);
    }
  } else {
    res
      .status(403)
      .send({ error: "One or more than one requried fields missing!" });
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
