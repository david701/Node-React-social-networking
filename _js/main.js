import React from 'react';
import ReactDOM from 'react-dom';

import '../_sass/main.scss';

class Example extends React.Component{
	render(){
		return(
			<h1>Example component</h1>
		)
	}
}

if(document.getElementById('example'))
	ReactDOM.render(<Example />, document.getElementById('example'))
