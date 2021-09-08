import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const useUpdateKey = () => {
  const [key, setKey] = useState(uuidv4())
  const updateKey = () => setKey(uuidv4())
  return [key, updateKey]
}

export default useUpdateKey