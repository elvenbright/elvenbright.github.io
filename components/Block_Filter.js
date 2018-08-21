import React from 'react';
import { NavLink } from 'react-router-dom';
import RTG from 'react-addons-css-transition-group';
import {default as isoFetch} from 'isomorphic-fetch';
import './Block_Filter.scss';
import {Spiner} from '../primitive/Spiner';
import {connect} from "react-redux";
import {loadNews,loadHeroes,loadItems} from "../redux/AC";


class Block_Filter extends React.PureComponent {
	
	run = async () => {
		console.log('123s');
		/*
		isoFetch('http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=8BF24A2B3BEA4957FBC230A31E75AC63&appid=8930', {
			method: 'GET',
		})
		.then(response => response.json())
		.then(json => console.log(json))
		*/
		
		/*
		let answer;
			try {
				answer = await isoFetch('https://jsonplaceholder.typicode.com/posts', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json',
					},
					body: JSON.stringify({
						title: 'foo',
						body: 'bar',
						userId: 1
					  })
				});
				
			} catch (e) {
				console.log('error', e);
			}
			answer.json().then( data => {
				console.log(data);
			});
		*/
		/*
		isoFetch('https://jsonplaceholder.typicode.com/posts', {
			method: 'POST',
			body: JSON.stringify({
				title: 'foo',
				body: 'bar',
				userId: 1
				}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
		.then(response => response.json())
		.then(json => console.log(json))
		*/
	};
	
	//react transitiongroup
	state = {
		arr:[],
	}
	add = () => {
		console.log('hi');
		let a = [...this.state.arr];
		a.push('hello');
		this.setState({arr:a});
	};
	del = () => {
		let n = [...this.state.arr];
		n.pop();
		console.log('wtf',n);
		this.setState({arr:n});
	};
////////////////////
	loadNews = async () => {
		let answer;
		isoFetch('http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?l=german&appid=570&key=8BF24A2B3BEA4957FBC230A31E75AC63', {
			method: 'GET',
		})
		.then(response => response.json())
		.then(json => answer = json)
		
	};
	loadHeroes = () => {
		
	};
	loadItems = () => {
		
	};

  	render() {
		console.log(this.props.reducer);
		return (
			<div className={"Block_Filter"}>
				<div className="top-logo"><img src="img/Logo2.png"/></div>
				<hr/>
				<div className="menu-block">
					<div onClick={this.loadNews} className="btn">News</div>
					<div onClick={this.loadHeroes} className="btn">Heroes</div>
					<div onClick={this.loadItems} className="btn">Items</div>
				</div>
				<div className="content">
					<div className="spinner"><Spiner/></div>
				</div>
				
				<NavLink to="/selected" style={{cursor:"pointer",color:"white", fontFamily: 'Flower'}} activeClassName="SActivated">get some</NavLink>
				<div><button onClick={this.add}>ADD</button><button onClick={this.del}>DELETE</button></div>
				<RTG transitionName="example" transitionEnterTimeout={700} transitionLeaveTimeout={700}>
				{this.state.arr.map((item,i)=>{
					return <div key={i} style={{border:"1px solid white",color:"white", fontFamily: 'Flower'}}>{item}</div>
				})}
				</RTG>


			</div>
		);

  	}

}

//export default Block_Filter

export default connect((state) => ({
	reducer: state.reducer
}),
{loadNews,loadHeroes,loadItems})(Block_Filter);
