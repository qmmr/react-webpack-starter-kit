import React, { Component, PropTypes } from 'react'
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router'

const Links = () =>
	<nav>
		<Link activeClassName='active' to='/'>Home</Link>
		<Link activeClassName='active' to='/about'>About</Link>
	</nav>

const Container = props =>
	<div>
		<Links />
		{ props.header }
		{ props.body }
		{ props.children }
	</div>

const Header = () => <div><h1>repack-starter-kit</h1></div>
const Body = () =>
	<div>
		<p>React + webpack along with:</p>
		<ul>
			<li>React-router</li>
			<li>Babel</li>
			<li>Redux (soon)</li>
		</ul>
	</div>

const About = () =>
	<div>
		<p>My name is Marcin and this is my personal starter-kit for building web apps with React.js and webpack</p>
	</div>

export default class App extends Component {

	static displayName = 'ReactWebpackStarterKit'
	static propTypes = { message: PropTypes.string }
	static defaultProps = { message: 'Hello world!' }

	render() {
		return (
			<Router history={ browserHistory }>
				<Route path='/' component={ Container }>
					<IndexRoute components={ { header: Header, body: Body } } />
					<Route path='about' component={ About } />
				</Route>
			</Router>
		)
	}

}
