import React from 'react';
import $ from 'jQuery';

import Reviews from './Reviews';

const apiUrl = `/api/v1`;

export default class Description extends React.Component{
	state = {following: this.props.following, showMenu: ""};

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

	navigateToPage = (e,url) => {
		window.location.href = url;
		this.setState({showMenu: ""});
		e.preventDefault();
		e.stopPropagation();
	}

	toggleBuy = (e) => {
		let newState = (this.state.showMenu) === "" ? "show" : "";
		this.setState({showMenu: newState});
		e.preventDefault();
		e.stopPropagation();
	}

	closePopUps = () => {
		this.setState({showMenu: ""});
	}

	render(){
		let followBtn;
		let $this = this;
		let socialMedia = {
				amazon: 'Amazon',
				kobo: 'Kobo',
				smashword: 'Smashwords',
				itunes: 'Itunes',
				barnesandnoble: 'Barnes and Nobles',
				twitter: 'Twitter'
		}

		if(!this.props.authorized){
			if(this.state.following){
				followBtn = <a onClick={this.unfollow} className="button button-red" style={{display: 'inline-block', width: 'auto', padding: '0.9375rem 2rem', margin: '0 0 1rem'}}>Unfollow</a>;
			}else{
				followBtn = <a onClick={this.follow} className="button" style={{display: 'inline-block', width: 'auto', padding: '0.9375rem 2rem', margin: '0 0 1rem'}}>Follow</a>;
			}
		}

		return(
			<div className="content-block content-block-standard-slide" style={{overflow: 'hidden', padding: 0}}>
				<div style={{overflowY: 'scroll', height:'100%', width: '100%', padding: '2em'}}>
				{followBtn}
				{!this.props.authorized && this.props.book && this.props.book.social_media ?
					(
						<div className="buy-section">
							<button className='button-white menu-button' style={{display: 'inline-block', width: 'auto', padding: '0.9375rem 2rem'}} onClick={(e)=> {$this.toggleBuy(e)}}>Buy</button>
							<ul className={"menu " + this.state.showMenu}>
								{Object.keys(this.props.book.social_media).map((link,index)=>{
									if(this.props.book.social_media[link]){
										return (
											<li onClick={(e) => {$this.navigateToPage(e,this.props.book.social_media[link])}} key={index}>{socialMedia[link]}</li>
										)
									}
								})}
							</ul>
						</div>
					)
					: ''
				}
				{!this.props.authorized?(<button className='button-white' style={{display: 'inline-block', width: 'auto', padding: '0.9375rem 2rem', margin: '0 0 1rem 1rem'}} onClick={this.props.claim}>Claim</button>):''}
					<p>{this.props.description}</p>
					<Reviews bookId={this.props.bookId} authorized={this.props.authorized} admin={this.props.admin} getBook={this.props.getBook}/>
				</div>
			</div>
		);
	}
}
