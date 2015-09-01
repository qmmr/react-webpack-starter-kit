import { Component } from 'react'
import ContactsContainer from 'containers/ContactsContainer'

// css
import 'css/normalize.css'
import 'css/foundation.min.css'
import 'css/style.css'

export default class App extends Component {

	static displayName = 'App'

	render() {
		return <ContactsContainer />
	}

}
