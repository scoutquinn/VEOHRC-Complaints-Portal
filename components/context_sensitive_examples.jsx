import React from "react";

function ContextSensitiveExamples(props){
	const data = (props.context) ? props.choices[props.context] : props.choices[props.defaultChoice];
	return (
		<React.Fragment>
		{data.map((item, idx) => 
			<div key={idx} className="card">
			    <div className="card-section">
			    	<small>{item}</small>
				</div>
			</div>
		)}
		</React.Fragment>
	)
}

export default ContextSensitiveExamples;