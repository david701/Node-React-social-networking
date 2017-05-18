import React from 'react';
import $ from 'jQuery';

import Reviews from './Reviews';

const apiUrl = `/api/v1`;

export default class Description extends React.Component{
	state = {following: this.props.following};

	componentWillReceiveProps(nextProps){
		this.setState({following: nextProps.following})
	}

	follow = (e)=>{
		e.preventDefault()
		$.post(`${apiUrl}/books/${this.props.bookId}/follow`)
		.then(res => {
			this.setState({following: true})
		})
	}

	unfollow = (e)=>{
		e.preventDefault()
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
				followBtn = <a onClick={this.unfollow} className="button button-red" style={{display: 'inline-block', width: 'auto', padding: '0.9375rem 2rem', margin: '0 0 1rem'}}>Unfollow</a>;
			}else{
				followBtn = <a onClick={this.follow} className="button" style={{display: 'inline-block', width: 'auto', padding: '0.9375rem 2rem', margin: '0 0 1rem'}}>Follow</a>;
			}
		}

		return(
			<div className="content-block content-block-standard-slide" style={{overflow: 'hidden'}}>
				<div style={{overflow: 'scroll', height:'100%', width: '120%', paddingRight: '5rem'}}>
				{followBtn}
					<p>{this.props.description}</p>
					<Reviews bookId={this.props.bookId} authorized={this.props.authorized} admin={this.props.admin}/>
				</div>
			</div>
		);
	}
}
