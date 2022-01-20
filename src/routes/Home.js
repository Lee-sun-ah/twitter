import React,{useEffect, useState} from "react";
import { addDoc ,collection, onSnapshot } from 'firebase/firestore';
import {db}from "myBase";
import Tweet from "components/Tweet";

const Home=({userObj})=>{
    const[tweet,setTweet]=useState("");
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
        onSnapshot(collection(db, "tweets"),(snapshot)=>{
            const tweetArray=snapshot.docs.map((doc)=>({
                id:doc.id,
                ...doc.data(),
            }));
            setTweets(tweetArray);
        });
    },[]);

    const onSubmit=async(e)=>{
        e.preventDefault();
        if(tweet!==""){
            await addDoc(collection(db, "tweets"),{
                text:tweet,
                createdAt:Date.now(),
                creatorId:userObj.uid,

            });
            setTweet("");
        }
    }
    const onChange=(e)=>{
        const{target:{value}}=e;
        setTweet(value);
    }
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="What's on your mind?"value={tweet} maxLength={120} onChange={onChange}/>
                <input type="submit" value="tweet"/>
            </form>
            <div>{tweets.map((tweet)=>
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