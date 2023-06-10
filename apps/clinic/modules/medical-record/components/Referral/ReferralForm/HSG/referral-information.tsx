import { formatDate } from 'share-components/src/utils/formatUtils';
import type { Referral } from 'modules/medical-record/types/referral';
import { toTitleCase } from 'share-components/src/utils/stringUtils';
import MedicalSectionCard from 'modules/medical-record/components/common/medical-section-card';
import MedicalSectionCardItem from 'modules/medical-record/components/common/medical-section-card-item';
import MedicalSectionBox from '../../../common/medical-section-box';
import { getSpecificDataFromSummary } from './helpers';

interface ReferralFormValues {
  id?: number;
  type: 'aeucc' | 'gpFirst' | 'routine' | null;
  specialityService: number | null;
  referralInstitution: number | null;
  // Add more fields here
}

interface ReferralInformationPropsType {
  referral?: Referral;
  action?: 'add' | 'edit' | 'view';
  initData?: ReferralFormValues;
}

const ReferralInformationForm: React.FC<ReferralInformationPropsType> = ({ referral, action }) => (
  <MedicalSectionBox title="Referral Information">
    <MedicalSectionCard
      content={{
        components: [
          <MedicalSectionCardItem key="referralId" title="Referral ID" content={referral?.uuid || '-'} />,
          <MedicalSectionCardItem
            key="referralDate"
            title="Referral Date &amp; Time"
            content={formatDate(referral?.createdAt, "dd MMMM yyyy 'at' hh:mm a") || '-'}
          />,
          <MedicalSectionCardItem
            key="lastUpdatedDate"
            title="Last Updated Date &amp; Time"
            content={formatDate(referral?.updatedAt, "dd MMMM yyyy 'at' hh:mm a") || '-'}
          />,
        ],
        columns: 4,
      }}
    />
    {action !== 'edit' && (
      <MedicalSectionCard
        withBackground={false}
        content={{
          columns: 3,
          components: [
            <MedicalSectionCardItem
              key="fullName"
              title="Type of Referral"
              content={toTitleCase(referral?.referralType?.name || '')}
            />,
            <MedicalSectionCardItem key="mcr" title="Referred Institution" content={referral?.hsgInstitutionName} />,
            <MedicalSectionCardItem key="name" title="Speciality / Service" content={referral?.specialty} />,
            <MedicalSectionCardItem
              key="hci"
              title="Diagnosis"
              content={getSpecificDataFromSummary(referral?.summary || '', 'diagnosis')}
            />,
            <MedicalSectionCardItem key="contact" title="Reason for Referral" content={referral?.reason} />,
            <MedicalSectionCardItem
              key="email"
              title="Medical History"
              content={getSpecificDataFromSummary(referral?.summary || '', 'medicalHistory')}
            />,
            <MedicalSectionCardItem
              key="address"
              title="Drug Allergies"
              content={getSpecificDataFromSummary(referral?.summary || '', 'drugAllergies')}
            />,
          ],
        }}
      />
    )}
  </MedicalSectionBox>
);

export default ReferralInformationForm;
