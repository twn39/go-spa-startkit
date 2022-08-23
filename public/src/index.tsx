import React from 'react';
import { createRoot } from 'react-dom/client';
import "./global.scss"


let mountNode: any = document.getElementById("root");
const root = createRoot(mountNode);

root.render(
  <React.StrictMode>
    <div>Gin web !!</div>
  </React.StrictMode>
);
