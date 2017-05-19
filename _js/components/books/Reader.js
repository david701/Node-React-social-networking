import React from 'react';

export default class Reader extends React.Component{
	render(){
		return(
            <div>
                {this.props.content.length > 1 ? (
    			 <div dangerouslySetInnerHTML={{__html: this.props.content}}></div>
                 ) : (
                 <div>You haven't written anything yet</div>
                )}
            </div>
		)
	}
}
