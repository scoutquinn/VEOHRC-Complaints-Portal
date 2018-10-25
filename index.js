import React from "react";
import ReactDOM from "react-dom";
import "./scss/style.scss";
import $ from "jquery";
import Foundation from "foundation-sites";

$(document).ready(function(){
	$(document).foundation();
});


var mountNode = document.getElementById("app");

class Intro extends React.Component {
	render() {
		return (
			<form data-abide noValidate>
            	<h5 className="text-center margin-bottom-3 margin-top-3"><strong>Welcome to the Commission's Online Complaints Form</strong></h5>
            	<p className="text-center margin-bottom-3">Let's start with your name</p>
            	<div className="grid-container">
	            	<div className="grid-x grid-margin-x align-center margin-bottom-3">
                        <div className="cell medium-4">
                            <InputTextValid placeHolder="Enter your name" pattern="alpha" error="Please enter your name." />
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

class InputTextValid extends React.Component {
	render(){
		return(
			<label>
                <input type="text" placeholder={this.props.placeHolder} val={this.props.name} required pattern={this.props.pattern} />
                <span className="form-error text-center">{this.props.error}</span>
            </label>
        )
	}
}



class Step1 extends React.Component {
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

ReactDOM.render(<Intro name="Jane" />, mountNode);
