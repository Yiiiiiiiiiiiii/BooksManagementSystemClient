import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Router from "./router/router"


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App><Router></Router></App>);


