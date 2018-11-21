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

Submit is handled by "showResults" function on line: 866

***/

const MobileContext = React.createContext('desktop');


class ComplaintPortal extends React.Component {
	constructor (props) {
        super(props)
        this.state = { 
          sideBar: "q_1",
          sidebars: {},
          mobile: false,
          formData: {
          	
          },
          os:{
          	w: 0,
          	h: 0,
          	top: 0,
          	left: 0
          },
          singleDate: new Date(),
          startDate: new Date(),
          endDate: new Date()
        }
        this.formStateUpdate = this.formStateUpdate.bind(this);
        this.showHelp = this.showHelp.bind(this);
        this.handleRadioChanged = this.handleRadioChanged.bind(this);
        this.handleCheckboxChanged = this.handleCheckboxChanged.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
	    this.setState({
	    	startDate: moment(date)
	    });
	}

    // function to prevent default actions
    anchorClick (e){
    	e.preventDefault()
    }

    // sidebar 
    showHelp (id, ref) {
    	//console.log(ref)
    	const $e = $(ref.current)
    	let os = $e.offset();
    	os.h = $e.height();
    	os.w = $e.width();
    	//console.log(os);
    	this.setState({os})
    	this.setState({sideBar: id})
    	this.props.sidebar();
    }

    sidebarClick () {
    	console.log('workzz')
    }

    handleRadioChanged (event) {
    	this.formStateUpdate(event.target.name, event.target.value)
    }

    handleCheckboxChanged (event) {
    	let val = (this.state.formData[event.target.name]) ? this.state.formData[event.target.name] : [] ;
    	
    	if(event.target.checked && val.indexOf(event.target.value) === -1 ) {
    		val.push(event.target.value)
    	}else{
    		val = val.filter(item => item !== event.target.value)
    	}

    	this.formStateUpdate(event.target.name, val)
    }

    formStateUpdate(key, val){
        this.setState({
        	formData: {
        		...this.state.formData,
        		 [key]: val
        	}
        });
    }

