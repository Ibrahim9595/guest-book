import React from 'react';
import './App.css';
import { UserContext } from './logic/context/user-context';
import Authntication from './screens/Authentication';
import GuestBook from './screens/GuestBook';

function App() {
  const userContext = React.useContext(UserContext);
  return (
    <>
      {
        userContext.user ?
          <GuestBook />
          :
          <Authntication />
      }
    </>
  );
}

export default App;
