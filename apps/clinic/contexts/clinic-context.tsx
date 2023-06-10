import { Organisation } from 'modules/organisation/types/organisation-types';
import { Patient } from 'modules/patient/types/patient';
import type Practitioner from 'modules/practitioner/types/practitioner-types';
import { createContext, ReactNode, useContext, useMemo } from 'react';

export const defaultClinicContext = {
  organisations: [],
  practitioners: [],
  permissions: [],
  practitioner: null,
  organisation: null,
  patient: null,
};

type ClinicContextType = {
  organisations: Organisation[] | null;
  practitioners: Practitioner[] | null;
  permissions: string[];
  practitioner: Practitioner | null;
  organisation: Organisation | null;
  patient: Patient | null;
};

export const ClinicContext = createContext<ClinicContextType>(defaultClinicContext);

export const useClinicContext = () => useContext(ClinicContext);

interface ClinicProviderProps {
  children: ReactNode;
  initData: {
    organisations: Organisation[];
    practitioners: Practitioner[];
    permissions: string[];
    patient: Patient | null;
  };
}

export const ClinicProvider = ({ children, initData }: ClinicProviderProps) => {
  const value = useMemo(
    () => ({
      organisations: initData.organisations,
      practitioners: initData.practitioners,
      permissions: initData.permissions,
      practitioner: initData.practitioners[0], // TODO: Handle Selected practitioner
      organisation: initData.organisations[0], // TODO: Handle Selected organisation
      patient: initData.patient,
    }),
    [initData],
  );

  return <ClinicContext.Provider value={value}>{children}</ClinicContext.Provider>;
};
