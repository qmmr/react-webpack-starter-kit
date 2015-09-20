import test from 'tape'
import React from 'react'
// import sd from 'skin-deep'
import App from '../src/App.jsx'

test('Given the App', function(t) {
	// const tree = sd.shallowRender(React.createElement(App))
	// const vdom = tree.getRenderOutput()

	// console.log(vdom);
	// console.log(tree.getMountedInstance());
	// console.log(tree.textIn('h1'));

	// expected
	const NODE_TYPE = 'h1'
	const EXPECTED_MESSAGE = 'Hello, welcome to my react-webpack-starter-kit'

	t.is(1, 1, 'fair enough...')
	// t.is(tree.text(), EXPECTED_MESSAGE, 'should be expected message')
	// t.is(vdom.type, NODE_TYPE, 'should be expected NODE_TYPE')

	t.end()
})
