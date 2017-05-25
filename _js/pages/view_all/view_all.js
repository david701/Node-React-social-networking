import React from 'react';
import ReactDOM from 'react-dom';

import $ from 'jQuery';

import BookRow from '../../components/books/BooksRow';

const apiUrl = '/api/v1';

class ViewAll extends React.Component{
	state = {
		title: '',
		user:'',
		view: query.view || '',
		genres: query.genres || '',
		tags: query.tags || '',
		author: query.author || '',
		rating: query.rating || '',
		page: parseInt(query.page) || 1,
		books:[],
		limit: 20,
		count: 0
	}

	componentDidMount(){
		$.get(apiUrl+'/user_session').then((user)=>{
			if(user.data._id){
				$.get(apiUrl+'/user_session').then((user)=>{
					this.setState({user: user.data});
					this.getView();
				})
			}else{
				this.getView();
			}
		});
	}

	getView = ()=>{
		switch (this.state.view) {
			case 'user-library': this.getUserLibrary();
				break;
			case 'user-books': this.getUserBooks();
				break;
			default: this.getBooks();

		}
	}

	getUserBooks = ()=>{
		var query = apiUrl+'/users/'+this.state.user.data._id+'/books?limit='+this.state.limit+'&page='+this.state.page;
		$.get(query).then((books)=>{
			this.setState({user: user.data, books: books.data, count: books.count, title: 'Viewing Your Books'});
		})
	}

	getUserLibrary = ()=>{
		this.setState({books: this.state.user.following_books, title: 'Viewing Your Library'});
	}

	getBooks = ()=>{
		var query = apiUrl+'/books?limit='+this.state.limit, title = 'Viewing All Books';
		if(this.state.view == 'top'){ query = query + '&sort=-rating'; title = 'Viewing Top Rated' }
		if(this.state.view == 'recommended'){ query = '/recommended' + query; title = 'Viewing Recommended' }
		if(this.state.rating){ query = query + '&rating='+this.state.rating }
		if(this.state.author){ query = query + '&author='+this.state.author }
		if(this.state.genres){ query = query + '&genres='+this.state.genres; title = title + ' : ' + this.state.genres }

		if(this.state.view == 'search') title = 'Search Results';

		$.get(query+'&page='+this.state.page).then((books)=>{
			this.setState({books: books.data, count: books.count, title: title});
		})
	}

	render(){
		var url = '/books/all?', view = '', tags = '', genres = '', paginate;
		if(this.state.view) view = 'view=' + this.state.view;
		if(this.state.tags) tags = '&tags=' + this.state.tags;
		if(this.state.genres) genres = '&genres=' + this.state.genres;
		url = url + view + tags + genres;

		if(Math.ceil(this.state.count/this.state.limit) > 1){
			paginate = (
				<div className="pages">
					{this.state.page > 1 &&
							<a href={url + '&page=' + (this.state.page - 1)} className="prev">Previous</a>
					}
					<span className="currentPage">Page {this.state.page}</span>
					<span>of</span>
					<span className="allPages">{Math.ceil(this.state.count/this.state.limit)}</span>
					{this.state.page < Math.ceil(this.state.count/this.state.limit) &&
							<a href={url+ '&page=' + (this.state.page + 1)} className="next">Next</a>
					}
				</div>
			)
		}

		return(
			<div>
				<h3>{this.state.title}</h3>
				{this.state.count > 0?(<BookRow smallBooks='true' books={this.state.books} user={this.state.user} />):''}
				{paginate}
			</div>
		)
	}
}

if (document.getElementById('view_all')) {
  ReactDOM.render(
    <ViewAll />,
    document.getElementById('view_all'),
  );
}
