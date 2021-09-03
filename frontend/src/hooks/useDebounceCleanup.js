import { useEffect } from "react";

const useDebounceCleanup = (debouncedResults) => {
  useEffect(() => {
    return () => {
      debouncedResults.cancel()
    }
  }, [debouncedResults])
}

export default useDebounceCleanup