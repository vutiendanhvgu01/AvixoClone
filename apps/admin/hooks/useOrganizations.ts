import { useEffect, useState } from 'react';
import type { Organisation } from 'modules/organisation/components/organisation-types';
import organisationProxyService from 'modules/organisation/services/proxy';

const useOrganizations = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [organisations, setOrganisations] = useState<Organisation[]>([]);

  useEffect(() => {
    setLoading(true)
    organisationProxyService
      .getOrganizations()
      .then(({ data }) => {
        setOrganisations(data);
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      });
  }, []);

  return { organisations, loading };
};

export default useOrganizations;
