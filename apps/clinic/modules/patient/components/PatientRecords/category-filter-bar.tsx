import { FC, useState, useCallback } from 'react';
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CategoryFilterType from './patient-record-types';

const CATEGORIES: CategoryFilterType[] = [
  {
    value: '0',
    title: 'Medical Notes',
  },
  {
    value: '1',
    title: 'Annotates',
  },
  {
    value: '2',
    title: 'Upload',
  },
  {
    value: '3',
    title: 'Email',
  },
];

const CategoriesMenuItem = styled(MenuItem)(({ theme }) => ({
  '&.Mui-selected': {
    backgroundColor: '#FFF',
    ':hover': {
      backgroundColor: '#FAFAFA',
    },
  },
  ':first-child': {
    borderBottom: `1px solid ${theme.palette.divider}`,
    '& .MuiTypography-body1': {
      ...theme.typography.overline,
      color: theme.palette.black.main,
    },
  },
  '&.MuiMenuItem-root .MuiTypography-body1 + .MuiTypography-body1': {
    fontWeight: 400,
    lineHeight: '24px',
    color: theme.palette.black.main,
  },
}));

const CategoryFilterBar: FC = () => {
  const [selectedCategoryFilters, setSelectedCategoryFilters] = useState<string[]>(
    CATEGORIES.map((category: CategoryFilterType) => category.value),
  );
  const isSelectAllCategory = selectedCategoryFilters.length === CATEGORIES.length;

  const handleSelectChange = useCallback((event: SelectChangeEvent<typeof selectedCategoryFilters>) => {
    const {
      target: { value },
    } = event;
    setSelectedCategoryFilters(typeof value === 'string' ? value.split(',') : value);
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selectedCategoryFilters.length > 0) {
      setSelectedCategoryFilters([]);
    } else {
      setSelectedCategoryFilters(CATEGORIES.map((category: CategoryFilterType) => category.value));
    }
  }, [selectedCategoryFilters]);

  return (
    <FormControl fullWidth sx={{ mb: '0 !important' }}>
      <InputLabel id="patient-record-category-filter-bar">Category Filter</InputLabel>
      <Select
        labelId="patient-record-category-filter-bar"
        multiple
        value={selectedCategoryFilters}
        input={<OutlinedInput label="Category Filter" />}
        onChange={handleSelectChange}
        renderValue={selected =>
          isSelectAllCategory ? 'Show All' : selected.map(value => CATEGORIES[parseInt(value, 10)]?.title).join(', ')
        }
      >
        <CategoriesMenuItem key="category-filter-select-all" onClick={handleSelectAll}>
          <Checkbox checked={isSelectAllCategory} />
          <ListItemText primary="Select All Category" />
        </CategoriesMenuItem>
        {CATEGORIES.map((category: CategoryFilterType) => (
          <CategoriesMenuItem key={category.value} value={category.value}>
            <Checkbox checked={selectedCategoryFilters.indexOf(category.value) > -1} />
            <ListItemText primary={category.title} />
          </CategoriesMenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategoryFilterBar;
