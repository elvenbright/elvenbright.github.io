"use strict";
import React from 'react';
import { NavLink } from 'react-router-dom';

import {default as isoFetch} from 'isomorphic-fetch';

class Block_Page extends React.PureComponent {
	
	run = async () => {
		console.log('123s');
		isoFetch('https://api.steampowered.com/IEconDOTA2_570/GetHeroes/v0001/?key=8BF24A2B3BEA4957FBC230A31E75AC63', {
			method: 'GET',
			
		})
		.then(response => response.json())
		.then(json => console.log(json))

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
	
	 
	
  	render() {

		return (
			<div className={"Block_Filter"}>
				<NavLink to="/" activeClassName="SActivated">Вернуться</NavLink>
				<div onClick={this.run}>get some</div>
			</div>
		);

  	}

}

export default Block_Page;
