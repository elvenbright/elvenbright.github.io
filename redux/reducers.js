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

export default (state = initialState, action) => {
	switch(action.type) {
		case "NEWS_LOADING": {
			return {
				...state,
			}
		}
		case "REMOVE_FRIEND": {
			return {
				...state,
				list: state.list.slice(0, -1)
			}
		}
		default: return state;
	}
	return state;
};



