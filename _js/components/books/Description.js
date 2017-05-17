import React from 'react';
import $ from 'jQuery';

import Reviews from './Reviews';

export default class Description extends React.Component{
	state = {following: this.props.following};

	componentWillReceiveProps(nextProps){
		this.setState({following: nextProps.following})
	}

	follow = ()=>{
		$.post(`${apiUrl}/books/${this.props.bookId}/follow`)
		.then(res => {
			this.setState({following: true})
		})
	}

	unfollow = ()=>{
		$.ajax({
			url: `${apiUrl}/books/${this.props.bookId}/follow`,
			type: 'DELETE',
		}).then(res => {
			this.setState({following: false})
		})
	}

	render(){

		var followBtn;
		if(!this.props.authorized){
			if(this.state.following){
				followBtn = <button onClick={this.unfollow} className="button-red" style={{width: 'auto', padding: '0.9375rem 2rem', margin: '0 0 1rem'}}>Unfollow</button>;
			}else{
				followBtn = <button onClick={this.follow}  style={{width: 'auto', padding: '0.9375rem 2rem', margin: '0 0 1rem'}}>Follow</button>;
			}
		}

		return(
			<div className="content-block content-block-standard-slide" style={{overflow: 'hidden'}}>
				<div style={{overflow: 'scroll', height:'100%', width: '120%', paddingRight: '5rem'}}>
				{followBtn}
					{this.props.description || ''}
					<Reviews />
				</div>
			</div>
		);
	}
}
