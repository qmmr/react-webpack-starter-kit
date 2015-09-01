import React, { Component, PropTypes } from 'react'

class Contacts extends Component {

	static displayName = 'Contacts'
	static propTypes = {
		contacts: PropTypes.array.isRequired
	}

	render() {
		return (
			<section className="contacts">
				<h1>Contacts</h1>
				<ul>
					{ this._getContacts() }
				</ul>
			</section>
		)
	}

	_getContacts() {
		let { contacts } = this.props.contacts
		return contacts.map(({ id, first, last, avatar }) => <li key={ id }><img src={ avatar } width="20px" height="20px" />{ first } { last }</li>)
	}
}

export default Contacts
