import React from 'react';

const Brawl = props => (
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
					<div className="week week-last">
							<div className="container">
									<div className="flex-row">
											<div className="mascot your-pick">
													<div className="vote-count">
															<div>
																	<strong>45%</strong>
																	<span>of the votes</span>
															</div>
													</div>
													<img src="/assets/images/dog.gif" alt="" />
											</div>
											<div className="book-blocks book-blocks-feature">
													<ul>
															<li>
																	<a href="." className="content-block content-block-book">
																			<figure>
																					<div className="cover" style={{backgroundImage: "url('/assets/images/samples/covers/feature-1.jpg')"}}>
																							<div className="overlay">
																									<button className="button button-red" href=".">Preview</button>
																									<button className="button button-white" href=".">Add to Library</button>
																							</div>
																					</div>
																					<figcaption>
																							<h4>Title Area</h4>
																							<p>By [Author Name]</p>
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
																	<a href="." className="button button-hidden">Vote</a>
															</li>
															<li>
																	<a href="." className="content-block content-block-book">
																			<figure>
																					<div className="cover" style={{backgroundImage: "url('/assets/images/samples/covers/feature-2.jpg')"}}>
																							<div className="overlay">
																									<button className="button button-red" href=".">Preview</button>
																									<button className="button button-white" href=".">Add to Library</button>
																							</div>
																					</div>
																					<figcaption>
																							<h4>Title Area</h4>
																							<p>By [Author Name]</p>
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
																	<a href="." className="button button-hidden">Vote</a>
															</li>
													</ul>
											</div>
											<div className="mascot">
													<div className="vote-count has-won">
															<div>
																	<strong>55%</strong>
																	<span>of the votes</span>
															</div>
													</div>
													<img src="/assets/images/cat.gif" alt="" />
											</div>
									</div>
							</div>
					</div>
					<div className="week week-this">
							<div className="container">
									<div className="flex-row">
											<div className="mascot">
													<img src="/assets/images/dog.gif" alt="" />
											</div>
											<div className="book-blocks book-blocks-feature">
													<ul>
															<li>
																	<a href="." className="content-block content-block-book">
																			<figure>
																					<div className="cover" style={{backgroundImage: "url('/assets/images/samples/covers/feature-1.jpg')"}}>
																							<div className="overlay">
																									<button className="button button-red" href=".">Preview</button>
																									<button className="button button-white" href=".">Add to Library</button>
																							</div>
																					</div>
																					<figcaption>
																							<h4>Title Area</h4>
																							<p>By [Author Name]</p>
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
																	<a href="." className="button">Vote</a>
															</li>
															<li>
																	<a href="." className="content-block content-block-book">
																			<figure>
																					<div className="cover" style={{backgroundImage: "url('/assets/images/samples/covers/feature-2.jpg')"}}>
																							<div className="overlay">
																									<button className="button button-red" href=".">Preview</button>
																									<button className="button button-white" href=".">Add to Library</button>
																							</div>
																					</div>
																					<figcaption>
																							<h4>Title Area</h4>
																							<p>By [Author Name]</p>
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
																	<a href="." className="button">Vote</a>
															</li>
													</ul>
											</div>
											<div className="mascot">
													<img src="/assets/images/cat.gif" alt="" />
											</div>
									</div>
							</div>
					</div>
			</main>
			<footer>
					<div className="container">
							<h4>
<span className="week-results week-results-this">Vote to see results</span>
<span className="week-results week-results-last is-announced">[Book Title] Won!</span>
</h4>
					</div>
			</footer>
	</section>
)

export default Brawl;
