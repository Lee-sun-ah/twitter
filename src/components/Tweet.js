import React,{useState} from "react";
import { doc,deleteDoc,updateDoc } from 'firebase/firestore';
import { ref,deleteObject } from "firebase/storage";
import {db,storage}from "myBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Tweet=({tweetObj,isOwner})=>{
    const [editing,setEditing]=useState(false);
    const [newTweet,setNewTweet]=useState(tweetObj.text);

    const onDeleteClick=async()=>{
        const ok=window.confirm("Are you sure you want to delete thi tweet?");
        if(ok){
            await deleteDoc(doc(db, `tweets/${tweetObj.id}`));
            await deleteObject(ref(storage, tweetObj.attachmentUrl));
        }
    }

    const toggleEditing=()=>{
        setEditing(prev=>!prev)
    }

    const onSubmit=async(e)=>{
        e.preventDefault();
        await updateDoc(doc(db, `tweets/${tweetObj.id}`),{
            text:newTweet
        });
        setEditing(false);
    }

    const onChange=(e)=>{
        const{target:{value}}=e;
        setNewTweet(value);
    }

    return(
        <div className="tweet">
            {editing?
            (isOwner&&
            <>
            <form onSubmit={onSubmit} className="container tweetEdit">
                <input type="text" placeholder="Edit your tweet" value={newTweet} required onChange={onChange} className="formInput"/>
                <input type="submit" className="formBtn" value="Update Tweet"/>
            </form>
            <button className="formBtn cancelBtn" onClick={toggleEditing}>Cancel</button>
            </>
            )
            :
            <>
            <h4 style={{wordBreak:"break-all",marginBottom:"15px"}}>{tweetObj.text}</h4>
            <p style={{fontSize:"7px"}}>{new Date(tweetObj.createdAt).toString().substring(0,25)}</p>
            {tweetObj.attachmentUrl && <img src={tweetObj.attachmentUrl}/>}
            {isOwner &&(
                <div className="tweet__actions">
                <button onClick={onDeleteClick}><FontAwesomeIcon icon={faTrash} /></button>
                <button onClick={toggleEditing}><FontAwesomeIcon icon={faPencilAlt} /></button>
                </div>
            )}
            </>}
        </div>

    );
}

export default Tweet;
