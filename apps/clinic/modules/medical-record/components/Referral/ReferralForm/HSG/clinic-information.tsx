import React from 'react';
import { useClinicContext } from 'contexts/clinic-context';
import { getAddress, getEmail, getPhoneNumber } from '@AvixoUtils/dataUtils';
import usePremiseDetails from 'modules/organisation/hooks/usePremiseDetails';
import MedicalSectionCardItem from 'modules/medical-record/components/common/medical-section-card-item';
import MedicalSectionBox from 'modules/medical-record/components/common/medical-section-box';
import MedicalSectionCard from 'modules/medical-record/components/common/medical-section-card';

const ClinicInformation: React.FC = () => {
  const { practitioner } = useClinicContext();
  const { premise } = usePremiseDetails(practitioner?.practitionerPremises[0]?.premiseId);

  return (
    <MedicalSectionBox title="Clinic Information">
      <MedicalSectionCard
        content={{
          components: [
            <MedicalSectionCardItem key="fullName" title="Full Name" content={practitioner?.name} />,
            <MedicalSectionCardItem key="mcr" title="MCR" content={practitioner?.qualifications[0]?.code} />,
            <MedicalSectionCardItem key="name" title="Clinic Name" content={premise?.name} />,
            <MedicalSectionCardItem key="hci" title="HCI" content={premise?.hciCode} />,
            <MedicalSectionCardItem
              key="contact"
              title="Clinic Contact No."
              content={getPhoneNumber(premise?.phones) || '-'}
            />,
            <MedicalSectionCardItem key="email" title="Clinic Email" content={getEmail(premise?.emails) || '-'} />,
            <MedicalSectionCardItem
              key="address"
              title="Clinic Address"
              content={getAddress(premise?.addresses) || '-'}
            />,
            <MedicalSectionCardItem key="type" title="Clinic Type" content="-" />,
          ],
        }}
      />
    </MedicalSectionBox>
  );
};

export default ClinicInformation;
