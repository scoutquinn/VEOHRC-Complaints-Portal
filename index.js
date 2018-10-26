import React from "react";
import ReactDOM from "react-dom";

import "./scss/style.scss";
import $ from "jquery";
import Foundation from "foundation-sites";


/***

MULTI PART FORM

***/

var formData = {
	name: ''
};


class ComplaintForm extends React.Component {
    constructor () {
        super()
        this.state = { 
          step: 1
        }
        this.nextStep = this.nextStep.bind(this);
        this.previousStep = this.previousStep.bind(this);
    }

    nextStep () {
	  this.setState({
	    step : this.state.step + 1
	  })
	}

	// Same as nextStep, but decrementing
	previousStep () {
	  this.setState({
	    step : this.state.step - 1
	  })
	}

	render() {
		switch (this.state.step){
			case 1:
				return <StepOne formValues={formData} nextStep={this.nextStep} />
			case 2:
				return <StepTwo formValues={formData} nextStep={this.nextStep} />
			case 3:
				return <StepThree formValues={formData} nextStep={this.nextStep} />
			case 4:
				return <StepFour formValues={formData} nextStep={this.nextStep} />
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

    handleNameChanged (event) {
        this.setState({name: event.target.value})
        formData.name = event.target.value;
    }

	saveAndContinue(event) {
		event.preventDefault();
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
                                value={this.props.formValues.name}
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

}



class StepTwo extends React.Component {
    constructor () {
        super()
        this.state = { 
          name: ''
        }
        this.saveAndContinue = this.saveAndContinue.bind(this);
    }
    render() {
		return (
			<div className="step-2">
				<h5 className="margin-bottom-2"><strong>Hi {this.props.formValues.name}, who are you looking to lodge a complaint for?</strong></h5>
				<p className="margin-left-2 margin-bottom-2" >Q1. I am lodging a complaint for</p>
				<div className="grid-x grid-padding-x margin-left-3">
					<fieldset className="large-5 cell">
					    <input type="radio" name="pokemon" value="Red" id="pokemonRed" required /><label htmlFor="pokemonRed">Myself</label>
					    <br/>
					    <input type="radio" name="pokemon" value="Blue" id="pokemonBlue" /><label htmlFor="pokemonBlue">For someone else</label>
					</fieldset>
				</div>
	            <div className="grid-x grid-margin-x align-center">
	                <div className="cell medium-4 text-center">
	                	<button className="button" type="submit" onClick={this.saveAndContinue} value="Submit">Continue</button>
	                </div>
	            </div>
			</div>
		);
	}

	saveAndContinue(event) {
		event.preventDefault();
		this.props.nextStep();
	}
}

class StepThree extends React.Component {
    constructor () {
        super()
        this.saveAndContinue = this.saveAndContinue.bind(this);
    }
    render() {
		return (
			<div className="step-3">
				<h5 className="margin-bottom-2"><strong>Please tell us your story. What happened to you?</strong></h5>
				<p className="margin-left-2 margin-bottom-2" >Q2. I was...</p>
				<div className="grid-x grid-padding-x margin-left-3">
					<fieldset className="large-6 cell">
					    <label className="margin-bottom-1"><input type="checkbox" name="stepThree" /> Bullied</label>
					    <label className="margin-bottom-1"><input type="checkbox" name="stepThree" /> Treated unfairly</label>
					    <label className="margin-bottom-1"><input type="checkbox" name="stepThree" /> Sexually harassed <a className="tiny button primary" href="#" data-toggle="more-info-sh">?</a></label>
					    <p className="hide" id="more-info-sh" data-toggler=".hide">
					    	<small>Under the Equal Opportunity Act 2010, sexual harassment is defined as:
							<br/>an unwelcome sexual advance
							<br/>an unwelcome request for sexual favours
							<br/>any other unwelcome conduct of a sexual nature
							<br/>
							which would lead a reasonable person to experience offence, humiliation or intimidation. It can be physical, verbal, or written.</small>
						</p>
					    <label className="margin-bottom-1"><input type="checkbox" name="stepThree" /> Victimised <a className="tiny button primary" href="#" data-toggle="more-info-vi">?</a></label>
					    <p className="hide" id="more-info-vi" data-toggler=".hide">
					    	<small>Victimisation is treating someone badly because they spoke up about being treated unfairly, made a complaint or helped someone else make a complaint.
					    	<br/>Victimisation is also against the law and can be part of a complaint.
							</small>
						</p>
					</fieldset>
				</div>
	            <div className="grid-x grid-margin-x align-center">
	                <div className="cell medium-4 text-center">
	                	<button className="button" type="submit" onClick={this.saveAndContinue} value="Submit">Continue</button>
	                </div>
	            </div>
			</div>
		);
	}

	saveAndContinue(event) {
		event.preventDefault();
		this.props.nextStep();
	}
}
class StepFour extends React.Component {
    constructor () {
        super()
        this.saveAndContinue = this.saveAndContinue.bind(this);
    }
    render() {
		return (
			<div className="step-4">
				<h5 className="margin-bottom-2"><strong>Hi {this.props.formValues.name}, who are you looking to lodge a complaint for?</strong></h5>
				<p className="margin-left-2 margin-bottom-2" >Q1. I am lodging a complaint for</p>
				<div className="grid-x grid-padding-x margin-left-3">
					<fieldset className="large-6 cell">
					    <label className="margin-bottom-1"><input type="radio" name="stepThree" /> Work</label>
					    <label className="margin-bottom-1"><input type="radio" name="stepThree" /> School, university, tafe college or a training institution</label>
					    <label className="margin-bottom-1"><input type="radio" name="stepThree" /> Hospital or a medical clinic</label>
					    <label className="margin-bottom-1"><input type="radio" name="stepThree" /> A store - this could be any business that you pay money to purchase a service from</label>
					    <label className="margin-bottom-1"><input type="radio" name="stepThree" /> Accomodation such as public housing or a real estate agent</label>
					</fieldset>
					<fieldset className="large-6 cell">
					    <label className="margin-bottom-1"><input type="radio" name="stepThree" /> Local Government</label>
					    <label className="margin-bottom-1"><input type="radio" name="stepThree" /> Sporting activities such as events, games</label>
					    <label className="margin-bottom-1"><input type="radio" name="stepThree" /> Clubs (with over 30 members and has a liquor license)</label>
					    <label className="margin-bottom-1"><input type="radio" name="stepThree" /> Other (please specify below)</label>
					    <label>
			                <input 
			                	type="text" 
			                	/>
			            </label>
					</fieldset>
				</div>
	            <div className="grid-x grid-margin-x align-center">
	                <div className="cell medium-4 text-center">
	                	<button className="button" type="submit" onClick={this.saveAndContinue} value="Submit">Continue</button>
	                </div>
	            </div>
			</div>
		);
	}

	saveAndContinue(event) {
		event.preventDefault();
		this.props.nextStep();
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



class StepButtons extends React.Component {
	constructor () {
        super()
        this.state = { 
          step: 1
        }
    }

}


/** RENDER CODE **/

var mountNode = document.getElementById("app");

ReactDOM.render(<ComplaintForm/>, mountNode);

$(document).ready(function(){
	$(document).foundation();
});
