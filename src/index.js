import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import RouteList from './RouteList/RouteContainer.js';
import SharedList from './RouteList/SharedRouteContainer';
import ViewRoute from './View/ViewRouteContainer.js';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';

ReactDOM.render(<Router >
					<div id='Router'>
						<Route path={process.env.PUBLIC_URL+'/home'} component={App} />
						<Route path={process.env.PUBLIC_URL+'/list'} component={RouteList} />
						<Route path={process.env.PUBLIC_URL+'/sharedlist'} component={SharedList} />
						<Route path={process.env.PUBLIC_URL+'/route/:params'} component={ViewRoute} />
					</div>
				</Router>, document.getElementById('root'));
registerServiceWorker();
