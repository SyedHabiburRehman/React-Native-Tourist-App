import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';
import { View } from 'react-native';


const DatePicking = ({ onDateChange, date, mode, placeholder, format, minDate, customStyles }) => {
    const { pickerStyle } = styles;
    return (
        <View>
            <DatePicker
                onDateChange={onDateChange}
                style={pickerStyle}
                date={date}
                mode={mode}
                placeholder={placeholder}
                format={format}
                minDate={minDate}
                /* maxDate="2016-06-01" */
                customStyles={customStyles}
            />
        </View>
    )
};

const styles = {
    pickerStyle: {
        width: 200,
    }
}

export { DatePicking };