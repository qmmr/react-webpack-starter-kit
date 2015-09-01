import { Component } from 'react'
import AltContainer from 'alt/altContainer'

import ContactsStore from 'stores/ContactsStore'
import Contacts from 'components/Contacts'

class ContactsContainer extends Component {

	static displayName = 'ContactsContainer'

	state = {
		contacts: []
	}

	constructor(props) {
		super(props)
		console.log('ContactsContainer will mount...')
	}

	render() {
		return (
			<AltContainer stores={{ contacts: ContactsStore }}>
				<Contacts />
			</AltContainer>
		)
	}


}

export default ContactsContainer
