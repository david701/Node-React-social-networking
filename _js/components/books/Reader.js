import React from 'react';

export default class Reader extends React.Component{
	render(){
		return(
			<div dangerouslySetInnerHTML={{__html: this.props.content}}></div>
		)
	}
}
