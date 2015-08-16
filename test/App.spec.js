require('babel-core/register')

var test = require('tape').test

test('Test your App with TAP', function(t) {
	var App = require('../src/App.jsx')

	t.equal(1, 1, 'WAT?!?')

	t.end()
})
