import React from "react";
import { Field } from 'redux-form';
import moment from 'moment';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
/*
DatePicker Element:
renders datepicker into a redux-form element
uses "moment" for time calculations

usage:

<Field
    name="q_5_start"
    component={datePicker}
    type="text"
    selected={moment(this.state.startDate)}
    onChange={this.handleChange.bind(this)}
    className="form-control"
/>

*/

const datePicker = ({ input, label, type, className, selected, meta: { touched, error } }) => (
      <div>
        <div>
          <DatePicker {...input}
            selected={moment(selected)} placeholder={label}
            type={type} className={className}
            dateFormat="MMMM Do YYYY"
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
          {touched && error && <span className="error_field">{error}</span>}
        </div>
      </div>
    )

export default datePicker;
