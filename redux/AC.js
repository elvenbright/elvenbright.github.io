export const loadNews = () => {
	/*
	let answer;
	try {
		answer = await fetch('https://cors-anywhere.herokuapp.com/http://www.dota2.com/jsfeed/abilitydata?language=zh', {
			method: 'GET',
		});
		
	} catch (e) {
		console.log('error', e);
	}
	answer.json().then( data => {
		console.log(data);
	});
*/
	return{
		type: "NEWS_LOADING"
	}
};

export const loadHeroes = () => {
    return{
		type: "NEWS_LOADING",
		payload: {
			friend: e
		}
	}
};
export const loadItems = () => {
    return{
		type: "REMOVE_FRIEND",
	}
};

