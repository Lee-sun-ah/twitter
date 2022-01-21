import React,{useEffect, useState} from "react";
import { collection, onSnapshot, orderBy,query } from 'firebase/firestore';
import {db}from "myBase";
import Tweet from "components/Tweet";
import TweetFactory from "components/TweetFactory";

const Home=({userObj})=>{
    const[tweets,setTweets]=useState([]);

    /*const getTweets=async()=>{
        const dbTweets=await getDocs(collection(db,"tweets"));
        dbTweets.forEach((doc) => {
            const tweetObject={
                ...doc.data(),
                id:doc.id,
            }
            setTweets(prev=>[tweetObject,...prev])
        });
    }*/

    useEffect(()=>{
        onSnapshot(query(collection(db, "tweets"),orderBy("createdAt","desc")),(snapshot)=>{
            const tweetArray=snapshot.docs.map((doc)=>({
                id:doc.id,
                ...doc.data(),
            }));
            setTweets(tweetArray);
        });
    },[]);


    return(
        <div className="container">
            <TweetFactory userObj={userObj}/>
            <div style={{marginTop:30}}>
                {tweets.map((tweet)=>
                <Tweet 
                    key={tweet.id} 
                    tweetObj={tweet} 
                    isOwner={tweet.creatorId===userObj.uid}
                />
            )}
            </div>
        </div>
    )
}
;
export default Home;