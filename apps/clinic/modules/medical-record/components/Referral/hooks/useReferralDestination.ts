import uniqBy from 'lodash/uniqBy';
import mapValues from 'lodash/mapValues';
import groupBy from 'lodash/groupBy';
import referralProxyService from 'modules/medical-record/services/referral/proxy';
import { useEffect, useState } from 'react';

const useReferralDestination = () => {
  const [referralDestination, setReferralDestination] = useState<{
    referralTypes: { id: number; name: string }[];
    referralInstitutions: {
      [key: number]: {
        institutionCode: string;
        institutionHciCode: string;
        institutionName: string;
        hsgOutboundEmail: boolean;
      }[];
    };
    institutionSpecialties: {
      [key: string]: {
        specialty: string;
        specialtyCode: string;
      }[];
    };
  }>({
    referralTypes: [],
    referralInstitutions: {},
    institutionSpecialties: {},
  });

  useEffect(() => {
    referralProxyService
      .getReferralDestination()
      .then(({ data }) => {
        const referralTypes = uniqBy(data, 'referralTypeId').map(it => ({
          id: it.referralTypeId,
          name: it.referralTypeName || it.referralTypeId.toString(),
        }));

        const referralInstitutions = mapValues(groupBy(uniqBy(data, 'institutionName'), 'referralTypeId'), clist =>
          clist.map(institution => ({
            institutionCode: institution.institutionCode,
            institutionHciCode: institution.institutionHciCode,
            institutionName: institution.institutionName,
            hsgOutboundEmail: institution.hsgOutboundEmail,
          })),
        );

        const institutionSpecialties = mapValues(groupBy(uniqBy(data, 'institutionName'), 'institutionCode'), clist =>
          clist.map(institution => ({
            specialty: institution.specialty,
            specialtyCode: institution.specialtyCode,
          })),
        );

        setReferralDestination({
          referralTypes,
          referralInstitutions,
          institutionSpecialties,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return { ...referralDestination };
};

export default useReferralDestination;
