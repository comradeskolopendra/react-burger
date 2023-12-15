import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/app";
import "./index.css";
import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { store } from "./services";
import { BrowserRouter, HashRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <DndProvider backend={HTML5Backend}>
            <HashRouter>
                <Provider store={store}>
                    <App />
                </Provider>
            </HashRouter>
        </DndProvider>
    </React.StrictMode>
);
