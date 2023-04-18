import { useCallback, useMemo, useState } from "react"

export function useSet<T>(iterable?: Iterable<T>) {
  const [set, setSet] = useState(() => new Set<T>(iterable))

  const add = useCallback((...values: T[]) => {
    setSet((prev) => {
      const copy = new Set(prev)
      for (const value of values) {
        copy.add(value)
      }

      return copy
    })
  }, [])

  const deleteValues = useCallback((...values: T[]) => {
    setSet((prev) => {
      const copy = new Set(prev)
      for (const value of values) {
        copy.delete(value)
      }

      return copy
    })
  }, [])

  const toggle = useCallback((value: T) => {
    setSet((prev) => {
      const copy = new Set(prev)
      if (!copy.has(value)) {
        copy.add(value)
      } else {
        copy.delete(value)
      }

      return copy
    })
  }, [])

  const clear = useCallback(() => {
    setSet(new Set())
  }, [])

  const sync = useCallback((values: T[]) => {
    setSet(new Set(values))
  }, [])

  return useMemo(() => {
    return {
      size: set.size,
      has: (value: T) => set.has(value),
      add,
      delete: deleteValues,
      clear,
      sync,
      toArray: () => Array.from(set),
      toggle,
    }
  }, [set, add, deleteValues, clear, sync, toggle])
}
