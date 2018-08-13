let initialState = {
	list: [],
};

export default (state = initialState, action) => {
	switch(action.type) {
		case "ADD_FRIEND": {
			return {
				...state,
				list: state.list.concat(action.payload.friend)
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



