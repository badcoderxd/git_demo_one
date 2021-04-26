import React,{ Component } from 'react';
//import { auth } from '../actions'
import {connect} from 'react-redux';
import { getAuthToken } from '../helpers/Authgetuser'

export default function(ComposedClass,reload){
    class AuthenticationCheck extends Component {

        state = {
            loading:true
        }

        componentWillMount(){
           // this.props.dispatch(auth())
           this.setState({loading:false})

           if(getAuthToken){
               if(reload){
                   this.props.history.push('/login');
               }
           } else {
               if(reload === false) {
                   this.props.history.push('/user')
               }
           }
        }

        componentWillReceiveProps(nextProps){
           
        }

        render(){
            if(this.state.loading){
                return <div className="loader">Loading...</div>
            }
            return(
                <ComposedClass {...this.props} user={this.props.user}/>
            )
        }
    }

    function mapStateToProps(state){
    const { user, loading, error } = state.Auth;
    return { user, loading, error };
    }
    return connect(mapStateToProps)(AuthenticationCheck)

}