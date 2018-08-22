import isoFetch from 'isomorphic-fetch';


export const loadNews = (dispatch, getState) => async () => {
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