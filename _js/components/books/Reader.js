import React from 'react';
import Comments from './Comments';

export default class Reader extends React.Component{
	render(){
		return(
			<div>
				<Comments bookId={this.props.bookId} chapterId={this.props.chapterId}/>
				<div dangerouslySetInnerHTML={{__html: this.props.content}}></div>
			</div>
		)
	}
}
