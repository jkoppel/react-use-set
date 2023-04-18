import { useCallback, useMemo, useState } from "react"

export function useSet<T>(iterable?: Iterable<T>) {
  const [set, setSet] = useState(() => new Set<T>(iterable))

  const add = useCallback((...values: T[]) => {
    setSet((prev) => {
      for (const value of values) {
        prev.add(value)
      }

      return new Set(prev)
    })
  }, [])

  const deleteValues = useCallback((...values: T[]) => {
    setSet((prev) => {
      for (const value of values) {
        prev.delete(value)
      }

      return new Set(prev)
    })
  }, [])

  const toggle = useCallback((value: T) => {
    setSet((prev) => {
      if (!prev.has(value)) {
        prev.add(value)
      } else {
        prev.delete(value)
      }

      return new Set(prev)
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
      add,
      delete: deleteValues,
      clear,
      sync,
      toArray: () => Array.from(set),
      toggle,
    }
  }, [set, add, deleteValues, clear, sync, toggle])
}
