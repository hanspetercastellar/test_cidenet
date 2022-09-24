import './App.css';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {Home} from './pages/admin/home.page';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import {PersistGate} from "redux-persist/lib/integration/react";
import {Auth} from './pages/auth/auth.page';
import {persistor} from './redux/store'
import {loggedIn} from './redux/reducers/auth.reducer';

let timeOut = null;

function App() {

    return (
        <div className="App">
            <PersistGate loading={null} persistor={persistor}>
                <Router>
                    <Routes>
                        <Route exact path={"/login"} element={<Auth/>}/>
                        <Route
                            exact path={"/"}
                            element={
                                <PrivateRoute>
                                    <Home/>
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </Router>
            </PersistGate>

        </div>
    );
}

const PrivateRoute = ({children, ...rest}) => {
    const udata = useSelector(loggedIn)
    return udata && udata.token ? (
        children
    ) : (
        <Navigate to={"/login"} replace/>
    )
}

export default App;
