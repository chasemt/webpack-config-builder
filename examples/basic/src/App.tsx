import React, { useState } from 'react';
import './styles/App.scss';

const App: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Webpack Config Builder - Basic Example</h1>
        <p>React + TypeScript + SCSS</p>
      </header>
      <main className="app-main">
        <div className="counter">
          <p className="counter-label">Count: {count}</p>
          <div className="counter-buttons">
            <button onClick={() => setCount(count - 1)}>-</button>
            <button onClick={() => setCount(0)}>Reset</button>
            <button onClick={() => setCount(count + 1)}>+</button>
          </div>
        </div>
        <div className="features">
          <h2>Features</h2>
          <ul>
            <li>✅ React 18 with TypeScript</li>
            <li>✅ SCSS support with CSS Modules</li>
            <li>✅ Hot Module Replacement (HMR)</li>
            <li>✅ Production optimizations</li>
            <li>✅ Source maps</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default App;

