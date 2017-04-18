import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

//variables that will never change
const Users = []
const Books = []

class Friends extends React.Component{

	constructor(props) {
    	super(props);
        this.users = Users;
        this.books = Books;
    	this.state = {
            me: {},
    		users: this.users,
            books: this.books,
    	};
    	this.handleChange = this.handleChange.bind(this);
        this.handleFollow = this.handleFollow.bind(this);
  	}

    isFollowing(userId,me){
        if(me){
            if(me.following_authors){
                return me.following_authors.includes(userId);
            }
        }
    }

    handleFollow(event){
        var data = {
                authorId: event.target.id
        };
        $.post('/api/v1/follow_author',data).then((response)=>{
            if(response.status === "error"){
                alert(response.message)
            }else{
                this.getUsers(this.state.me._id)
            }
        });
    }

    myProfile(id,users){
        var myProfile = users.filter(function(user,index){
            return user._id === id
        });
        this.setState({me: myProfile[0]});
    }

    getUsers(id){
        $.get('/api/v1/users/').then((response)=>{
            if(response.status === "error"){
                alert(response.message);
            }else{
                this.users = response.data;
                this.setState({users: this.users});
                if(id){
                    this.myProfile(id,this.state.users);
                }
            }
        });
    }

    componentWillMount(){
        //get user session
        $.get('/api/v1/user_session/').then((response)=>{
            if(response.status === "error"){
                window.location.href = "/";
            }else {
                this.setState({me: response.data});
                this.getUsers(this.state.me._id);
            }
        });
    }

    handleChange(event) {
        //get target
        let target = event.target;
        //set value
        this.profile[target.name] = target.value;
        //set state
        this.setState({profile: this.profile, error: ''});
    }

	render(){
        let self = this;
		return(
            <ul className="user-list">
                {this.state.users.map(function(user, i){
                return (<li key={user._id}>
                    <a href={'/author/' + user._id}>
                        <figure className="avatar">
                            <img src={user.avatar} alt="" id={user._id}/>
                        </figure>
                        <h5>{user.name}</h5>
                    </a>
                    {(self.state.me._id !== user._id && self.state.me.role < 1) &&
                        <div>
                        {self.isFollowing(user._id,self.state.me) &&
                            <div className="control">Following</div>
                        }
                        {!self.isFollowing(user._id,self.state.me) &&
                            <div className="control add-button" id={user._id} onClick={self.handleFollow}>Add</div>
                        }
                        </div>
                    }
                    {self.state.me.role >= 1 &&
                        <a className="control add-button" href={'/author/' + user._id}>Edit</a>
                    }
                    {self.state.me._id === user._id &&
                        <div className="control">That's you!</div>
                    }
                </li>)
                })}
            </ul>
		)
	}
}

if(document.getElementById('friends'))
	ReactDOM.render(<Friends />, document.getElementById('friends'))
