import isoFetch from 'isomorphic-fetch';

//backup если не загрузятся данные
import heroesBackUpJson from "../jsonBackUp/heroes";
import itemsBackUpJson from "../jsonBackUp/items";
import newsBackUpJson from "../jsonBackUp/news";
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
	console.log("answer",answer);
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

	let answer;
	try {
		answer = await fetch('https://cors-anywhere.herokuapp.com/http://www.dota2.com/jsfeed/heropickerdata', {
					method: 'GET',
				});
		
	} catch (e) {
		console.log('error', e);
	}
	console.log("answer",answer);
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
	console.log("answer",answer);
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
