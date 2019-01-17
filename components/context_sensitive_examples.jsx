import React from "react";

function ContextSensitiveExamples(props){
	const data = (props.context) ? props.choices[props.context] : props.choices[props.defaultChoice];
	return (
		<React.Fragment>
		{data.map((item, idx) => 
			<div className="card">
			    <div key={idx} className="card-section">
			    	<small>{item}</small>
				</div>
			</div>
		)}
		</React.Fragment>
	)
}

export default ContextSensitiveExamples;