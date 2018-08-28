import React from 'react';
import './FilterButton.scss';
import SvgArrow from "../svg/SvgArrow"


class FilterButton extends React.PureComponent {
	//props.name имя кнопки
	//props.arrow("up") ("down") стрелка вверх вниз
	run=()=>{
		console.log('hi');
	}
    render(){
        let {props:{name,arrow,selected}} = this;
		let transform;
		if(selected){
			transform="rotate(90)"
		}
		else{
			transform="rotate(270)"
		}

		return(<div className={selected?"FilterButton FilterButtonSelected":"FilterButton"}><div className={selected?"Underline UnderlineSelected":"Underline"}></div>
				<div className={selected?"filterBtn filterBtnSelected":"filterBtn"} onClick={(e)=>{ 
						this.run(); this.props.btn1();}}>{name}<SvgArrow className={selected?"filterSvg filterSvgSelected":"filterSvg"} transform={transform}/></div>	
		</div>)
    }
   

}
export default FilterButton