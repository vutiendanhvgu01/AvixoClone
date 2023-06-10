import { Autocomplete, AutocompleteRenderInputParams, CircularProgress, TextField } from '@mui/material';
import useDrugBrands from 'modules/allergy/hooks/useDrugBrands';
import { useState } from 'react';
import { debounce } from '@mui/material/utils';
import { MINIMUM_CHARACTERS, NO_RESULTS_MSG, INPUT_PLACEHOLDER } from 'common/constants/autocomplete';

interface DrugBrandAutocompleteProps {
  name?: string;
  onChange?: (val: string | number | null) => void;
  defaultValue?: { label: string; value: string | number };
  error?: string | false; // Error MSG
}

const DrugBrandAutocomplete: React.FC<DrugBrandAutocompleteProps> = ({ name, onChange, error, defaultValue }) => {
  const [search, setSearch] = useState<string>('');
  const [value, setValue] = useState<string | number | null>(defaultValue?.value || '');
  const { drugBrands, loading } = useDrugBrands(search);

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
            label="Brand Name"
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
            onChange(option?.value);
          }
        }}
        options={
          search.length < MINIMUM_CHARACTERS
            ? []
            : drugBrands.map(item => ({ label: item.description, value: item.description }))
        }
      />
      {name && <input type="hidden" name={name} value={value ?? ''} />}
    </>
  );
};

export default DrugBrandAutocomplete;
