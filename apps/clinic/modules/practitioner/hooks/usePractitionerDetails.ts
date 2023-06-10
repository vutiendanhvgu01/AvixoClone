import { useEffect, useState } from 'react';
import Practitioner from '../types/practitioner-types';
import practitionerProxyService from '../services/proxy';

const usePractitionerDetails = (id?: number | null) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [practitioner, setPractitioner] = useState<Practitioner | null>(null);

  useEffect(() => {
    if (id) {
      setLoading(false);
      practitionerProxyService
        .getPractitionersDetails(id)
        .then(({ data }) => {
          setPractitioner(data);
          setLoading(true);
        })
        .catch(() => {
          setLoading(true);
        });
    } else {
      setLoading(true);
    }
  }, [id]);

  return { practitioner, loading };
};

export default usePractitionerDetails;
