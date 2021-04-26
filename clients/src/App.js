import React from 'react';
import Login from './components/login';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

const App = () =>{
  return(
    <Provider store={store}>
      <BrowserRouter>
            <Routes/>
        </BrowserRouter>
    </Provider>
  )
}

export default App;