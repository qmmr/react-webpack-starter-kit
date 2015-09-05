import alter from 'alter'
import { createStore, bind, expose } from 'alt/utils/decorators'

@createStore(alter)
class ContactsStore {

	static displayName = 'ContactsStore'

	API = 'http://addressbook-api.herokuapp.com/contacts'

	state = {
		contacts: []
	}

	constructor() {
		console.log('ContactsStore constructor...')
		this._fetch()
	}

	_fetch() {
		console.log('fetch...')
		console.log('API', this.API)
		fetch(`${ this.API }`)
			.then(data => data.json())
			.then(data => {
				console.log('data.contacts', data.contacts)
				this.setState({ contacts: data.contacts })
			})
	}
}

export default ContactsStore
