import { LinearProgress, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Form, Formik, FormikProps } from 'formik';
import { FC, forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AvixoFixedContainer, DefaultFormProps } from 'share-components';
import { TABS } from '../constants';
import PremiseFormContact from './premise-form-contact';
import PremiseFormDetail from './premise-form-detail';
import PremiseFormFinance from './premise-form-finance';
import PremiseFormHoliday from './premise-form-holiday';
import PremiseFormSetting from './premise-form-setting';
import PremiseFormTimeslot from './premise-form-timeslot';
import getPremiseSchema from './premise-schema';
import Premise from './premise-types';

const MainForm = styled(Form)(() => ({
  height: '100%',
}));

type InnerFormProps = {
  formikProps: FormikProps<any>;
  onChangeTab: (tab: number) => void;
  isEdit?: boolean;
  tab?: number;
};

const InnerForm = forwardRef((props: InnerFormProps, ref: any) => {
  const { formikProps, isEdit = false, onChangeTab, tab } = props;
  const { touched, errors, handleBlur, handleChange, values, setFieldValue, handleSubmit } = formikProps;
  const [activeTab, setActiveTab] = useState<number>(TABS.DETAIL);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const getTitle = useCallback(() => {
    switch (activeTab) {
      case TABS.DETAIL:
        return isEdit ? 'Detail Information' : '1. Premise Details';
      case TABS.CONTACT:
        return isEdit ? 'Contact Information' : '2. Contact Information';
      case TABS.FINANCE:
        return isEdit ? 'Finance Information' : '3. Finance Information';
      case TABS.TIMEZONE:
        return isEdit ? 'Timezone' : '4. Timezone';
      case TABS.TIMESLOT:
        return isEdit ? 'Timeslot' : '5. Timeslot';
      case TABS.HOLIDAY:
        return isEdit ? 'Holiday' : '6. Holiday';
      default:
        return '';
    }
  }, [activeTab, isEdit]);

  useEffect(() => {
    if (tab) {
      setActiveTab(parseInt(String(tab), 10));
    }
  }, [tab]);

  useEffect(() => {
    onChangeTab(activeTab);
  }, [activeTab, onChangeTab]);

  return (
    <MainForm ref={ref} method="POST" noValidate onSubmit={handleSubmit}>
      <input type="text" hidden value={isEdit ? 'update-premise' : 'add-premise'} name="action" />
      {isEdit && <input type="text" hidden value={values.premiseID} name="premiseID" />}
      <input ref={inputRef} hidden name="premiseBody" value={JSON.stringify(values)} />
      <LinearProgress variant="determinate" value={(activeTab / Object.keys(TABS).length) * 100} />
      <Box sx={{ display: activeTab === TABS.DETAIL ? 'block' : 'none' }}>
        <PremiseFormDetail
          header={getTitle()}
          touched={touched}
          errors={errors}
          handleChange={handleChange}
          handleBlur={handleBlur}
          values={values}
          onNext={() => setActiveTab(TABS.CONTACT)}
          setFieldValue={setFieldValue}
          isEdit={isEdit}
        />
      </Box>
      <Box sx={{ display: activeTab === TABS.CONTACT ? 'block' : 'none' }}>
        <PremiseFormContact
          header={getTitle()}
          touched={touched}
          errors={errors}
          handleChange={handleChange}
          handleBlur={handleBlur}
          values={values}
          onBack={() => setActiveTab(TABS.DETAIL)}
          onNext={() => setActiveTab(TABS.FINANCE)}
          setFieldValue={setFieldValue}
          isEdit={isEdit}
        />
      </Box>
      <Box sx={{ display: activeTab === TABS.FINANCE ? 'block' : 'none' }}>
        <PremiseFormFinance
          header={getTitle()}
          touched={touched}
          errors={errors}
          handleChange={handleChange}
          handleBlur={handleBlur}
          values={values}
          onBack={() => setActiveTab(TABS.CONTACT)}
          onNext={() => setActiveTab(TABS.TIMEZONE)}
          setFieldValue={setFieldValue}
          isEdit={isEdit}
        />
      </Box>
      <Box sx={{ display: activeTab === TABS.TIMEZONE ? 'block' : 'none' }}>
        <PremiseFormSetting
          header={getTitle()}
          touched={touched}
          errors={errors}
          handleChange={handleChange}
          handleBlur={handleBlur}
          values={values}
          onNext={() => setActiveTab(TABS.TIMESLOT)}
          onBack={() => setActiveTab(TABS.FINANCE)}
          setFieldValue={setFieldValue}
          isEdit={isEdit}
        />
      </Box>
      <Box sx={{ display: activeTab === TABS.TIMESLOT ? 'block' : 'none' }}>
        <PremiseFormTimeslot
          header={getTitle()}
          touched={touched}
          errors={errors}
          handleChange={handleChange}
          handleBlur={handleBlur}
          values={values}
          onNext={() => setActiveTab(TABS.HOLIDAY)}
          onBack={() => setActiveTab(TABS.TIMEZONE)}
          setFieldValue={setFieldValue}
          isEdit={isEdit}
        />
      </Box>
      <Box sx={{ display: activeTab === TABS.HOLIDAY ? 'block' : 'none' }}>
        <PremiseFormHoliday
          header={getTitle()}
          touched={touched}
          errors={errors}
          handleChange={handleChange}
          handleBlur={handleBlur}
          values={values}
          onBack={() => setActiveTab(TABS.TIMESLOT)}
          setFieldValue={setFieldValue}
          isEdit={isEdit}
        />
      </Box>
    </MainForm>
  );
});

InnerForm.displayName = 'InnerForm';

interface PremiseFormProps extends DefaultFormProps {
  initData?: Premise;
  tab?: number;
}

const PremiseForm: FC<PremiseFormProps> = ({ initData, open, tab, onCancel }) => {
  const from = useRef<HTMLFormElement>();
  const [currentTab, setCurrentTab] = useState<number>(TABS.DETAIL);

  const initialValues = useMemo(
    () => ({
      name: '',
      typeCode: '',
      companyName: '',
      companyRegNo: '',
      hciCode: '',
      currency: '',
      taxRate: '',
      timezone: '',
      emails: [
        {
          email: '',
        },
      ],
      phones: [
        {
          number: '',
          countryCode: '',
        },
      ],
      addresses: [
        {
          postal: '',
          line1: '',
          line2: '',
          unitNo: '',
          city: '',
          country: '',
        },
      ],
      timeslot: {
        dayOfWeek: 'Sun',
        slotType: 'operating',
        fromTime: '2022-04-17T15:30',
        toTime: '2022-04-17T16:30',
      },
      ...initData,
    }),
    [initData],
  );

  const handleChangeTab = (value: number) => {
    setCurrentTab(value);
  };

  return (
    <AvixoFixedContainer title={initData ? 'Edit Premise' : 'Add New Premise'} display={open} onClose={onCancel}>
      <Formik
        validationSchema={getPremiseSchema(currentTab)}
        onSubmit={(_, { setSubmitting }) => {
          from.current?.submit();
          setSubmitting(false);
        }}
        initialValues={initialValues}
      >
        {formikProps => (
          <InnerForm formikProps={formikProps} isEdit={!!initData} tab={tab} ref={from} onChangeTab={handleChangeTab} />
        )}
      </Formik>
    </AvixoFixedContainer>
  );
};

export default PremiseForm;
