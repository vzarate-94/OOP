const Manager = require("../lib/Manager")

test("getRole() should return \"Manager\"", () => {
  const testValue = "Manager";
  const e = new Manager("Ana", 1, "test@test.com", 100);
  expect(e.getRole()).toBe(testValue);
});