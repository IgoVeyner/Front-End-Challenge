import { useEffect } from "react";

const useGetPreferences = (loadPreferences) => {
  useEffect(() => {
    loadPreferences()
  }, [loadPreferences])
}

export default useGetPreferences