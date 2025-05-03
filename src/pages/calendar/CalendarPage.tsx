import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import dayjs, { Dayjs } from 'dayjs';
import { CssBaseline, Container, Paper, Typography, Box } from '@mui/material';

const App = () => {
    const [value, setValue] = React.useState<[Dayjs | null, Dayjs | null]>([
        dayjs(),
        dayjs().add(3, 'day'),
    ]);

    return (
        <>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Date Range Picker
                    </Typography>

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        my: 4,
                        '& .MuiDateRangeCalendar-root': {
                            border: '1px solid #e0e0e0',
                            borderRadius: '8px',
                            overflow: 'hidden',
                        },
                        '& .MuiPickersDay-root': {
                            borderRadius: '4px',
                            '&:hover': {
                                backgroundColor: '#e3f2fd',
                            },
                        },
                        '& .Mui-selected': {
                            backgroundColor: '#1976d2 !important',
                            color: 'white !important',
                        },
                        '& .MuiPickersArrowSwitcher-button': {
                            color: '#1976d2',
                        },
                    }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateRangeCalendar
                                value={value}
                                onChange={(newValue) => setValue(newValue)}
                                calendars={2}
                                minDate={dayjs().subtract(1, 'month')}
                                maxDate={dayjs().add(1, 'year')}
                            />
                        </LocalizationProvider>
                    </Box>

                    <Box sx={{
                        p: 2,
                        mt: 2,
                        backgroundColor: '#f5f5f5',
                        borderRadius: '4px',
                    }}>
                        <Typography variant="h6">Selected Range:</Typography>
                        <Typography>
                            {value[0]?.format('MMMM D, YYYY')} to {value[1]?.format('MMMM D, YYYY')}
                        </Typography>
                        <Typography sx={{ mt: 1 }}>
                            Duration: {value[1]?.diff(value[0], 'day') + 1} days
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </>
    );
};

export default App;