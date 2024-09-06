import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { DatePickerProvider } from '@/context/DatePickerContext';
import RecurringDatePicker from '@/components/RecurringDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

const Home = () => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePickerProvider>
          <Container maxWidth="sm" sx={{ background: '#fff' }}>
            <Box mt={4} pt={4} pb={4}>
              <Typography variant='h4' color='#000'>Recurring Date Picker</Typography>
            </Box>
            <RecurringDatePicker />
          </Container>
        </DatePickerProvider>
      </LocalizationProvider>
    </>
  );
};

export default Home;
