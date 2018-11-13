import React from "react";
import ReactDOM from "react-dom";

import "./scss/style.scss";
import $ from "jquery";
import Foundation from "foundation-sites";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import StickySidebar from 'sticky-sidebar';

import 'react-datepicker/dist/react-datepicker.css';


/***

MULTI PART FORM

***/


class ComplaintPortal extends React.Component {
	constructor () {
        super()
        this.state = { 
          sideBar: "q_1",
          sidebars: {},
          mobile: false,
          formData: {
          	
          }
        }
        this.formStateUpdate = this.formStateUpdate.bind(this);
        this.showHelp = this.showHelp.bind(this);
        this.handleRadioChanged = this.handleRadioChanged.bind(this);
        this.handleCheckboxChanged = this.handleCheckboxChanged.bind(this);
    }

    // showSidebar (html, id) {
    // 	let sidebars = this.state.sidebars;
    // 	sidebars[id] = html;
    // 	//console.log(sidebars)
    // 	this.setState({sidebars : sidebars})
    // }

    // function to prevent default actions
    anchorClick (e){
    	e.preventDefault()
    }

    // sidebar 
    showHelp (id) {
    	this.setState({sideBar: id})
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
    	// let formData = this.state.formData;
    	// formData[key] = val;
     //    this.setState(formData)
        this.setState({
        	formData: {
        		...this.state.formData,
        		 [key]: val
        	}
        });
    }


	
	render() {
		return(
			<React.Fragment>
				<FormElement>
            		<h3>Q1. Who are you lodging a complaint for?</h3>
            		<Element clickHandler={this.showHelp} helper="q_1">
						{/*<RadioGroup 
							radioData={{
					          	name: "step2",
					          	items: [
					          		{id: "val1", value: "Myself"},
					          		{id: "val2", value: "For someone else"}
					          	]
					        }} 
							value={this.state.formData.q_2.radio.value} 
							onChange={this.handleRadioChanged}
						/>*/}
            			<fieldset>
						    <input type="radio" name="who_for" value="Myself" id="fe_1" onChange={this.handleRadioChanged} />
						    <label htmlFor="fe_1">Myself</label>
						    <input type="radio" name="who_for" value="Someone Else" id="fe_2" onChange={this.handleRadioChanged} />
						    <label htmlFor="fe_2">Someone Else</label>
						</fieldset>
            		</Element>
            		<Helper id="q_1" isShown={this.state.sideBar} isMobile={this.state.mobile}>
            			<h4>Tips</h4>
            			<p>If you are lodging a complaint for someone else, you
						may need to provide a consent form if you are not
						a parent or carer of that person.</p>
            		</Helper>
            	</FormElement>
            	<br/>
            	<FormElement>
            		<h3>Q2. What happened to you?</h3>
            		<Element clickHandler={this.showHelp} helper="q_2">
            			<div className="grid-x">
	            			<div className="cell shrink">
	            				My name is &nbsp;
	            			</div>
	            			<div className="cell auto">
		            			<input type="text" name="form_name" placeholder="Type your full name"/>
		            		</div>
	            		</div>
            		</Element>
            		<Helper id="q_2" isShown={this.state.sideBar} isMobile={this.state.mobile}>
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
		            			<ShowChoices field="q_3" formData={this.state.formData}/>
	            			</div>
	            		</div>
            		</Element>
            		<Helper id="q_3" isShown={this.state.sideBar} isMobile={this.state.mobile}>
            			<h4>Please choose one of the following:</h4>
            			<fieldset className="large-6 cell">
						    <label className="margin-bottom-1"><input data-key={0} type="radio" name="q_3" onChange={this.handleRadioChanged} value="Bullied"/> Bullied</label>
						    <label className="margin-bottom-1"><input data-key={1} type="radio" name="q_3" onChange={this.handleRadioChanged} value="Treated unfairly"/> Treated unfairly</label>
						    <label className="margin-bottom-1"><input data-key={2} type="radio" name="q_3" onChange={this.handleRadioChanged} value="Sexually harassed"/> Sexually harassed <a className="tiny button primary" href="#" data-toggle="more-info-sh">?</a></label>
						    <p className="hide" id="more-info-sh" data-toggler=".hide">
						    	<small>Under the Equal Opportunity Act 2010, sexual harassment is defined as:
								<br/>an unwelcome sexual advance
								<br/>an unwelcome request for sexual favours
								<br/>any other unwelcome conduct of a sexual nature
								<br/>
								which would lead a reasonable person to experience offence, humiliation or intimidation. It can be physical, verbal, or written.</small>
							</p>
						    <label className="margin-bottom-1"><input data-key={3} type="radio" name="q_3" onChange={this.handleRadioChanged} value="Victimised"/> Victimised <a className="tiny button primary" href="#" data-toggle="more-info-vi">?</a></label>
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
		            			<ShowChoices field="q_4" formData={this.state.formData}/>
	            			</div>
	            		</div>
            		</Element>
            		<Helper id="q_4" isShown={this.state.sideBar} isMobile={this.state.mobile}>
            			<h4>Please choose one location:</h4>
            			<fieldset>
					    	<label className="margin-bottom-1"><input type="radio" name="q_4" value="Work" onChange={this.handleRadioChanged}/>Work</label>
					    	<label className="margin-bottom-1"><input type="radio" name="q_4" value="School, university, tafe college or training institution" onChange={this.handleRadioChanged}/>School, university, tafe college or training institution</label>
					    	<label className="margin-bottom-1"><input type="radio" name="q_4" value="Hospital or a medical clinic" onChange={this.handleRadioChanged}/>Hospital or a medical clinic</label>
					    	<label className="margin-bottom-1"><input type="radio" name="q_4" value="A store or venue" onChange={this.handleRadioChanged}/>A store or venue (where you pay to purchase a product or gain access to a service)</label>
					    	<label className="margin-bottom-1"><input type="radio" name="q_4" value="Public transport" onChange={this.handleRadioChanged}/>Public transport</label>
					    	<label className="margin-bottom-1"><input type="radio" name="q_4" value="Accommodation " onChange={this.handleRadioChanged}/>Accommodation such as public housing or real estate agents</label>
					    	<label className="margin-bottom-1"><input type="radio" name="q_4" value="Local government" onChange={this.handleRadioChanged}/>Local government (e.g. local council)</label>
					    	<label className="margin-bottom-1"><input type="radio" name="q_4" value="Sporting activities" onChange={this.handleRadioChanged}/>Sporting activities such as sports events or games</label>
					    	<label className="margin-bottom-1"><input type="radio" name="q_4" value="" onChange={this.handleRadioChanged}/>Club (for social, literary, cultural, political, sporting, or other lawful purposes.</label>
					    	<label className="margin-bottom-1"><input type="radio" name="q_4" value="" onChange={this.handleRadioChanged}/>Other</label>
					    	<input type="text" name="q4_other" placeholder="Please Specify"/>
						</fieldset>
            		</Helper>
            		<Element clickHandler={this.showHelp} helper="q_5">
            			<div className="grid-x">
	            			<div className="cell shrink">
	            				The date this happened was &nbsp;
	            			</div>
	            			<div className="cell auto">
		            			<a className="button expanded hollow" onClick={this.anchorClick} href="#">Choose...</a>
		            		</div>
	            		</div>
            		</Element>
            		<Helper id="q_5" isShown={this.state.sideBar} isMobile={this.state.mobile}>
            			<h4>Please select a date:</h4>
            			<fieldset>
					    	<label className="margin-bottom-0"><input type="radio" name="q_5" value="On this date" />On this date</label>
					    	<DatePicker
							    selected={this.state.startDate}
							    onChange={this.handleChange}
							/>
					    	<label className="margin-bottom-0"><input type="radio" name="q_5" value="Between these dates" />Between these dates</label>
					    	<div className="grid-x">
		            			<div className="cell ">
							    	<DatePicker
									    selected={this.state.startDate}
									    onChange={this.handleChange}
									/>
								</div>
								<div className="cell ">
									<DatePicker
									    selected={this.state.startDate}
									    onChange={this.handleChange}
									/>
								</div>
							</div>
					    	<label className="margin-bottom-0"><input type="radio" name="q_5" value="I don't remember" />I don't remember</label>
						</fieldset>
            		</Helper>
            		<Element clickHandler={this.showHelp} helper="q_6">
            			<div className="grid-x">
	            			<div className="cell shrink">
	            				I want to make a complaint about the &nbsp;
	            			</div>
	            			<div className="cell auto">
		            			<ShowChoices field="q_6" formData={this.state.formData}/>
		            		</div>
	            		</div>
            		</Element>
            		<Helper id="q_6" isShown={this.state.sideBar} isMobile={this.state.mobile}>
            			<h4>Who are you making a complaint about?</h4>
            			<fieldset>
					    	<label className="margin-bottom-0"><input type="radio" name="q_6" onChange={this.handleRadioChanged} value="Individual(s)" />Individual(s)</label>

					    	<label className="margin-bottom-0"><input type="radio" name="q_6" onChange={this.handleRadioChanged} value="Organisation" />Organisation</label>

						</fieldset>
            		</Helper>
            		<Element clickHandler={this.showHelp} helper="q_3">
            			<div className="grid-x">
	            			<div className="cell shrink">
	            				I believe I was &nbsp;
	            			</div>
	            			<div className="cell auto">
		            			<ShowChoices field="q_3" formData={this.state.formData}/>
	            			</div>
	            			<div className="cell shrink">
	            				&nbsp; because of my
	            			</div>
	            		</div>
            		</Element>
            		<Element clickHandler={this.showHelp} helper="q_7">
            			<div className="grid-x">
	            			<div className="cell auto">
		            			<ShowChoices field="q_7" formData={this.state.formData}/>
		            		</div>
	            		</div>
            		</Element>
            		<Helper id="q_7" isShown={this.state.sideBar} isMobile={this.state.mobile}>
            			<h4>Please choose what you believe is true, you can select more than one:</h4>
            			<fieldset>

					    	<label className="margin-bottom-0"><input type="checkbox" name="q_7" value="Race" onChange={this.handleCheckboxChanged} />Race, skin color, ethnicity, nationality, where I came from, or my culture</label>

							<label className="margin-bottom-0"><input type="checkbox" name="q_7" value="Religion" onChange={this.handleCheckboxChanged} />Religious beliefs or association</label>

							<label className="margin-bottom-0"><input type="checkbox" name="q_7" value="Health/Disability" onChange={this.handleCheckboxChanged} />Health, disability or illness (this can be mental or physical)</label>

							<label className="margin-bottom-0"><input type="checkbox" name="q_7" value="Employment activities" onChange={this.handleCheckboxChanged} />Employment activities (asking for my rights or entitlements at work)</label>

							<label className="margin-bottom-0"><input type="checkbox" name="q_7" value="Sex/Gender" onChange={this.handleCheckboxChanged} />Sex/Gender</label>

							<label className="margin-bottom-0"><input type="checkbox" name="q_7" value="LGBITQ status" onChange={this.handleCheckboxChanged} />LGBITQ status</label>

							<label className="margin-bottom-0"><input type="checkbox" name="q_7" value="Physical appearance" onChange={this.handleCheckboxChanged} />Physical appearance (how you look)</label>

							<label className="margin-bottom-0"><input type="checkbox" name="q_7" value="Parental/Carer status" onChange={this.handleCheckboxChanged} />Parental/Carer status (you are providing ongoing care to someone dependent on you)</label>

							<label className="margin-bottom-0"><input type="checkbox" name="q_7" value="Pregnancy/Breastfeeding" onChange={this.handleCheckboxChanged} />Pregnancy/Breastfeeding</label>

							<label className="margin-bottom-0"><input type="checkbox" name="q_7" value="Marital status" onChange={this.handleCheckboxChanged} />Marital status (you are single, married, divorced, widowed, separated, or living together with your partner)</label>

							<label className="margin-bottom-0"><input type="checkbox" name="q_7" value="Political belief or association" onChange={this.handleCheckboxChanged} />Political belief or association</label>

							<label className="margin-bottom-0"><input type="checkbox" name="q_7" value="Union" onChange={this.handleCheckboxChanged} />Union (participation or association)</label>

							<label className="margin-bottom-0"><input type="checkbox" name="q_7" value="Personal association" onChange={this.handleCheckboxChanged} />Personal association with someone who could be treated unfairly because of one or more of the above reasons  </label>

							<label className="margin-bottom-0"><input type="checkbox" name="q_7" value="Other" onChange={this.handleCheckboxChanged} />Other</label>

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
		            			<textarea rows="5" placeholder="None"></textarea>
		            		</div>
	            		</div>
            		</Element>
            		<Helper id="q_8" isShown={this.state.sideBar} isMobile={this.state.mobile}>
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
		            			<ShowChoices field="q_9" formData={this.state.formData}/>
		            		</div>
	            		</div>
            		</Element>
            		<Helper id="q_9" isShown={this.state.sideBar} isMobile={this.state.mobile}>
            			<h4>Please select the harms you have experienced, you can tick more than one:</h4>
            			<fieldset>

					    	<label className="margin-bottom-0"><input type="checkbox" name="q_9" onChange={this.handleCheckboxChanged} value="I was not able to participate in the activity" />I was not able to participate in the activity</label>

							<label className="margin-bottom-0"><input type="checkbox" name="q_9" onChange={this.handleCheckboxChanged} value="My needs were ignored or rejected" />My needs were ignored or rejected</label>

							<label className="margin-bottom-0"><input type="checkbox" name="q_9" onChange={this.handleCheckboxChanged} value="I lost money" />I lost money</label>

							<label className="margin-bottom-0"><input type="checkbox" name="q_9" onChange={this.handleCheckboxChanged} value="I lost my reputation" />I lost my reputation</label>

							<label className="margin-bottom-0"><input type="checkbox" name="q_9" onChange={this.handleCheckboxChanged} value="I feel disrespected" />I feel disrespected</label>

							<label className="margin-bottom-0"><input type="checkbox" name="q_9" onChange={this.handleCheckboxChanged} value="I feel unhappy" />I feel unhappy</label>

							<label className="margin-bottom-0"><input type="checkbox" name="q_9" onChange={this.handleCheckboxChanged} value="I did not get a fair treatment" />I did not get a fair treatment</label>

							<label className="margin-bottom-0"><input type="checkbox" name="q_9" onChange={this.handleCheckboxChanged} value="Other" />Other</label>


						</fieldset>
            		</Helper>
            		
            	</FormElement>
            	<div className="padding-3">&nbsp;</div>
            	<div className="padding-3">&nbsp;</div>
            	<div className="padding-3">&nbsp;</div>
		    </React.Fragment>
		)
	}
}

class FormElement extends React.Component{
	constructor(props) {
    	super(props);
    	console.log(this.props.children)
    }	
	render(){
		return this.props.children
	}
}

class Element extends React.Component{
	render(){
		return(
			<div className="form_element padding-0 padding-left-1" onClick={this.props.clickHandler.bind(this, this.props.helper)}>
				{this.props.children}
			</div>
		)
	}
}

class Helper extends React.Component{
	constructor(props) {
    	super(props);
    	//this.props.setSide(this.props.children, this.props.id);
    	this.el = document.createElement('div');
    	//if (!this.props.isMobile) this.props.setSide(this.props.children, this.props.id);
  	}

