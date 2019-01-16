import React from "react";
import $ from "jquery";



/* 
Button element for form questions. displays choices made (if an object is provided) or radio button value
*/


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

export default ShowChoicesNew;
