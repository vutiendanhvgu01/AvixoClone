import { Checkbox, FormControl, FormControlLabel, FormGroup, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { InvoiceItem } from 'modules/invoice/types/invoice';
import { SyntheticEvent, useState } from 'react';

interface IssuedItemProps {
  item: InvoiceItem;
}

const IssuedItem: React.FC<IssuedItemProps> = ({ item }) => {
  const [selected, setSelected] = useState<boolean>(false);

  const onItemChange = (_e: SyntheticEvent<Element, Event>, checked: boolean) => {
    setSelected(checked);
  };

  return (
    <FormGroup>
      <FormControlLabel onChange={onItemChange} control={<Checkbox />} label={item.name} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, pl: 3.75 }}>
        <Typography variant="body1" color="neutral.500" fontWeight={400}>
          Qty issued: {item.quantity} tab/s
        </Typography>
        <Typography variant="body1" color="neutral.500" fontWeight={400}>
          Total: {item.lineTotal?.currency}
          {item.lineTotal?.amount}
        </Typography>
      </Box>
      {selected && (
        <Grid container spacing={3} sx={{ pl: 3.75 }}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField label="Quantity" required />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField label="Price" required />
            </FormControl>
          </Grid>
        </Grid>
      )}
    </FormGroup>
  );
};

export default IssuedItem;
