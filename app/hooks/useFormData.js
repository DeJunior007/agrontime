import { useState, useEffect } from 'react';
import { obterJson } from '../mantercultura/newforms';

export const useFormData = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await obterJson();
        setData(response);
      } catch (err) {
        setError(err);
        console.error('Erro ao carregar dados do formulário:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
}; 