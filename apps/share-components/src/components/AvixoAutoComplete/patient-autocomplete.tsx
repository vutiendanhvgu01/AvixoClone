import { FC } from 'react';
import AvixoAutoComplete, { AvixoAutoCompleteProps } from './avixo-autocomplete';

interface AvixoPatientAutoCompleteApi extends AvixoAutoCompleteProps {
  baseUrl: string;
}

const AvixoPatientAutoCompleteApi: FC<AvixoPatientAutoCompleteApi> = ({
  baseUrl,
  url = 'api/patient/list',
  ...props
}) => (
  <AvixoAutoComplete
    url={`${baseUrl}/${url}`}
    fullWidth
    loading
    getOptionLabel={option => option && option?.fullName}
    {...props}
  />
);

export default AvixoPatientAutoCompleteApi;
