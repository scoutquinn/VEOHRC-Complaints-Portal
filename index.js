import React from "react";
import ReactDOM from "react-dom";
import { reduxForm, Field, FormSection, propTypes, FieldArray, formValueSelector } from 'redux-form';
import { Provider, connect } from "react-redux";
import { createStore, combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';


import "./scss/style.scss";
import $ from "jquery";
import Foundation from "foundation-sites";
import moment from 'moment';
import DatePicker from 'react-datepicker';
import StickySidebar from 'sticky-sidebar';

import 'react-datepicker/dist/react-datepicker.css';


/***

COMPLAINT FORM

Submit is handled by "showResults" function on line: 888

***/

const MobileContext = React.createContext('desktop');

class ComplaintPortal extends React.Component {
	constructor (props) {
        super(props)
        this.state = { 
          sideBar: "q_1",
          os:{
          	w: 0,
          	h: 0,
          	top: 0,
          	left: 0
          },
          singleDate: new Date(),
          startDate: new Date(),
          endDate: new Date(),
          width : 0
        }
    }

    sideBarRefs = {}


    // set state of date fields
    handleDateChange = (field, date) => {
	    this.setState({
	    	[field]: moment(date)
	    });
	}

	addSidebarRefs = ( id, ref ) => {
		this.sideBarRefs[id] = ref;
	}

    // function to prevent default actions
    anchorClick = (e) => {
    	e.preventDefault()
    }

    // return if offset position has changed

    refreshOffset = (os_old, os_new) => {
    	return (
    		os_old.top != os_new.top ||
    		os_old.left != os_new.left ||
    		os_old.w != os_new.w ||
    		os_old.h != os_new.h
    	)
    }

    // show hilight box / scroll action for mobile

    showHilight = (id) => {
    	let os_old = this.state.os;
    	//get DOM element and calc offset, width and height (jQuery)
    	const $e = $(this.sideBarRefs[id])
    	let os = $e.offset();
    	os.h = $e.height();
    	os.w = $e.width();

		if(this.refreshOffset(os_old, os)){
	    	if(!this.isMobile()){
	    		this.setState({os})
	    	}else{
	    		$(window).scrollTop(os.top)
	    	}
    	}

    }

    // sidebar 
    showHelp = (id) => {
    	this.showHilight(id)
    	// set sidebar from id
    	this.setState({sideBar: id})
    	this.props.sidebar();
    }

    componentDidMount() {
	    this.setState(
	      { width: window.innerWidth},
	      window.addEventListener("resize", this.handleResize )
	    );
	}

	handleResize = ({ target }) => {
		console.log(this.isMobile());
		this.setState({ width: target.innerWidth })
	}

	isMobile = () => {
		return this.state.width <= 1024;
	}

	componentWillUnmount(){
		window.removeEventListener("resize", this.handleResize )
	}

	
	render() {
		return(
			<form onSubmit={this.props.handleSubmit}>
				<div className="helper-hilight" style={{
					width: (this.state.os.w+80)+"px",
					height: (this.state.os.h+5)+"px",
					left: this.state.os.left+"px",
					top: (this.state.os.top-10)+"px"
				}}/>
				<FormElement>
            		<h3>Q1. Who are you lodging a complaint for?</h3>
            		<Element refCallback={this.addSidebarRefs} clickHandler={this.showHelp} helper="q_1">
            			<div className="grid-x grid-margin-x">
						    <div className="cell medium-shrink">
							    <label>
							    	<Field name="q_1" component="input" label="myself" type="radio" value="Myself" />
							    	Myself
							    </label>
							</div>
						    <div className="cell medium-shrink">
							    <label>
							    	<Field name="q_1" component="input" type="radio" value="Someone Else" />
							    	Someone Else
							    </label>
							</div>
							
						</div>
            		</Element>
            		<Helper sidebar={stickySidebar} showHelp={this.showHilight} id="q_1" isShown={this.state.sideBar} isMobile={this.isMobile()}>
            			<h4>Tips</h4>
            			<p>If you are lodging a complaint for someone else, you
						may need to provide a consent form if you are not
						a parent or carer of that person.</p>
            		</Helper>
            	</FormElement>
            	<br/>
            	<FormElement>
            		<h3 className="padding-top-2">Q2. What happened to you?</h3>
            		<Element refCallback={this.addSidebarRefs} clickHandler={this.showHelp} helper="q_2">
            			<div className="grid-x">
	            			<div className="cell medium-shrink">
	            				My name is &nbsp;
	            			</div>
	            			<div className="cell medium-auto">
		            			<Field
						            name="q_2"
						            component="input"
						            type="text"
						            placeholder="Type your full name"
						        />
		            		</div>
	            		</div>
            		</Element>
            		<Helper sidebar={stickySidebar} showHelp={this.showHilight} id="q_2" isShown={this.state.sideBar} isMobile={this.isMobile()}>
            			<h4>Suggestions</h4>
            			<p>Please tell us about your story. This box will help you
						fill in your story as you click through each selection
						field.</p>
						<p>Let's start by filling in your name.</p>
            		</Helper>
            		<Element refCallback={this.addSidebarRefs} clickHandler={this.showHelp} helper="q_3">
            			<div className="grid-x">
	            			<div className="cell medium-shrink">
	            				and I was &nbsp;
	            			</div>
	            			<div className="cell medium-auto">
		            			<ShowChoices field="q_3" formData={this.props.fieldData}/>
	            			</div>
	            		</div>
            		</Element>
            		<Helper sidebar={stickySidebar} showHelp={this.showHilight} id="q_3" isShown={this.state.sideBar} isMobile={this.isMobile()}>
            			<h4>Please choose one of the following:</h4>
            			<fieldset className="large-6 cell">
						    <label className="margin-bottom-1">
						    	<Field name="q_3" component="input" type="radio" value="Bullied" />
						    	
						    Bullied</label>
						    <label className="margin-bottom-1">
						    	<Field name="q_3" component="input" type="radio" value="Treated unfairly" />
						    	 Treated unfairly
						    	</label>
						    <label className="margin-bottom-1">
						    	<Field name="q_3" component="input" type="radio" value="Sexually harassed" />
						    	 Sexually harassed <a className="tiny button primary" href="#" data-toggle="more-info-sh">?</a>
						    	</label>
						    <p className="hide" id="more-info-sh" data-toggler=".hide">
						    	<small>Under the Equal Opportunity Act 2010, sexual harassment is defined as:
								<br/>an unwelcome sexual advance
								<br/>an unwelcome request for sexual favours
								<br/>any other unwelcome conduct of a sexual nature
								<br/>
								which would lead a reasonable person to experience offence, humiliation or intimidation. It can be physical, verbal, or written.</small>
							</p>
						    <label className="margin-bottom-1">
						    	<Field component="input" name="q_3" type="radio" value="Victimised" />
						    	 Victimised <a className="tiny button primary" href="#" data-toggle="more-info-vi">?</a>
						    	</label>
						    <p className="hide" id="more-info-vi" data-toggler=".hide">
						    	<small>Victimisation is treating someone badly because they spoke up about being treated unfairly, made a complaint or helped someone else make a complaint.
						    	<br/>Victimisation is also against the law and can be part of a complaint.
								</small>
							</p>
						</fieldset>
            		</Helper>
            		<Element refCallback={this.addSidebarRefs} clickHandler={this.showHelp} helper="q_4">
            			<div className="grid-x">
	            			<div className="cell medium-shrink">
	            				This happened to me at &nbsp;
	            			</div>
	            			<div className="cell medium-auto">
		            			<ShowChoices field="q_4" formData={this.props.fieldData}/>
	            			</div>
	            		</div>
            		</Element>
            		<Helper sidebar={stickySidebar} showHelp={this.showHilight} id="q_4" isShown={this.state.sideBar} isMobile={this.isMobile()}>
            			<h4>Please choose one location:</h4>
            			<fieldset>
		            		<ReduxRadioGroup 
		            			data={[
							    	{value : "Work", displayName : "Work" },
							    	{value : "School, university, tafe college or training institution", displayName : "School, university, tafe college or training institution" },
							    	{value : "Hospital or a medical clinic", displayName : "Hospital or a medical clinic" },
							    	{value : "A store or venue", displayName : "A store or venue (where you pay to purchase a product or gain access to a service)" },
							    	{value : "Public transport", displayName : "Public transport" },
							    	{value : "Accommodation ", displayName : "Accommodation such as public housing or real estate agents" },
							    	{value : "Local government", displayName : "Local government (e.g. local council)" },
							    	{value : "Sporting activities", displayName : "Sporting activities such as sports events or games" },
							    	{value : "Club", displayName : "Club (for social, literary, cultural, political, sporting, or other lawful purposes." },
							    	{value : "Other", displayName : "Other" }
						    	]}
						    	name="q_4"
						    />
					    	<input type="text" name="q4_other" placeholder="Please Specify"/>
						</fieldset>
            		</Helper>
            		<Element refCallback={this.addSidebarRefs} clickHandler={this.showHelp} helper="q_5">
            			<div className="grid-x">
	            			<div className="cell medium-shrink">
	            				The date this happened was &nbsp;
	            			</div>
	            			<div className="cell medium-auto">
		            			<ShowChoices field="q_5" formData={this.props.fieldData} store={store}/>
		            		</div>
	            		</div>
            		</Element>
            		<Helper sidebar={stickySidebar} showHelp={this.showHilight} id="q_5" isShown={this.state.sideBar} isMobile={this.isMobile()}>
            			<h4>Please select a date:</h4>
            			<fieldset>
					    	<label className="margin-bottom-0"><Field component="input" type="radio" name="q_5" value="On this date" />On this date</label>
								<Field
						            name="q_5_single"
						            component={datePicker}
						            type="text"
						            selected={moment(this.state.singleDate)}
						            onChange={this.handleDateChange.bind(this, 'singleDate')}
						            className="form-control"
						          />
					    	<label className="margin-bottom-0"><Field component="input" type="radio" name="q_5" value="Between these dates" />Between these dates</label>
					    	<div className="grid-x">
		            			<div className="cell ">
							    	<Field
							            name="q_5_start"
							            component={datePicker}
							            type="text"
							            selected={moment(this.state.startDate)}
							            onChange={this.handleDateChange.bind(this, "startDate")}
							            className="form-control"
							          />
								</div>
								<div className="cell ">
									<Field
							            name="q_5_end"
							            component={datePicker}
							            type="text"
							            selected={moment(this.state.endDate)}
							            onChange={this.handleDateChange.bind(this, "endDate")}
							            className="form-control"
							          />
								</div>
							</div>
					    	<label className="margin-bottom-0"><Field component="input" type="radio" name="q_5" value="I don't remember" />I don't remember</label>
						</fieldset>
            		</Helper>
            		<Element refCallback={this.addSidebarRefs} clickHandler={this.showHelp} helper="q_6">
            			<div className="grid-x">
	            			<div className="cell medium-shrink">
	            				I want to make a complaint about the &nbsp;
	            			</div>
	            			<div className="cell medium-auto">
		            			<ShowChoices field="q_6" formData={this.props.fieldData} store={store}/>
		            		</div>
	            		</div>
            		</Element>
            		<Helper sidebar={stickySidebar} showHelp={this.showHilight} id="q_6" isShown={this.state.sideBar} isMobile={this.isMobile()}>
            			<h4>Who are you making a complaint about?</h4>
            			<fieldset>
					    	<label className="margin-bottom-0"><Field name="q_6" component="input" type="radio" value="Individual(s)" />Individual(s)</label>

					    	<label className="margin-bottom-0"><Field name="q_6" component="input" type="radio" value="Organisation" />Organisation</label>
					    	


						</fieldset>
            		</Helper>
            		<Element refCallback={this.addSidebarRefs} clickHandler={this.showHelp} helper="q_3">
            			<div className="grid-x">
	            			<div className="cell medium-shrink">
	            				I believe I was &nbsp;
	            			</div>
	            			<div className="cell medium-auto">
		            			<ShowChoices field="q_3" formData={this.props.fieldData}/>
	            			</div>
	            			<div className="cell medium-shrink">
	            				&nbsp; because of my
	            			</div>
	            		</div>
            		</Element>
            		<Element refCallback={this.addSidebarRefs} clickHandler={this.showHelp} helper="q_7">
            			<div className="grid-x">
	            			<div className="cell auto">
		            			<ShowChoices field="q_7" formData={this.props.fieldData}/>
		            		</div>
	            		</div>
            		</Element>
            		<Helper sidebar={stickySidebar} showHelp={this.showHilight} id="q_7" sidebar={stickySidebar} isShown={this.state.sideBar} isMobile={this.isMobile()}>
            			<h4>Please choose what you believe is true, you can select more than one:</h4>
            			<fieldset>
							<ReduxCheckboxGroup 
		            			data={[
							    	{ value : "Race", displayName : "Race, skin color, ethnicity, nationality, where I came from, or my culture" },
									{ value : "Religion", displayName : "Religious beliefs or association" },
									{ value : "Health/Disability", displayName : "Health, disability or illness (this can be mental or physical)" },
									{ value : "Employment activities", displayName : "Employment activities (asking for my rights or entitlements at work)" },
									{ value : "Sex/Gender", displayName : "Sex/Gender" },
									{ value : "LGBITQ status", displayName : "LGBITQ status" },
									{ value : "Physical appearance", displayName : "Physical appearance (how you look)" },
									{ value : "Parental/Carer status", displayName : "Parental/Carer status (you are providing ongoing care to someone dependent on you)" },
									{ value : "Pregnancy/Breastfeeding", displayName : "Pregnancy/Breastfeeding" },
									{ value : "Marital status", displayName : "Marital status (you are single, married, divorced, widowed, separated, or living together with your partner)" },
									{ value : "Political belief or association", displayName : "Political belief or association" },
									{ value : "Union", displayName : "Union (participation or association)" },
									{ value : "Personal association", displayName : "Personal association with someone who could be treated unfairly because of one or more of the above reasons  " },
									{ value : "Other", displayName : "Other" }
								]}
								name="q_7"
							/>
						</fieldset>
            		</Helper>

            		<Element refCallback={this.addSidebarRefs} clickHandler={this.showHelp} helper="q_8">
            			<div className="grid-x">
	            			<div className="cell auto">
	            				Here are some examples of when I was treated this way:
	            			</div>
	            		</div>
	            		<div className="grid-x">
	            			<div className="cell auto">
	            				
		            			<Field
						            name="q_8"
						            component="textarea"
						            type="textarea"
						            rows="5"
						            placeholder="Add Something Here"
						        />
		            		</div>
	            		</div>
            		</Element>
            		<Helper sidebar={stickySidebar} showHelp={this.showHilight} id="q_8" isShown={this.state.sideBar} isMobile={this.isMobile()}>
            			<h4>Help copy here</h4>
            		</Helper>

            		<Element refCallback={this.addSidebarRefs} clickHandler={this.showHelp} helper="q_9">
            			<div className="grid-x">
	            			<div className="cell medium-auto">
	            				As a result, I experienced the following harms:
	            			</div>
	            		</div>
	            		<div className="grid-x">
	            			<div className="cell medium-auto">
		            			<ShowChoices field="q_9" formData={this.props.fieldData}/>
		            		</div>
	            		</div>
            		</Element>
            		<Helper sidebar={stickySidebar} showHelp={this.showHilight} id="q_9" isShown={this.state.sideBar} isMobile={this.isMobile()}>
            			<h4>Please select the harms you have experienced, you can tick more than one:</h4>
            			<fieldset>
            				<ReduxCheckboxGroup 
		            			data={[
		            				{ value: "I was not able to participate in the activity", displayName: "I was not able to participate in the activity"},
									{ value: "My needs were ignored or rejected", displayName: "My needs were ignored or rejected"},
									{ value: "I lost money", displayName: "I lost money"},
									{ value: "I lost my reputation", displayName: "I lost my reputation"},
									{ value: "I feel disrespected", displayName: "I feel disrespected"},
									{ value: "I feel unhappy", displayName: "I feel unhappy"},
									{ value: "I did not get a fair treatment", displayName: "I did not get a fair treatment"},
									{ value: "Other", displayName: "Other"}
		            			]}
		            			name="q_9"
		            		/>
						</fieldset>
            		</Helper>
            		
            		<Element refCallback={this.addSidebarRefs} clickHandler={this.showHelp} helper="q_10">
            			<div className="grid-x">
	            			<div className="cell auto">
	            				I want the other party to:
	            			</div>
	            		</div>
	            		<div className="grid-x">
	            			<div className="cell auto">
		            			<ShowChoices field="q_10" formData={this.props.fieldData}/>
		            		</div>
	            		</div>
            		</Element>
            		<Helper sidebar={stickySidebar} showHelp={this.showHilight} id="q_10" isShown={this.state.sideBar} isMobile={this.isMobile()}>
            			<h4>Please select the outcome you are seeking, you can choose more than one:</h4>
            			<fieldset>
            				<ReduxCheckboxGroup 
            					name="q_10"
            					data={[
							    	{value: "Apologise", displayName: "Apologise"},
							    	{value: "Give me financial compensation/money", displayName: "Give me financial compensation/money"},
							    	{value: "Give me access to a venue or service", displayName: "Give me access to a venue or service"},
							    	{value: "Stop treating me unfairly", displayName: "Stop treating me unfairly"},
							    	{value: "Learn about the law", displayName: "Learn about the law"},
							    	{value: "Change their human resource policy", displayName: "Change their human resource policy"},
							    	{value: "Give me my old job back or help me with finding a new job", displayName: "Give me my old job back or help me with finding a new job"},
							    	{value: "Give me back my work hours", displayName: "Give me back my work hours"},
									{value: "Other", displayName: "Other"}
								]}
							/>
						</fieldset>
            		</Helper>
            		
            	</FormElement>
            	<FormElement>
            		<h3 className="padding-top-3">Q3. (Optional) Is there anything else you would like the Commission to know?</h3>
            		<Element refCallback={this.addSidebarRefs} clickHandler={this.showHelp} helper="q_11">
            			<div className="grid-x">
	            			<div className="cell auto">
	            				Please provide any other information about your story.
	            			</div>
	            		</div>
	            		<div className="grid-x">
	            			<div className="cell auto">
		            			<Field
						            name="q_11"
						            component="textarea"
						            type="textarea"
						            rows="5"
						            placeholder="Add Something Here"
						        />
		            		</div>
	            		</div>
            		</Element>
            		<Helper sidebar={stickySidebar} showHelp={this.showHilight} id="q_11" isShown={this.state.sideBar} isMobile={this.isMobile()}>
            			<h4>This section is optional. </h4>
            			<p>You can use this section to tell us more information about your story. </p>
            		</Helper>
            	</FormElement>
            	<FormElement>
            		<h3 className="padding-top-3">Q4. Please provide the Organisation details below</h3>
            		<Element refCallback={this.addSidebarRefs} clickHandler={this.showHelp} helper="q_12">
            			<div className="grid-x">
	            			<div className="cell auto">
	            				Please provide the Organisation details below.
	            			</div>
	            		</div>
	            		<div className="grid-x">
	            			<div className="cell auto">
            					<FieldArraysForm onSubmit={showResults} />
            				</div>
            			</div>
            		</Element>
            		<Helper sidebar={stickySidebar} showHelp={this.showHilight} id="q_12" isShown={this.state.sideBar} isMobile={this.isMobile()}>
            			<h4>Why do we ask?</h4>
            			<p>The Commission uses this information to contact the other party in order to begin the dispute resolution process.</p>
            			<h4>What if I don't know their details?</h4>
            			<p>This means we won't be able to help you with our dispute resolution service but we still want to learn about your story. Sharing your story will help the Commission to work towards helping more people like yourself.</p>
            		</Helper>
            	</FormElement>
            	<FormElement>
            		<h3 className="padding-top-3">Q5. Your Details</h3>
            		<Element refCallback={this.addSidebarRefs} clickHandler={this.showHelp} helper="q_13">
            			<div className="grid-x">
	            			<div className="cell auto">
	            				Please provide your contact details below.
	            			</div>
	            		</div>
	            		<div className="grid-x">
	            			<div className="cell auto">
            					<FormSection name="q_13">
            						<label>Preferred Title</label>
							          <Field name="title" component="select">
							            <option>Choose one.</option>
							            <option value="Mrs">Mrs</option>
							            <option value="Ms">Ms</option>
							            <option value="Mr">Mr</option>
							            <option value="Mx">Mx</option>
							            <option value="Other">Other</option>
							          </Field>
            						<label>Contact Number</label>
            						<Field
								        name="contact_number"
								        type="text"
								        component='input'
								    />
            						<label>Email</label>
            						<Field
								        name="contact_email"
								        type="email"
								        component='input'
								    />
								    <FormSection name="personal_address">
								    	<Address />
								    </FormSection>
            						{/*<label>Address</label>
            						<Field
								        name="contact_address"
								        type="text"
								        component='input'
								    />*/}
								    <p>Do you need any of the following assistance?</p>
								    <label className="margin-bottom-0"><Field component="input" type="checkbox" name="Interpreter Service" />Interpreter Service</label>
								    <label className="margin-bottom-0"><Field component="input" type="checkbox" name="Accessible Documents" />Accessible Documents</label>
								    <label className="margin-bottom-0"><Field component="input" type="checkbox" name="TTY" />TTY</label>
								    <label className="margin-bottom-0"><Field component="input" type="checkbox" name="Other" />Other</label>
            					</FormSection> 
            				</div>
            			</div>
            		</Element>
            		<Helper sidebar={stickySidebar} showHelp={this.showHilight} id="q_13" isShown={this.state.sideBar} isMobile={this.isMobile()}>
            			<h4>Why do we ask?</h4>
            			<p>The Commission uses this information to contact you.</p>
            			<h4>What if I don't want to share my details?</h4>
            			<p>This means we won't be able to help you with our dispute resolution service but we still want to learn about your story. Sharing your story will help the Commission to work towards helping more people like yourself.</p>
            		</Helper>
            	</FormElement>
            	<div className="padding-1">&nbsp;</div>
            	<input className="button" type="submit" value="Next"/>
            	<div className="padding-3">&nbsp;</div>
            	<div className="padding-3">&nbsp;</div>
		    </form>
		)
	}
}

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






/*
Dummy holder for top level for sections
Possibly uneeded
*/

function FormElement(props){
	return props.children;
}







/*
Holder for question/ input field in left side of form.
also handles clicks for highlighting the section
*/


class Element extends React.Component{
  	constructor(props) {
	    super(props);
	    this.myRef = React.createRef();
  	}

  	componentDidMount(){
  		this.props.refCallback(this.props.helper, this.myRef.current);
  	}

  	render(){
		return(
			<div ref={this.myRef} aria-describedby={this.props.helper} className="form_element padding-0 padding-left-1" onClick={this.props.clickHandler.bind(this, this.props.helper, this.myRef)}>
				{this.props.children}
			</div>
		)
	}
}





/*
Helper section.
Is displayed in the sidebar for desktop, and below the element for mobile
*/

class Helper extends React.Component{
	static contextType = MobileContext;

	constructor(props) {
    	super(props);
    	this.el = document.createElement('div');
  	}


    componentDidMount(){
    	$("#sidebar").foundation();
    	if(this.props.sidebar) this.props.sidebar.updateSticky();

    }
    componentDidUpdate(){
    	if (this.props.id == this.props.isShown){
    		this.props.showHelp(this.props.id)
    	}
    }

    shownClass = () => {
    	return (this.props.id == this.props.isShown) ? "show" : "hide";
    }
	
	render(){
		let children = <div className={"padding-1 margin-bottom-1 " + this.shownClass()} id={this.props.id}>{this.props.children}</div>
		if (!this.props.isMobile) {
			return ReactDOM.createPortal(children, sidebarNode);
		} else if (this.props.isMobile){
			return(
				<div className="helper">
					{children}
				</div>
			)

		}else {
			return false;
		}
	}
}






/* 
Button element. displays choices made (if an object is provided) or radio button value
*/

class ShowChoices extends React.Component{
	constructor(props) {
    	super(props);
    }

	anchorClick = (e) => {
    	e.preventDefault()
    }

    /*
	helper function to conver a checkbox object into a comma seperated string
	*/

    objToString = (obj) => {
		let out = [];
		Object.keys(obj).map((key) => {
			if (obj[key]) out.push(key);
		})
		return out.join(", ");
	}
	
	render(){
		let val = this.props.formData[this.props.field];
		if(typeof(val) == 'object') val = this.objToString(val);

		return(
			<a className="button expanded hollow" onClick={this.anchorClick} href="#">{val ? val : 'Choose...' }</a>
		)
	}
}





// FORM HELPERS

/*
data should be an array of objects structured like this:
{value : "Work", displayName : "Work" }
*/

function ReduxRadioGroup(props) {
	return (
		props.data.map((item, idx) => <label key={idx} className="margin-bottom-1">
				<Field component="input" type="radio" name={props.name} value={item.value} />{item.displayName}
			</label>)
	)
}

function ReduxCheckboxGroup(props) {
	return (
		<FormSection name={props.name}>
			{ props.data.map((item, idx) => <label key={idx} className="margin-bottom-1"><Field component="input" type="checkbox" name={item.value} />{item.displayName}</label>
			)}
		</FormSection>
	)
}







/*
Return function for form. just outputs to console currently
*/

function showResults(values) {
  console.log(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
};

const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form"
});

