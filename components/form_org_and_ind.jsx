import React from "react";
import { Field, FormSection, FieldArray } from 'redux-form';
import Address from "./form_address.jsx";

/*
Repeatable fields for organisation and individuals
*/

// individual field and label
const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)


// initial organisation fields
const FieldArraysForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <FormSection name="q_12"> 
      <Field
        name="org_name"
        type="text"
        component={renderField}
        label="Organisation Name"
      />
      <Field
        name="org_number"
        type="text"
        component={renderField}
        label="Contact Number"
      />
      <Field
        name="org_email"
        type="email"
        component={renderField}
        label="Email Address"
      />
      <FormSection name="organisation_address">
    	  <Address />
      </FormSection>
      <FieldArray name="individuals" component={renderIndividuals} />
    </FormSection>  
  )
}


// subfields for individuaLs
const renderIndividuals = ({ fields, meta: { error, submitFailed } }) => (
	<React.Fragment>
      {submitFailed && error && <span>{error}</span>}
	    {fields.map((member, index) => (
	      <div className="card" key={index}>
	        
	        <div className="card-divider clearfix">Individual No. {index + 1} &emsp;<a className="button hollow float-right"
	          type="button"
	          onClick={() => fields.remove(index)}
	        >Remove Individual</a></div>
	        <div className="card-section">
		        <Field
		          name={`${member}.firstName`}
		          type="text"
		          component={renderField}
		          label="First Name"
		        />
		        <Field
		          name={`${member}.lastName`}
		          type="text"
		          component={renderField}
		          label="Last Name"
		        />
	        </div>
	      </div>
	    ))}
      <a className="button hollow" onClick={() => fields.push({})}>Add Individual</a>
	</React.Fragment>
)

export {renderField, FieldArraysForm, renderIndividuals};
