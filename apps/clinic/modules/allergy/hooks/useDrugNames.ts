import { useEffect, useState } from 'react';
import { DrugName } from '../types/drug';
import allergyProxyService from '../services/proxy';

const useDrugNames = (search: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [drugNames, setDrugNames] = useState<DrugName[]>([]);

  useEffect(() => {
    if (search) {
      setLoading(true);
      allergyProxyService
        .getDrugNames({ search })
        .then(({ data }) => {
          setDrugNames(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [search]);

  return { drugNames, loading };
};

export default useDrugNames;
