import isoFetch from 'isomorphic-fetch';

//backup если не загрузятся данные
import heroesBackUpJson from "../jsonBackUp/heroes";
import itemsBackUpJson from "../jsonBackUp/items";
import newsBackUpJson from "../jsonBackUp/news";
import abilitiesBackUpJason from "../jsonBackUp/abilities";
/*
export const gg = () => dispatch => {
	setTimeout(() => {
	  console.log('I got tracks');
	  dispatch({ type: 'FETCH_SUCCESS', payload: [] });
	}, 2000)
  };
*/
export const loadNews = () => async (dispatch, getState) => {
	
	dispatch({
        type: 'NEWS_LOADING'
    });
	
	let answer;
	try {
		answer = await fetch('http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?l=german&appid=570&key=8BF24A2B3BEA4957FBC230A31E75AC63', {
					method: 'GET',
				});
		
	} catch (e) {
		console.log('error', e);
	}
	if(answer===undefined){
		setTimeout(() => {
			dispatch({
				type: 'NEWS_LOADED',
				payload: newsBackUpJson
			})
		  }, 2000)
	}
	else{
		answer.json().then( data => {
			setTimeout(() => {
				dispatch({
					type: 'NEWS_LOADED',
					payload: newsBackUpJson
				})
			  }, 2000)
		});
	}
	
	/*
	isoFetch('http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?l=german&appid=570&key=8BF24A2B3BEA4957FBC230A31E75AC63', {
		method: 'GET',
	})
	.then(response => response.json())
	.then(json => 
		dispatch({
			type: 'NEWS_LOADED',
			payload: json
		})
	)
	*/	
};


export const loadHeroes = () => async (dispatch, getState) => {
	
	dispatch({
        type: 'HEROES_LOADING'
	});
	dispatch({
        type: 'ABILITIES_LOADING'
	});

	// let answer;
	// try {
		
		
	// } catch (e) {
	// 	console.log('error', e);
	// 	return;
	// }

	let answer = {};
	let answer2  = {};

	try {
		answer = await fetch('https://cors-anywhere.herokuapp.com/http://www.dota2.com/jsfeed/heropickerdata?v=18874723138974056&l=english', {
					method: 'GET',
				});
		answer2 = await fetch('https://cors-anywhere.herokuapp.com/https://www.dota2.com/jsfeed/heropediadata?feeds=abilitydata&l=english', {
			method: 'GET',
		});
	} catch (e) {
		//диспчаем ошибку
		console.log('error', e);
		return;
	}
	
	// //abilities load
	// let answer2;
	// try {
		
		
	// } catch (e) {
	// 	console.log('error', e);
	// 	//
	// 	return;
	// }

	setTimeout(() => dispatch({
		type: '',
		payload: '',
	}), 2000);

	
	if(answer2===undefined){
		setTimeout(() => {
			dispatch({
				type: 'ABILITIES_LOADED',
				payload: abilitiesBackUpJason
			})
		  }, 2000)
	}
	else{
		answer2.json().then( data => {
			setTimeout(() => {
				dispatch({
					type: 'ABILITIES_LOADED',
					payload: data
				})
			  }, 2000)
		});
	}
	
	if(answer===undefined){
		setTimeout(() => {
			dispatch({
				type: 'HEROES_LOADED',
				payload: heroesBackUpJson
			})
		  }, 2000)
	}
	else{
		answer.json().then( data => {
			setTimeout(() => {
				dispatch({
					type: 'HEROES_LOADED',
					payload: data
				})
			  }, 2000)
		});
	}
	
};
export const loadItems = () => async (dispatch, getState) => {
	
	dispatch({
        type: 'ITEMS_LOADING'
	});

	let answer;
	try {
		answer = await fetch('https://cors-anywhere.herokuapp.com/http://www.dota2.com/jsfeed/itemdata', {
					method: 'GET',
				});
		
	} catch (e) {
		console.log('error', e);
	}
	if(answer===undefined){
		setTimeout(() => {
			dispatch({
				type: 'ITEMS_LOADED',
				payload: itemsBackUpJson
			})
		  }, 2000)
	}
	else{
		answer.json().then( data => {
			setTimeout(() => {
				dispatch({
					type: 'ITEMS_LOADED',
					payload: data
				})
			  }, 2000)
		});
	}
	
};
