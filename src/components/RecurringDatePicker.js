import React, { useState } from 'react';
import { useDatePicker } from '../context/DatePickerContext';
import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format, addDays, addWeeks, addMonths, addYears } from 'date-fns';

const RecurringDatePicker = () => {
    const { recurrence, setRecurrence } = useDatePicker();
    const [previewDates, setPreviewDates] = useState([]);
    const [previewRecurrenceType, setpreviewRecurrenceType] = useState(null);

    const handleRecurrenceChange = (e) => {
        const { name, value } = e.target;
        setRecurrence({ ...recurrence, [name]: value });
    };

    const handleDateChange = (key, date) => {
        setRecurrence({ ...recurrence, [key]: date });
    };

    // Logic to generate preview dates based on recurrence
    const generatePreview = () => {
        if (!recurrence.startDate) return;

        let currentDate = new Date(recurrence.startDate);
        const dates = [];

        while (dates.length < 10 && (!recurrence.endDate || currentDate <= new Date(recurrence.endDate))) {
            dates.push(format(currentDate, 'MM-dd-yyyy')); // Format date

            // Determine next date based on recurrence type and interval
            switch (recurrence.type) {
                case 'daily':
                    currentDate = addDays(currentDate, recurrence.interval || 1);
                    break;
                case 'weekly':
                    currentDate = addWeeks(currentDate, recurrence.interval || 1);
                    break;
                case 'monthly':
                    currentDate = addMonths(currentDate, recurrence.interval || 1);
                    break;
                case 'yearly':
                    currentDate = addYears(currentDate, recurrence.interval || 1);
                    break;
                default:
                    break;
            }
        }

        setPreviewDates(dates);
        setpreviewRecurrenceType(recurrence.type);
    };

    console.log(generatePreview, "generatePreview")

    return (
        <Box>
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="recurrence-type-label">Recurrence Type</InputLabel>
                <Select
                    labelId="recurrence-type-label"
                    value={recurrence.type}
                    name="type"
                    label="Recurrence Type"
                    onChange={handleRecurrenceChange}
                >
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                    <MenuItem value="yearly">Yearly</MenuItem>
                </Select>
            </FormControl>

            <TextField
                label="Interval"
                type="number"
                name="interval"
                value={recurrence.interval}
                onChange={handleRecurrenceChange}
                sx={{ mb: 2 }}
                fullWidth
            />

            <DatePicker
                label="Start Date"
                value={recurrence.startDate}
                onChange={(newValue) => handleDateChange('startDate', newValue)}
                renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 2 }} />}
            />

            <DatePicker
                label="End Date"
                value={recurrence.endDate}
                minDate={recurrence.startDate} // Prevent selecting a date earlier than start date
                onChange={(newValue) => handleDateChange('endDate', newValue)}
                renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 2 }} />}
            />

            <Button sx={{ mt: 2, mb: 2 }} variant="contained" onClick={generatePreview}>
                Generate Preview
            </Button>

            {/* Display preview dates */}
            {previewDates.length > 0 && (
                <Box mt={2}>
                    {/* Display Recurrence Type */}
                    <Typography color='#000' variant="h6">
                        Recurrence Type: {previewRecurrenceType?.charAt(0).toUpperCase() + previewRecurrenceType?.slice(1)}
                    </Typography>

                    {/* Display Preview Dates */}
                    <Typography color='#000' variant="h6" mt={2}>
                        Preview Dates:
                    </Typography>
                    <ul>
                        {previewDates.map((date, index) => (
                            <li key={index} style={{ color: '#000' }}>{date}</li>
                        ))}
                    </ul>
                </Box>
            )}
        </Box>
    );
};

export default RecurringDatePicker;
