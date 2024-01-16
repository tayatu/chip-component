import React from 'react';
import Chip from './Chip';
import './App.css';

const items = [
  { name: 'User', email: 'user@example.com' },
  { name: 'Person', email: 'person@example.com' },
  { name: 'John Doe', email: 'john.doe@example.com' },
];
const App = () => {
  return (
    <div>
      <h1 className="heading">Pick Users</h1>
      <Chip items={items} />
    </div>
  );
}

export default App;
