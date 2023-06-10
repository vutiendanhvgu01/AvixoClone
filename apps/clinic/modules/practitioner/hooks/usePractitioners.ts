import { useEffect, useState } from 'react';
import Practitioner from '../types/practitioner-types';
import practitionerProxyService from '../services/proxy';

const usePractitioners = (params: { premiseId?: number }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isFetched, setFetched] = useState<boolean>(false);
  const [practitioners, setPractitioners] = useState<Practitioner[]>([]);

  useEffect(() => {
    if (params.premiseId) {
      setLoading(true);
      practitionerProxyService
        .getPractitionersList({ premiseId: params.premiseId })
        .then(({ data }) => {
          setPractitioners(data);
          setLoading(false);
          setFetched(true);
        })
        .catch(() => {
          setLoading(false);
          setFetched(true);
        });
    }
  }, [params.premiseId]);

  return { practitioners, loading, isFetched };
};

export default usePractitioners;
