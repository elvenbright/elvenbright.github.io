export const addFriend = (e) => {
    return{
		type: "ADD_FRIEND",
		payload: {
			friend: e
		}
	}
};
export const removeLastFriend = () => {
    return{
		type: "REMOVE_FRIEND",
	}
};

