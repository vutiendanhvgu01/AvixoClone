import { useEffect, useState } from 'react';
import { DrugBrand } from '../types/drug';
import allergyProxyService from '../services/proxy';

const useDrugBrands = (search: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [drugBrands, setDrugBrands] = useState<DrugBrand[]>([]);

  useEffect(() => {
    if (search) {
      setLoading(true);
      allergyProxyService
        .getDrugBrands({ search })
        .then(({ data }) => {
          setDrugBrands(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [search]);

  return { drugBrands, loading };
};

export default useDrugBrands;
