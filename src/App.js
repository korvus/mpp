import './style/App.css';
import React from 'react';
import Col from './components/menu.js';
import Map from './components/map.js';
import { PinContextProvider } from './store';

// Get coords : https://getlatlong.net/
// 2008 https://www.facebook.com/groups/collectif20/permalink/1328297430863868/?comment_id=1328494804177464&reply_comment_id=1328537437506534
// 2009

function App() {
  return (
    <PinContextProvider>
      <Col />
      <Map />
    </PinContextProvider>
  );
}

export default App;
