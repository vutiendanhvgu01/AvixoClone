import { useEffect, useState } from 'react';
import organisationProxyService from 'modules/organisation/services/proxy';
import Premise from 'modules/premise/components/premise-types';

const usePremises = (organisationId?: number) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [premises, setPremises] = useState<Premise[] | null>([]);

  useEffect(() => {
    if (organisationId) {
      setLoading(true)
      organisationProxyService
        .getPremises({ organisationId })
        .then(({ data }) => {
          setPremises(data);
          setLoading(false)
        })
        .catch(() => {
          setLoading(false)
        });
    }
  }, [organisationId]);

  return { premises, loading };
};

export default usePremises;
