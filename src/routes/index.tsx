import {
    BrowserRouter as Router,
    Routes as RoutesRouter,
    Route
  } from "react-router-dom";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import DetailsMovie from "../pages/DetailsMovie";

export default function Routes() {

    return (
        <Router>
            <RoutesRouter>
                <Route 
                    path='/'
                    element={<Home />}
                />
                <Route 
                    path='/movie-details/:id'
                    element={<DetailsMovie />}
                />
                <Route 
                    path={'*'} 
                    element={<ErrorPage />} 
                />
            </RoutesRouter>
        </Router>          
    )

}