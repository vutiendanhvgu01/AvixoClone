import { Autocomplete, AutocompleteRenderInputParams, CircularProgress, TextField } from '@mui/material';
import useDrugNames from 'modules/allergy/hooks/useDrugNames';
import { useState } from 'react';
import { debounce } from '@mui/material/utils';
import { MINIMUM_CHARACTERS, NO_RESULTS_MSG, INPUT_PLACEHOLDER } from 'common/constants/autocomplete';

interface DrugNameAutocompleteProps {
  name?: string;
  onChange?: (val: string | number | null) => void;
  defaultValue?: { label: string; value: string | number };
  error?: string | false; // Error MSG
}

const DrugNameAutocomplete: React.FC<DrugNameAutocompleteProps> = ({ error, onChange, defaultValue, name }) => {
  const [search, setSearch] = useState<string>('');
  const [value, setValue] = useState<string | number | null>(defaultValue?.value || '');
  const { drugNames, loading } = useDrugNames(search);

  const onInputChange = debounce((_event, newInputValue) => setSearch(newInputValue), 400);

  return (
    <>
      <Autocomplete
        key={defaultValue?.value}
        autoComplete
        disableClearable
        defaultValue={defaultValue}
        loading={loading}
        renderInput={(params: AutocompleteRenderInputParams) => (
          <TextField
            {...params}
            required
            label="Drug Name"
            error={!!error}
            helperText={error}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        noOptionsText={search.length < MINIMUM_CHARACTERS ? INPUT_PLACEHOLDER : NO_RESULTS_MSG}
        onInputChange={onInputChange}
        onChange={(_event, option) => {
          setValue(option?.value);
          if (onChange) {
            onChange(value);
          }
        }}
        options={search.length < 2 ? [] : drugNames.map(item => ({ label: item.description, value: item.description }))}
      />
      {name && <input type="hidden" name={name} value={value ?? ''} />}
    </>
  );
};

export default DrugNameAutocomplete;
