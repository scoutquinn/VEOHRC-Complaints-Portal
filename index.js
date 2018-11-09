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


class ComplaintPortal extends React.Component {
	constructor () {
        super()
        this.state = { 
          sideBar: "",
          sidebars: {},
          mobile: false,
          helptest: "a test here",
          formData: {
          	q_2: {
				radio: {
					name: 'I am lodging a complaint for',
					value: ''
				},
				completed: false
			}
          }
        }
        this.showSidebar = this.showSidebar.bind(this);
        this.showHelp = this.showHelp.bind(this);
    }

    showSidebar (html, id) {
    	let sidebars = this.state.sidebars;
    	sidebars[id] = html;
    	//console.log(sidebars)
    	this.setState({sidebars : sidebars})
    }

    showHelp (id) {
    	let sidebar = this.state.sidebars[id];
    	//console.log(sidebar)
    	this.setState({sideBar: id})
    }

    sidebarClick () {
    	console.log('workzz')
    }

    handleRadioChanged (event) {
        //this.setState({radio: event.target.value})
        //formData.step2.radio.value = event.target.value;
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
								    <input type="radio" name="who_for" value="Myself" id="fe_1" />
								    <label htmlFor="fe_1">Myself</label>
								    <input type="radio" name="who_for" value="Someone Else" id="fe_2" />
								    <label htmlFor="fe_2">Someone Else</label>
								</fieldset>
		            		</Element>
		            		<Helper id="q_1" setSide={this.showSidebar} isMobile={this.state.mobile}>
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
		            		<Helper id="q_2" setSide={this.showSidebar} isMobile={this.state.mobile}>
		            			<h4>Suggestions</h4>
		            			<p>Please tell us about your story. This box will help you
								fill in your story as you click through each selection
								field.</p>
								<a href="#" onClick={this.sidebarClick}>{this.state.helptest}</a>
								<p>Let's start by filling in your name.</p>
		            		</Helper>
		            	</FormElement>
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
			<span className="form_element" onClick={this.props.clickHandler.bind(this, this.props.helper)}>
				{this.props.children}
			</span>
		)
	}
}

class Helper extends React.Component{
	constructor(props) {
    	super(props);
    	this.props.setSide(this.props.children, this.props.id);
    	this.el = document.createElement('div');
    	//if (!this.props.isMobile) this.props.setSide(this.props.children, this.props.id);
  	}

  	componentDidMount() {
	    // The portal element is inserted in the DOM tree after
	    // the Modal's children are mounted, meaning that children
	    // will be mounted on a detached DOM node. If a child
	    // component requires to be attached to the DOM tree
	    // immediately when mounted, for example to measure a
	    // DOM node, or uses 'autoFocus' in a descendant, add
	    // state to Modal and only render the children when Modal
	    // is inserted in the DOM tree.

	    //console.log(this.props.sideHold)
	    //this.props.sideHold.current.appendChild(this.el);
	}

	componentWillUnmount() {
	    //this.props.sideHold.removeChild(this.el);
	}


  	showhelp(){
  		console.log("diggy");
  	}
	render(){

		return (
			<div className={!this.props.isMobile ? "notshow-for-sr helper" : "helper"}>
		 		{this.props.children}
		 		{ReactDOM.createPortal(this.props.children, sidebarNode)}
		 	</div>
		)
	}
}
class Sidebar extends React.Component{
	constructor(props) {
    	super(props);
	}

	componentDidMount() {
    }

	render(){
		return (this.props.isMobile) ? false : this.props.children
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

$(document).ready(function(){
	$(document).foundation();

});
