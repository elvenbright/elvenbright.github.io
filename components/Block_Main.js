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
			<input type="input" onChange={this.changeText} value={this.state.text}/>
			<input type="button" value="add" onClick={this.addFriend} />
			<input type="button" value="remove" onClick={this.removeFriend} />
			<div className={"font"} >
			 <NavLink to="/url1" activeClassName="SActivated">Page 1</NavLink>
			</div>
			<div><img src="img/logo.jpg"/></div>
			{this.props.friendList.map( (item, index) =>
			<div key={index}>{item}</div>)}

			
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

