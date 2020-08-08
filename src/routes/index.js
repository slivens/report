import React from 'react'
import {Router, Route, IndexRoute} from 'react-router'
import Frame from 'modules/shared/layouts/frame'
import Intl from 'i18n/intl'

const Home = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('modules/home'))
  }, 'Home')
}
const Detail = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('modules/detail'))
  }, 'Detail')
}
const Add = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('modules/add'))
  }, 'Add')
}

const routes = history => (
  <Router history={history}>
    <Route component={Intl}>
      <Route path="/" component={Frame}>
        <IndexRoute getComponent={Home} />
        <Route path="/detail/:id" getComponent={Detail} />
        <Route path="/add" getComponent={Add} />
      </Route>
    </Route>
  </Router>
)

export default routes
