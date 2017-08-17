import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import RouteList from './RouteList/RouteContainer.js';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';

ReactDOM.render(<Router>
					<div id='Router'>
						<Route path='/home' component={App} />
						<Route path='/mylist' component={RouteList} />
					</div>
				</Router>, document.getElementById('root'));
registerServiceWorker();
