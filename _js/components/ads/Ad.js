import React from 'react';
import $ from 'jQuery';


let adModel = {};

export default class Ad extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	ads: []
	    };
	}

  	componentDidMount() {
  		this.getAds();
  	}

	handleChange = (e,index) => {
		adModel[index].ads.visible = !(e.target.value === "true");
		this.setState({ads: adModel});
	}

  	getAds = () => {
		  let ads = [
		    {
		        page: "home",
		        _id: "0",
		        ads: {
		            visible: false
		        }
		    },
		    {
		        page: "dashboard",
		        _id: "1",
		        ads: {
		            visible: true
		        }
		    },
		    {
		        page: "users",
		        _id: "2",
		        ads: {
		            visible: false
		        }
		    },
		    {
		        page: "forum",
		        _id: "3",
		        ads: {
		            visible: false
		        }
		    },
		    {
		        page: "messages",
		        _id: "4",
		        ads: {
		            visible: true
		        }
		    },
		    {
		        page: "create",
		        _id: "5",
		        ads: {
		            visible: true
		        }
		    }
		]
		adModel = ads;
		this.setState({ads: ads})
	}

	render() {
		let {ads} = this.state;
		let $this = this;
		return (
			<div className="divTable">
				<div className="divTableBody">
					<div className="divTableRow divTableHeading">
						<div className="divTableHead">Ad</div>
						<div className="divTableHead">Location</div>
						<div className="divTableHead isVisible">Is Visible</div>
					</div>
					{
						ads.map(function(ad, i){
							return (
								<div className="divTableRow" key={i}>
									<div className="divTableCell">{ad.page + " Ads"}</div>
									<div className="divTableCell">{ad.page + " page"}</div>
									<div className="divTableCell"><input type="checkbox" name={ad.page + i} onChange={(e) => {$this.handleChange(e,i)}} value={ad.ads.visible} checked={ad.ads.visible}/></div>
								</div>
							)
						})
					}
				</div>
			</div>
		)
	}
}
