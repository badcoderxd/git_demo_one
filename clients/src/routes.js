import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './HOC/layout'
import Auth from './HOC/Auth'
import login from './components/login';
import { getAuthToken } from './helpers/Authgetuser';
import Home from ''

const Routes = () => {

    const token =getAuthToken()
    return (
        <Switch>
        <Layout>
            
            {
                token ?
                <>
                <Route path="/" exact component={Auth(login,true)}/>
                {/*<Route path="/Home" exact component={}/>*/}
                </>
                :
                <>
                <Route path="/" exact component={Auth(login,null)}/>
                </>

            }
            
        </Layout>
        </Switch>
    );
};

export default Routes;

// <Route path="/login" exact component={Auth(Login,false)}/>