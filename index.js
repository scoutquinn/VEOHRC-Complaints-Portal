import React from "react";
import ReactDOM from "react-dom";
import { reduxForm, Field, FormSection, propTypes, FieldArray, formValueSelector, formValues, clearFields, change } from 'redux-form';
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

    areaChange = (e) => {
    	this.props.change('q_9', null);
    }


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
    	//console.log($("#"+id).find('input').first())
    	//$("#"+id).find('input').first().focus()
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
		console.log('render!');
		return(
			<form onSubmit={this.props.handleSubmit}>
				<div className="helper-hilight" style={{
					width: (this.state.os.w+80)+"px",
					height: (this.state.os.h+5)+"px",
					left: this.state.os.left+"px",
					top: (this.state.os.top-10)+"px"
				}}/>
				<FormElement>
            		<h3>Who are you lodging a complaint for?</h3>
            		<Element refCallback={this.addSidebarRefs} clickHandler={this.showHelp} helper="q_1">
            			<div className="grid-x grid-margin-x">
						    <div className="cell medium-shrink">
							    <label>
							    	<Field name="q_1" component="input" label="myself" type="radio" value="Myself" />
							    	&ensp; Myself
							    </label>
							</div>
						    <div className="cell medium-shrink">
							    <label>
							    	<Field name="q_1" component="input" type="radio" value="Someone Else" />
							    	&ensp; Someone Else
							    </label>
							</div>

						{/* For Someone else Additional info */}
							
						</div>
            		</Element>
            		<Helper sidebar={stickySidebar} showHelp={this.showHilight} id="q_1" isShown={this.state.sideBar} isMobile={this.isMobile()}>
            			<h4>Tips</h4>
            			<p>If you are lodging a complaint for someone else, you
						may need to provide a consent form if you are not
						a parent or carer of that person.</p>
            		</Helper>

            	{/*  CONDITIONALLY RETURN FIELDS FOR REPORTING SOMEONE ELSE  */}
            		{(this.props.whoFor == "Someone Else") && 

            		<Element refCallback={this.addSidebarRefs} clickHandler={this.showHelp} helper="q_1_someone_else">
            			<div className="grid-x grid-margin-x">
						    <div className="cell">
        						<label>Your Full Name</label>
        						<Field
							        name="q_1_someone_else_full_name"
							        type="text"
							        component='input'
							    />
        						<label>Your Contact Number</label>
        						<Field
							        name="q_1_someone_else_contact_number"
							        type="text"
							        component='input'
							    />
        						<label>Your Email</label>
        						<Field
							        name="q_1_someone_else_contact_email"
							        type="email"
							        component='input'
							    />
							    <label>Name of the person or group you are making a complaint on behalf of:</label>
        						<Field
							        name="q_1_someone_else_their_name"
							        type="text"
							        component='input'
							    />
							    <label>Relationship to this person:</label>
        						<Field
							        name="q_1_someone_else_relationship"
							        type="text"
							        component='input'
							    />
							</div>

						
							
						</div>
            		</Element>

            		
           		}

            		<Helper sidebar={stickySidebar} showHelp={this.showHilight} id="q_1_someone_else" isShown={this.state.sideBar} isMobile={this.isMobile()}>
            			<h4>Tips</h4>
            			<p>If you are lodging a complaint for someone else, you
						may need to provide a consent form if you are not
						a parent or carer of that person.</p>
            		</Helper>

            	{/* END CONDITIONAL RENDER */}

            	</FormElement>
            	<br/>
            	<FormElement>
            		<h3 className="padding-top-2">Section 1. What happened?</h3>
            		{(this.props.whoFor == "Myself") && 
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
            		}
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
	            				I was &nbsp;
	            			</div>
	            			<div className="cell medium-auto">
		            			<Field 
		            				component={ShowChoicesNew} 
		            				name="q_3"
		            				error="warning"
		            				errorText="We would like to know why you think you were treated unfairly"
		            			/>
	            			</div>
	            		</div>
            		</Element>
            		<Helper sidebar={stickySidebar} showHelp={this.showHilight} id="q_3" isShown={this.state.sideBar} isMobile={this.isMobile()}>
            			<h4>Please choose one of the following:</h4>
            			<fieldset className="large-6 cell">
						    

						    <div className="grid-x">
							    <div className="cell shrink">
								    <label className="margin-bottom-1">
								    	<Field component="input" name="q_3" type="radio" value="Treated unfairly" />
								    	 &ensp; Treated unfairly &ensp; 
								    </label>
								</div>
								<div className="cell shrink">
								    <a className="tiny button primary" data-toggle="more-info-tu">?</a>
								</div>
							</div>

						    <div className="hide card" id="more-info-tu" data-toggler=".hide">
							    <div className="card-section">
							    	<small>Being treated unfairly means different things to different people. What is most important is that you feel you that have been treated unfairly in this situation. This can be anything from being deniedan opportunity or service to not beingpaid fairly for your work. 
									</small>
								</div>
							</div>
						    <div className="grid-x">
							    <div className="cell shrink">
								    <label className="margin-bottom-1">
								    	<Field name="q_3" component="input" type="radio" value="Sexually harassed" />
								    	 &ensp; Sexually harassed &ensp; 
								    </label>
								</div>
								<div className="cell shrink">
								    <a className="tiny button primary float-right" data-toggle="more-info-sh">?</a>
								</div>
							</div>
						    <div className="hide card" id="more-info-sh" data-toggler=".hide">
							    <div className="card-section">
							    	<small>Under the Equal Opportunity Act 2010, sexual harassment is defined as:
									<br/>an unwelcome sexual advance
									<br/>an unwelcome request for sexual favours
									<br/>any other unwelcome conduct of a sexual nature
									<br/>
									which would lead a reasonable person to experience offence, humiliation or intimidation. It can be physical, verbal, or written.</small>
								</div>
							</div>
						    <div className="grid-x">
							    <div className="cell shrink">
								    <label className="margin-bottom-1">
								    	<Field component="input" name="q_3" type="radio" value="Victimised" />
								    	 &ensp; Victimised &ensp; 
								    </label>
								</div>
								<div className="cell shrink">
								    <a className="tiny button primary" data-toggle="more-info-vi">?</a>
								</div>
							</div>

						    <div className="hide card" id="more-info-vi" data-toggler=".hide">
							    <div className="card-section">
							    	<small>Victimisation is treating someone badly because they spoke up about being treated unfairly, made a complaint or helped someone else make a complaint.
							    	<br/>Victimisation is also against the law and can be part of a complaint.
									</small>
								</div>
							</div>

						    <div className="grid-x">
							    <div className="cell shrink">
								    <label className="margin-bottom-1">
								    	<Field component="input" name="q_3" type="radio" value="Bullied" />
								    	 &ensp; Bullied &ensp; 
								    </label>
								</div>
								<div className="cell shrink">
								    <a className="tiny button primary" data-toggle="more-info-bu">?</a>
								</div>
							</div>

						    <div className="hide card" id="more-info-bu" data-toggler=".hide">
							    <div className="card-section">
							    	<small>Bullying is when people repeatedly and intentionally use words or actions against you to cause distress and risk to your wellbeing. These actions are usually done by people who have more influence or power over you, or who want to make you feel less powerful.
									</small>
								</div>
							</div>
						</fieldset>
            		</Helper>

            		<Element refCallback={this.addSidebarRefs} clickHandler={this.showHelp} helper="q_5">
            			<div className="grid-x">
	            			<div className="cell medium-shrink">
	            				on this date &nbsp;
	            			</div>
	            			<div className="cell medium-auto">
		            			<Field 
		            				component={ShowChoicesNew} 
		            				name="q_5"
		            			/>
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
							            startDate={moment(this.state.startDate)}
							            selected={moment(this.state.endDate)}
							            onChange={this.handleDateChange.bind(this, "endDate")}
							            className="form-control"
							          />
								</div>
							</div>
					    	<label className="margin-bottom-0"><Field component="input" type="radio" name="q_5" value="I don't remember" />I don't remember</label>
						</fieldset>
            		</Helper>
            		<Element refCallback={this.addSidebarRefs} clickHandler={this.showHelp} helper="q_4">
            			<div className="grid-x">
	            			<div className="cell medium-shrink">
	            				This happened at &nbsp;
	            			</div>
	            			<div className="cell medium-auto">
		            			<Field 
		            				component={ShowChoicesNew} 
		            				name="q_4"
		            				error="warning"
			            			errorText="We would like to know where you were treated unfairly"
		            			/>
	            			</div>
	            		</div>
            		</Element>
            		<Helper sidebar={stickySidebar} showHelp={this.showHilight} id="q_4" isShown={this.state.sideBar} isMobile={this.isMobile()}>
            			<h4>Please choose one location:</h4>
            			<fieldset>
		            		<ReduxRadioGroup 
		            			other
		            			data={[
							    	{value : "Work", displayName : "Work" },
							    	{value : "School, university, tafe college or training institution", displayName : "An education institution (e.g. school, tafe, college, university, or any training institutions)" },
							    	{value : "Hospital or a medical clinic", displayName : "A hospital or medical clinic (e.g. dental clinic, physiotherapy clinic, nutritionist)" },
							    	{value : "A store or venue", displayName : "A store or venue (e.g. shops, cinemas, bars, clubs, restaurants, massage parlors, hairdresser)" },
							    	{value : "Service Provider", displayName : "With a service provider (e.g. Public transport, car ride services such as Uber, Didi, internet providers, mobile services)" },
							    	{value : "Accommodation", displayName : "Any accommodation (e.g. rental property, commercial property, hotel or motel, camping or caravan sites, boarding houses or hostels, public housing, mobile homes or mobile home sites" },
							    	{value : "Local government", displayName : "A local government (e.g. local council, VicRoads, Department of Health and Human Services, State Revenue Office)" },
							    	{value : "Sporting activities", displayName : "A sporting event, game or activity (e.g. sports clubs, participatingin sports games, coaching teams)" },
							    	{value : "Club", displayName : "A club (e.g. social, literary, cultural, political, sporting clubs which have more than 30 members, has a liquor licence and operates mainly from its own funds)" }
						    	]}
						    	changeHandler={this.areaChange}
						    	name="q_4"
						    />
						</fieldset>
            		</Helper>
            		<Element refCallback={this.addSidebarRefs} clickHandler={this.showHelp} helper="q_6_organisation">
            			<div className="grid-x">
	            			<div className="cell medium-shrink">
	            				The name of this organisation is &nbsp;
	            			</div>
	            			<div className="cell medium-auto">
		            			<Field
						            name="q_6_organisation"
						            component="input"
						            type="text"
						            placeholder="Enter organisation name"
						        />
		            		</div>
	            		</div>
            		</Element>
            		<Helper sidebar={stickySidebar} showHelp={this.showHilight} id="q_6_organisation" isShown={this.state.sideBar} isMobile={this.isMobile()}>
            			<p>Please tell us the name of the organisation where this incident happenedto you. </p>

						<p>For example, if this happened at a coffee shop, then write down the name of this coffee shop. If this happened at work, then write down the name of the organisation you work for. </p>

						<p>If you cannot identify the name of the organisation, then put 'I don't know'. </p>
            		</Helper>
            		<Element refCallback={this.addSidebarRefs} clickHandler={this.showHelp} helper="q_6">
            			<div className="grid-x">
	            			<div className="cell medium-shrink">
	            				I want to make a complaint about &nbsp;
	            			</div>
	            			<div className="cell medium-auto">
		            			<Field component={ShowChoicesNew} name="q_6"/>
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
            		<Element refCallback={this.addSidebarRefs} clickHandler={this.showHelp} helper="q_7">
            			<div className="grid-x">
	            			<div className="cell medium-shrink">
	            				I believe I was treated this way because of my
	            			</div>
	            		</div>            			<div className="grid-x">
	            			<div className="cell auto">
		            			<Field 
		            				name="q_7" 
		            				component={ShowChoicesNew} 
		            				error="warning"
		            				errorText="You have selected a lot of reasons. Please make sure that they all apply to you before submitting the form."
		            			/>
		            		</div>
	            		</div>
            		</Element>
            		<Helper sidebar={stickySidebar} showHelp={this.showHilight} id="q_7" sidebar={stickySidebar} isShown={this.state.sideBar} isMobile={this.isMobile()}>
            			<h4>Please choose what you believe is true, you can select more than one:</h4>
            			<fieldset>
							<ReduxCheckboxGroupInfoBox 
								other
		            			data={[
							    	{ 
							    		value : "Race", 
							    		displayName : "Race, skin color, ethnicity, nationality, where I came from, or my culture" ,
							    		moreInfo : "George unsuccessfully applies for a position with a construction company. When he telephones the company’s personnel manager to ask why he did not get the position, George is told: ‘We’ve employed people from your country before. You lot simply don’t share our work ethic’."
							    	},
									{ 
										value : "Religion", 
										displayName : "Religious beliefs or association" ,
										moreInfo : "Mariam is a Muslim. At a job interview with an insurance company she is asked about her religious background. Even though Mariam is the best candidate, the HR manager tells her he cannot offer her the job because he thinks she will have to leave her workstation for prayer several times a day."
									},
									{ 
										value : "Health/Disability", 
										displayName : "Health, disability or illness (this can be mental or physical)" ,
										moreInfo : "A store requires Linh, who is vision impaired, to produce a driver’s licence as identification before it will accept her cheque to pay for goods. Linh is not eligible to have a licence because of her vision impairment. The store will not accept other forms of official identification that Linh offers."
									},
									{ 
										value : "Employment activities", 
										displayName : "Employment activities (asking for my rights or entitlements at work)" ,
										moreInfo : "Joey works at a take away food shop that has three employees. He asks the owner if he should be receiving penalty rates for time worked on Saturdays. Soon after this, Joey’s Saturday hours are reduced."
									},
									{ 
										value : "Sex/Gender", 
										displayName : "Sex/Gender" ,
										moreInfo : "Barbara applies to a bus company for a job as a bus driver. She was a transport driver in the RAAF and has plenty of experience. When the employer gives her the job he says he doubts that she will be able to hack the pace and that she will be paid less than the men until she proves herself."
									},
									{ 
										value : "LGBITQ status", 
										displayName : "LGBITQ status" ,
										moreInfo : "Maxine contacts the local sports centre to join the weekly basketball tournament and is put in touch with a team needing players. At her second game with the team Maxine’s girlfriend comes along to cheer her on. Afterwards, the team captain tells Maxine that she doesn’t want a lesbian on the team as it might upset some of the other team members."
									},
									{ 
										value : "Physical appearance", 
										displayName : "Physical appearance (how you look)" ,
										moreInfo : "A fast food company will only recruit people with a certain 'look', that is, a specific height, weight and build."
									},
									{ 
										value : "Parental/Carer status", 
										displayName : "Parental/Carer status (you are providing ongoing care to someone dependent on you)" ,
										moreInfo : "Jasmine is keen to return to work as a marketing manager after taking two years of unpaid parental leave to have her first child. She makes an appointment with her boss to talk about coming back to work, but is told there has been a restructure in the company and Jasmine’s old job no longer exists. No other jobs have changed and Jasmine suspects that her boss simply doesn’t want to have to re-employ her now that she has a young child."
									},
									{ 
										value : "Pregnancy/Breastfeeding", 
										displayName : "Pregnancy/Breastfeeding" ,
										moreInfo : "Lee goes to the movies with her baby and a friend. She breastfeeds her baby while waiting to go into the cinema. An usher tells Lee that she cannot feed her baby in the foyer because it is embarrassing other patrons."
									},
									{ 
										value : "Marital status", 
										displayName : "Marital status (you are single, married, divorced, widowed, separated, or living together with your partner)" ,
										moreInfo : "Domestic partners Peter and Jessica are refused accommodation because the landlord only wants to rent to a married couple. Peter and Jessica may lodge a complaint of discrimination based on marital status. It is possible that the landlord may need to provide an apology and agree to rent the place to them."
									},
									{ 
										value : "Political belief or association", 
										displayName : "Political belief or association" ,
										moreInfo : "At a job interview Ally is asked if she is a member of a conservative organisation. When she says no, the interviewer abruptly ends the conversation, claiming that all employees must share the employer’s political beliefs."
									},
									{ 
										value : "Union", 
										displayName : "Union (participation or association)" ,
										moreInfo : "Zoë is a shop steward at a textiles factory. She takes two years off work to have children. When she decides to re-enter the workforce she telephones the personnel manager of her former employer. Zoë is told, \"We don’t want union types around here. There’s no room for people like you in this company\"."
									},
									{ 
										value : "Personal association", 
										displayName : "Personal association with someone who could be treated unfairly because of one or more of the above reasons  " ,
										moreInfo : "Renske is harassed and bullied at school because a newspaper prints an article that says her mother has HIV. The school fails to stop the bullying and Renske eventually leaves the school."
									}
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
		            			<Field 
		            				component={ShowChoicesNew} 
		            				name="q_9"
		            				error="warning"
		            				errorText="You have selected a lot of harms. Please make sure that they all apply to you before submitting the form."
		            			/>
		            		</div>
	            		</div>
            		</Element>
            		<Helper sidebar={stickySidebar} showHelp={this.showHilight} id="q_9" isShown={this.state.sideBar} isMobile={this.isMobile()}>
            			<h4>Please select the harms you have experienced, you can tick more than one:</h4>
            			<fieldset>
            				<ReduxCheckboxGroupHarms 
		            			data={[
		            				{ value: "I was not able to participate in the activity", displayName: "I was not able to participate in the activity"},
									{ value: "My needs were ignored or rejected", displayName: "My needs were ignored or rejected"},
									{ value: "I lost money", displayName: "I lost money"},
									{ value: "I lost my reputation", displayName: "I lost my reputation"},
									{ value: "I feel disrespected", displayName: "I feel disrespected"},
									{ value: "I feel unhappy", displayName: "I feel unhappy"},
									{ value: "I did not get a fair treatment", displayName: "I did not get a fair treatment"}
		            			]}
		            			areaHarms={{
		            				"Work":
							    		[
											{ value : "I lost my job", displayName: "I lost my job"},
											{ value : "I am going to lose my job", displayName: "I am going to lose my job"},
											{ value : "My work hours were reduced", displayName: "My work hours were reduced"},
											{ value : "I was not paid", displayName: "I was not paid"},
											{ value : "I don't feel safe at work", displayName: "I don't feel safe at work"},
											{ value : "I did not get a fair chance", displayName: "I did not get a fair chance"},
											{ value : "I was denied access to an opportunity, service or venue", displayName: "I was denied access to an opportunity, service or venue"},
											{ value : "I lost my reputation", displayName: "I lost my reputation"},
											{ value : "I am stressed, unhappy or depressed", displayName: "I am stressed, unhappy or depressed"}
							    		],
									"School, university, tafe college or training institution":
										[
											{value: "I don't feel supported in class", displayName: "I don't feel supported in class"},
											{value: "I don't go to class anymore", displayName: "I don't go to class anymore"},
											{value: "I don't feel safe", displayName: "I don't feel safe"},
											{value: "My needs were ignored or rejected", displayName: "My needs were ignored or rejected"},
											{value: "I lost my reputation", displayName: "I lost my reputation"},
											{value: "I did not get a fair chance", displayName: "I did not get a fair chance"},
										],
									"Hospital or a medical clinic":
										[
											{value: "I did not receive the care I needed", displayName: "I did not receive the care I needed"},
											{value: "I was denied treatment", displayName: "I was denied treatment"},
											{value: "I was not given an appointment", displayName: "I was not given an appointment"},
											{value: "I felt disrespected", displayName: "I felt disrespected"},
										],
									"A store or venue":
										[
											{value: "I was refused service or was not able to make a purchase", displayName: "I was refused service or was not able to make a purchase"},
											{value: "I was denied entry into a venue", displayName: "I was denied entry into a venue"},
											{value: "I felt disrespected ", displayName: "I felt disrespected "},
											{value: "I lost money", displayName: "I lost money"},
											{value: "I was not treated fairly", displayName: "I was not treated fairly"}
										],
									"Service Provider":
										[
											{value: "I was refused service or was not able to make a purchase", displayName: "I was refused service or was not able to make a purchase"},
											{value: "I felt disrespected ", displayName: "I felt disrespected "},
											{value: "I lost money", displayName: "I lost money"},
											{value: "I was not treated fairly", displayName: "I was not treated fairly"}
										],
									"Accommodation":
										[
											{value: "I was not able to rent the house/flat/apartment", displayName: "I was not able to rent the house/flat/apartment"},
											{value: "I was denied access to service", displayName: "I was denied access to service"},
											{value: "I was not able to obtain accomodation", displayName: "I was not able to obtain accomodation"},
											{value: "I lost money", displayName: "I lost money"},
											{value: "I was not treated fairly", displayName: "I was not treated fairly"},
											{value: "I felt disrespected", displayName: "I felt disrespected "}
										],
									"Local government":
										[
											{value: "I was not able to access the service I needed", displayName: "I was not able to access the service I needed"},
											{value: "I lost money", displayName: "I lost money"},
											{value: "I lost my reputation", displayName: "I lost my reputation"},
											{value: "I felt disrespected", displayName: "I felt disrespected"},
											{value: "I was not treated fairly", displayName: "I was not treated fairly"}
										],
									"Sporting activities":
										[
											{value: "I was not able to participate in a sports game or activity", displayName: "I was not able to participate in a sports game or activity"},
											{value: "I was denied entry", displayName: "I was denied entry"},
											{value: "My membership was rejected or cancelled", displayName: "My membership was rejected or cancelled"},
											{value: "I was not treated fairly", displayName: "I was not treated fairly"},
											{value: "I lost money", displayName: "I lost money"},
											{value: "I lost my reputation", displayName: "I lost my reputation"},
											{value: "I felt disrepected", displayName: "I felt disrepected"},
										],
									"Club":
										[
											{value: "I was denied entry or participaton", displayName: "I was denied entry or participaton"},
											{value: "My membership was rejected or cancelled", displayName: "My membership was rejected or cancelled"},
											{value: "I was not treated fairly", displayName: "I was not treated fairly"},
											{value: "I lost money", displayName: "I lost money"},
											{value: "I lost my reputation", displayName: "I lost my reputation"},
											{value: "I felt disrepected", displayName: "I felt disrepected"}
										],
									"Other":
										[
											{value: "I was not able to access the service I needed", displayName: "I was not able to access the service I needed"},
											{value: "I lost money", displayName: "I lost money"},
											{value: "I lost my reputation", displayName: "I lost my reputation"},
											{value: "I felt disrespected", displayName: "I felt disrespected"},
											{value: "I was not treated fairly", displayName: "I was not treated fairly"}
										],
									}}
		            			name="q_9"
		            			condition={this.props.areaValue}
		            			other
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
		            			<Field 
		            				name="q_10" 
		            				component={ShowChoicesNew} 
		            				error="warning"
		            				errorText="You have selected a lot of actions. Please make sure that they all apply to you before submitting the form."
		            			/>
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
							    	{value: "Give me back my work hours", displayName: "Give me back my work hours"}
								]}
								other
							/>
						</fieldset>
            		</Helper>
            		
            	</FormElement>
            	<FormElement>
            		<h3 className="padding-top-3">Section 2: Organisation Details</h3>
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
            		<h3 className="padding-top-3">Section 3. Your Details</h3>
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
            	<FormElement>
            		<h3 className="padding-top-3">Section 4: Additional Comments</h3>
            		<Element refCallback={this.addSidebarRefs} clickHandler={this.showHelp} helper="q_11">
            			<div className="grid-x">
	            			<div className="cell auto">
	            				Please provide any additional information you would like to share with the Commission.
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
            		<h3 className="padding-top-3">Document Upload</h3>
            		<Element refCallback={this.addSidebarRefs} clickHandler={this.showHelp} helper="q_14">
            			<div className="grid-x">
	            			<div className="cell auto">
	            				Attach any documents such as emails, letters, or images that are related to this matter.
	            			</div>
	            		</div>
	            		<div className="grid-x">
	            			<div className="cell auto">
		            			<Field component={FieldFileInput} name="q_14" type='file'/>
		            		</div>
	            		</div>
            		</Element>
            		<Helper sidebar={stickySidebar} showHelp={this.showHilight} id="q_14" isShown={this.state.sideBar} isMobile={this.isMobile()}>
            			<h4>doc upload text</h4>
            			<p>add something here</p>
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
Other selector
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

  	click = () => {
  		this.props.clickHandler.bind(this, this.props.helper, this.myRef)
  	}

  	render(){
		return(
			<div 
				ref={this.myRef} 
				aria-describedby={this.props.helper} 
				className="form_element padding-0 padding-left-1" 
				onFocus={this.props.clickHandler.bind(this, this.props.helper, this.myRef)} 
				onClick={this.props.clickHandler.bind(this, this.props.helper, this.myRef)}
			>
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
    	//$("#sidebar").foundation();
    	if(this.props.sidebar) this.props.sidebar.updateSticky();

    }
    componentDidUpdate(){
    	if (this.props.id == this.props.isShown){
    		this.props.showHelp(this.props.id)
    		// $("#"+this.props.id)
    		// 	.find('input')
    		// 	.first()
    		// 	.focus()
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
    	this.state = {
    		showError : false,
    		val : 'choose'
    	}
    }

	anchorClick = (e) => {
    	e.preventDefault()
   		$("#"+this.props.field)
   			.find('input')
   			.first()
   			.focus()    	
    }

    /*
	helper function to conver a checkbox object into a comma seperated string
	*/

    objToString = (obj) => {
		let out = [];
		Object.keys(obj).map((key) => {
			if (obj[key]) out.push(key);
		})
		if(out.length > 4 && !this.state.showError) {
			this.setState({ showError: true });
		}else if(out.length <= 4 && this.state.showError){
			this.setState({ showError: false });
		}
		return out.join(", ");
	}

	componentDidUpdate(){
		let val = this.props.formData[this.props.field];
		if(typeof(val) == 'object') val = this.objToString(val);
		if(this.state.val != val ) this.setState({val: val})
	}
	
	render(){
		return(
			<React.Fragment>
				<a className="button expanded hollow" onClick={this.anchorClick} href="#">{this.state.val ? this.state.val : 'Choose...' }</a>
				{ this.state.showError && <div className={"callout "+this.props.error} ><small>{this.props.errorText}</small></div>}
			</React.Fragment>
		)
	}
}

class ShowChoicesNew extends React.Component{
	constructor(props) {
    	super(props);
    	this.state = {
    		showError : false,
    		val : 'Choose...'
    	}
    }

	anchorClick = (e) => {
    	e.preventDefault()
		$("#"+this.name)
			.find('input')
			.first()
			.focus()    	
    }

    componentDidMount(){
    	this.setVals()
    }

    componentDidUpdate(){
		this.setVals()
	}

    setVals(){
    	let val = this.props.input.value;
		if(typeof(val) == 'object') val = this.objToString(val);
		if(this.state.val != val ) this.setState({val: val})
    }

    /*
	helper function to conver a checkbox object into a comma seperated string
	*/

    objToString = (obj) => {
		let out = [];
		Object.keys(obj).map((key) => {
			if (obj[key]) out.push(key);
		})
		if(out.length > 4 && !this.state.showError) {
			this.setState({ showError: true });
		}else if(out.length <= 4 && this.state.showError){
			this.setState({ showError: false });
		}
		return out.join(", ");
	}
	
	render(){
		return(
			<React.Fragment>
				<a className="button expanded hollow" onClick={this.anchorClick} href="#">{this.state.val ? this.state.val : 'Choose...' }</a>
				{ this.state.showError && <div className={"callout "+this.props.error} ><small>{this.props.errorText}</small></div>}
			</React.Fragment>
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
	return (
		<FormSection name={props.name}>
			{ props.data.map(
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

class ReduxCheckboxGroupHarms extends React.Component {
	/*
	psuedocode 
	when area is changed fire event that will clear "q_9" checkboxes
	*/
	componentWillUnmount(){
		console.log('unmount')
	}
	render(){
		console.log(this.props.condition);
		return (
			<FormSection name={this.props.name}>
				{ this.props.areaHarms[this.props.condition].map(
				 	(item, idx) => 
						<label key={idx} className="margin-bottom-1">
							<Field 
							component="input" 
							type="checkbox" 
							name={item.value} />&ensp;{item.displayName}
						</label>
				    )
				}
				{ this.props.other &&
					<OtherField name={this.props.name} type="checkbox" />
				}
			</FormSection>
		)
	}
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
class FieldFileInput extends React.Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        const { input: { onChange } } = this.props
        onChange(e.target.files[0])
    }

    render() {
        const { input: { value } } = this.props
        const { input, label, required, meta, } = this.props //whatever props you send to the component from redux-form Field
        return (
            <div><label>{label}</label>
		     <div>
		       <input
		        type='file'
		        accept='.jpg, .png, .jpeg, .pdf, .docx, .doc, .txt'
		        onChange={this.onChange}
		       />
		     </div>
		     </div>
        )
    }
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

/* dummy test data */
const testData = {};

/*
const testData = {
  "q_1": "Myself",
  "q_2": "test user",
  "q_3": "Bullied",
  "q_5": "On this date",
  "q_5_single": "December 28th 2018",
  "q_6": "Individual(s)",
  "q_7": {
    "Race": true,
    "Religion": true,
    "Health/Disability": true
  },
  // "q_8": "an example\nanother example",
  "q_10": {
    "Apologise": true,
    "Give me financial compensation/money": true
  },
  "q_11": "some more info",
  "q_12": {
    "org_name": "some company",
    "org_number": "1234567890",
    "org_email": "1@2.com",
    "organisation_address": {
      "address1": "123 something st",
      "suburb": "somewhere",
      "postcode": "3333",
      "address2": "unit 1"
    },
    "individuals": [
      {
        "firstName": "an",
        "lastName": "individual"
      },
      {
        "firstName": "another",
        "lastName": "individual"
      }
    ]
  },
  "q_13": {
    "title": "Mr",
    "contact_number": "0987654321",
    "contact_email": "test@user.com",
    "personal_address": {
      "address1": "123 blah blah",
      "address2": "blah",
      "suburb": "collingwood",
      "postcode": "3066"
    },
    "Interpreter Service": true,
    "Accessible Documents": true,
    "TTY": true,
    "Other": true
  }
}
*/

ComplaintPortal = reduxForm({
  form: 'complaintForm',
  destroyOnUnmount: false,
  initialValues : testData
})(ComplaintPortal);

/* EXTRACT VALUES */

const selector = formValueSelector('complaintForm') 

ComplaintPortal = connect( state => {
	let areaValue = selector(state, "q_4") || "Other";
	let whoFor = selector(state, "q_1");
	return {areaValue, whoFor};
})(ComplaintPortal)


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
