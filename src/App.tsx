import * as React from 'react';
import { Subscribe } from 'unstated';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import PageContainer from './containers/PageContainer';

import Page from './components/Page/Page';
import PageBuilder from './components/Page/PageBuilder';

class App extends React.Component {
  render() {
    return (
      <Subscribe to={[PageContainer]}>
      {
        (pageStore: PageContainer) => {
          return (
            <Router>
              <div className="App">
                <header className="App-header mb-5">
                  <img src={logo} className="App-logo" alt="logo" />
                  <h1 className="App-title">Welcome to React</h1>
                </header>
                <div>
                  <Route exact path='/' component={Page}/>
                  <Route path='/create-page' component={PageBuilder}/>
                </div>
              </div>
            </Router>
          )
        }
      }
      </Subscribe>
    );
  }
}

export default App;
