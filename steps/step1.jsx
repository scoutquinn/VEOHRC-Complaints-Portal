import React from 'react'
import { InputTextValid } from '../components/forms';

export class StepOne extends React.Component {
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