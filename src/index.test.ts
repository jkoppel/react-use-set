import { test, expect } from "vitest"
import * as exports from "."

test("exports `useSet`", () => {
  expect(exports).toHaveProperty("useSet")
  expect(exports.useSet).toBeTypeOf("function")
})
