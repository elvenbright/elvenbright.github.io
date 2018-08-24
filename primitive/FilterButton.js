import React from 'react';
import './FilterButton.scss';




class FilterButton extends React.PureComponent {
	state = {
		atr: "",
	}
	run=(e)=>{
		this.setState({atr: e.target.dataset.atr});
	}

	renderContent = () =>{
			let {props:{status},state:{atr}} = this;
			if(status==="n"){
				return(
					<div className={"frame"}>
						<div className={atr==="n1"?"btn-small btn-smallSelected":"btn-small"} data-atr={"n1"} onClick={(e)=>{ 
								this.props.btn1();
								this.run(e);}}>show last 10</div>

						<div className={atr==="n2"?"btn-small btn-smallSelected":"btn-small"} data-atr={"n2"} onClick={(e)=>{ 
								this.props.btn2();
								this.run(e);}}>show all</div>
					</div>
				)
			}
	}
  
    render(){
        return (   
            <div className={"FilterButton"}>
				{this.renderContent()}
            </div>)
    }
   

}
export default FilterButton