import React from 'react'

export class InputTextValid extends React.Component {
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
                	/>
                <span className="form-error text-center">{this.props.error}</span>
            </label>
        )
	}
}