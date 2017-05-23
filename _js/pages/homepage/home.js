import React from 'react';
import { render } from 'react-dom';
import $ from 'jQuery';

import BookRow from '../../components/books/BooksRow';
import Brawl from '../../components/brawl/Brawl';

const apiUrl = '/api/v1';

import genres from '../../../data/genres.json';

class Home extends React.Component{
	state = {books:[], genre:''}
	componentDidMount(){
		this.getUser();
		this.getBooks();
	}

	getUser = ()=>{
		$.get(`${apiUrl}/user_session`).then((user)=>{
			if(user.data){
				$.get(`${apiUrl}/users/${user.data._id}`).then((user)=>{
					//console.log(user);
				})
			}
		})
	}

	getBooks = (genre)=>{
		var url = apiUrl + '/books?limit=4';
		if(genre) url = url + '&genre='+genre;
		$.get(url).then((books)=>{
			this.setState({books: books.data});
		}).catch(err=>{
			console.log(err);
		})
	}

	changeGenre = (e)=>{
		this.setState({genre: e.target.value});
		this.getBooks(e.target.value);
	}

	render(){
		return(
			<div>
				<Brawl />
				<section className="standard-section">
						<div className="container">
								<div className="content-block">
										<div className="placeholder">
												<h4>Ad Space</h4>
										</div>
								</div>
								<div className="filter-controls">
										<div className="flex-row">
												<strong>View: </strong>
												<div className="minimal-select minimal-select-large">
														<select value={this.state.genre} onChange={this.changeGenre}>
																<option value="">All Genres</option>
																{genres.map((genre, key)=>(
																	<option key={key} value={genre}>{genre}</option>
																))}
															</select>
												</div>
										</div>
								</div>
						<BookRow title="Recommended" books={this.state.books} />
						<BookRow title="Top Rated" books={this.state.books} />
						<div className="content-block-spread">
								<div className="content-block">
										<div className="placeholder">
												<h4>Ad Space</h4>
										</div>
								</div>
								<div className="content-block">
										<div className="placeholder">
												<h4>Ad Space</h4>
										</div>
								</div>
						</div>
						<BookRow title={this.state.genre?this.state.genre:'Books'} books={this.state.books} />
					</div>
				</section>
			</div>
		)
	}
}

if (document.getElementById('home')) {
  render(
    <Home />,
    document.getElementById('home'),
  );
}
