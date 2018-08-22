let initialState = {
	news:{
		data: {},
		loading: false,
		isLoaded: false,
	},
	heroes:{
		data: {},
		loading: false,
		isLoaded: false,
	},
	items:{
		data: {},
		loading: false,
		isLoaded: false,
	}
};
//export default (state = initialState, {type,payload}) - сокращенная запись
export default (state = initialState, action) => {
	switch(action.type) {
		case "NEWS_LOADING": {
			return {
				...state,
				news:{
					...state.news,
					loading: true,
				}
			}
		}
		case "NEWS_LOADED": {
			console.log(action.payload)
			return {
				...state,
				news:{
					...state.news,
					loading: false,
					isLoaded: true,
					data: action.payload,
				}
			}
		}
		default: return state;
	}
	return state;
};



