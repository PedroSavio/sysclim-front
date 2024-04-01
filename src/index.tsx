import React from "react";
import ReactDOM from "react-dom";
import { AuthProvider } from "./presentation/context/AuthContext";
import Routes from "./presentation/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./global.css"
import "./index.scss"
//import { NextUIProvider } from '@nextui-org/react';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <React.StrictMode>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Routes />
          </QueryClientProvider>
        </AuthProvider>
    </React.StrictMode>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));