import React from "react";
import ReactDOM from "react-dom";

import "./scss/style.scss";
import $ from "jquery";
import Foundation from "foundation-sites";
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';


/***

MULTI PART FORM

***/

let steps = ['step1','step2','step3','step4'];

let formData = {
	step1: {
		name: {
			name:'Your Name',
			value: ''
		},
		completed: false,
		nextStep: 2,
		prevStep: false
	},
	step2: {
		radio: {
			name: 'I am lodging a complaint for',
			value: ''
		},
		completed: false,
		nextStep: 3,
		prevStep: 1
	},
	step3: {
		checkbox: {
			name: "What happened? i was..",
			value: ['','','','']
		},
		completed: false,
		nextStep: 4,
		prevStep: 2
	},
	step4: {
		radio: {
			name: 'This happened to me at',
			value: ''
		},
		otherText: {
			name: 'Other place',
			value: ''
		},
		completed: false,
		nextStep: 5,
		prevStep: 3
	},
	progress: 0
};


class ComplaintForm extends React.Component {
    constructor () {
        super()
        this.state = { 
          step: 1
        }
        this.gotoStep = this.gotoStep.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.previousStep = this.previousStep.bind(this);
        this.renderBreadcrumb = this.renderBreadcrumb.bind(this);
        this.renderProgress = this.renderProgress.bind(this);


    }

    nextStep () {
	  this.setState({
	    step : this.state.step + 1
	  })
	  console.log(formData);
	  //ReactDOM.render(<ProgressBar formValues={formData} />, document.getElementById("progress"));

	}

	// Same as nextStep, but decrementing
	previousStep () {
	  this.setState({
	    step : this.state.step - 1
	  })
	}

	gotoStep (step) {
		alert();
		this.setState({
	    step : step
	  })
	}

	renderBreadcrumb(props) {
		console.log(this.props.breadcrumbHolder);
		console.log('ok1');

	  return ReactDOM.createPortal(
	    [
	      <BreadCrumbs step={this.gotoStep} />,
	    ],
	    this.props.breadcrumbHolder
	  );
	}

	renderProgress(props) {
		console.log(this.props.progressHolder);
		console.log('ok2');
	  return ReactDOM.createPortal(
	    [
	      <ProgressBar formValues={formData} />,
	    ],
	    this.props.progressHolder
	  );
	}

	render() {
	    
	  	switch (this.state.step){
			case 1:
				return (
					<StepOne formValues={formData} nextStep={this.nextStep} previousStep={this.previousStep} />	
					//{this.renderBreadcrumb}
					//{this.renderProgress}
					)
			case 2:
				return (
					<StepTwo formValues={formData} nextStep={this.nextStep} previousStep={this.previousStep} />
					//{this.renderBreadcrumb}
					//{this.renderProgress}
					)
			case 3:
				return (
					<StepThree formValues={formData} nextStep={this.nextStep} previousStep={this.previousStep} />
					//{this.renderBreadcrumb}
					//{this.renderProgress}
					)
			case 4:
				return (
					<StepFour formValues={formData} nextStep={this.nextStep} previousStep={this.previousStep} />
					//{this.renderBreadcrumb}
					//{this.renderProgress}
					)
		}
	}
}



/***

FORM STEPS

***/


class StepOne extends React.Component {
    constructor () {
        super()
        this.state = { 
          name: ''
        }
        this.handleNameChanged = this.handleNameChanged.bind(this);
        this.saveAndContinue = this.saveAndContinue.bind(this);
    }

    handleNameChanged(event) {
        this.setState({name: event.target.value})
        formData.step1.name.value = event.target.value;
    }

	saveAndContinue(event) {
		event.preventDefault();
		formData.progress = 10; 
		formData.step1.completed = true;
		this.props.nextStep();
	}

	render() {
		return (
			<form data-abide noValidate action="" >
            	<h5 className="text-center margin-bottom-3 margin-top-3"><strong>Welcome to the Commission's Online Complaints Form</strong></h5>
            	<p className="text-center margin-bottom-3">Let's start with your name</p>
            	<div className="grid-container">
	            	<div className="grid-x grid-margin-x align-center margin-bottom-3">
                        <div className="cell medium-4">
                            <InputTextValid 
                                placeHolder="Enter your name" 
                                pattern="alpha" 
                                error="Please enter your name."
                                value={this.props.formValues.step1.name.value}
                                onChange={this.handleNameChanged}
                            />
                        </div>
                    </div>
                    <div className="grid-x grid-margin-x align-center">
                        <div className="cell medium-4 text-center">
                        	<button className="button" type="submit" onClick={this.saveAndContinue} value="Submit">Continue</button>
                        </div>
                    </div>
                </div>
        	</form>
		);
	}

	componentDidMount () {
		$("#app").foundation();
	}

}



