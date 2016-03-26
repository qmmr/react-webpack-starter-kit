import React, { Component, PropTypes } from 'react'

import './css/main.scss'

export default class App extends Component {

	static displayName = 'ReactWebpackStarterKit'
	static propTypes = { message: PropTypes.string }
	static defaultProps = { message: 'Hello world!' }

	render() {
		return (
			<header>
				<h1>{ this.props.message }</h1>
				<h2>Build with React v{ React.version }</h2>
				<button className='button'>Click me!</button>
			</header>
		)
	}

}
