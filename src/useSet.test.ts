import { test, expect } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useSet } from "./useSet"

test(".toArray() returns the values in the Set as an array", () => {
  const { result } = renderHook(() => useSet())

  expect(result.current.toArray()).toEqual([])
})

test("Construct Set with initial values", () => {
  const { result } = renderHook(() => useSet([1, 2, 3]))

  expect(result.current.toArray()).toEqual([1, 2, 3])
})

test("Add values with .add(...values)", () => {
  const { result } = renderHook(() => useSet<number>())

  act(() => {
    result.current.add(1, 2, 3)
  })

  expect(result.current.toArray()).toEqual([1, 2, 3])
})

test("Remove values from Set with .delete(...values)", () => {
  const { result } = renderHook(() => useSet([1, 2, 3, 4]))

  act(() => {
    result.current.delete(1, 2, 3)
  })

  expect(result.current.toArray()).toEqual([4])
})

test("Check if value exists in Set with .has(value)", () => {
  const { result } = renderHook(() => useSet([1, 2, 3]))

  expect(result.current.has(1)).toEqual(true)
  expect(result.current.has(4)).toEqual(false)
})

test("Add non-existing value and delete existing value with .toggle(value)", () => {
  const { result } = renderHook(() => useSet())

  act(() => {
    result.current.toggle(1)
  })

  expect(result.current.toArray()).toEqual([1])

  act(() => {
    result.current.toggle(1)
  })

  expect(result.current.toArray()).toEqual([])
})

test("Remove all values from Set with .clear()", () => {
  const { result } = renderHook(() => useSet([1, 2, 3]))

  act(() => {
    result.current.clear()
  })

  expect(result.current.toArray()).toEqual([])
})

test("Get count of values in Set with .size", () => {
  const { result } = renderHook(() => useSet())

  expect(result.current.size).toEqual(0)

  act(() => {
    result.current.toggle(1)
  })

  expect(result.current.size).toEqual(1)
})

test("Reset the values in Set with .sync(values)", () => {
  const { result } = renderHook(() => useSet([1, 2, 3]))

  act(() => {
    result.current.sync([4, 5, 6])
  })

  expect(result.current.toArray()).toEqual([4, 5, 6])
})
