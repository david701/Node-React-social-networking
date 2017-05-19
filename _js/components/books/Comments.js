import React from 'react';
import $ from 'jQuery';

export default class Comments extends React.Component{
	state={comment:'', open: false, commentClass: {position:'absolute', top:0, right:'-60%', bottom:0, zIndex:'100', background:'#fff', width:'60%', boxShadow: '0 0.125em 0.3125em 0 rgba(0, 0, 0, 0.18)', padding:'1rem'}, comments:[]}

	componentWillReceiveProps(nextProps){
		this.getComments(nextProps.chapterId)
	}

	_onChange = (e)=>{
		var state = {};
		state[e.target.name]=e.target.value;
		this.setState(state);
	}

	toggleComments = ()=>{
		if(!this.state.open){
			this.setState({open: true, commentClass: {position:'absolute', top:0, right:0, bottom:0, zIndex:'100', background:'#fff', width:'60%', boxShadow: '0 0.125em 0.3125em 0 rgba(0, 0, 0, 0.18)', padding:'1rem'}})
		}else{
			this.setState({open: false, commentClass: {position:'absolute', top:0, right:'-60%', bottom:0, zIndex:'100', background:'#fff', width:'60%', boxShadow: '0 0.125em 0.3125em 0 rgba(0, 0, 0, 0.18)', padding:'1rem'}})
		}
	}

	getComments = (chapterId)=>{
		if(chapterId || this.props.chapterId){
			var chapter_id = chapterId || this.props.chapterId;
			$.get(`/api/v1/chapter/${chapter_id}/comments`)
			.then((resp)=>{
				console.log(resp);
				var comments = resp.data;
				this.setState({comments: comments, comment:''});
			})
		}
	}

	handleSubmit = (e)=>{
		e.preventDefault();
		var postData = {
			book_id:this.props.bookId,
			content: this.state.comment
		};
		console.log(postData);
		$.post(`/api/v1/chapter/${this.props.chapterId}/comments`, postData)
		.then((resp)=>{
			this.getComments();
		}).catch((err)=>{
			console.log(err);
		})
	}

	render(){

		var comments = this.state.comments.map((comment, key)=>{
			return(
				<li key={key} style={{padding:'0.5rem 0', borderBottom:'1px solid rgba(217, 220, 221, 0.5)'}}>
					<div className="comment_image" style={{width:'25%', padding:'0.25rem', marginRight:'2%', display:'inline-block'}}><img src={comment.author.avatar}/></div>
					<div className="comment_text" style={{width:'68%', display:'inline-block', fontSize:'0.8125em', lineHeight:'1.25em'}}> {comment.content}
						<div className="comment_details" style={{fontWeight:'bold'}}>{comment.author.name}</div>
					</div>
				</li>
			)
		})

		return(
			<div>
				<div style={{position:'absolute', top:'0.5rem', right:'1rem', zIndex:'1', width: '24px', cursor:'pointer'}} onClick={this.toggleComments}>
					<img src='/assets/images/comment.png'/>
					<span style={{textAlign:'center', fontSize:'0.8125em', color:'#666', display:'block', marginTop:'-5px'}}>{this.state.comments.length?this.state.comments.length:''}</span></div>
				<div style={this.state.commentClass}>
					<div className="comments_head" style={{ paddingBottom:'0.5rem', borderBottom: '1px solid rgba(217, 220, 221, 0.5)'}}>
						<h5 className="comments_count" style={{width:'50%', display:'inline-block'}}>{this.state.comments.length} Comments</h5>
						{/*<h4 className="comments_sort" style={{float:'right', fontSize:'0.8125em'}}>Sort ></h4>*/}
					</div>
					<ul className="comments_list" style={{height: 'calc(100% - 165px)', overflowY: 'scroll'}}>
						{comments}
					</ul>
					<div className="comments_add" style={{position:'absolute', bottom:0, left:0, right:0, padding:'0.5rem', background:'#fff'}}>
						<textarea name="comment" onChange={this._onChange} value={this.state.comment}></textarea>
						<button className='button-white' style={{display:'inline-block', marginTop:'0.5rem', marginRight:'0.5rem', width:'30%'}} onClick={this.toggleComments}>Close</button>
						<button onClick={this.handleSubmit} style={{display:'inline-block', marginTop:'0.5rem', width:'30%'}}>Send</button>
					</div>
				</div>
			</div>
		)
	}
}
