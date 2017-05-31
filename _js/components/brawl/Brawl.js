import React from 'react';
import $ from 'jQuery';
import Rating from '../dashboard/Rating';

let currentResult = "";
let lastResult = "";


export default class Brawl extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      currentBrawl: [],
	      oldBrawls: [],
	      brawlers: [],
	      title: "Current Brawl",
	      showBrawlers: false,
	      selectedBrawler: 0,
	      startBrawl: false
	    };
	}

  	componentDidMount() {
    	this.getBrawls();
    	this.getBrawlers();
  	}

	vote = (e,brawlId,bookId) => {
		$.ajax({
			url: '/api/v1/brawls/'+brawlId,
			method: 'PUT',
			data: {vote: bookId}
		}).then(()=>{
			this.getBrawls();
		})
		e.preventDefault();
		e.stopPropagation();
	}

	findBrawlerByProp = (prop,value) => {
		return this.state.oldBrawls.filter(function(brawl,index){
			return brawl[prop] === value;
		})
	}

	handleChange = (e) => {
		const newBrawl = [{
		  _id: "",
	      brawlers:[
	         {
	            _id:"",
	            author:{
	               _id:"0",
	               name:"Brawler Name",
	               avatar:"/assets/images/blank-dog.png"
	            },
	            cover:"/assets/images/default-brawl-art.jpg",
	            title:"Some Book",
		        voters: [],
		        votes:0,
	            rating:0
	         },
	         {
	            _id:"",
	            author:{
	               _id:"1",
	               name:"Brawler Name",
	               avatar:"/assets/images/blank-cat.png"
	            },
	            cover:"/assets/images/default-brawl-art.jpg",
	            title:"Some Book",
		        voters: [],
		        votes:0,
	            rating:0
	         }
	      ],
	  	  results:{
	         declared:false,
		     totalVotes:1,
		     voters: [],
	         winner:{}
	      },
	      updated_at:"XXXX-XX-XX"
	   	}]
		let createBrawlSelected = e.target.value === "Create Brawl"
		let brawler = createBrawlSelected ? newBrawl : this.findBrawlerByProp('_id',e.target.value);
		let title = (createBrawlSelected) ? "Create Brawl" : (e.target.selectedIndex === 1) ? "Current Brawl" : this.state.currentBrawl[0].updated_at + " Brawl";
		$('.pick0,.pick1').removeClass('pick0 pick1');
		this.setState({currentBrawl: brawler.reverse(), title: title, startBrawl: false})
	}

	declareWinner = (currentBrawl) => {
		if(currentBrawl){
			var url = '/api/v1/brawls/'+this.state.currentBrawl[0]._id;
			$.ajax({
				url: url,
				method: 'PUT',
				data: {status: 2}
			}).then((brawl)=>{
				this.getBrawls();
			});
		}
	}

	startBrawl = (isCreatePage) => {
		if(isCreatePage){
			var postData = {book_a: this.state.currentBrawl[0].brawlers[0]._id,
			book_b:this.state.currentBrawl[0].brawlers[1]._id};
			$.post('/api/v1/brawls', postData).then((brawl)=>{
				console.log(brawl);
			 	this.getBrawls()
			});
		}
	}

	showBrawlers = (currentBrawl, e, index) => {
		if(currentBrawl){
			this.setState({showBrawlers: true, selectedBrawler: index})
		}
		e.preventDefault();
		e.stopPropagation();
	}

	pickBrawler = (brawl,book,e) => {
		let {currentBrawl, selectedBrawler} = this.state;
		$(e.target).closest('li').addClass('pick' + selectedBrawler).siblings('li').removeClass('pick' + selectedBrawler)
		currentBrawl[0].brawlers[selectedBrawler] = book;
		if(brawl){
			if($('.pick0').length && $('.pick1').length){
				this.setState({currentBrawl: currentBrawl,showBrawlers: false,startBrawl: true});
			}else{
				this.setState({currentBrawl: currentBrawl,showBrawlers: false,startBrawl: false});
			}
		}
		e.preventDefault();
		e.stopPropagation();
	}

	getBrawlers = () => {
		$.get('/api/v1/books?brawlers=true').then((brawlers)=>{
			this.setState({brawlers: brawlers.data});
		})
	}

	getBrawls = () => {
		let {page} = this.props;
		var url = '/api/v1/brawls';

		if(page !== "admin"){
			url = url + '?limit=2';
		}

		$.get(url).then((brawls)=>{
			brawls = brawls.data;
			var brawlsData = []
			brawls.map((brawl, index)=>{
				brawl.book_a.voters = brawl.book_a_vote;
				brawl.book_b.voters = brawl.book_b_vote;
				brawl.book_a.votes = brawl.book_a_vote.length;
				brawl.book_b.votes = brawl.book_b_vote.length;

				brawl.results = {};
				if(brawl.status > 1){
					brawl.results.declared = true;
					if(brawl.book_a.votes > brawl.book_b.votes){
						brawl.results.winner = brawl.book_a;
					}else{
						brawl.results.winner = brawl.book_b;
					}
				}
				brawl.results.totalVotes = brawl.book_a.votes + brawl.book_b.votes;
				brawl.results.voters = brawl.book_a.voters.concat(brawl.book_b.voters);

				brawl.brawlers = [brawl.book_a, brawl.book_b];
				brawlsData.push(brawl);
			})

			var currentBrawl = brawlsData;
			if(page == "admin"){
				currentBrawl = [brawlsData[0]]
			}

			this.setState({currentBrawl:currentBrawl.reverse() , oldBrawls: brawlsData});
		})


	}

	render() {
		const $this = this;
		const {currentBrawl, oldBrawls, title, brawlers, showBrawlers, startBrawl} = this.state;
		const {page} = this.props;
		let isCurrentBrawl = true;

		return (
			<section className="brawl-feature" id={page}>
					<header>
						<div className="container">
							<div className="flex-row">
								{page === "home" &&
									<div className="week-control-last">
										<span className="label label-small">Previous</span>
										<span className="label label-large">Last Week’s Brawl</span>
									</div>
								}
								<h2>
									<span className="week-title week-title-this">{title}</span>
									<span className="week-title week-title-last">Last Week’s Brawl</span>
								</h2>
								{page === "home" ?
									(
										<a href="#this-week" className="week-control-this">
											<span className="label label-small">Next</span>
											<span className="label label-large">This Week’s Brawl</span>
										</a>
									) :
									(
										<div className="week-control-this">
											<span>Select Brawl: </span>
											<select onChange={$this.handleChange} className="label label-large">
												<option value="Create Brawl">Create Brawl</option>;
												{
													oldBrawls.map(function(brawl, i){
														return (
															<option key={i} selected={i===0} value={brawl._id}>{i === 0 ? "Current Brawl" : brawl.updated_at}</option>
														)
													})
												}
											</select>
										</div>
									)
								}
								</div>
						</div>
					</header>
					<main>
						{
							currentBrawl.map(function(brawl, i){
								//the current brawl is the one that hasn't been declared
								isCurrentBrawl = !brawl.results.declared;
								return (
									<div key={i} className={(page === "admin" || (i === (currentBrawl.length - 1))) ? "week week-this" : "week week-last"}>
											<div className="container">
													<div className="flex-row">
															<div className="book-blocks book-blocks-feature">
																	<ul>
																		{
																			brawl.brawlers.map(function(brawler, i){
																				let isFirstBrawler = (i === 0);
																				let winPercentage = (brawler.votes === 0 ? 0 : Math.round((brawler.votes / brawl.results.totalVotes) * 100)) + "%";
																				//need to change to my user id

																				//REPLACE "0" WITH THIS
																				//props.me._id
																				let myVote = $.inArray("10",brawler.voters) === 0;
																				let iVoted = $.inArray("10",brawl.results.voters) === 0;

																				if(isCurrentBrawl && page === "home"){
																					currentResult = iVoted ? "Keep checking for results" : "Please Vote"
																				}
																				else if(isCurrentBrawl && page === "admin"){
																					currentResult = "Choose brawlers"
																				}else{
																					lastResult = brawl.results.winner.title + " won!"
																				}
																				let small_avatar = brawler.author.avatar.split("/").pop();
																				let avatar = small_avatar === "Dog_1.png" || small_avatar === "blank-dog.png" ? "/assets/images/dog.gif" : "/assets/images/cat.gif"

																				return (
																					<li key={i}>
																						{isFirstBrawler &&
																							<div className={"mascot" + ((myVote && page !== "admin")  ? " your-pick" : "")}>
																								{(!isCurrentBrawl || page === "admin") &&
																									<div className="vote-count">
																											<div>
																												<strong>{winPercentage}</strong>
																												<span>of the votes</span>
																											</div>
																									</div>
																								}
																								<img src={avatar} alt="" />
																							</div>
																						}
																						<div className="book">
																							<a href="." className="content-block content-block-book">
																								<figure>
																									<div className="cover" style={{backgroundImage: "url("+brawler.cover+")"}}>
																										<div className="overlay">
																											{title !== "Create Brawl" &&
																												<button className="button button-red" href={"/books/0"}>Preview</button>
																											}
																											{page === "admin" && title === "Create Brawl" &&
																												<button className="button button-red" onClick={(e) => {$this.showBrawlers(title === "Create Brawl",e,i)}}>Find Brawler</button>
																											}
																											{page !== "admin" &&
																												<button className="button button-white" href=".">Add to Library</button>
																											}
																										</div>
																									</div>
																									<figcaption>
																										<h4>{brawler.title}</h4>
																										<p>By {brawler.author.name}</p>
																										<Rating stars={brawler.rating} />
																									</figcaption>
																								</figure>
																							</a>
																							{(!iVoted && isCurrentBrawl && page !== "admin") &&
																								<a href="javascript:void(0)" className={"button" + (!isCurrentBrawl ? " button-hidden" : "")} onClick={(e) => { $this.vote(e, brawl._id, brawler._id)} }>Vote</a>
																							}
																						</div>
																						{!isFirstBrawler &&
																							<div className={"mascot" + ((myVote && page !== "admin") ? " your-pick" : "")}>
																								<div className="vote-count has-won">
																									{(!isCurrentBrawl || page === "admin") &&
																										<div>
																											<strong>{winPercentage}</strong>
																											<span>of the votes</span>
																										</div>
																									}
																								</div>
																								<img src={avatar} alt="" />
																							</div>
																						}
																					</li>

																				)
																			})
																		}

																	</ul>
															</div>
													</div>
											</div>
									</div>
								)
							})
						}
					</main>
					{page === "admin" &&
						<div className={"brawlers book-blocks book-blocks-small" + (showBrawlers ? " open" : "")}>
							<ul>
								{
									brawlers.map((book, i)=>{
										//Need to change
										return (
											<li key={i}>
												<div className="content-block content-block-book">
													<figure>
														<div className="cover" style={{backgroundImage: 'url('+book.cover+')'}}>
															<div className="overlay">
																<a href="javascript:void(0)" onClick={(e) => {$this.pickBrawler(title === "Create Brawl",book,e)}} className="button button-white" id={book._id}>Brawl</a>
															</div>
														</div>
														<figcaption>
															<h4>{book.title}</h4>
															<p>{book.author.name}</p>
															<Rating stars={book.rating} />
														</figcaption>
													</figure>
												</div>
											</li>
										)
									})
								}
							</ul>
						</div>
					}
					<footer>
						<div className="container">
							<h4>
								<span className="week-results week-results-this">{currentResult}</span>
								<span className="week-results week-results-last is-announced">{lastResult}</span>
							</h4>
						</div>
						{page === "admin" &&
						<div className="container all-buttons">
							<a href="javascript:void(0)" onClick={() => {this.startBrawl(title === "Create Brawl")}} className={"button" + ((startBrawl && title === "Create Brawl") ? "" : " disabled")}>Start Brawl</a>
							<a href="javascript:void(0)" onClick={() => {this.declareWinner(isCurrentBrawl && title !== "Create Brawl")}} className={"button btn-positive" + ((isCurrentBrawl && title !== "Create Brawl") ? "" : " disabled")}>Declare Winner</a>
						</div>
						}
					</footer>
			</section>
		)
	}
}
