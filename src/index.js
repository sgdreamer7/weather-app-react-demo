import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, IndexRoute,Route, hashHistory } from 'react-router'

import Home from './components/Home'
import City from './components/City'
import Settings from './components/Settings'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'

import App from './components/App'

ReactDOM.render((
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path='/' component={App}>
				<IndexRoute component={Home} />
				<Route path='/city/:cityId' component={City} />
        <Route path='/settings' component={Settings} />
			</Route>
		</Router>
	</Provider>
), document.getElementById('root'))
