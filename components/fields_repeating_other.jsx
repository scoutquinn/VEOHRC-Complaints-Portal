import React from "react";
import { Field, FormSection, } from 'redux-form';

// FORM HELPERS

/*
data should be an array of objects structured like this:
{value : "Work", displayName : "Work" }
*/

function ReduxRadioGroup(props) {

	return (
		<React.Fragment>
		{ props.data.map(
			(item, idx) => 
				<label key={idx} className="margin-bottom-1">
					<Field component="input" type="radio" onChange={ props.changeHandler } name={props.name} value={item.value} />&ensp;{item.displayName}
				</label>
			)
		}
		{ props.other &&
			<OtherField name={props.name} type="radio" />
		}
		</React.Fragment>
	)
}

function ReduxCheckboxGroup(props) {

	// check for "harms" section conditional output
	const loopData = (props.areaHarms) ? props.areaHarms[props.condition] : props.data;
	

	return (
		<FormSection name={props.name}>
			{ loopData.map(
			 	(item, idx) => 
					<label key={idx} className="margin-bottom-1">
						<Field component="input" type="checkbox" name={item.value} />&ensp;{item.displayName}
					</label>
			    )
			}
			{ props.other &&
				<OtherField name={props.name} type="checkbox" />
			}
		</FormSection>
	)
}


function ReduxCheckboxGroupInfoBox(props) {
	return (
		<FormSection name={props.name}>
			{ props.data.map(
			 	(item, idx) => 
					<div key={idx}>
						<div className="grid-x">
						    <div className="cell auto">
							    <label className="margin-bottom-1">
									<Field component="input" type="checkbox" name={item.value} />&ensp;{item.displayName}
								</label>
							</div>
							<div className="cell shrink">
							    &ensp;<a className="tiny button primary" data-toggle={"discinfo-"+idx}>Example</a>
							</div>
						</div>
					    <div className="hide card" id={"discinfo-"+idx} data-toggler=".hide">
						    <div className="card-section">
						    	<small>{item.moreInfo}</small>
							</div>
						</div>
					</div>
			    )
			}
			{ props.other &&
				<OtherField name={props.name} type="checkbox" />
			}
		</FormSection>
	)
}


/*
"Other" selector

show a checkbox or a radio button with an "other" text input

*/

class OtherField extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {
	    	showOther: false
	    } 
	}
	changeHandle = (event) => {
		this.setState({"showOther": event.target.checked})
	}
	render(){
		return(
			<React.Fragment>
				<label className="margin-bottom-1">
					<Field onChange={this.changeHandle} component="input" type={this.props.type} name={ (this.props.type == "radio") ? this.props.name : "Other"  } value={ (this.props.type == "radio") && "Other" } />&ensp;Other
				</label>
				{ this.state.showOther && <Field component="input" type="text" name={this.props.name+"_other"} placeholder="Please Specify"/> }
			</React.Fragment>
		)
	}
}

export { ReduxRadioGroup, ReduxCheckboxGroup, ReduxCheckboxGroupInfoBox, OtherField }