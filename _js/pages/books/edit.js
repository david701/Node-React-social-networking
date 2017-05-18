import React from 'react';
import { render } from 'react-dom';
import $ from 'jQuery';

import EditBookContainer from '../../containers/books/EditBookContainer';

class EditBookPage extends React.Component {
	state = {user: {}, authorized: false, following: false, screen: 'preview', admin: false};
	componentDidMount(){
		$.get('/api/v1/user_session').then(
			resp => {
				$.get(`/api/v1/books/${bookId}`).then(
					book =>{
						var authorized = false,
								following = false,
								admin = false;
						if(resp.data.role > 1){
							admin = true;
						}
						if(resp.data.role > 1 || book.data.author._id == resp.data._id){
							authorized =  true;
						}
						if(book.data.followers.indexOf(resp.data._id) > -1){
							following = true;
						}
						this.setState({user: resp.data, book: book.data, authorized: authorized, following: following, admin: admin});
					}
				)
			}
		)
	}

	getBook = ()=>{
		$.get(`/api/v1/books/${bookId}`).then(
			book =>{
				this.setState({book: book.data});
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
				<EditBookContainer bookId={bookId} toggleScreen={this.toggleScreen} book={this.state.book} user={this.state.user} authorized={this.state.authorized} admin={this.state.admin} following={this.state.following} getBook={this.getBook}/>
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
