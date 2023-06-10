import React, { FC } from 'react';
import { AvixoCard, AvixoCardNoResult } from 'share-components';
import AllergyIcon from 'share-components/src/components/AvixoIcons/allergy-icon';
import Link from 'next/link';
import { PAGE_URLS } from 'share-components/src/constants';
import { useRouter } from 'next/router';
import { Allergy } from './allergy-types';
import AllergyItem from './allergy-item';

interface PatientAllergiesProps {
  patientAllergies: Allergy[];
}

const PatientAllergies: FC<PatientAllergiesProps> = ({ patientAllergies }) => {
  const router = useRouter();
  const patientUUID = router.query.patientUUID?.toString() || '';

  return (
    <AvixoCard
      icon={<AllergyIcon htmlColor="#000" viewBox="0 0 20 20" />}
      title="Allergy"
      fullHeight
      onClick={() => router.push(PAGE_URLS.PATIENT_ALLERGY(patientUUID))}
      sx={{ cursor: 'pointer' }}
    >
      {patientAllergies.length > 0 ? (
        patientAllergies.map((allergy: Allergy, idx: number) => (
          <AllergyItem
            key={`allergy-${allergy.id}`}
            allergy={allergy}
            showBorderBottom={idx !== patientAllergies.length - 1}
          />
        ))
      ) : (
        <AvixoCardNoResult
          title="No Allergy Recorded"
          message={
            <>
              Click to{' '}
              <Link href={`${PAGE_URLS.PATIENT_DASHBOARD(patientUUID)}?action=add-allergy`}>add new Allergy</Link>
            </>
          }
        />
      )}
    </AvixoCard>
  );
};

export default PatientAllergies;
