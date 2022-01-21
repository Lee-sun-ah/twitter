import { signOut,updateProfile  } from "firebase/auth";
import { auth,db } from "myBase";
import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection,onSnapshot,query,where,orderBy } from 'firebase/firestore';

const Profile=({userObj,refreshUser})=>{
    const [newDisplayName,setNewDisplayName]=useState(userObj.displayName);
    const[tweets,setTweets]=useState([]);

    const navigate = useNavigate();
    const onLogOutClick=()=>{
        signOut(auth);
        navigate("/");
    }

    useEffect(()=>{
        onSnapshot(query(collection(db, "tweets"),where("creatorId","==",userObj.uid),orderBy("createdAt","desc")),(snapshot)=>{
            const tweetArray=snapshot.docs.map((doc)=>({
                id:doc.id,
                ...doc.data(),
            }));
            setTweets(tweetArray);
        });
    },[]);

    const onChange=(e)=>{
        setNewDisplayName(e.target.value);
    }
    const onSubmit=async(e)=>{
        e.preventDefault();
        if(userObj.displayName!==newDisplayName){
            await updateProfile(auth.currentUser, {
                displayName: newDisplayName
            })
            refreshUser();
        }
    }
    return(
        <div className="container">
        <form onSubmit={onSubmit} className="profileForm">
            <input type="text" value={newDisplayName} onChange={onChange} className="formInput"  placeholder="Display name"/>
            <input type="submit" className="formBtn" value="Update Profile"/>
        </form>
        <button className="formBtn cancelBtn logOut" onClick={onLogOutClick}>Log Out</button>
        {tweets.map((tweet,index)=>(
            <div className="tweet" key={index}>
            <h4 style={{wordBreak:"break-all",marginBottom:"15px"}}>{tweet.text}</h4>
            <p style={{fontSize:"7px"}}>{new Date(tweet.createdAt).toString().substring(0,25)}</p>
            {tweet.attachmentUrl && <img src={tweet.attachmentUrl} width="50px" height="50px"/>}
            </div>
        ))}
        </div>
    );
};
export default Profile;