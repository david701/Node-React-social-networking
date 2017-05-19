import React from 'react';
import ReactDOM from 'react-dom';

const ClaimDetailsModal = props => (
	<div className="modal" style={{visibility:'visible', opacity:1}}>
		<div className="overlay">
			<div className="content-block content-block-standard" style={{marginTop:'-20%'}}>
				<form>
					<div className="title-row" style={{ marginBottom: 0 }}>
						<h4>Claim Details</h4>
					</div>
					<div className="flex-row">
						<p><strong>Reporter's Name: </strong> {props.user.name}</p>
						<p><strong>Book Reference: </strong>{props.book? props.book.author.name:''} of {props.book? props.book.title : ''}</p>
						<p><strong>Posted on: </strong> {props.book? props.book.genre : ''}</p>
					</div>
					<hr />
					<textarea
						id="claim"
						rows="5"
						placeholder="Description of claim..."
						name="claimContent"
						value={props.claimContent}
						onChange={props._onChange}
						/>
					{/* <p>I am so pissed! This guy took my book! You can see that my book here [some Amazon link]. */}
					{/* I think it's very unprofessional for you to allow people to claim my book! Can you please remove this book?</p> */}
					<div className="submit-row submit-row-claim">
						{/* <div className="claim-details"> */}
						{/*   <a><p>Email [Reporter's Name]</p></a> */}
						{/*   <a><p>Email [Accused Author's Name]</p></a> */}
						{/*   <a><p>Delete Book Immediately</p></a> */}
						{/*   <a><p>Mark as Resolved</p></a> */}
						{/* </div> */}
						<div className="buttons">
							<button className="button button-white" onClick={props.cancelClaim}>Cancel</button>
							<button className="button button-red" onClick={props.submitClaim}>Submit</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
);

if (document.getElementById('claim-details')) {
  ReactDOM.render(<ClaimDetailsModal />, document.getElementById('claim-details'));
}

export default ClaimDetailsModal;
