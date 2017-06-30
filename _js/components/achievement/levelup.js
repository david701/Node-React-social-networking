import React from 'react';

export default class LevelUp extends React.Component{
	state = {percent: '', nextLevel:''};
	componentDidMount(){
		this.getNextLevelPoints(this.props.user);
	}

	getNextLevelPoints = (user)=>{

		var points = user.points || 0;
		var level = 0, title = 'Apprentice', pointsNeeded=1, nextTitle='Bronze Acolyte';
		if(points > 0){ level = 1; title = 'Bronze Acolyte', pointsNeeded=12, nextTitle='Silver Acolyte'}
		if(points >= 12){ level = 5; title='Silver Acolyte', pointsNeeded=27, nextTitle='Gold Acolyte'}
		if(points >= 27){ level = 9; title='Gold Acolyte', pointsNeeded=37, nextTitle='Bronze Aspirant'}
		if(points >= 37){ level = 11; title='Bronze Aspirant', pointsNeeded=54, nextTitle='Silver Aspirant'}
		if(points >= 54){ level = 15; title='Silver Aspirant', pointsNeeded=102, nextTitle='Gold Aspirant'}
		if(points >= 102){ level = 19; title='Gold Aspirant', pointsNeeded=128, nextTitle='Bronze Adventurer'}
		if(points >= 128){ level = 21; title='Bronze Adventurer', pointsNeeded=193, nextTitle='Silver Adventurer'}
		if(points >= 193){ level = 25; title='Silver Adventurer', pointsNeeded=272, nextTitle='Gold Adventurer'}
		if(points >= 272){ level = 29; title='Gold Adventurer', pointsNeeded=312, nextTitle='Bronze Veteran'}
		if(points >= 312){ level = 31; title='Bronze Veteran', pointsNeeded=388, nextTitle='Silver Veteran'}
		if(points >= 388){ level = 35; title='Silver Veteran', pointsNeeded=481, nextTitle='Gold Veteran'}
		if(points >= 481){ level = 39; title='Gold Veteran', pointsNeeded=534, nextTitle='Bronze Master'}
		if(points >= 534){ level = 41; title='Bronze Master', pointsNeeded=658, nextTitle='Silver Master'}
		if(points >= 658){ level = 45; title='Silver Master', pointsNeeded=808, nextTitle='Gold Master'}
		if(points >= 808){ level = 49; title='Gold Master', pointsNeeded=0, nextTitle=''}

		var percentNeeded = (pointsNeeded - user.points)/100;
		var percent = 100-(percentNeeded*100);
		this.setState({percent:percent, nextLevel: nextTitle});
	}

	render(){
		return(
			<div className="bar_container" style={{height:"14px", width:'150px', border:'1px solid #e1e1e1', marginTop:'0.25rem'}}>
				<div className="level_bar" style={{height:"12px", width:this.state.percent+'%', backgroundColor:'#0FAFFF'}}></div>
				<p>Progress to {this.state.nextLevel}</p>
			</div>
		)
	}
}
