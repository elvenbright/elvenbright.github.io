"use strict";
import React from 'react';
import { NavLink } from 'react-router-dom';

import {default as isoFetch} from 'isomorphic-fetch';

class Block_Page extends React.PureComponent {
	
	run = async () => {
		console.log('123s');
		/*
		isoFetch({
			URI: "https://mobile.service-it.by:8003/SBOLServer/rest/currency/bankObj",
			fetchOptions: {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
				body: JSON.stringify({
					
				})
			}
		})
		.then(function(response) {
			if (response.status >= 400) {
				throw new Error("Bad response from server");
			}
			return response;
		})
		.then(function(stories) {
			console.log(stories);
		});
		*/
		
		let answer;
		try {
			answer = await isoFetch({
				URI: "https://jsonplaceholder.typicode.com/todos/1",
				fetchOptions: {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json',
					},
					body: JSON.stringify({
						pre: 321
					})
				}
			},);
		} catch (e) {
			console.log('error', e);
		}
		console.log("ответ",answer);
		
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
