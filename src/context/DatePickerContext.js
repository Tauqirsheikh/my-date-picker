import React, { createContext, useContext, useState } from 'react';

const DatePickerContext = createContext();

export const useDatePicker = () => useContext(DatePickerContext);

export const DatePickerProvider = ({ children }) => {
  const [recurrence, setRecurrence] = useState({
    type: 'daily',
    interval: 1,
    daysOfWeek: [],
    nthDayOfMonth: null,
    startDate: null,
    endDate: null,
  });

  return (
    <DatePickerContext.Provider value={{ recurrence, setRecurrence }}>
      {children}
    </DatePickerContext.Provider>
  );
};
