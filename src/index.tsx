import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Post from "./Post";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/posts/:id" element={<Post />} />
        </Routes>
      </HashRouter>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
