import chai from "chai";
import chaiHttp from "chai-http";
import server from "../app.js";
import BlueBird from "bluebird";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const should = chai.should();

chai.use(chaiHttp);

const parentSetup = (...parents) => {
  return BlueBird.mapSeries(parents, (user) => {
    return chai
      .request(server)
      .post("/createParent")
      .send(user)
      .then((response) => {
        return response.body;
      });
  });
};

const childSetup = (...child) => {
  return BlueBird.mapSeries(child, (user) => {
    return chai
      .request(server)
      .post("/createChildren")
      .send(user)
      .then((response) => {
        return response.body;
      });
  });
};

describe("parent_child_api", () => {
  const parent_1 = {
    parentId: 301,
    firstName: "Michael",
    lastName: "Scott",
    address: {
      street: "2",
      city: "CTG",
      state: "CTG",
      zip: "4000",
    },
  };

  const parent_2 = {
    parentId: 302,
    firstName: "Michael",
    lastName: "Scott",
    address: {
      street: "2",
      city: "CTG",
      state: "CTG",
      zip: "4000",
    },
  };

  const parent_3 = {
    parentId: null,
    firstName: "Michael",
    lastName: "Scott",
    address: {
      street: "2",
      city: "CTG",
      state: "CTG",
      zip: "4000",
    },
  };

  const children_1 = {
    parentIdx: 301,
    childId: 501,
    firstName: "Johny",
    lastName: "Depp",
  };

  const children_2 = {
    parentIdx: 302,
    childId: 502,
    firstName: "Johny",
    lastName: "Depp",
  };

  const children_3 = {
    parentIdx: 301,
    childId: 503,
    firstName: "Johny",
    lastName: "Depp",
  };

  beforeEach(async () => {
    await prisma.children.deleteMany();
    await prisma.parent.deleteMany();
  });

  afterEach(async () => {
    await prisma.children.deleteMany();
    await prisma.parent.deleteMany();
  });

  it("should create a new parent", async () => {
    const response = await chai
      .request(server)
      .post("/createParent")
      .send(parent_1);
    response.should.have.status(201);
    delete response.body.id;
    delete response.body.createdAt;
    delete response.body.updatedAt;
    const { address, ...parentInfo } = parent_1;
    response.body.should.eql({ ...address, ...parentInfo });
  });

  it("should not create a new parent with fields missing", async () => {
    const response = await chai
      .request(server)
      .post("/createParent")
      .send(parent_3);
    response.should.have.status(403);
    response.body.should.eql({
      error: "One or more than one requried fields missing!",
    });
  });

  it("should not create a new parent if it already exists", async () => {
    await parentSetup(parent_1);
    const response = await chai
      .request(server)
      .post("/createParent")
      .send(parent_1);
    response.should.have.status(409);
    response.body.should.eql({
      error: "Record with the same ID already exists.",
    });
  });

  it("should fetch all the parents", async () => {
    const results = await parentSetup(parent_1, parent_2);
    const response = await chai.request(server).get("/parent");
    response.should.have.status(200);
    response.body.should.eql(results);
  });

  it("should fetch no parents if there are not parents stored", async () => {
    const response = await chai.request(server).get("/parent");
    response.should.have.status(200);
    response.body.should.eql([]);
  });

  it("should fetch parent with given parent id", async () => {
    const results = await parentSetup(parent_1);
    const response = await chai.request(server).get("/parent/301");
    response.should.have.status(200);
    response.body.should.eql(results);
  });

  it("should update parent data", async () => {
    const result = await parentSetup(parent_1);
    delete result[0].updatedAt;
    const response = await chai
      .request(server)
      .patch("/updateParent")
      .send({
        parentID: 301,
        data: {
          lastName: "chowdhury",
          address: {
            zip: "2000",
          },
        },
      });
    delete response.body.updatedAt;
    response.should.have.status(202);
    response.body.should.eql({
      ...result[0],
      lastName: "chowdhury",
      zip: "2000",
    });
  });

  it("should not update if parent not found in database", async () => {
    await parentSetup(parent_1);
    const response = await chai
      .request(server)
      .patch("/updateParent")
      .send({
        parentID: 302,
        data: {
          lastName: "chowdhury",
          address: {
            zip: "2000",
          },
        },
      });
    response.should.have.status(404);
    response.body.should.eql({ error: "parent not found!" });
  });

  it("should delete parent", async () => {
    const results = await parentSetup(parent_1);
    const response = await chai.request(server).delete("/parent").send({
      parentID: 301,
    });
    response.should.have.status(202);
    response.body.should.eql(results[0]);
  });

  it("should delete associated child data while deleting parent", async () => {
    await parentSetup(parent_1);
    await childSetup(children_1);
    const deleteResponse = await chai.request(server).delete("/parent").send({
      parentID: 301,
    });
    const response = await chai.request(server).get("/childrenWithParent/301");
    response.should.have.status(200);
    response.body.should.eql([]);
  });

  it("should not create child if parent not found", async () => {
    const response = await chai
      .request(server)
      .post("/createChildren")
      .send(children_1);
    response.should.have.status(404);
    response.body.should.eql({ error: "parent not found!" });
  });

  it("should create a child", async () => {
    await parentSetup(parent_1);
    const response = await chai
      .request(server)
      .post("/createChildren")
      .send(children_1);
    response.should.have.status(201);
    delete response.body.id;
    delete response.body.createdAt;
    delete response.body.updatedAt;
    response.body.should.eql(children_1);
  });

  it("should fetch all the child with parent info", async () => {
    const parentResults = await parentSetup(parent_1, parent_2);
    const childResults = await childSetup(children_1, children_2);
    const response = await chai.request(server).get("/children");
    const expectedData = [
      { ...childResults[0], parentInfo: { ...parentResults[0] } },
      { ...childResults[1], parentInfo: { ...parentResults[1] } },
    ];
    response.should.have.status(200);
    response.body.should.eql(expectedData);
  });

  it("should fetch all the child data associated with given parent id", async () => {
    const parentResults = await parentSetup(parent_1);
    const childResults = await childSetup(children_1, children_3);
    const response = await chai.request(server).get("/children");
    const expectedData = [
      { ...childResults[0], parentInfo: { ...parentResults[0] } },
      { ...childResults[1], parentInfo: { ...parentResults[0] } },
    ];
    response.should.have.status(200);
    response.body.should.eql(expectedData);
  });

  it("should update child data", async () => {
    await parentSetup(parent_1);
    const result = await childSetup(children_1);
    const response = await chai
      .request(server)
      .patch("/updateChildren")
      .send({
        childID: 501,
        data: {
          lastName: "Chowdhury",
        },
      });
    delete result[0].updatedAt;
    delete response.body.updatedAt;

    response.should.have.status(202);
    response.body.should.eql({ ...result[0], lastName: "Chowdhury" });
  });

  it("should delete child", async () => {
    await parentSetup(parent_1);
    const result = await childSetup(children_1);
    const response = await chai.request(server).delete("/children").send({
      childrenID: 501,
    });
    response.should.have.status(202);
    response.body.should.eql(result[0]);
  });
});
