import { useEffect } from "react";

const useSearch = (handleSubmit) => {
  useEffect(() => {
    handleSubmit()
    
  }, [handleSubmit])
}

export default useSearch