const store = (window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore)(reducer);



ComplaintPortal = reduxForm({
  form: 'complaintForm',
  destroyOnUnmount: false
})(ComplaintPortal);

// Decorate with connect to read form values
const selector = formValueSelector('complaintForm'); // <-- same as form name
ComplaintPortal = connect(state => {
  const fieldData = selector(state, 
  	'q_1',  //string
  	'q_2',	
  	'q_3',
  	'q_4',
  	'q_4_other',
  	'q_5',
  	'q_5_single',
  	'q_5_start',
  	'q_5_end',
  	'q_6',
  	'q_7',
  	'q_7_other',
  	'q_8',
  	'q_9',
  	'q_9_other',
  	'q_10',
  	'q_11'
  );
  return {
    fieldData
  };
})(ComplaintPortal);



/** RENDER CODE **/


let mountNode = document.getElementById("app"),
	sidebarNode = document.getElementById("sidebar");



ReactDOM.render(
		<Provider store={store}>
			<ComplaintPortal sidebar={updateSidebar} onSubmit={showResults}/>
		</Provider>
	, mountNode
);


var sidebar = document.getElementById('sidebar_holder');

var stickySidebar = new StickySidebar(sidebar,{
    containerSelector: '#complaints_portal',
    topSpacing: 0,
    bottomSpacing: 0,
});

function updateSidebar(){
	stickySidebar.updateSticky()
}


$(document).ready(function(){
	$(document).foundation();
});
