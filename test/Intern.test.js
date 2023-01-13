const Intern = require("../lib/Intern");

test("Can I get Interns school via getSchool()", () => {
  const testValue = "VCU";
  const e = new Intern("Ana", 1, "test@test.com", testValue);
  expect(e.getSchool()).toBe(testValue);
});