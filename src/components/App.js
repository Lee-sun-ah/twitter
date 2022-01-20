
import AppRouter from 'components/Router';
import { useEffect, useState } from 'react';
import {auth}from "myBase";
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [init,setInit]=useState(false);
  const[isLoggedIn,setIsLoggedIn]=useState(false);
  const [userObj,setUserObj]=useState(null);

  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
        setIsLoggedIn(true);
        setUserObj(user);
      }
        else{
          setIsLoggedIn(false);
          setUserObj(null);
        }
      setInit(true);
    })
  },[])
  return (
    <>
    {init?<AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/>:"Initializing..."}
    <footer>&copy; {new Date().getFullYear()} Twitter</footer>
    </>
  );
}

export default App;
