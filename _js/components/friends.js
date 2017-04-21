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
        this.removeAdmin = this.removeAdmin.bind(this);
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

    removeAdmin(users){
        return users.filter(function(user,index){
            return user.role < 1;
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
                this.users = this.removeAdmin(response.data);
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
        let self = this,
        accountAction = this.state.me.role > 0 ? "edit:" : "follow:";
		return(
            <div>
                <div className="title-row">
                    <h4>{"Choose user(s) to " + accountAction}</h4>
                </div>
                <ul className="user-list">
                    {this.state.users.map(function(user, i){
                    let myProfile = self.state.me._id === user._id;
                    return (<li key={user._id}>
                        <a href={myProfile ? '/dashboard/' : '/author/' + user._id}>
                            <figure className="avatar">
                                <img src={user.avatar} alt="" id={user._id}/>
                            </figure>
                            <h5>{user.name}</h5>
                        </a>
                        {(!myProfile && self.state.me.role < 1) &&
                            <div>
                            {self.isFollowing(user._id,self.state.me) &&
                                <div className="control">Following</div>
                            }
                            {!self.isFollowing(user._id,self.state.me) &&
                                <div className="control add-button" id={user._id} onClick={self.handleFollow}>Add</div>
                            }
                            </div>
                        }
                        {!myProfile && self.state.me.role > 0 &&
                            <a className="control add-button" href={'/author/' + user._id + '/edit'}>Edit</a>
                        }
                        {myProfile &&
                            <div className="control">That's you!</div>
                        }
                    </li>)
                    })}
                </ul>
            </div>
		)
	}
}

if(document.getElementById('friends'))
	ReactDOM.render(<Friends />, document.getElementById('friends'))
