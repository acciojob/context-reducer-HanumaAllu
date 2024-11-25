import React, { useState, useContext } from 'react';

// Create context for authentication and user state
const AuthContext = React.createContext();
const ListContext = React.createContext();

// Component to handle login and signout functionality
const AuthComponent = () => {
  const { isAuthenticated, login, signOut, currentUser } = useContext(AuthContext);

  return (
    <div>
      <button id="login-btn" onClick={login}>Login</button>
      <button id="signout" onClick={signOut}>Signout</button>
      <div id="current-user">
        Current user: {currentUser}, isAuthenticated: {isAuthenticated ? "Yes" : "No"}
      </div>
    </div>
  );
};

// Component to handle the input and list functionality
const ListComponent = () => {
  const { items, addItem, removeItem, clearList } = useContext(ListContext);
  const [inputValue, setInputValue] = useState('');

  const handleAddClick = () => {
    if (inputValue) {
      addItem(inputValue);
      setInputValue('');
    }
  };

  const handleClearClick = () => {
    clearList();
  };

  return (
    <div>
      <input
        id="shopping-input"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleAddClick}>Add</button>
      <button id="clear-list" onClick={handleClearClick}>Clear List</button>
      <ul>
        {items.map((item, index) => (
          <li key={index} id={`item-${item}`}>
            {item}
            <button
              id={`remove-${item}`}
              onClick={() => removeItem(item)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Main App component
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [items, setItems] = useState([]);

  const login = () => {
    setIsAuthenticated(true);
    setCurrentUser('rohan');
  };

  const signOut = () => {
    setIsAuthenticated(false);
    setCurrentUser('');
  };

  const addItem = (item) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  const removeItem = (item) => {
    setItems((prevItems) => prevItems.filter((i) => i !== item));
  };

  const clearList = () => {
    setItems([]);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, signOut, currentUser }}>
      <ListContext.Provider value={{ items, addItem, removeItem, clearList }}>
        <div>
          <h1>React Context and State Example</h1>
          <AuthComponent />
          <ListComponent />
        </div>
      </ListContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
