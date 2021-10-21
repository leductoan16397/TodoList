/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import TodoApp from 'components/Todoapp';
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App-body">
        <TodoApp />
      </div>
    </div>
  );
}

export default App;
