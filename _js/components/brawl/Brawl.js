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
    	this.getBrawlsers();
  	}

	vote = (e,voterId,brawlerId) => {
		alert('voter id: ' + voterId + " brawler id: " + brawlerId);
		this.getBrawls();
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
		this.setState({currentBrawl: brawler, title: title, startBrawl: false})
	}

	declareWinner = (currentBrawl) => {
		if(currentBrawl){
			alert("Declare Winner")
		}
		e.preventDefault();
		e.stopPropagation();
	}

	startBrawl = (isCreatePage) => {
		if(isCreatePage){
			alert('start brawl');
		}
		e.preventDefault();
		e.stopPropagation();
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

	getBrawlsers = () => {
		let brawlers = [
	     {
	        _id:"0",
	        author:{
	           _id:"0",
	           name:"Elon Mitchell",
	           avatar:"/assets/images/dog.gif"
	        },
	        cover:"/assets/images/samples/covers/1.jpg",
	        title:"Some Book",
	        rating:3,
	        voters: [],
	        votes:0
	     },
	     {
	        _id:"1",
	        author:{
	           _id:"1",
	           name:"Terry Pierre",
	           avatar:"/assets/images/cat.gif"
	        },
	        cover:"/assets/images/samples/covers/2.jpg",
	        title:"Some Book",
	        rating:5,
	        voters: [],
	        votes:0
	     },
	     {
	        _id:"2",
	        author:{
	           _id:"1",
	           name:"Terry Pierre",
	           avatar:"/assets/images/cat.gif"
	        },
	        cover:"/assets/images/samples/covers/3.jpg",
	        title:"Some Book",
	        rating:5,
	        voters: [],
	        votes:0
	     },
	     {
	        _id:"3",
	        author:{
	           _id:"1",
	           name:"Terry Pierre",
	           avatar:"/assets/images/cat.gif"
	        },
	        cover:"/assets/images/samples/covers/4.jpg",
	        title:"Some Book",
	        rating:5,
	        voters: [],
	        votes:0
	     },
	     {
	        _id:"4",
	        author:{
	           _id:"1",
	           name:"Terry Pierre",
	           avatar:"/assets/images/cat.gif"
	        },
	        cover:"/assets/images/samples/covers/feature-1.jpg",
	        title:"Some Book",
	        rating:5,
	        voters: ["0"],
	        votes:0
	     },
	     {
	        _id:"5",
	        author:{
	           _id:"1",
	           name:"Terry Pierre",
	           avatar:"/assets/images/cat.gif"
	        },
	        cover:"/assets/images/samples/covers/feature-2.jpg",
	        title:"Some Book",
	        rating:5,
	        voters: [],
	        votes:0
	     }
	  ]
	  this.setState({brawlers: brawlers});
	}

	getBrawls = () => {
		let {page} = this.props;
		let brawls =  [
   		{
   		  _id: "0",
	      brawlers:[
	         {
	            _id:"0",
	            author:{
	               _id:"0",
	               name:"Elon Mitchell",
	               avatar:"/assets/images/dog.gif"
	            },
	            cover:"/assets/images/samples/covers/1.jpg",
	            title:"Some Book",
	            rating:3,
	            voters: ["1","2","3"],
	            votes:3
	         },
	         {
	            _id:"1",
	            author:{
	               _id:"1",
	               name:"Terry Pierre",
	               avatar:"/assets/images/cat.gif"
	            },
	            cover:"/assets/images/samples/covers/2.jpg",
	            title:"Some Book",
	            rating:5,
	            voters: ["0"],
	            votes:1
	         }
	      ],
	      results:{
	         declared:false,
	         totalVotes:4,
	         voters: ["0","1","2","3"],
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
   		  _id: "1",
	      brawlers:[
	         {
	            _id:"0",
	            author:{
	               _id:"0",
	               name:"Ericka Emery",
	               avatar:"/assets/images/cat.gif"
	            },
	            cover:"/assets/images/samples/covers/3.jpg",
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
	            cover:"/assets/images/samples/covers/4.jpg",
	            title:"Some Book",
	            rating:5,
	            voters: ["1"],
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
	               name:"Michael Way",
	               avatar:"/assets/images/cat.gif"
	            },
	            title:"Some Book"
	         }
	      },
	      updated_at:"XXXX-XX-XX"
	   },{
   		  _id: "2",
	      brawlers:[
	         {
	            _id:"0",
	            author:{
	               _id:"0",
	               name:"Deniesia Williford",
	               avatar:"/assets/images/cat.gif"
	            },
	            cover:"/assets/images/samples/covers/feature-1.jpg",
	            title:"Some Book",
	            rating:5,
	            voters: ["0"],
	            votes:1
	         },
	         {
	            _id:"1",
	            author:{
	               _id:"1",
	               name:"Jarvis Williford",
	               avatar:"/assets/images/dog.gif"
	            },
	            cover:"/assets/images/samples/covers/feature-2.jpg",
	            title:"Some Book",
	            rating:5,
	            voters: ["1"],
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
	               name:"Jarvis Willifod",
	               avatar:"/assets/images/cat.gif"
	            },
	            title:"Some Book"
	         }
	      },
	      updated_at:"XXXX-XX-XX"
	   },{
   		  _id: "3",
	      brawlers:[
	         {
	            _id:"0",
	            author:{
	               _id:"0",
	               name:"Sharla Pierre",
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
	               name:"Terry Pierre",
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
	         declared:true,
	         totalVotes:2,
	         voters: ["0","1"],
	         winner:{
	            _id:"1",
	            author:{
	               _id:"1",
	               name:"Sharla Pierre",
	               avatar:"/assets/images/cat.gif"
	            },
	            title:"Some Book"
	         }
	      },
	      updated_at:"XXXX-XX-XX"
	   }];

	   	if(page === "admin"){
	   		this.setState({currentBrawl: brawls.slice(0, 1), oldBrawls: brawls});
		}else{
			this.setState({currentBrawl: brawls.slice(0, 2).reverse(), oldBrawls: brawls})
		}
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
									<div key={i} className={(isCurrentBrawl || page === "admin") ? "week week-this" : "week week-last"}>
											<div className="container">
													<div className="flex-row">
															<div className="book-blocks book-blocks-feature">
																	<ul>
																		{
																			brawl.brawlers.map(function(brawler, i){
																				let isFirstBrawler = (i === 0);
																				let winPercentage = Math.round((brawler.votes / brawl.results.totalVotes) * 100) + "%";
																				//need to change to my user id

																				//REPLACE "0" WITH THIS
																				//props.me._id
																				let myVote = $.inArray("0",brawler.voters) === 0;
																				let iVoted = $.inArray("0",brawl.results.voters) === 0;

																				if(isCurrentBrawl && page === "home"){
																					currentResult = iVoted ? "Keep checking for results" : "Please Vote"
																				}
																				else if(isCurrentBrawl && page === "admin"){
																					currentResult = "Choose brawlers"
																				}else{
																					lastResult = brawl.results.winner.title + " won!"
																				}


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
																								<img src={brawler.author.avatar} alt="" />
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
																								<a href="javascript:void(0)" className={"button" + (!isCurrentBrawl ? " button-hidden" : "")} onClick={(e) => { $this.vote(e, "0",brawler._id)} }>Vote</a>
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
																								<img src={brawler.author.avatar} alt="" />
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
