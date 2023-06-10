import { Autocomplete, AutocompleteProps, CircularProgress, TextField } from '@mui/material';
import React, { FC } from 'react';
import AutoCompleteApiService from './serrvice';

export interface AvixoAutoCompleteProps extends Partial<AutocompleteProps<any, boolean, any, any>> {
  url?: string;
  params?: Record<string, any>;
}

const AvixoAutoComplete: FC<AvixoAutoCompleteProps> = ({ url, options, params, loading = false, ...props }) => {
  const [data, setData] = React.useState<Record<string, any>[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(loading);
  const autoCompleteApiService = new AutoCompleteApiService();
  const fetchData = React.useCallback(async () => {
    if (url) {
      try {
        setIsLoading(true);
        const { data: response } = await autoCompleteApiService.getData(url, {
          params,
        });

        setData(response);
      } catch (error) {
        console.log({ error });
      } finally {
        setIsLoading(false);
      }
    }
  }, [url, params]);

  React.useEffect(() => {
    if (!options) {
      fetchData();
    }
  }, [fetchData, options]);

  return (
    <Autocomplete
      fullWidth
      options={options ?? data}
      loading
      renderInput={textFieldProps => (
        <TextField
          {...textFieldProps}
          required
          InputProps={{
            ...textFieldProps.InputProps,
            endAdornment: (
              <>
                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                {textFieldProps.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      {...props}
    />
  );
};

export default AvixoAutoComplete;
