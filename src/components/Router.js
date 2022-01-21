import React from "react";
import {HashRouter,Route,Routes} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from 'routes/Profile';
import Navigation from "components/Navigation";

const AppRouter=({isLoggedIn,userObj,refreshUser})=>{
    return (
        <HashRouter>
            {isLoggedIn&&<Navigation userObj={userObj}/>}
            <Routes style={{
                    maxWidth: 890,
                    width: "100%",
                    margin: "0 auto",
                    marginTop: 80,
                    display: "flex",
                    justifyContent: "center",}}>
                {isLoggedIn?(
                <>
                <Route path="/" element={<Home userObj={userObj}/>}/>
                <Route path="/profile" element={<Profile userObj={userObj} refreshUser={refreshUser}/>}/>
                </>
                ):(
                <Route path="/" element={<Auth/>}/>
                )}
            </Routes>
        </HashRouter>
    );
};

export default AppRouter;