class StepTwo extends React.Component {
    constructor () {
        super()
        this.state = { 
          radio: '',
          radioGroup: {
          	name: "step2",
          	items: [
          		{id: "val1", value: "Myself"},
          		{id: "val2", value: "For someone else"}
          	]
          }
        }
        this.saveAndContinue = this.saveAndContinue.bind(this);
        this.handleRadioChanged = this.handleRadioChanged.bind(this);
    }

    handleRadioChanged (event) {
        this.setState({radio: event.target.value})
        formData.step2.radio.value = event.target.value;
    }

    render() {
		return (
			<div className="step-2">
				<h5 className="margin-bottom-2"><strong>Hi {this.props.formValues.step1.name.value}, who are you looking to lodge a complaint for?</strong></h5>
				<p className="margin-left-2 margin-bottom-2" >Q1. I am lodging a complaint for</p>
				<div className="grid-x grid-padding-x margin-left-3">
					<fieldset className="large-5 cell">
						<RadioGroup radioData={this.state.radioGroup} value={this.props.formValues.step2.radio.value} onChange={this.handleRadioChanged}/>
					</fieldset>
				</div>
	            <div className="grid-x grid-margin-x align-center margin-top-3">
	                <div className="cell medium-4 text-center">
	                	<button className="button" type="" onClick={this.props.previousStep} value="">Previous</button>
	                </div>
	                <div className="cell medium-4 text-center">
	                	<button className="button" type="submit" onClick={this.saveAndContinue} value="Submit">Continue</button>
	                </div>
	            </div>
			</div>
		);
	}

	componentDidMount () {
		$("#app").foundation();
	}

	saveAndContinue(event) {
		event.preventDefault();
		formData.progress = 20; 
		formData.step2.completed = true;
		this.props.nextStep();
	}
}

class StepThree extends React.Component {
    constructor () {
        super()
        this.state = { 
          checkVal: '' /*,
          radioGroup: {
          	name: "step2",
          	items: [
          		{id: "val1", value: "Myself"},
          		{id: "val2", value: "For someone else"}
          	]
          }*/
        }
        this.saveAndContinue = this.saveAndContinue.bind(this);
        this.handleCheckBoxChanged = this.handleCheckBoxChanged.bind(this);
    }

    handleCheckBoxChanged (event) {
        this.setState({checkVal: event.target.value})
        console.log(event.target.dataset.key);
        formData.step3.checkbox.value[event.target.dataset.key] = event.target.value;
    }

    render() {
		return (
			<div className="step-3">
				<h5 className="margin-bottom-2"><strong>Please tell us your story. What happened to you?</strong></h5>
				<p className="margin-left-2 margin-bottom-2" >Q2. I was...</p>
				<div className="grid-x grid-padding-x margin-left-3">
					<fieldset className="large-6 cell">
					    <label className="margin-bottom-1"><input data-key={0} type="checkbox" name="stepThree" onChange={this.handleCheckBoxChanged} value="Bullied"/> Bullied</label>
					    <label className="margin-bottom-1"><input data-key={1} type="checkbox" name="stepThree" onChange={this.handleCheckBoxChanged} value="Treated unfairly"/> Treated unfairly</label>
					    <label className="margin-bottom-1"><input data-key={2} type="checkbox" name="stepThree" onChange={this.handleCheckBoxChanged} value="Sexually harassed"/> Sexually harassed <a className="tiny button primary" href="#" data-toggle="more-info-sh">?</a></label>
					    <p className="hide" id="more-info-sh" data-toggler=".hide">
					    	<small>Under the Equal Opportunity Act 2010, sexual harassment is defined as:
							<br/>an unwelcome sexual advance
							<br/>an unwelcome request for sexual favours
							<br/>any other unwelcome conduct of a sexual nature
							<br/>
							which would lead a reasonable person to experience offence, humiliation or intimidation. It can be physical, verbal, or written.</small>
						</p>
					    <label className="margin-bottom-1"><input data-key={3} type="checkbox" name="stepThree" onChange={this.handleCheckBoxChanged} value="Victimised"/> Victimised <a className="tiny button primary" href="#" data-toggle="more-info-vi">?</a></label>
					    <p className="hide" id="more-info-vi" data-toggler=".hide">
					    	<small>Victimisation is treating someone badly because they spoke up about being treated unfairly, made a complaint or helped someone else make a complaint.
					    	<br/>Victimisation is also against the law and can be part of a complaint.
							</small>
						</p>
					</fieldset>
				</div>
	            <div className="grid-x grid-margin-x align-center margin-top-3">
	                <div className="cell medium-4 text-center">
	                	<button className="button" type="" onClick={this.props.previousStep} value="">Previous</button>
	                </div>
	                <div className="cell medium-4 text-center">
	                	<button className="button" type="submit" onClick={this.saveAndContinue} value="Submit">Continue</button>
	                </div>
	            </div>
			</div>
		);
	}

	componentDidMount () {
		$("#app").foundation();
	}

