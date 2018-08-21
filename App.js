import React from 'react';
import ReactDOM from 'react-dom';

//для работы async / await
import "babel-polyfill";

//route
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';

//redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from "./redux/reducers";

//components
import Block_Main from './components/Block_Main';
import Block_Filter from './components/Block_Filter';
import Block_Selected from './components/Block_Selected';

let store = createStore(
	combineReducers({
		reducer,
	  }),
	  composeWithDevTools()
);

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

