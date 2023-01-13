const Employee = require("../lib/Employee");

test("Initiate Employee instance", () => {
    const e = new Employee("Ana");
    expect(typeof (e)).toBe("object");
});