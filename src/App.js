import React from 'react';
import './App.css';
import Home from './features/Home/Home';
import Header from './features/Header/Header';
import Subreddits from './features/Subreddits/Subreddits';

function App() {
  return (
    <div className="App">
      <header>
      <Header></Header>
      </header>
      <main>
        <Home></Home>
      </main>
      <aside>
        <Subreddits></Subreddits>
      </aside>
    </div>
  );
}

export default App;
