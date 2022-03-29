import {useState} from 'react';
import { channels } from '../shared/constants';
import './App.css';
const { ipcRenderer } = window; 
// const { ipcRenderer } = window.require('electron');

function App() {
  console.log(window)
  const [metadata, setMetada] = useState({ appName:"", appVersion:"" });
  ipcRenderer.send(channels.APP_INFO);
  ipcRenderer.on(channels.APP_INFO, (event, arg) => {
    ipcRenderer.removeAllListeners(channels.APP_INFO);
    const { appName, appVersion } = arg;
    setMetada({ appName, appVersion });
  });
  return (
    <div className="App">
      <header className="App-header">
      <p>{metadata.appName} version {metadata.appVersion}</p>
      </header>
      <body>
        hola que hace
      </body>
    </div>
  );
}

export default App;
