import React from 'react';
import ReactDOM from 'react-dom';

//для работы async / await
import "babel-polyfill";

//route
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';

//redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from "./redux/reducers";

//middlewares для работы асинхронных action's
import thunk from 'redux-thunk';

//components
import Block_Main from './components/Block_Main';
import Block_Filter from './components/Block_Filter';
import Block_Selected from './components/Block_Selected';


const enhancer = applyMiddleware(thunk);

const composeEnhancers = composeWithDevTools({
	// Specify here name, actionsBlacklist, actionsCreators and other options
});
const store = createStore(combineReducers({
	reducer,
	}), composeEnhancers(
		enhancer,
	// other store enhancers if any
));


ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<React.Fragment>
				<Route path="/" exact component={Block_Main} />
				<Route path="/filter" component={Block_Filter} />
				<Route path="/selected" component={Block_Selected} />
			</React.Fragment>
		</BrowserRouter>
	</Provider>
	, document.getElementById('container') 
);