  	showhelp(){
  		console.log("diggy");
  	}

    componentDidMount(){
    	$("#sidebar").foundation()
    	//stickySidebar.updateSticky();
    }
	
	render(){
		let children = this.props.children
		if (this.props.id == this.props.isShown) {
			return (
				<div className={!this.props.isMobile ? "show-for-sr helper" : "helper"}>
			 		{children}
			 		{ReactDOM.createPortal(children, sidebarNode)}
			 	</div>
			)
		} else{
			return(
				<div className={!this.props.isMobile ? "show-for-sr helper" : "helper"}>
				</div>
			)

		}
	}
}

class ShowChoices extends React.Component{
	constructor(props) {
    	super(props);
    }
	anchorClick (e){
    	e.preventDefault()
    }
	render(){
		let val = this.props.formData[this.props.field];
		if(Array.isArray(val)) val = val.join(", ");
		return(
			<a className="button expanded hollow" onClick={this.anchorClick} href="#">{val ? val : 'Choose...' }</a>
		)
	}
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


/** RENDER CODE **/

let mountNode = document.getElementById("app"),
	sidebarNode = document.getElementById("sidebar");



ReactDOM.render(<ComplaintPortal />, mountNode);
//ReactDOM.render(<ProgressBar formValues={formData} />, document.getElementById("progress"));
//let sidebar = new StickySidebar('#sidebar_holder', {topSpacing: 1});


var sidebar = document.getElementById('sidebar_holder');

var stickySidebar = new StickySidebar(sidebar);

sidebar.addEventListener('affix.top.stickySidebar', function () {
    //console.log('Sidebar has stuck top of viewport.');
});

sidebar.addEventListener('affix.bottom.stickySidebar', function (event) {
    //console.log('Sidebar has stuck bottom of viewport.');
});

$(document).ready(function(){
	$(document).foundation();
	//
});
