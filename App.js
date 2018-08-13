import React from 'react';
import ReactDOM from 'react-dom';

//route
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';

//redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import myReducer from "./redux/reducers";

//components
import Block_Main from './components/Block_Main';
import Block_Page from './components/Block_Page';

let store = createStore(
	combineReducers({
		myReducer,
	  }),
	  composeWithDevTools()
);

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<React.Fragment>
				<Route path="/" exact component={Block_Main} />
				<Route path="/url1" component={Block_Page} />
			</React.Fragment>
		</BrowserRouter>
	</Provider>
	, document.getElementById('container') 
);

