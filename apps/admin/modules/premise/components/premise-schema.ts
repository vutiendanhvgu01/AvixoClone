import * as Yup from 'yup';
import { TABS } from '../constants';

const getPremiseSchema = (tab: number) => {
  switch (tab) {
    case TABS.DETAIL:
      return Yup.object().shape({
        name: Yup.string().required('Required'),
        typeCode: Yup.string().required('Required'),
        companyRegNo: Yup.string().required('Required'),
        companyName: Yup.string().required('Required'),
        hciCode: Yup.string().required('Required'),
        description: Yup.string(),
      });
    case TABS.TIMEZONE:
      return Yup.object().shape({
        currency: Yup.number().required('Required').min(0),
        taxRate: Yup.number().required('Required'),
        timezone: Yup.string().required('Required'),
      });
    default:
      return Yup.object().shape({});
  }
};

export default getPremiseSchema;
