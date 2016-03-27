import React, { Component, PropTypes } from 'react'
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router'

const Links = () =>
	<nav>
		<Link activeClassName='active' to='/'>Home</Link>
		<Link activeClassName='active' to='/about'>About</Link>
		<Link activeClassName='active' to='/me'>me</Link>
		<Link activeClassName='active' to='/me/name'>Me name</Link>
		<Link activeClassName='active' to='/me/name/Marcin'>Me name is Marcin</Link>
		<Link activeClassName='active' to='/contact'>Contact</Link>
		<Link activeClassName='active' to='/query'>Query: default</Link>
		<Link activeClassName='active' to={{ pathname: 'query', query: { query: 'Yo dude!' } }}>Query: "Yo dude!"</Link>
	</nav>

const About = (props) => <div><Links /><h1>About</h1>{ props.children }</div>

const MeWrapper = (props) =>
	<div>
		<Links />
		<h1>MeWrapper</h1>
		{ props.children }
	</div>
const Me = (props) => <div><h1>Me</h1>{ props.children }</div>
const MeName = (props) =>
	<div>
		<h1>MeName is { props.params.name || 'anonymous' }</h1>
	</div>

const Contact = () => <div><Links /><h1>Contact</h1></div>
const CompositeContainer = (props) =>
	<div>
		<Links />
		{ props.header }
		{ props.body }
	</div>

const CompositeHeader = () => <div><h1>CompositeHeader</h1></div>
const CompositeBody = () => <div><p>CompositeBody</p></div>

const Query = (props) =>
	<div>
		<Links />
		<p>Query param is { props.location.query.query || 'default' }</p>
	</div>

export default class App extends Component {

	static displayName = 'ReactWebpackStarterKit'
	static propTypes = { message: PropTypes.string }
	static defaultProps = { message: 'Hello world!' }

	render() {
		return (
			<Router history={ browserHistory }>
				<Route path='/' component={ CompositeContainer }>
					<IndexRoute components={{ header: CompositeHeader, body: CompositeBody }}></IndexRoute>
				</Route>
				<Route path='/me' component={ MeWrapper }>
					<IndexRoute component={ Me }></IndexRoute>
					<Route path='name(/:name)' component={ MeName }></Route>
				</Route>
				<Route path='about' component={ About }></Route>
				<Route path='/contact' component={ Contact }></Route>
				<Route path='/query' component={ Query } />
			</Router>
		)
	}

}
