import React from 'react'
import ReactDOM from "react-dom";

/* 

Here are the three main components for rendering the form elements

These are a holder to hold a form section and the actual form element 
and the helper text that shows up on the right on desktop and below
the form element on mobile.

*/


/*
Dummy holder for top level for sections
Possibly uneeded
*/

function FormElement(props){
    return props.children;
}




/*
Holder for question/ input field in left side of form.
also handles clicks for highlighting the section
*/


class Element extends React.Component{
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    componentDidMount(){
        this.props.refCallback(this.props.helper, this.myRef.current);
    }

    click = () => {
        this.props.clickHandler.bind(this, this.props.helper, this.myRef)
    }

    render(){
        return(
            <div 
                ref={this.myRef} 
                aria-describedby={this.props.helper} 
                className="form_element padding-0 padding-left-1" 
                onFocus={this.props.clickHandler.bind(this, this.props.helper, this.myRef)} 
                onClick={this.props.clickHandler.bind(this, this.props.helper, this.myRef)}
            >
                {this.props.children}
            </div>
        )
    }
}






/*
Helper section.
Is displayed in the sidebar for desktop, and below the element for mobile
*/

let sidebarNode = document.getElementById("sidebar");

class Helper extends React.Component{
    //static contextType = MobileContext;

    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }


    componentDidMount(){
        //$("#sidebar").foundation();
        if(this.props.sidebar) this.props.sidebar.updateSticky();

    }
    componentDidUpdate(){
        if (this.props.id == this.props.isShown){
            this.props.showHelp(this.props.id)
            // $("#"+this.props.id)
            //  .find('input')
            //  .first()
            //  .focus()
        }
    }

    shownClass = () => {
        return (this.props.id == this.props.isShown) ? "show" : "hide";
    }
    
    render(){
        let children = <div className={"padding-1 margin-bottom-1 " + this.shownClass()} id={this.props.id}>{this.props.children}</div>
        if (!this.props.isMobile) {
            return ReactDOM.createPortal(children, sidebarNode);
        } else if (this.props.isMobile){
            return(
                <div className="helper">
                    {children}
                </div>
            )

        }else {
            return false;
        }
    }
}


export {FormElement, Element, Helper};