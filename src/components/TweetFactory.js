import { db,storage } from "myBase";
import React,{useState} from "react";
import { ref,uploadString,getDownloadURL } from "firebase/storage";
import {v4 as uuidv4} from "uuid";
import { addDoc, collection } from 'firebase/firestore';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const TweetFactory=({userObj})=>{
    const[tweet,setTweet]=useState("");
    const [attachment,setAttachment]=useState("");

    const onSubmit=async(e)=>{
        e.preventDefault();
        let attachmentUrl="";

        if(attachment!==""){
        const attachmentRef=ref(storage, `${userObj.uid}/${uuidv4()}`);
        const uploadFile=await uploadString(attachmentRef, attachment,'data_url');
        attachmentUrl=await getDownloadURL(uploadFile.ref);
        }
        const tweetObj={
            text:tweet.trim(),
            createdAt: new Date(Date.now()).toString(),
            creatorId:userObj.uid,
            attachmentUrl,
        }

        if(tweet.trim()!==""){
            await addDoc(collection(db, "tweets"),tweetObj);
            setTweet("");
            setAttachment("");
        }
    }

    const onChange=(e)=>{
        const{target:{value}}=e;
        setTweet(value);
    }

    const onFileChange=(e)=>{
        const {target:{files}}=e;
        const theFile=files[0];
        const reader=new FileReader();
        reader.onloadend=(finishedEvent)=>{
            setAttachment(finishedEvent.target.result);
        }
        reader.readAsDataURL(theFile);
    }

    const onClearAttachment=()=>setAttachment(null);

    return(
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input type="text" placeholder="What's on your mind?"value={tweet} className="factoryInput__input" maxLength={120} onChange={onChange}/>
                <input type="submit" className="factoryInput__arrow" value="&rarr;"/>
            </div>
            <label htmlFor="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input id="attach-file" type="file" accept="image/*" onChange={onFileChange} style={{opacity: 0,}}/>
            {attachment&&
            <div className="factoryForm__attachment">
                <img src={attachment} style={{backgroundImage: attachment,}}/>
                <button className="factoryForm__clear" onClick={onClearAttachment}>
                <span>Remove</span><FontAwesomeIcon icon={faTimes} />
                </button>
            </div>}
        </form>
    );
}

export default TweetFactory;