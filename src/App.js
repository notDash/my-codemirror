import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import CodeMirror from '@uiw/react-codemirror';

import 'codemirror/addon/display/autorefresh';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/edit/matchbrackets';


import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';
const code = 'const a = 0;';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {/* <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a> */}
          
          <CodeMirror
            value={code}
            options={{
              theme: 'monokai',
              tabSize: 2,
              keyMap: 'sublime',
              mode: 'jsx',
            }}
          />
        </header>
      </div>
    );
  }
}

export default App;
