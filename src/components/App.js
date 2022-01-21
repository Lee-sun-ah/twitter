import AppRouter from 'components/Router';
import { useEffect, useState } from 'react';
import {auth}from "myBase";
import { onAuthStateChanged,updateProfile} from 'firebase/auth';

function App() {
  const [init,setInit]=useState(false);
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [userObj,setUserObj]=useState(null);

  useEffect(()=>{
     onAuthStateChanged(auth,async(user)=>{
      if(user){
        if (user.displayName === null) {
          const name = user.email.split('@')[0];
          await updateProfile(user, {displayName: name});
        }
        setUserObj({
          displayName:user.displayName,
          uid:user.uid,
          updateProfile:(args)=>  updateProfile(user,args),
        });
        setIsLoggedIn(true);
      }
      else{
        setIsLoggedIn(false);
        setUserObj(null);
      }
      setInit(true);
    })
  },[])

  const refreshUser=()=>{
    const user=auth.currentUser;
    setUserObj({
      displayName:user.displayName,
      uid:user.uid,
      updateProfile:async(args)=> await updateProfile(user,args),
    });
  }
  return (
    <>
    {init?<AppRouter isLoggedIn={isLoggedIn} userObj={userObj} refreshUser={refreshUser}/>:"Initializing..."}
    <footer style={{textAlign:"center"}}>&copy; {new Date().getFullYear()} Twitter</footer>
    </>
  );
}

export default App;
