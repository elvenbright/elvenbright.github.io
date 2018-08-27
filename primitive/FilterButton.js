import React from 'react';
import './FilterButton.scss';
import SvgArrow from "../svg/SvgArrow"




class FilterButton extends React.PureComponent {
	state = {
		atr: "",
	}
	run=(e)=>{
		this.setState({atr: e.target.dataset.atr});
	}

	renderContent = () =>{
			let {props:{name},state:{atr}} = this;
		
			return(
				
					<div className={atr==="n1"?"btn-small btn-smallSelected":"btn-small"} data-atr={"n1"} onClick={(e)=>{ 
							this.props.btn1();
							this.run(e);}}>{name}<SvgArrow/></div>

				
			)
			
	}
  
    render(){
        return (   
            <div className={"FilterButton"}>
				{this.renderContent()}
            </div>)
    }
   

}
export default FilterButton