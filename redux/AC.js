import isoFetch from 'isomorphic-fetch';
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
	answer.json().then( data => {
		answer=data;
		dispatch({
			type: 'NEWS_LOADED',
			payload: answer
		});
	});
	
	
	


	
};

export const loadHeroes = () => {
    return{
		type: "NEWS_LOADING",
	}
};
export const loadItems = () => {
    return{
		type: "REMOVE_FRIEND",
		payload: {
			friend: e
		}
	}
};