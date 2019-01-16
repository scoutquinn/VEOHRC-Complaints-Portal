import React from "react";
import ReactDOM from "react-dom";
import { Field } from 'redux-form';
/* address fields */

class Address extends React.Component {
    render() {
        return (
        	<div>
	            <label>Address</label>
	            <Field name="address1" component="input" type="text"/>
	            <Field name="address2" component="input" type="text"/>
	            <div className="grid-x grid-margin-x">
	            	<div className="cell medium-auto">
			            <label>Town/Suburb</label>
	    		        <Field name="suburb" component="input" type="text"/>
	    		    </div>
	    		    <div className="cell medium-auto">
			            <label>Postcode</label>
	    		        <Field name="postcode" component="input" type="text"/> 
	    		    </div>
	    		</div>
	        </div>
	    )
    }
}

export default Address;