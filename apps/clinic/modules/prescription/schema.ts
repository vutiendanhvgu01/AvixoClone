import * as Yup from 'yup';

export const StepsSchema = {
  dose: Yup.number().min(1, 'Must be more than 1 characters'),
  timingFrequency: Yup.string().required('Frequency From Empty'),
  duration: Yup.number().min(1, 'Must be more than 1 characters'),
  // don't remove
  // total: Yup.number().min(1, 'Must be more than 1 characters'),
  text: Yup.string().required('Instruction Group From Empty'),
  additional: Yup.string().nullable(),
};

export const AddPrescriptionSchema = Yup.object().shape({
  patientId: Yup.number().required('Patient Empty'),
  addFromName: Yup.string().required('Add From Empty'),
  inventory: Yup.object()
    .shape({
      name: Yup.string().required('Drug Empty'),
      quantity: Yup.number().required('Stock Balance Group From Empty'),
      dose: Yup.string().required('Variable Dose From Empty'),
    })
    .required('inventory From Empty'),
  instructions: Yup.lazy(value => {
    if (value && value.length > 0) {
      return Yup.array().of(
        Yup.object().shape({
          ...StepsSchema,
          startDate: Yup.date(),
          endDate: Yup.date().when('startDate', (startDate, schema) => {
            if (startDate) {
              return schema.min(startDate, 'End date has to be after start date');
            }
            return schema;
          }),
        }),
      );
    }
    return Yup.array().of(
      Yup.object().shape({
        ...StepsSchema,
      }),
    );
  }),
});

export const AddMedicationSchema = Yup.object().shape({
  addFromName: Yup.object().required('Add From Empty'),
  inventory: Yup.object()
    .shape({
      drug: Yup.object().required('Drug Empty'),
      stockBalance: Yup.number().required('Stock Balance Group From Empty'),
    })
    .required('inventory From Empty'),
  clinicPrice: Yup.number().required('Drug Empty'),
  discount: Yup.string().required('Discount Empty'),
  steps: Yup.lazy(value => {
    if (value && value.length > 0) {
      return Yup.array().of(
        Yup.object().shape({
          ...StepsSchema,
          startDate: Yup.date(),
          endDate: Yup.date().when('startDate', (startDate, schema) => {
            if (startDate) {
              return schema.min(startDate, 'End date has to be after start date');
            }
            return schema;
          }),
        }),
      );
    }
    return Yup.array().of(
      Yup.object().shape({
        ...StepsSchema,
      }),
    );
  }),
});
