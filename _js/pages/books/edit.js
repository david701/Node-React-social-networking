import React from 'react';
import { render } from 'react-dom';
import $ from 'jQuery';

import EditBookContainer from '../../containers/books/EditBookContainer';

class EditBookPage extends React.Component {
	state = {user: {}, authorized: false, following: false, screen: 'preview'};
	componentDidMount(){
		$.get('/api/v1/user_session').then(
			resp => {
				$.get(`/api/v1/books/${bookId}`).then(
					book =>{
						var authorized = false,
								following = false;
						if(resp.data.role > 1 || book.data.author._id == resp.data._id){
							authorized =  true;
						}
						if(book.data.followers.indexOf(resp.data._id) > -1){
							following = true;
						}
						this.setState({user: resp.data, book: book.data, authorized: authorized, following: following});
					}
				)
			}
		)
	}

	toggleScreen = ()=>{
		let preview = this.state.screen === 'preview' ? 'full-screen' : 'preview';
		this.setState({screen: preview})
	}

	render(){
		return(
			<div id={this.state.screen}>
				<EditBookContainer bookId={bookId} toggleScreen={this.toggleScreen} book={this.state.book} user={this.state.user} authorized={this.state.authorized} following={this.state.following}/>
			</div>
		)
	}
}

if (document.getElementById('edit-book')) {
  render(
    <EditBookPage />,
    document.getElementById('edit-book'),
  );
}
