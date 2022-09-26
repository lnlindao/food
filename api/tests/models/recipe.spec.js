const { Recipe, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Recipe model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe("Creacion de name", () => {
      it("deberia dar error si 'name' es null", (done) => {
        Recipe.create({
          name: null,
        })
          .then((res) => {
            done(new Error("It requires a valid name"));
            return res;
          })
          .catch((error) => done(expect(error.message).toBeDefined()));
      });
      it("should work when its a valid name", () => {
        Recipe.create({ name: "Milanesa a la napolitana" });
      });
    });
  });
});
