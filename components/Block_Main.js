import React from 'react';
import { NavLink } from 'react-router-dom';
import './Block_Main.scss';


import {consoleUtils} from "../core/utils";

import {connect} from "react-redux";
import {addFriend,removeLastFriend} from "../redux/AC";

class Block_Main extends React.PureComponent {
	state = {
		text: '',
	};
	changeText = (e) => {
		
		this.setState({text: e.target.value});
	};
	addFriend = () => {
		
		this.props.addFriend(this.state.text);
	};
	removeFriend = () => {
		this.props.removeLastFriend();
	};
	render() {
		consoleUtils();
		return (
		<div className={"Block_Main"}>
			<div className="mainFragment">
				<div><img src="img/logoAnim.gif"/></div>
			</div>
			<div className="midWrap">
				<div className="wrapButtons">
					<a href="http://www.dota2.com" className="btn">Official site</a>
					<NavLink to="/filter" className="btn" activeClassName="SActivated">Enter site</NavLink>
					<div className="invisElem"></div>
				</div>
			</div>
			<hr/>
			<div className="under">

				{/* <img className="cur" src="img/cur.gif"/>
				<img className="ward" src="img/ward.gif"/> */}
				
			</div>
			
		</div>);
	}

}

export default connect((state) => {
	console.log('state', state);
	return {
		friendList: state.myReducer.list,
	}
},
{addFriend,removeLastFriend})(Block_Main);

