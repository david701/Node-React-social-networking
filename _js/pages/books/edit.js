import React from 'react';
import { render } from 'react-dom';
import $ from 'jQuery';

import EditBookContainer from '../../containers/books/EditBookContainer';

class EditBookPage extends React.Component {
	state = {user: {}};
	componentDidMount(){
		$.get('/api/v1/user_session').then(
			resp => {
				console.log(resp);
				this.setState({user: resp.data});
			}
		)
	}

	render(){
		return(
			<EditBookContainer bookId={bookId} user={this.state.user}/>
		)
	}
}

if (document.getElementById('edit-book')) {
  render(
    <EditBookPage />,
    document.getElementById('edit-book'),
  );
}
