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
	},
	abilities:{
		data: {},
		loading: false,
		isLoaded: false,
	},

};

//export default (state = initialState, {type,payload}) - сокращенная запись
export default (state = initialState, action) => {
	switch(action.type) {
		case "ABILITIES_LOADING": {
			return {
				...state,
				abilities:{
					...state.abilities,
					loading: true,
				}
			}
		}
		case "ABILITIES_LOADED": {
			return {
				...state,
				abilities:{
					...state.abilities,
					loading: false,
					isLoaded: true,
					data: action.payload,
				}
			}
		}
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
		case "HEROES_LOADING": {
			return {
				...state,
				heroes:{
					...state.heroes,
					loading: true,
				}
			}
		}
		case "HEROES_LOADED": {
			return {
				...state,
				heroes:{
					...state.heroes,
					loading: false,
					isLoaded: true,
					data: action.payload,
				}
			}
		}
		case "ITEMS_LOADING": {
			return {
				...state,
				items:{
					...state.items,
					loading: true,
				}
			}
		}
		case "ITEMS_LOADED": {
			return {
				...state,
				items:{
					...state.items,
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



