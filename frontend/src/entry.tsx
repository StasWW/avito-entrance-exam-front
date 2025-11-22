import React from 'react';
import ReactDOM from 'react-dom/client';
import List from './pages/list.tsx';
import {Provider} from "react-redux";
import {store} from "./store/storage.ts";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <List />
    </Provider>
  </React.StrictMode>
);
