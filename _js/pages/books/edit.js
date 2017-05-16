import React from 'react';
import { render } from 'react-dom';
import $ from 'jQuery';

import EditBookContainer from '../../containers/books/EditBookContainer';

class EditBookPage extends React.Component {
	state = {user: {}, authorized: false};
	componentDidMount(){
		$.get('/api/v1/user_session').then(
			resp => {
				$.get(`/api/v1/books/${bookId}`).then(
					book =>{
						var authorized = false;
						if(resp.data.role > 1 || book.data.author._id == resp.data._id){
							authorized =  true;
						}
						this.setState({user: resp.data, authorized: authorized});
					}
				)
			}
		)
	}

	render(){
		return(
			<EditBookContainer bookId={bookId} user={this.state.user} authorized={this.state.authorized} />
		)
	}
}

if (document.getElementById('edit-book')) {
  render(
    <EditBookPage />,
    document.getElementById('edit-book'),
  );
}
