import { Box, Button, Divider, FormControl, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { AvixoImageAnnotate } from 'share-components';

const Annotate = () => (
  <Stack spacing={2} mb={3}>
    <Typography variant="overline">ANNOTATION</Typography>
    <FormControl>
      <TextField select name="template" label="Select Label" required>
        <MenuItem value="">Template Annotate 1</MenuItem>
        <MenuItem value="">Template Annotate 1</MenuItem>
      </TextField>
    </FormControl>
    <AvixoImageAnnotate imgUrl="https://sb.kaleidousercontent.com/67418/658x756/361846cee7/all-pages-2.png" />
    <FormControl fullWidth>
      <TextField name="description" label="descriptions" multiline rows={4} />
    </FormControl>
    <Grid item xs={12}>
      <Box
        sx={{
          textAlign: 'right',
        }}
      >
        <Button
          size="medium"
          color="primary"
          variant="text"
          sx={{
            ml: 2,
            color: 'neutral.500',
            '&:hover': {
              backgroundColor: 'neutral.100',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          size="medium"
          sx={{
            ml: 2,
            color: 'neutral.500',
            boxShadow: 'none',
            backgroundColor: 'neutral.100',
            '&:hover': {
              backgroundColor: 'neutral.200',
            },
          }}
        >
          Save to draft
        </Button>
        <Button size="medium" color="primary" type="submit" sx={{ ml: 2 }}>
          Save
        </Button>
      </Box>
    </Grid>
    <Divider />
  </Stack>
);

export default Annotate;
