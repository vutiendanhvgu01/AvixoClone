import DispensesListTab from 'modules/dispense/components/DispenseList/dispense-list-tab';
import DispenseApiService from 'modules/dispense/services';
import { Dispense } from 'modules/dispense/types/dispense';
import PatientApiService from 'modules/patient/services';
import { handle } from 'next-runtime';
import { FC } from 'react';
import { AvixoListLayout, AvixoTabData, AvixoTabs, PageProps, getAlertMessage } from 'share-components';

interface DispensePageProps extends PageProps {
  dispenses: Dispense[];
}

const Tabs = (dispenses: Dispense[]): AvixoTabData[] => [
  {
    label: 'All Dispenses',
    component: <DispensesListTab dispenses={dispenses} />,
  },
];

const DispensePage: FC<DispensePageProps> = ({ dispenses }) => (
  <AvixoListLayout title="Dispenses List">
    <AvixoTabs tabsData={Tabs(dispenses)} />
  </AvixoListLayout>
);

export const getServerSideProps = handle({
  async get(ctx) {
    const { message, titleMessage, offset, limit } = ctx.query;
    const dispenseService = new DispenseApiService({}, ctx);
    const { data } = await dispenseService.getDispenseList({
      offset,
      limit,
    });
    let dispenses = data;

    if (dispenses.length > 0) {
      const patientService = new PatientApiService({}, ctx);
      const patientIds = [...new Set(dispenses.map((dispense: Dispense) => dispense.patientId))];
      const patientsData = await Promise.all(
        patientIds.map(patientId => patientService.getPatientDetails(patientId?.toString() || '', 'id').catch(e => e)),
      );
      const patientMap = new Map();
      patientsData
        .filter(item => !(item instanceof Error))
        .forEach(patientData => {
          const patient = patientData?.data;
          patientMap.set(patient.id, patient);
        });
      dispenses.forEach((dispense: Dispense, index: number) => {
        dispenses[index].patient = patientMap.get(dispense.patientId);
      });
      dispenses = dispenses.filter((dispense: Dispense) => dispense.patient);
    }

    return {
      props: {
        ...getAlertMessage(message as string, titleMessage as string),
        dispenses,
      },
    };
  },
});

export default DispensePage;
