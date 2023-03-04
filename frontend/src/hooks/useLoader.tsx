import { useState } from 'react';
import Loader from '../components/ui/Loader';

function useLoader() {
  const [isLoading, setLoading] = useState(true);

  const getLoader = () => <Loader />;
  return { isLoading, setLoading, getLoader };
}

export default useLoader;
