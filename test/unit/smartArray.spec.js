/* global describe, it */

import { expect } from "chai";
import SmartArray from "../../src/lib/smartArray";

var testData = [{ id: 1, children_ids: [2, 3], connections_ids: [3, 4, 5], name: "first" },
                { id: 2, children_ids: [4, 5], connections_ids: [3, 6],    name: "second" },
                { id: 3, children_ids: [],     connections_ids: [1, 2, 5], name: "third" },
                { id: 4, children_ids: [],     connections_ids: [1, 6],    name: "fourth" },
                { id: 5, children_ids: [],     connections_ids: [2],       name: "fifth" },
                { id: 6, children_ids: [5],    connections_ids: [2, 3],    name: "sixth" }
               ];


describe("smartArray", () => {

  describe("Creation", () => {
    it("Should create SmartArray", () => {
      let testSm = new SmartArray(testData, ["children", "connections"]);
      expect(testSm).to.be.an.instanceof(Array);
      expect(testSm).have.length(6);
    });
  });

  describe("Methods", () => {

    describe("getById", () => {
      it("should return element with given id", () => {
        let sm = new SmartArray(testData, ["children", "connections"]);
        expect(sm.getById(3)).to.have.property("id", 3);
        expect(sm.getById(333)).to.be.undefined;
      });
    });

    describe("deleteById", () => {
      it("should delete element with given id", () => {
        let sm = new SmartArray(testData, ["children", "connections"]);
        sm.deleteById(3);
        expect(sm).have.length(5);
        expect(sm.getById(3)).to.be.undefined;
      });
    });

    describe("push", () => {
      it("should add value with new id", () => {
        let sm = new SmartArray(testData, ["children", "connections"]);
        sm.push({ id: 7, children_ids: [1], connections_ids: [], name: "seventh" });
        expect(sm).have.length(7);
        expect(sm[sm.length - 1]).to.have.property("id").to.equal(7);
      });
      it("should NOT add value with existed id", () => {
        let sm = new SmartArray(testData, ["children", "connections"]);
        sm.push({ id: 4, children_ids: [1], connections_ids: [], name: "seventh" });
        expect(sm).have.length(6);
        expect(sm.getById(4)).to.have.property("name", "fourth");
      });
      it("should add simple value", () => {
        let sm = new SmartArray(testData, ["children", "connections"]);
        sm.push("PYSH!");
        expect(sm[sm.length - 1]).to.equal("PYSH!");
      });
    });

    describe("unshift", () => {
      it("should add value with new id in the beginning of array", () => {
        let sm = new SmartArray(testData, ["children", "connections"]);
        sm.unshift({ id: 7, children_ids: [1], connections_ids: [], name: "seventh" });
        expect(sm).have.length(7);
        expect(sm[0]).to.have.property("id").to.equal(7);
      });
      it("should NOT add value with existed id", () => {
        let sm = new SmartArray(testData, ["children", "connections"]);
        sm.unshift({ id: 4, children_ids: [1], connections_ids: [], name: "seventh" });
        expect(sm).have.length(6);
        expect(sm.getById(4)).to.have.property("name", "fourth");
      });
      it("should add simple value", () => {
        let sm = new SmartArray(testData, ["children", "connections"]);
        sm.unshift("PYSH!");
        expect(sm[0]).to.equal("PYSH!");
      });
    });

    describe("concat", () => {
      // TODO: concat tests
    });

    describe("includes", () => {
      it("should return true if object in SmartArray", () => {
        let sm = new SmartArray(testData, ["children", "connections"]);
        expect(sm.includes({ id: 5 })).to.be.true;
        expect(sm.includes({ id: 1 })).to.be.true;
      });
      it("should return false if object with given id NOT in SmartArray", () => {
        let sm = new SmartArray(testData, ["children", "connections"]);
        expect(sm.includes({ id: 55 })).to.be.false;
      });
      it("should return true if simple value in SmartArray", () => {
        let sm = new SmartArray(testData, ["children", "connections"]);
        sm.push("PYSH!");
        expect(sm.includes("PYSH!")).to.be.true;
      });
      it("should return false if simple value NOT in SmartArray", () => {
        let sm = new SmartArray(testData, ["children", "connections"]);
        sm.push("PYSH!");
        expect(sm.includes("UPCHK")).to.be.false;
      });
    });

    describe("includesId", () => {
      it("should return true if object with given id in SmartArray", () => {
        let sm = new SmartArray(testData, ["children", "connections"]);
        expect(sm.includesId(5)).to.be.true;
        expect(sm.includesId(1)).to.be.true;
      });
      it("should return false if object with given id NOT in SmartArray", () => {
        let sm = new SmartArray(testData, ["children", "connections"]);
        expect(sm.includesId(55)).to.be.false;
      });
      it("should return true if give a simple value", () => {
        let sm = new SmartArray(testData, ["children", "connections"]);
        expect(sm.includesId("PYSH!")).to.be.false;
      });
    });

    describe("sortBy", () => {
      // TODO: sortBy test
      // it("should return SmartArray sorted by given field", () => {
      //   let sm = new SmartArray(testData, ["children", "connections"]);
      //   expect(sm.sortBy);
      // });
    });

    describe("clear", () => {
      it("should empty SmartArray", () => {
        let sm = new SmartArray(testData, ["children", "connections"]);
        sm.clear();
        expect(sm).have.length(0);
        expect(sm[0]).to.be.undefined;
      });
    });

  });

});
