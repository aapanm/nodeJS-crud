import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getChildListService = async () => {
  try {
    const getResponse = await prisma.children.findMany({
      include: {
        parentInfo: true,
      },
    });
    return getResponse;
  } catch (error) {
    return error;
  }
};

const getChildListWithParentIdService = async (id) => {
  try {
    const getResponse = await prisma.children.findMany({
      where: {
        parentIdx: +id,
      },
      include: {
        parentInfo: true,
      },
    });
    return getResponse;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getChildWithId = async (id) => {
  try {
    const getResponse = await prisma.$queryRaw`
    SELECT
      children.firstName , children.lastName ,
      parent.firstName as parentFirstName, parent.lastName as parentLastName,
      concat(parent.street, ',', parent.city, ',', parent.state, ',' , parent.zip) as parentAddress 
    FROM
      children
      JOIN parent ON children.parentIdx = parent.parentId
    WHERE
      children.childId = ${id}`;

    const data = {
      firstName: getResponse[0].firstName,
      lastName: getResponse[0].lastName,
      parentInfo: {
        firstName: getResponse[0].parentFirstName,
        lastName: getResponse[0].parentLastName,
        address: getResponse[0].parentAddress,
      },
    };
    return data;
  } catch (error) {
    return error;
  }
};

const createChildService = async (data) => {
  try {
    const createResponse = await prisma.children.create({ data: data });
    return createResponse;
  } catch (error) {
    return error;
  }
};

const updateChildService = async (updateData) => {
  const { data, ...id } = updateData;
  try {
    const updateResponse = await prisma.children.update({
      where: {
        childId: id.childID,
      },
      data: data,
    });
    return updateResponse;
  } catch (error) {
    return error;
  }
};

const deleteChildService = async (id) => {
  try {
    const deleteResponse = await prisma.children.delete({
      where: {
        childId: id,
      },
    });
    return deleteResponse;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteChildWithParentIdService = async (id) => {
  try {
    const deleteResponse = await prisma.children.deleteMany({
      where: {
        parentIdx: id,
      },
    });
    return deleteResponse;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export {
  getChildListService,
  createChildService,
  getChildWithId,
  deleteChildService,
  updateChildService,
  deleteChildWithParentIdService,
  getChildListWithParentIdService,
};
