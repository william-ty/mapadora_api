const elementFactory = require("../../src/factories/elementFactory");
const { Element } = require("../../src/models/index");

test("create an element and check type", () => {
  const element = elementFactoryElement();
  expect(element instanceof Element).toBe(true);
});

test("create an element and check id", () => {
  const element = elementFactory.createElement();
  expect(element.id).toBe(33);
});
