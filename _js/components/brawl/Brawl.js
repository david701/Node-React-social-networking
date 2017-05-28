import React from 'react';
import $ from 'jQuery';

const Brawl = props => {
	let currentResult = "";
	let lastResult = "";

	return (
	<section className="brawl-feature">
			<header>
				<div className="container">
					<div className="flex-row">
						<a href="#last-week" className="week-control-last">
								<span className="label label-small">Previous</span>
								<span className="label label-large">Last Week’s Brawl</span>
						</a>
						<h2>
							<span className="week-title week-title-this">Current Brawl</span>
							<span className="week-title week-title-last">Last Week’s Brawl</span>
						</h2>
						<a href="#this-week" className="week-control-this">
							<span className="label label-small">Next</span>
							<span className="label label-large">This Week’s Brawl</span>
						</a>
						</div>
				</div>
			</header>
			<main>
				{
					props.brawls.map(function(brawl, i){
						//the current brawl is the one that hasn't been declared
						let isCurrentBrawl = !brawl.results.declared
						return (
							<div key={i} className={isCurrentBrawl ? "week week-this" : "week week-last"}>
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
																		let myVote = $.inArray("13",brawler.voters) === 0;
																		let iVoted = $.inArray("13",brawl.results.voters) === 0;

																		if(isCurrentBrawl){
																			currentResult = iVoted ? "Keep checking for results" : "Please Vote"
																		}else{
																			lastResult = brawl.results.winner.title + " won!"
																		}


																		return (
																			<li key={i}>
																				{isFirstBrawler &&
																					<div className={"mascot" + (myVote ? " your-pick" : "")}>
																						{!isCurrentBrawl &&
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
																									<button className="button button-red" href={"/books/0"}>Preview</button>
																									<button className="button button-white" href=".">Add to Library</button>
																								</div>
																							</div>
																							<figcaption>
																								<h4>{brawler.title}</h4>
																								<p>By {brawler.author.name}</p>
																								<ul className="rating-display">
																										<li className="filled"></li>
																										<li className="filled"></li>
																										<li className="filled"></li>
																										<li className="filled"></li>
																										<li></li>
																								</ul>
																							</figcaption>
																						</figure>
																					</a>
																					{(!iVoted && isCurrentBrawl) &&
																						<a href="javascript:void(0)" className={"button" + (!isCurrentBrawl ? " button-hidden" : "")} onClick={(e) => { props.vote(e, "0",brawler._id)} }>Vote</a>
																					}
																				</div>
																				{!isFirstBrawler &&
																					<div className={"mascot" + (myVote ? " your-pick" : "")}>
																						<div className="vote-count has-won">
																							{!isCurrentBrawl &&
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
			<footer>
				<div className="container">
					<h4>
						<span className="week-results week-results-this">{currentResult}</span>
						<span className="week-results week-results-last is-announced">{lastResult}</span>
					</h4>
				</div>
			</footer>
	</section>
)
}

export default Brawl;
