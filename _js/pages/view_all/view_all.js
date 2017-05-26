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
		this.getUser()
	}

	getUser = ()=>{
		$.get(apiUrl+'/user_session').then((user)=>{
			if(user.data._id){
				$.get(apiUrl+'/users/'+user.data._id+'?book_list=true').then((user)=>{
					this.setState({user: user.data});
					this.getView();
				})
			}else{
				this.getView();
			}
		});
	}

	getView = (page)=>{
		switch (this.state.view) {
			case 'user-library': this.getUserLibrary(page);
				break;
			case 'user-books': this.getUserBooks(page);
				break;
			default: this.getBooks(page);

		}
	}

	getUserBooks = (page)=>{
		var page = page || this.state.page;
		console.log('/users/'+this.state.user._id+'/books');
		var query = apiUrl+'/users/'+this.state.user._id+'/books?limit='+this.state.limit+'&page='+page;
		$.get(query).then((books)=>{
			this.setState({books: books.data, count: books.count, title: 'Viewing Your Books'});
		})
	}

	getUserLibrary = (page)=>{
		var query = apiUrl+'/books/library?limit='+this.state.limit;
		var page = page || this.state.page;
		$.get(query+'&page='+page).then((books)=>{
			this.setState({books: books.data, count: books.count, title: 'Viewing Your Library'});
		})
	}

	getBooks = (page)=>{
		var query = apiUrl+'/books?limit='+this.state.limit, title = 'Viewing All Books';
		if(this.state.view == 'top'){ query = query + '&sort=-rating'; title = 'Viewing Top Rated' }
		if(this.state.view == 'recommended'){ query = '/recommended' + query; title = 'Viewing Recommended' }
		if(this.state.rating){ query = query + '&rating='+this.state.rating }
		if(this.state.author){ query = query + '&author='+this.state.author }
		if(this.state.genres){ query = query + '&genres='+this.state.genres; title = title + ' : ' + this.state.genres }

		if(this.state.view == 'search') title = 'Search Results';
		var page = page || this.state.page;
		$.get(query+'&page='+page).then((books)=>{
			this.setState({books: books.data, count: books.count, title: title});
		})
	}

	prev = (e)=>{
		e.preventDefault();
		var page = this.state.page - 1;
		this.setState({page: page}, this.getView(page));
		window.history.pushState('Browse', 'Browse', e.target.href);
	}

	next = (e)=>{
		e.preventDefault();
		var page = this.state.page + 1;
		this.setState({page: page}, this.getView(page));
		window.history.pushState('Browse', 'Browse', e.target.href);
	}

	followBook = (e)=>{
		$.post(`${apiUrl}/books/${e.target.id}/follow`)
		.then(res => {
			this.getUser();
		})
	}

	unfollowBook = (e)=>{
		console.log('UNFOLLOW');
		$.ajax({
			url: `${apiUrl}/books/${e.target.id}/follow`,
			type: 'DELETE',
		}).then(res => {
			this.getUser();
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
							<a href={url + '&page=' + (this.state.page - 1)} className="prev" onClick={this.prev}>Previous</a>
					}
					<span className="currentPage">Page {this.state.page}</span>
					<span>of</span>
					<span className="allPages">{Math.ceil(this.state.count/this.state.limit)}</span>
					{this.state.page < Math.ceil(this.state.count/this.state.limit) &&
							<a href={url+ '&page=' + (this.state.page + 1)} className="next" onClick={this.next}>Next</a>
					}
				</div>
			)
		}

		var bookRow;
		if(this.state.view == 'user-books'){
			bookRow = <BookRow userBooks='true' smallBooks='true' books={this.state.books} user={this.state.user} followBook={this.followBook} unfollowBook={this.unfollowBook}/>
		}else{
			bookRow = <BookRow smallBooks='true' books={this.state.books} user={this.state.user} followBook={this.followBook} unfollowBook={this.unfollowBook}/>
		}

		return(
			<div>
				<h3>{this.state.title}</h3>
				{bookRow}
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
