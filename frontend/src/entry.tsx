import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from "react-redux";

import { store } from "./store/storage.ts";
import List from './pages/list.tsx';
import ItemPage from './pages/item.tsx';
import Stats from "./pages/stats.tsx";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/item/:id" element={<ItemPage />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