    handleDatePicker(vars){
    	console.log(vars);
    	return vars;
    }


	
	render() {
		//console.log('form render');
		return(
			<form onSubmit={this.props.handleSubmit}>
				<div className="helper-hilight" style={{
					width: (this.state.os.w+80)+"px",
					height: (this.state.os.h+5)+"px",
					left: this.state.os.left+"px",
					top: (this.state.os.top-10)+"px"
				}}/>
				<FormElement onSubmit={showResults}>
            		<h3>Q1. Who are you lodging a complaint for?</h3>
            		<Element clickHandler={this.showHelp} helper="q_1">
            			<div className="grid-x">
						    <div className="cell medium-6">
							    <label>
							    	<Field name="q_1" component="input" label="myself" type="radio" value="Myself" />
							    	Myself
							    </label>
							</div>
						    <div className="cell medium-6">
							    <label>
							    	<Field name="q_1" component="input" type="radio" value="Someone Else" />
							    	Someone Else
							    </label>
							</div>
							
						</div>
            		</Element>
            		<Helper sidebar={stickySidebar} id="q_1" isShown={this.state.sideBar} isMobile={this.state.mobile}>
            			<h4>Tips</h4>
            			<p>If you are lodging a complaint for someone else, you
						may need to provide a consent form if you are not
						a parent or carer of that person.</p>
            		</Helper>
            	</FormElement>
            	<br/>
            	<FormElement onSubmit={showResults}>
            		<h3 className="padding-top-2">Q2. What happened to you?</h3>
            		<Element clickHandler={this.showHelp} helper="q_2">
            			<div className="grid-x">
	            			<div className="cell shrink">
	            				My name is &nbsp;
	            			</div>
	            			<div className="cell auto">
		            			<Field
						            name="q_2"
						            component="input"
						            type="text"
						            placeholder="Type your full name"
						        />
		            		</div>
	            		</div>
            		</Element>
            		<Helper sidebar={stickySidebar} id="q_2" isShown={this.state.sideBar} isMobile={this.state.mobile}>
            			<h4>Suggestions</h4>
            			<p>Please tell us about your story. This box will help you
						fill in your story as you click through each selection
						field.</p>
						<p>Let's start by filling in your name.</p>
            		</Helper>
            		<Element clickHandler={this.showHelp} helper="q_3">
            			<div className="grid-x">
	            			<div className="cell shrink">
	            				and I was &nbsp;
	            			</div>
	            			<div className="cell auto">
		            			<ShowChoices field="q_3" formData={this.props.fieldData}/>
	            			</div>
	            		</div>
            		</Element>
            		<Helper sidebar={stickySidebar} id="q_3" isShown={this.state.sideBar} isMobile={this.state.mobile}>
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
            		<Element clickHandler={this.showHelp} helper="q_4">
            			<div className="grid-x">
	            			<div className="cell shrink">
	            				This happened to me at &nbsp;
	            			</div>
	            			<div className="cell auto">
		            			<ShowChoices field="q_4" formData={this.props.fieldData}/>
	            			</div>
	            		</div>
            		</Element>
            		<Helper sidebar={stickySidebar} id="q_4" isShown={this.state.sideBar} isMobile={this.state.mobile}>
            			<h4>Please choose one location:</h4>
            			<fieldset>
					    	<label className="margin-bottom-1"><Field component="input" type="radio" name="q_4" value="Work" />Work</label>
					    	<label className="margin-bottom-1"><Field component="input" type="radio" name="q_4" value="School, university, tafe college or training institution" />School, university, tafe college or training institution</label>
					    	<label className="margin-bottom-1"><Field component="input" type="radio" name="q_4" value="Hospital or a medical clinic" />Hospital or a medical clinic</label>
					    	<label className="margin-bottom-1"><Field component="input" type="radio" name="q_4" value="A store or venue" />A store or venue (where you pay to purchase a product or gain access to a service)</label>
					    	<label className="margin-bottom-1"><Field component="input" type="radio" name="q_4" value="Public transport" />Public transport</label>
					    	<label className="margin-bottom-1"><Field component="input" type="radio" name="q_4" value="Accommodation " />Accommodation such as public housing or real estate agents</label>
					    	<label className="margin-bottom-1"><Field component="input" type="radio" name="q_4" value="Local government" />Local government (e.g. local council)</label>
					    	<label className="margin-bottom-1"><Field component="input" type="radio" name="q_4" value="Sporting activities" />Sporting activities such as sports events or games</label>
					    	<label className="margin-bottom-1"><Field component="input" type="radio" name="q_4" value="" />Club (for social, literary, cultural, political, sporting, or other lawful purposes.</label>
					    	<label className="margin-bottom-1"><Field component="input" type="radio" name="q_4" value="" />Other</label>
					    	<input type="text" name="q4_other" placeholder="Please Specify"/>
						</fieldset>
            		</Helper>
            		<Element clickHandler={this.showHelp} helper="q_5">
            			<div className="grid-x">
	            			<div className="cell shrink">
	            				The date this happened was &nbsp;
	            			</div>
	            			<div className="cell auto">
		            			<ShowChoices field="q_5" formData={this.props.fieldData} store={store}/>
		            		</div>
	            		</div>
            		</Element>
            		<Helper sidebar={stickySidebar} id="q_5" isShown={this.state.sideBar} isMobile={this.state.mobile}>
            			<h4>Please select a date:</h4>
            			<fieldset>
					    	<label className="margin-bottom-0"><Field component="input" type="radio" name="q_5" value="On this date" />On this date</label>
								<Field
						            name="q_5_single"
						            component={datePicker}
						            type="text"
						            selected={moment(this.state.singleDate)}
						            onChange={this.handleChange.bind(this)}
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
							            onChange={this.handleChange.bind(this)}
							            className="form-control"
							          />
								</div>
								<div className="cell ">
									<Field
							            name="q_5_end"
							            component={datePicker}
							            type="text"
							            selected={moment(this.state.endDate)}
							            onChange={this.handleChange.bind(this)}
							            className="form-control"
							          />
								</div>
							</div>
					    	<label className="margin-bottom-0"><Field component="input" type="radio" name="q_5" value="I don't remember" />I don't remember</label>
						</fieldset>
            		</Helper>
            		<Element clickHandler={this.showHelp} helper="q_6">
            			<div className="grid-x">
	            			<div className="cell shrink">
	            				I want to make a complaint about the &nbsp;
	            			</div>
	            			<div className="cell auto">
		            			<ShowChoices field="q_6" formData={this.props.fieldData} store={store}/>
		            		</div>
	            		</div>
            		</Element>
            		<Helper sidebar={stickySidebar} id="q_6" isShown={this.state.sideBar} isMobile={this.state.mobile}>
            			<h4>Who are you making a complaint about?</h4>
            			<fieldset>
					    	<label className="margin-bottom-0"><Field name="q_6" component="input" type="radio" value="Individual(s)" />Individual(s)</label>

					    	<label className="margin-bottom-0"><Field name="q_6" component="input" type="radio" value="Organisation" />Organisation</label>
					    	


						</fieldset>
            		</Helper>
            		<Element clickHandler={this.showHelp} helper="q_3">
            			<div className="grid-x">
	            			<div className="cell shrink">
	            				I believe I was &nbsp;
	            			</div>
	            			<div className="cell auto">
		            			<ShowChoices field="q_3" formData={this.props.fieldData}/>
	            			</div>
	            			<div className="cell shrink">
	            				&nbsp; because of my
	            			</div>
	            		</div>
            		</Element>
            		<Element clickHandler={this.showHelp} helper="q_7">
            			<div className="grid-x">
	            			<div className="cell auto">
		            			<ShowChoices field="q_7" formData={this.props.fieldData}/>
		            		</div>
	            		</div>
            		</Element>
            		<Helper sidebar={stickySidebar} id="q_7" sidebar={stickySidebar} isShown={this.state.sideBar} isMobile={this.state.mobile}>
            			<h4>Please choose what you believe is true, you can select more than one:</h4>
            			<fieldset>
	            			<FormSection name="q_7">
						    	<label className="margin-bottom-1"><Field component="input" type="checkbox" name="Race"  />Race, skin color, ethnicity, nationality, where I came from, or my culture</label>

								<label className="margin-bottom-1"><Field component="input" type="checkbox" name="Religion"  />Religious beliefs or association</label>

								<label className="margin-bottom-1"><Field component="input" type="checkbox" name="Health/Disability"  />Health, disability or illness (this can be mental or physical)</label>

								<label className="margin-bottom-1"><Field component="input" type="checkbox" name="Employment activities"  />Employment activities (asking for my rights or entitlements at work)</label>

								<label className="margin-bottom-1"><Field component="input" type="checkbox" name="Sex/Gender"  />Sex/Gender</label>

								<label className="margin-bottom-1"><Field component="input" type="checkbox" name="LGBITQ status"  />LGBITQ status</label>

								<label className="margin-bottom-1"><Field component="input" type="checkbox" name="Physical appearance"  />Physical appearance (how you look)</label>

								<label className="margin-bottom-1"><Field component="input" type="checkbox" name="Parental/Carer status"  />Parental/Carer status (you are providing ongoing care to someone dependent on you)</label>

								<label className="margin-bottom-1"><Field component="input" type="checkbox" name="Pregnancy/Breastfeeding"  />Pregnancy/Breastfeeding</label>

								<label className="margin-bottom-1"><Field component="input" type="checkbox" name="Marital status"  />Marital status (you are single, married, divorced, widowed, separated, or living together with your partner)</label>

								<label className="margin-bottom-1"><Field component="input" type="checkbox" name="Political belief or association"  />Political belief or association</label>

								<label className="margin-bottom-1"><Field component="input" type="checkbox" name="Union"  />Union (participation or association)</label>

								<label className="margin-bottom-1"><Field component="input" type="checkbox" name="Personal association"  />Personal association with someone who could be treated unfairly because of one or more of the above reasons  </label>

								<label className="margin-bottom-1"><Field component="input" type="checkbox" name="Other"  />Other</label>
							</FormSection>
						</fieldset>
            		</Helper>

            		<Element clickHandler={this.showHelp} helper="q_8">
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
            		<Helper sidebar={stickySidebar} id="q_8" isShown={this.state.sideBar} isMobile={this.state.mobile}>
            			<h4>Help copy here</h4>
            		</Helper>

            		<Element clickHandler={this.showHelp} helper="q_9">
            			<div className="grid-x">
	            			<div className="cell auto">
	            				As a result, I experienced the following harms:
	            			</div>
	            		</div>
	            		<div className="grid-x">
	            			<div className="cell auto">
		            			<ShowChoices field="q_9" formData={this.props.fieldData}/>
		            		</div>
	            		</div>
            		</Element>
            		<Helper sidebar={stickySidebar} id="q_9" isShown={this.state.sideBar} isMobile={this.state.mobile}>
            			<h4>Please select the harms you have experienced, you can tick more than one:</h4>
            			<fieldset>
            				<FormSection name="q_9">
						    	<label className="margin-bottom-0"><Field component="input" type="checkbox" name="I was not able to participate in the activity" />I was not able to participate in the activity</label>

								<label className="margin-bottom-0"><Field component="input" type="checkbox" name="My needs were ignored or rejected" />My needs were ignored or rejected</label>

								<label className="margin-bottom-0"><Field component="input" type="checkbox" name="I lost money" />I lost money</label>

								<label className="margin-bottom-0"><Field component="input" type="checkbox" name="I lost my reputation" />I lost my reputation</label>

								<label className="margin-bottom-0"><Field component="input" type="checkbox" name="I feel disrespected" />I feel disrespected</label>

								<label className="margin-bottom-0"><Field component="input" type="checkbox" name="I feel unhappy" />I feel unhappy</label>

								<label className="margin-bottom-0"><Field component="input" type="checkbox" name="I did not get a fair treatment" />I did not get a fair treatment</label>

								<label className="margin-bottom-0"><Field component="input" type="checkbox" name="Other" />Other</label>
							</FormSection>


						</fieldset>
            		</Helper>
            		
            		<Element clickHandler={this.showHelp} helper="q_10">
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
            		<Helper sidebar={stickySidebar} id="q_10" isShown={this.state.sideBar} isMobile={this.state.mobile}>
            			<h4>Please select the outcome you are seeking, you can choose more than one:</h4>
            			<fieldset>
            				<FormSection name="q_10">
						    	<label className="margin-bottom-0"><Field component="input" type="checkbox" name="Apologise" />Apologise</label>
						    	<label className="margin-bottom-0"><Field component="input" type="checkbox" name="Give me financial compensation/money" />Give me financial compensation/money</label>
						    	<label className="margin-bottom-0"><Field component="input" type="checkbox" name="Give me access to a venue or service" />Give me access to a venue or service</label>
						    	<label className="margin-bottom-0"><Field component="input" type="checkbox" name="Stop treating me unfairly" />Stop treating me unfairly</label>
						    	<label className="margin-bottom-0"><Field component="input" type="checkbox" name="Learn about the law" />Learn about the law</label>
						    	<label className="margin-bottom-0"><Field component="input" type="checkbox" name="Change their human resource policy" />Change their human resource policy</label>
						    	<label className="margin-bottom-0"><Field component="input" type="checkbox" name="Give me my old job back or help me with finding a new job" />Give me my old job back or help me with finding a new job</label>
						    	<label className="margin-bottom-0"><Field component="input" type="checkbox" name="Give me back my work hours" />Give me back my work hours</label>
								<label className="margin-bottom-0"><Field component="input" type="checkbox" name="Other" />Other</label>
							</FormSection>


						</fieldset>
            		</Helper>
            		
            	</FormElement>
            	<FormElement onSubmit={showResults}>
            		<h3 className="padding-top-3">Q3. (Optional) Is there anything else you would like the Commission to know?</h3>
            		<Element clickHandler={this.showHelp} helper="q_11">
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
            		<Helper sidebar={stickySidebar} id="q_11" isShown={this.state.sideBar} isMobile={this.state.mobile}>
            			<h4>This section is optional. </h4>
            			<p>You can use this section to tell us more information about your story. </p>
            		</Helper>
            	</FormElement>
            	<FormElement onSubmit={showResults}>
            		<h3 className="padding-top-3">Q4. Please provide the Organisation details below</h3>
            		<Element clickHandler={this.showHelp} helper="q_12">
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
            		<Helper sidebar={stickySidebar} id="q_12" isShown={this.state.sideBar} isMobile={this.state.mobile}>
            			<h4>Why do we ask?</h4>
            			<p>The Commission uses this information to contact the other party in order to begin the dispute resolution process.</p>
            			<h4>What if I don't know their details?</h4>
            			<p>This means we won't be able to help you with our dispute resolution service but we still want to learn about your story. Sharing your story will help the Commission to work towards helping more people like yourself.</p>
            		</Helper>
            	</FormElement>
            	<FormElement onSubmit={showResults}>
            		<h3 className="padding-top-3">Q5. Your Details</h3>
            		<Element clickHandler={this.showHelp} helper="q_13">
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
            						<label>Address</label>
            						<Field
								        name="contact_address"
								        type="text"
								        component='input'
								    />
								    <p>Do you need any of the following assistance?</p>
								    <label className="margin-bottom-0"><Field component="input" type="checkbox" name="Interpreter Service" />Interpreter Service</label>
								    <label className="margin-bottom-0"><Field component="input" type="checkbox" name="Accessible Documents" />Accessible Documents</label>
								    <label className="margin-bottom-0"><Field component="input" type="checkbox" name="TTY" />TTY</label>
								    <label className="margin-bottom-0"><Field component="input" type="checkbox" name="Other" />Other</label>
            					</FormSection> 
            				</div>
            			</div>
            		</Element>
            		<Helper sidebar={stickySidebar} id="q_13" isShown={this.state.sideBar} isMobile={this.state.mobile}>
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
Repeatable fields for or and individuals

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
      <Field
        name="org_address"
        type="text"
        component={renderField}
        label="Address"
      />
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

class FormElement extends React.Component{
	constructor(props) {
    	super(props);
    }	

	render(){
		return this.props.children;

	}
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
    	//this.props.setSide(this.props.children, this.props.id);
    	this.el = document.createElement('div');
    	//if (!this.props.isMobile) this.props.setSide(this.props.children, this.props.id);
  	}

  	// showhelp(){
  	// 	console.log("diggy");
  	// }

    componentDidMount(){
    	$("#sidebar").foundation();
    	if(this.props.sidebar) this.props.sidebar.updateSticky();
    }
	
	render(){
		let children = <div className={(this.props.id == this.props.isShown)? "show" : "hide"} id={this.props.id}>{this.props.children}</div>

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
    	//let vals = formValues(this.props.field)
    }
	anchorClick (e){
    	e.preventDefault()
    }
	render(){
		let val = this.props.formData[this.props.field];
		//console.log(val)
		if(typeof(val) == 'object') val = objToString(val);

		return(
			<a className="button expanded hollow" onClick={this.anchorClick} href="#">{val ? val : 'Choose...' }</a>
		)
	}
}





/*
helper function to conver a checkbox object into a comma seperated string
*/

function objToString(val){
	let out = [];
	Object.keys(val).map((key) => {
		if (val[key]) out.push(key);
	})
	return out.join(", ");
}





// FORM HELPERS

class RadioGroup extends React.Component {

    render(){
    	return(
    		<div className="myradiogroup">	
	  		{this.props.radioData.items.map((item, idx) =>
	    		<div className="myradioitem" key={idx}>
				    <label className="margin-bottom-1">
				    	<input 
					    	type="radio" 
					    	name={this.props.radioData.name} 
					    	value={item.value}
					    	id={item.id}
					    	onChange={this.props.onChange}
					    	checked={this.props.value === item.value}
				    	/> {item.value}
				    </label>
			    </div>
	    	)}
	    	</div>
    	)
    }
}






/*
Return function for form. just outputs to an alert box currently
*/
function showResults(values) {
  window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
};



// function coords(elem){
// 	console.log($(elem).offset());
// }

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

function updateSidebar(){
	stickySidebar.updateSticky()
}

let mountNode = document.getElementById("app"),
	sidebarNode = document.getElementById("sidebar");



ReactDOM.render(<Provider store={store}>
					<ComplaintPortal sidebar={updateSidebar} onSubmit={showResults}/>
				</Provider>
				, mountNode);


var sidebar = document.getElementById('sidebar_holder');

var stickySidebar = new StickySidebar(sidebar,{
    containerSelector: '#complaints_portal',
    topSpacing: 40,
    bottomSpacing: 40,
});


// sidebar.addEventListener('affix.top.stickySidebar', function () {
//     console.log('Sidebar has stuck top of viewport.');
// });

// sidebar.addEventListener('affix.bottom.stickySidebar', function (event) {
//     console.log('Sidebar has stuck bottom of viewport.');
// });
// sidebar.addEventListener('update.stickySidebar', function (event) {
//     console.log('Sidebar has updated');
// });

$(document).ready(function(){
	$(document).foundation();
	//var test = setTimeout(function(){stickySidebar.updateSticky();console.log('go');},3000)
});
