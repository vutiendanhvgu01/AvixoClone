import * as React from 'react';
import { AvixoTabs } from 'share-components';
import { Item } from 'modules/prescription/types/item';
import type { Dispense } from 'modules/dispense/types/dispense';
import type { Patient } from 'modules/patient/types/patient';
import PrescriptionMedicationsTable from './prescription-medications-table';

interface DispenseDetailsTabsProps {
  prescriptions: Item[];
  dispense: Dispense;
  patient: Patient;
}

const DispenseDetailsTabs: React.FC<DispenseDetailsTabsProps> = props => (
  <AvixoTabs
    tabsData={[
      {
        label: 'List of Prescription Medications',
        component: <PrescriptionMedicationsTable {...props} />,
      },
      {
        label: 'Deleted Item(s)',
        component: (
          <PrescriptionMedicationsTable {...props} prescriptions={[]} emptyText="No Prescription have been deleted." />
        ),
      },
    ]}
  />
);

export default DispenseDetailsTabs;
