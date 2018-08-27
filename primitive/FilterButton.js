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
	hover=()=>{
		console.log('hi');
	}
	renderContent = () =>{
			let {props:{name,arrow},state:{atr}} = this;
			let transform;
			if(arrow==="up"){
				transform="rotate(90)"
			}
			else if(arrow==="down"){
				transform="rotate(270)"
			}
			return(
				
					<div className={atr==="n1"?"btn-small btn-smallSelected":"btn-small"} data-atr={"n1"} onClick={(e)=>{ 
							this.props.btn1();
							this.run(e);}}>{name}<SvgArrow className="btn-smallSelected" transform={transform}/></div>

				
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