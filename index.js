import React from "react";
import ReactDOM from "react-dom";
import { reduxForm, Field, FormSection, propTypes, formValueSelector, formValues, clearFields, change } from 'redux-form';
import { Provider, connect } from "react-redux";
import { createStore, combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';


import "./scss/style.scss";
import $ from "jquery";
import Foundation from "foundation-sites";
import moment from 'moment';
import StickySidebar from 'sticky-sidebar';


/* custom components */

import { FormElement, Element, Helper } from './components/form_render.jsx';
import { renderField, FieldArraysForm, renderIndividuals } from './components/form_org_and_ind.jsx';
import Address from "./components/form_address.jsx";
import datePicker from "./components/field_datepicker.jsx";
import { ReduxRadioGroup, ReduxCheckboxGroup, ReduxCheckboxGroupInfoBox, OtherField } from './components/fields_repeating_other.jsx';
import ShowChoicesNew from './components/form_choice_button.jsx';
import ContextSensitiveExamples from './components/context_sensitive_examples.jsx';

/***

COMPLAINT FORM

Submit is handled by "showResults" function

***/

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
    	console.log('highlight change');
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
	    		this.mobileScrollTo(id, os);
	    	}
    	}
    }

    mobileScrollTo(id, os){
    	if(id != this.state.sideBar) $(window).scrollTop(os.top)
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
//		console.log(this.isMobile());
		this.setState({ width: target.innerWidth })
	}

	isMobile = () => {
		return this.state.width <= 1024;
	}

	componentWillUnmount(){
		window.removeEventListener("resize", this.handleResize )
	}

	
	render() {
//		console.log('render!');
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
            			<p>You have selected to make a complaint on behalf of an individual or a group of people.</p>
						<p>Please provide us your details in case the Commission needs to contact you for further information. A copy of this form will be sent to the email you provided.</p>
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
            			<p>Your story is important to us, by sharing your experience with the Commission, we are better able to help you resolve your dispute.</p>
						<p>Our guided form will assist you in telling your story. If there is more information you would like to share with the Commission, you can do so in Section 4 of this form.</p>
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
					    	<p>It's okay if you do not remember. You can still submit your application.</p>
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
							<ReduxCheckboxGroup 
								other
		            			data={[
							    	{ 
							    		value : "Race", 
							    		displayName : "Race, skin color, ethnicity, nationality, where I came from (e.g. I have dark colored skin, I come from a war torn country,)" ,
							    	},
									{ 
										value : "Religion", 
										displayName : "Religious beliefs or activity (Whether or not I have a religious belief,or choose to take part in any religious activities e.g. praying)." ,
									},
									{ 
										value : "Health/Disability", 
										displayName : "Health, illness or disability (I have a physical or mental illness whichcan be a temporary or permanent health issue e.g. a broken limb, cold or flu, depression, vision impairment, epilepsy)." ,
									},
									{ 
										value : "Employment activities", 
										displayName : "Employment activities (e.g. I asked for a pay rise or penalty rates, applied for flexible work, went on sick leave or annual leave)." ,
									},
									{ 
										value : "Parental/Carer status", 
										displayName : "Carer and parental status (I have substantial responsibility for ongoing care and support for a child, partner, parent, relative or friend. This does not apply to if you are paid to provide care)." ,
									},
									{ 
										value : "Pregnancy/Breastfeeding", 
										displayName : "Pregnancy or breastfeeding (I am pregnant or may become pregnant, or I am breastfeeding a child or expressing milk)." ,
									},
									{ 
										value : "Sex/Gender", 
										displayName : "Sex (I am treated unfairly because I'm a woman or because I'm associated with carer responsibilities, pregnancy and breastfeeding, or because I'm a man)." ,
									},
									{ 
										value : "LGBITQ identity", 
										displayName : "LGBTIQ identity (I identify as a member of the other sex, as a lesbian, gay, bisexual, transgender, intersex, or questioning)." ,
									},
									{ 
										value : "Physical features", 
										displayName : "Physical features (e.g. my height, weight, size, or shape of my body. These also include facial features, hair and birthmarks)." ,
									},
									{ 
										value : "Marital status", 
										displayName : "Marital status (e.g. I am single, married, divorced, widowed, separated, or living together with my partner)." ,
									},
									{ 
										value : "Political belief or association", 
										displayName : "Political belief or activity (I may or may not have a political belief, be a member of a political party, or take part in political action)." ,
									},
									{ 
										value : "Union", 
										displayName : "Union activities (I am a union member, or I participated in strikes, marches, or undertook any lawful union related activities)." ,
									},
									{ 
										value : "Lawful sexual activity", 
										displayName : "Lawful sexual activity (I taking part in or not take part in any form of sexual activity that is legal in Victoria, including legal sex work e.g. I work in a competitive scientific field, when my employer discovered I was in a relationship with a staff member from a rival company, he sacked me because he was afraid I was \"giving away trade secrets to the competition\"." ,
									},
									{ 
										value : "Expunged homosexual conviction", 
										displayName : "Expunged homosexual conviction (I was convicted of certain sexual or public morality offences prior to 1981)" ,
									},
									{ 
										value : "Personal association", 
										displayName : "I have personal association with someone who could be treated unfairly because of one or more of the above reasons (e.g. I applied for a role at the bank and was rejected because the bank  was uncomfortable that my brother is a trade union official)." ,
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
            			<h5>Please provide some examples of when they treated you this way.</h5>

						<p><small>Below are some examples provided by other people, it may help you write your own examples.</small></p>
            			<ContextSensitiveExamples 
            				context={this.props.areaValue} 
            				defaultChoice="Other"
            				choices={
            					{
            						Other : [
	            						"I noticed that the younger co-workers at the factory I work at were receiving training on new machinery. When I asked why I wasn't invited to the training sessions, my supervisor told me that I was too old to learn new tricks and should just stick to what I know.",
	            						"My friends and I, are all between the ages of 19 and 21 tried to book a cruise with a travel company but we were told that our booking would not be accepted because we are not over 21 years of age and want to travel without a legal guardian.",
	            						"I was refused entry into an advanced maths class by my highschool teacher even though I had very good grades. When I asked her, she told me it was because of where I came from and as a result, she believed I would not be able to keep up in class. "
	            					],
		            				"Work" : [
		            					"I work at a take away restaurant. When I asked the ownerif I should be receiving penalty rates for working on Saturday's, he reduced my Saturday shift hours.",
		            					"I am pregnant, I currently work for a car dealership. When I asked my manager about maternity leave entitlement, the manager later told me I was dismissed and that my position was no longer required.",
		            					"At a job interview, I mentioned that I spend a lot of time looking after my mother who has Alzheimer's disease. The interviewer ended the interview saying, 'I'm sorry, we can't afford to employ people with heavy carer responsibilities'."
		            				],
									"School, university, tafe college or training institution" : [
										"I am studying in university and I've just enrolled in a politics and international relations subject. My class is currently studying the conflict in my home country. My tutor frequently makes derogatory comments about people in my country while looking and pointing at me. This makes me feel very uncomfortable.",
										"I am a year 11 student. I submitted an assignment for my politics class which supports making euthanasia legal and a political party that advocates for law reform in this area. My teacher became concerned about my political beliefs and told the principal, who then suspended me because of my political views.",
										"I am hassled and bullied at school because a newspaper printed an article that says my mother has HIV. I have told the school but they failed to stop the bullying. I don't feel safe at school and now I've stopped going to class."
									],
									"Hospital or a medical clinic" : [
										"I was feeling unwell, when I called the medical clinic to make an appointment to see the doctor this week, the receptionist told me they had no available appointments. When I asked my friend, who had no accent, to call for me, they told her they had appointments available all week.",
										"I was feeling very ill and when I went to see the doctor, he wasn't interested in learning about my illness and sent me away very quickly, I felt that he did not give me the care I needed and treated me this way because of my race.",
										"I am Aboriginal, I went to a medical clinic for a consultation which was organised by a Community Health Service. The Community Health Service was going to pay for my appointment. When the doctor saw that I was Aboriginal, he demanded payment for the appointment immediately, otherwise he would not see me. He was very intimidating and I felt that he treated his way because of my race."
									],
									"A store or venue" : [
										"I am vision impaired, but the store I visited required me to produce a driver's licence as identification before they could accept my cheque to pay for goods. I am not eligible to have a license because of my vision impairment. The store refused to accept other forms of official identification that I offered.",
										"I was with my friends waiting in line at a nightclub. When we got to the front of the line, the security guard called us racially offensive names and wouldn't let us in. He said that people from our country \"start all the fights around here\". I may have been treated unfairly because of my race, and the color of my skin.",
										"I was at the cinema with my baby and a friend. Whist we were waiting to go into the cinema, I breastfed my baby. An usher came and told me that I could not feed my baby in the foyer because it is embarassing for other patrons.",
										"My friends and I who are all Chinese were at a pharmacy to buy some vitamins which were limited to one per customer. The store assistant told us we could only buy one each and we respected this. The store assistant then followed us and told us we could not buy the same vitamins because we are all together and she believes we're going to send them overseas."
									],
									"Service Provider" : [
										"I am a young man from an African country. While I was on the train with my friends, a group of ticket inspectors got on and asked for to see our Myki cards. They didn't ask anyone else on the train. After we got off the train, they followed us out of the station. I felt intimidated and it felt like they were targetting my friends and I because of our race.",
										"I move around in a wheelchair and had to change from a train to a bus, due to issues on the train line. When I went out to the bus stop, there were no low floor express buses and I was told that I would need to get on a limited express bus which takes longer or wait (in peak hour) for a taxi. I was late for my new job."
									],
									"Accommodation" : [
										"I am vision impaired and rely on my assistance dog to get around. The staff at the hotel refused to let my assistance dog enter, even after I explained to them about my disability. ",
										"I applied for a rental property through a real estate agent and was informed that my application was successful via email. However, when I called the agent, he informed me that the property was no longer available. I believe it was because of my accent and where I came. When I asked my friend to call the agent to ask about the same property, the agent told my friend that the property was still available for rent. "
									],
									"Local government" : [
										"My neighbour made a complaint to the local council that my dog bit him. I was invited by the local council to tell my side of the story. I went to the council and was not told how to book an interpreter for myself. I requested an interpreter and I was told by the local council that my story was simple and did not require an interpreter. I am not fluent in English and really needed an interpreter to help tell my story"
									],
									"Sporting activities" : [
										"I contacted my local sports club to join the weekly basketball tournament and was put in touch with a team needing players. At my second game with the team, my girlfriend came along to cheer for me. Afterwards, the team captain told me that she doesn't want a lesbian on the team as it might upset some of the other team members. I may have been treated unfairly because of my sexual orientation.",
										"I volunteer as a coach for a junior girls soccor team. When the paretns found out that I am male, they contacted the club and insisted that I know longer coach the team, as they believed a male should not be coaching an all-girls junior team. The club president told me that while the club was sorry to lose me, it had no choice but to dismiss me as coach. I may have been treated unfairly because of my sex."
									],
									"Club" : [
										"I was set to compete in a competition being held by my Tennis Club. The competition was set down for a Saturday morning. I am Jewish and I observe the Shabbat (which is observed from Friday night until Saturday night), so I would not be able to compete. I asked the tennis club if they could move the competition to the Sunday, but they did not agree. I felt I had been indirectly discriminated against because of my religious belief. "
									]
	            				}
            				}
            			/>
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
            				<ReduxCheckboxGroup
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

ReactDOM.render(
		<Provider store={store}>
			<ComplaintPortal sidebar={updateSidebar} onSubmit={showResults}/>
		</Provider>
	, document.getElementById("app")
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
