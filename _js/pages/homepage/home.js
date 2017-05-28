import React from 'react';
import { render } from 'react-dom';
import $ from 'jQuery';

import BookRow from '../../components/books/BooksRow';
import Brawl from '../../components/brawl/Brawl';

const apiUrl = '/api/v1';

import genres from '../../../data/genres.json';

const limit = 8;

class Home extends React.Component{
	state = {books:[], topBooks:[], recommendedBooks:[], genre:'', user:'',brawls:[]}
	componentDidMount(){
		this.getUser();
		this.getAllBooks();
		this.getBrawls();
	}


	vote = (e,voterId,brawlerId) => {
		alert('voter id: ' + voterId + " brawler id: " + brawlerId);
		this.getBrawls();
		e.preventDefault();
		e.stopPropagation();
	}

	getBrawls = () => {
		let brawls =  [
   		{
	      brawlers:[
	         {
	            _id:"0",
	            author:{
	               _id:"0",
	               name:"Elon Mitchell",
	               avatar:"/assets/images/dog.gif"
	            },
	            cover:"/assets/images/default-cover-art.jpg",
	            title:"Some Book",
	            rating:5,
	            voters: ["1"],
	            votes:1
	         },
	         {
	            _id:"1",
	            author:{
	               _id:"1",
	               name:"Terry Pierre",
	               avatar:"/assets/images/cat.gif"
	            },
	            cover:"/assets/images/default-cover-art.jpg",
	            title:"Some Book",
	            rating:5,
	            voters: ["0"],
	            votes:1
	         }
	      ],
	      results:{
	         declared:true,
	         totalVotes:2,
	         voters: ["0","1"],
	         winner:{
	            _id:"1",
	            author:{
	               _id:"1",
	               name:"Elon Mitchell",
	               avatar:"/assets/images/cat.gif"
	            },
	            title:"Some Book"
	         }
	      },
	      updated_at:"XXXX-XX-XX"
	   },
	   {
	      brawlers:[
	         {
	            _id:"0",
	            author:{
	               _id:"0",
	               name:"Ericka Emery",
	               avatar:"/assets/images/cat.gif"
	            },
	            cover:"/assets/images/default-cover-art.jpg",
	            title:"Some Book",
	            rating:5,
	            voters: ["0"],
	            votes:1
	         },
	         {
	            _id:"1",
	            author:{
	               _id:"1",
	               name:"Michael Way",
	               avatar:"/assets/images/dog.gif"
	            },
	            cover:"/assets/images/default-cover-art.jpg",
	            title:"Some Book",
	            rating:5,
	            voters: ["1"],
	            votes:1
	         }
	      ],
	      results:{
	         declared:false,
	         totalVotes:2,
	         voters: ["0","1"],
	         winner:{
	            _id:"1",
	            author:{
	               _id:"1",
	               name:"Michael Way",
	               avatar:"/assets/images/cat.gif"
	            },
	            title:"Some Book"
	         }
	      },
	      updated_at:"XXXX-XX-XX"
	   }];
	 	this.setState({brawls: brawls});
	}

	getUser = ()=>{
		$.get(`${apiUrl}/user_session`).then((user)=>{
			if(user.data._id){
				$.get(`${apiUrl}/users/${user.data._id}?book_list=true`).then((user)=>{
					this.setState({user:user.data});
				})
			}
		})
	}

	getAllBooks = (genre)=>{
		this.getBooks(genre);
		this.getRecommended(genre);
		this.getTopRated(genre);
	}

	getBooks = (genre)=>{
		var url = apiUrl + '/books?limit='+limit;
		if(genre) url = url + '&genre='+genre;
		$.get(url).then((books)=>{
			this.setState({books: books.data});
		}).catch(err=>{
			console.log(err);
		})
	}

	getRecommended = (genre)=>{
		var url = apiUrl + '/books/recommended?limit='+limit;
		if(genre) url = url + '&genre='+genre;
		$.get(url).then((books)=>{
			this.setState({recommendedBooks: books.data});
		}).catch(err=>{
			console.log(err);
		})
	}

	getTopRated = (genre)=>{
		var url = apiUrl + '/books?sort=-rating&limit='+limit;
		if(genre) url = url + '&genre='+genre;
		$.get(url).then((books)=>{
			this.setState({topBooks: books.data});
		}).catch(err=>{
			console.log(err);
		})
	}

	changeGenre = (e)=>{
		this.setState({genre: e.target.value});
		this.getAllBooks(e.target.value);
	}

	followBook = (e)=>{
		$.post(`${apiUrl}/books/${e.target.id}/follow`)
		.then(res => {
			this.getUser();
		})
	}

	unfollowBook = (e)=>{
		$.ajax({
			url: `${apiUrl}/books/${e.target.id}/follow`,
			type: 'DELETE',
		}).then(res => {
			this.getUser();
		})
	}

	render(){
		return(
			<div>
				<Brawl brawls={this.state.brawls} me={this.state.user} vote={this.vote}/>
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

						{this.state.genre?<BookRow title={this.state.genre} link={'/books/all?genres='+ this.state.genre} books={this.state.books} user={this.state.user} followBook={this.followBook} unfollowBook={this.unfollowBook}/>:''}

						{this.state.recommendedBooks && this.state.recommendedBooks.length?<BookRow title="Recommended" link='/books/all?view=recommended' books={this.state.recommendedBooks} user={this.state.user} followBook={this.followBook} unfollowBook={this.unfollowBook}/>:''}

						<BookRow title="Top Rated" link='/books/all?view=top' books={this.state.topBooks} user={this.state.user} followBook={this.followBook} unfollowBook={this.unfollowBook}/>

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