	saveAndContinue(event) {
		event.preventDefault();
		formData.progress = 30; 
		formData.step3.completed = true;
		this.props.nextStep();
	}
}
class StepFour extends React.Component {
    constructor () {
        super()
        this.state = { 
          radio: '',
          otherText: '',
          radioGroup1: {
          	name: "step4",
          	items: [
          		{id: "val1", value: "Work"},
          		{id: "val2", value: "School, university, tafe college or a training institution"},
          		{id: "val3", value: "Hospital or a medical clinic"},
          		{id: "val4", value: "A store - this could be any business that you pay money to purchase a service from"},
          		{id: "val5", value: "Accomodation such as public housing or a real estate agent"}
          	]
          },
          radioGroup2: {
          	name: "step4",
          	items: [
          		{id: "val6", value: "Local Government"},
          		{id: "val7", value: "Sporting activities such as events, games"},
          		{id: "val8", value: "Clubs (with over 30 members and has a liquor license)"},
          		{id: "val9", value: "Other (please specify below)"},
          	]
          }
        }
        this.saveAndContinue = this.saveAndContinue.bind(this);
        this.handleRadioChanged = this.handleRadioChanged.bind(this);
    }

    handleRadioChanged (event) {
        this.setState({radio: event.target.value})
        formData.step4.radio.value = event.target.value;
    }

    render() {
		return (
			<div className="step-4">
				<h5 className="margin-bottom-2"><strong>Hi {this.props.formValues.name}, who are you looking to lodge a complaint for?</strong></h5>
				<p className="margin-left-2 margin-bottom-2" >Q1. I am lodging a complaint for</p>
				<div className="grid-x grid-padding-x margin-left-3">
					<fieldset className="large-6 cell">
						<RadioGroup radioData={this.state.radioGroup1} value={this.props.formValues.step4.radio.value} onChange={this.handleRadioChanged}/>
					</fieldset>
					<fieldset className="large-6 cell">
					    <RadioGroup radioData={this.state.radioGroup2} value={this.props.formValues.step4.radio.value} onChange={this.handleRadioChanged}/>
					    <label>
			                <input 
			                	type="text" 
			                	/>
			            </label>
					</fieldset>
				</div>
	            <div className="grid-x grid-margin-x align-center margin-top-3">
	                <div className="cell medium-4 text-center">
	                	<button className="button" type="" onClick={this.props.previousStep} value="">Previous</button>
	                </div>
	                <div className="cell medium-4 text-center">
	                	<button className="button" type="submit" onClick={this.saveAndContinue} value="Submit">Continue</button>
	                </div>
	            </div>
			</div>
		);
	}

	saveAndContinue(event) {
		event.preventDefault();
		formData.progress = 40; 
		formData.step4.completed = true;
		this.props.nextStep();
	}

	componentDidMount () {
		$("#app").foundation();
	}
}


/***

FOUNDATION FORM ELEMENT HELPERS

***/


class InputTextValid extends React.Component {

    render(){
		return(
			<label>
                <input 
                	type="text" 
                	placeholder={this.props.placeHolder} 
                	val={this.props.name} 
                	required 
                	pattern={this.props.pattern} 
                	value={this.props.value}
                	onChange={this.props.onChange}
                	/>
                <span className="form-error text-center">{this.props.error}</span>
            </label>
        )
	}
}

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


class StepButtons extends React.Component {
	constructor () {
        super()
        this.state = { 
          step: 1
        }
    }

}

class ProgressBar extends React.Component {
	constructor (props) {
        super(props)
        this.state = { 
          progress: 25
        }
    }

    //updateProgress 
	render () {
		return(
			<div className="primary progress" role="progressbar" tabIndex="0" aria-valuenow={this.props.formValues.progress} aria-valuemin="0" aria-valuetext={this.props.formValues.progress+" percent"} aria-valuemax="100">
                <div className="progress-meter" style={{width: this.props.formValues.progress+"%"}}>
                    <p className="progress-meter-text">{this.props.formValues.progress}%</p>
                </div>
            </div>
		)
	}
}

class BreadCrumbs extends React.Component {
	render(){
		return(
			<nav aria-label="You are here:" role="navigation">
                <ul className="breadcrumbs">
                    <li><a href="#start">Start</a></li>
                    <li>
                        <span className="show-for-sr">Current: </span> Step 1
                    </li>
                    <li><a href="#start" onClick={this.props.step(2)}>Step 2</a></li>
                    <li><a href="#start" onClick={this.props.step(3)}>Step 3</a></li>
                    <li><a href="#start" onClick={this.props.step(4)}>Step 4</a></li>
                </ul>
            </nav>
		)
	}
}


/** RENDER CODE **/

var mountNode = document.getElementById("app");
let progressHolder = document.getElementById("progress");
let breadcrumbHolder = document.getElementById("breadcrumb");


ReactDOM.render(<ComplaintForm progressHolder={progressHolder} breadcrumbHolder={breadcrumbHolder} />, mountNode);
//ReactDOM.render(<ProgressBar formValues={formData} />, document.getElementById("progress"));

$(document).ready(function(){
	$(document).foundation();
	// $('#dp2').fdatepicker({
	// 	closeButton: true
	// });
});
