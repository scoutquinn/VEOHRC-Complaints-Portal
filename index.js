import React from "react";
import ReactDOM from "react-dom";

import "./scss/style.scss";
import $ from "jquery";
import Foundation from "foundation-sites";




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
    }

    handleNameChanged (event) {
        this.setState({name: event.target.value})
    }

	render() {
		return (
			<form data-abide noValidate>
            	<h5 className="text-center margin-bottom-3 margin-top-3"><strong>Welcome to the Commission's Online Complaints Form</strong></h5>
            	<p className="text-center margin-bottom-3">Let's start with your name</p>
            	<div className="grid-container">
	            	<div className="grid-x grid-margin-x align-center margin-bottom-3">
                        <div className="cell medium-4">
                            <InputTextValid 
                                placeHolder="Enter your name" 
                                pattern="alpha" 
                                error="Please enter your name."
                                value={this.state.name} 
                                onChange={this.handleNameChanged}
                            />
                        </div>
                    </div>
                    <div className="grid-x grid-margin-x align-center">
                        <div className="cell medium-4 text-center">
                        	<button className="button" type="submit" value="Submit">Continue</button>
                        </div>
                    </div>
                </div>
        	</form>
		);
	}
}



class StepTwo extends React.Component {
	render() {
		return (
			<div className="step-1">
				<h5><strong>Hi {this.props.name}, who are you looking to lodge a complaint for?</strong></h5>
				<p>Q1. I am lodging a complaint for</p>
				<div className="grid-x grid-padding-x">
					<fieldset className="large-5 cell">
					    <input type="radio" name="pokemon" value="Red" id="pokemonRed" required /><label for="pokemonRed">Myself</label>
					    <input type="radio" name="pokemon" value="Blue" id="pokemonBlue" /><label for="pokemonBlue">For someone else</label>
					</fieldset>
				</div>
			</div>
		);
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

ReactDOM.render(<StepOne name="Jane" />, mountNode);

$(document).ready(function(){
	$(document).foundation();
});
