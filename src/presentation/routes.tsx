import React from "react";
import { FC, useContext } from "react";
import {
    BrowserRouter,
    Routes as Router,
    Route,
    useNavigate,
} from "react-router-dom";
import Login from "./pages/User/Login";
import Template from "./layout/Template";
import Dashboard from "./pages/Dashboard";
import { AuthContext } from "./context/AuthContext";

const AddLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <Template exibirMenuNavegacao={false}>{children}</Template>
        </>
    );
};

const AuthenticateRounte: FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    if (!user) {
        navigate("/");
        return null;
    }

    return <>{children}</>;
};

export default function Routes() {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <Router>
                    <Route path="/" element={
                        <Login />
                    } />
                    <Route path="/dashboard" element={
                        <AddLayout>
                            {/* <AuthenticateRounte> */}
                                <Dashboard />
                            {/* </AuthenticateRounte> */}
                        </AddLayout>
                    }/>
                </Router>
            </BrowserRouter>
        </React.StrictMode>
    );
}
