/* eslint-disable import/prefer-default-export */
const hasValue = (value: any): boolean =>
  !!(value && (typeof value === 'object' || typeof value === 'string' || typeof value === 'number' || value > 0));

/**
 *Description : Values is an Object includes object, string, number, array,
                - If field is an Array, then will require object in on this Array -> object continue require (number string object )
                - If field is an  Object, then will required (number, string, object).
 * 
 * 
 * example 
  values = {
    "addFromName": {
        "label": "Inventory",
        "value": "inventory"
    },
    "patient": {
        "label": "Patient 2",
        "value": 2
    },
    "inventory": {
        "drug": {
            "label": "Diclofenac Tablet 50mg",
            "value": "2",
            "raw": {
                "stockBalance": 200
            }
        },
        "drugGroup": "all",
        "stockBalance": 200
    },
    "steps": [
        {
            "routeOfAdministration": "1",
            "dosage": 2,
            "frequency": "1",
            "duration": 1,
            "total": 1,
            "instruction": "test",
            "indication": null
        }
    ]
}
requiredFields = [
  'patient',
  'addFromName',
  {
    field: 'inventory',
    required: ['drug', 'stockBalance'],
    type:'object'
  },
  {
    field: 'steps',
    required: ['routeOfAdministration', 'dosage', 'frequency', 'duration', 'total', 'instruction'],
    type:'arrayObject'
  },
]
 * @param values
 * @param requiredFields
 * @returns
 */
export const getProgressBarPrescription = (values: Record<string, any>, requiredFields: Array<any>) => {
  const percentOneField = 100 / Object.keys(values).length;
  let total = 0;
  requiredFields.forEach(requiredField => {
    // required a field have string, number...
    if (hasValue(values[requiredField]) && !requiredField.type) {
      total += percentOneField;
    }

    if (Array.isArray(requiredField.required) && requiredField.type && requiredField.field) {
      // required an object
      if (values[requiredField.field] && requiredField.type === 'object') {
        const percentOneFieldOfObject = percentOneField / requiredField.required.length;

        requiredField.required.forEach((requireKey: string) => {
          if (values[requiredField.field][requireKey]) {
            total += percentOneFieldOfObject;
          }
        });
      }

      // required an array object
      if (values[requiredField.field] && requiredField.type === 'arrayObject') {
        values[requiredField.field].forEach((value: Record<string, any>) => {
          if (value && typeof value === 'object') {
            Object.keys(value).forEach(v => {
              if (requiredField.required.includes(v) && hasValue(value[v])) {
                total += percentOneField / values[requiredField.field].length / requiredField.required.length;
              }
            });
          }
        });
      }
    }
  });

  return total;
};

export const getProgressBarPractitioner = (currentStep: string, steps: Array<string>) => {
  const positionCurrent = steps.findIndex(step => step === currentStep) + 1 || 0;
  return (positionCurrent / steps.length) * 100;
};
