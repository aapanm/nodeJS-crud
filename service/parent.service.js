//importing prisma to perfoem db operations
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

// all parent serviecs with queries
const getParentListService = async () => {
  try {
    const getResponse = await prisma.parent.findMany();
    return getResponse;
  } catch (error) {
    return error;
  }
};

const getParentWithId = async (id) => {
  try {
    const getResponse =
      await prisma.$queryRaw`SELECT * FROM parent WHERE parent.parentId = ${id}`;
    return getResponse;
  } catch (error) {
    return error;
  }
};

const createParentService = async (data) => {
  try {
    const createResponse = await prisma.parent.create({ data: data });
    return createResponse;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { error: "Record with the same ID already exists." };
    }
  }
};

const updateParentService = async (updateData) => {
  const { data, ...id } = updateData;
  const { address, ...personalInfo } = data;
  const updationInfo = { ...address, ...personalInfo };
  try {
    const updateResponse = await prisma.parent.update({
      where: {
        parentId: id.parentID,
      },
      data: updationInfo,
    });
    return updateResponse;
  } catch (error) {
    return error;
  }
};

const deleteParentService = async (id) => {
  try {
    const deleteResponse = await prisma.parent.delete({
      where: {
        parentId: id,
      },
    });
    return deleteResponse;
  } catch (error) {
    return error;
  }
};

export {
  createParentService,
  getParentListService,
  getParentWithId,
  deleteParentService,
  updateParentService,
};
