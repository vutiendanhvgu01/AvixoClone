import VitalForm from 'modules/vitals/components/vital-form';
import { useRouter } from 'next/navigation';
import { ROUTES } from 'share-components/src/constants';
import BasicWrapper from 'common/components/basic-wrapper';
import { VitalFormValues } from 'modules/vitals/components/vital-form-schema';

const VitalPage = () => {
  const router = useRouter();

  const onSubmit = async (values: VitalFormValues) => {
    try {
      const response = await fetch('/api/report', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.status === 200) router.push(ROUTES.REPORT_VITAL_SUCCESS);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BasicWrapper>
      <VitalForm formTitle="Hi Patient" onSubmit={onSubmit} />
    </BasicWrapper>
  );
};

export default VitalPage;
