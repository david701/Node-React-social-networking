import React from 'react';

export default class LevelUp extends React.Component{
	state = {percent: '', nextLevel:''};
	componentDidMount(){
		this.getNextLevelPoints(this.props.user);
	}

	getNextLevelPoints = (user)=>{
		var pointsNeeded = 0;
		if(user.level == 0) pointsNeeded = 0;
		if(user.level == 1) pointsNeeded = 4;
		if(user.level == 2) pointsNeeded = 7;
		if(user.level == 3) pointsNeeded = 9;
		if(user.level == 4) pointsNeeded = 12;
		if(user.level == 5) pointsNeeded = 15;
		if(user.level == 6) pointsNeeded = 19;
		if(user.level == 7) pointsNeeded = 23;
		if(user.level == 8) pointsNeeded = 27;
		if(user.level == 9) pointsNeeded = 32;
		if(user.level == 10) pointsNeeded = 37;
		if(user.level == 11) pointsNeeded = 43;
		if(user.level == 12) pointsNeeded = 49;
		if(user.level == 13) pointsNeeded = 56;
		if(user.level == 14) pointsNeeded = 64;
		if(user.level == 15) pointsNeeded = 72;
		if(user.level == 16) pointsNeeded = 81;
		if(user.level == 17) pointsNeeded = 91;
		if(user.level == 18) pointsNeeded = 102;
		if(user.level == 19) pointsNeeded = 115;
		if(user.level == 20) pointsNeeded = 128;
		if(user.level == 21) pointsNeeded = 143;
		if(user.level == 22) pointsNeeded = 159;
		if(user.level == 23) pointsNeeded = 177;
		if(user.level == 24) pointsNeeded = 193;
		if(user.level == 25) pointsNeeded = 211;
		if(user.level == 26) pointsNeeded = 229;
		if(user.level == 27) pointsNeeded = 250;
		if(user.level == 28) pointsNeeded = 272;
		if(user.level == 29) pointsNeeded = 296;
		if(user.level == 30) pointsNeeded = 312;
		if(user.level == 31) pointsNeeded = 330;
		if(user.level == 32) pointsNeeded = 348;
		if(user.level == 33) pointsNeeded = 368;
		if(user.level == 34) pointsNeeded = 388;
		if(user.level == 35) pointsNeeded = 410;
		if(user.level == 36) pointsNeeded = 432;
		if(user.level == 37) pointsNeeded = 456;
		if(user.level == 38) pointsNeeded = 481;
		if(user.level == 39) pointsNeeded = 507;
		if(user.level == 40) pointsNeeded = 534;
		if(user.level == 41) pointsNeeded = 563;
		if(user.level == 42) pointsNeeded = 593;
		if(user.level == 43) pointsNeeded = 624;
		if(user.level == 44) pointsNeeded = 658;
		if(user.level == 45) pointsNeeded = 692;
		if(user.level == 46) pointsNeeded = 729;
		if(user.level == 47) pointsNeeded = 768;
		if(user.level == 48) pointsNeeded = 808;
		if(user.level == 49) pointsNeeded = 850;
		if(user.level == 50) pointsNeeded = 0;

		if(pointsNeeded > 0){
			var percentNeeded = (pointsNeeded - user.points)/100;
			var percent = 100-(percentNeeded*100);
		}else{
			var percent = 99.9;
		}

		this.setState({percent:percent, nextLevel: user.level+1});
	}

	render(){
		return(
			<div className="bar_container" style={{width:'150px', marginTop:'0.25rem'}}>
				<div className="level_bar" style={{height:"12px", border:'1px solid #e1e1e1', width:this.state.percent+'%', backgroundColor:'#0FAFFF'}}></div>
				<p>Progress to Level {this.state.nextLevel}</p>
			</div>
		)
	}
}
