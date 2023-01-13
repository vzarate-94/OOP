const Engineer = require("../lib/Engineer");

test("Can I set a  GitHUb account", () => {
    const testValue = "Git.com/Ana";
    const e = new Engineer("Ana", 1, "test@test.com", testValue);
    expect(e.github).toBe(testValue);
});