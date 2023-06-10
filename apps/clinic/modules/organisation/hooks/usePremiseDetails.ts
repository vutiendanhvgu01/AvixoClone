import { useEffect, useState } from 'react';
import Premise from '../types/premise-types';
import organisationProxyService from '../services/proxy';

const usePremiseDetails = (premiseId?: number) => {
  const [premise, setPremise] = useState<Premise | null>(null);

  useEffect(() => {
    if (premiseId) {
      organisationProxyService
        .getPremiseDetails(premiseId)
        .then(({ data }) => {
          setPremise(data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [premiseId]);

  return { premise };
};

export default usePremiseDetails;
