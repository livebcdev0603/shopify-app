import React, { Component } from 'react';
import { Provider, Subscribe } from 'unstated';

import logo from './logo.svg';
import './App.css';

import PageContainer from './containers/PageContainer';

import Page from './components/Page/Page';

class App extends Component {
  render() {
    return (
      <Provider>
        <Subscribe to={[PageContainer]}>
        {
          pageStore => {
            return (
              <div className="App">
                <header className="App-header mb-5">
                  <img src={logo} className="App-logo" alt="logo" />
                  <h1 className="App-title">Welcome to React</h1>
                </header>
                <Page pageStore={pageStore}/>
              </div>
            )
          }
        }
        </Subscribe>
      </Provider>
    );
  }
}

export default App;
