import { sayHello } from "../src/main";

test("Prints Hello, world! to console", () => {
  expect(sayHello("world")).toBe("Hello, world!");
});
