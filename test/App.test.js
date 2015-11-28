import React from 'react'
import expect from 'expect'
import TestUtils from 'react-addons-test-utils'
import App from '../src/App.jsx'

const setup = () => {
	const renderer = TestUtils.createRenderer()
	renderer.render(<App />)
	const output = renderer.getRenderOutput()

	return { output, renderer }
}

describe('Given the App', () => {
	it('should render correctly the header element', () => {
		const { output } = setup()
		const EXPECTED_H1_TEXT = 'Hello world!'
		const EXPECTED_H2_TEXT = 'Build with React v0.14.3'

		expect(output.type).toBe('header')

		const [ h1, h2 ] = output.props.children

		expect(h1.type).toBe('h1')
		expect(h2.type).toBe('h2')

		expect(h1.props.children).toBe(EXPECTED_H1_TEXT)
		expect(h2.props.children.join('')).toBe(EXPECTED_H2_TEXT)
	})
})
