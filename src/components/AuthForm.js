import React,{useState} from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "myBase";

const AuthForm=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [newAccount,setNewAccount]=useState(true);
    const [error,setError]=useState("");

    const onChange=(e)=>{
        const {target:{name,value}}=e;
        if (name==="email"){
            setEmail(value)
        }else if(name==="password"){
            setPassword(value)
        }
    }
    const onSubmit=async(e)=>{
        e.preventDefault();
        try{
            let data;
            if(newAccount){
                data=await createUserWithEmailAndPassword(auth,email,password);
            }else{
                data=await signInWithEmailAndPassword(auth, email, password);
            }
        }catch(e){
            setError(e.message);
        }
    }

    const toggleAccount=()=>{
        setNewAccount(prev=>!prev)
    }

    return(
        <>
        <form onSubmit={onSubmit} className="container">
        <input name="email" type="text" placeholder="Email" required value={email} className="authInput" onChange={onChange}/>
        <input name="password" type="password" placeholder="Password" className="authInput" required value={password} onChange={onChange} />
        <input type="submit" className="authInput authSubmit" value={newAccount?"Create Account":"Sign In"}/>
        {error && <span className="authError">{error}</span>}        
        </form>
        <span className="authSwitch" onClick={toggleAccount}>{newAccount?"Sign In":"Create Account"}</span>
        </>
    );
}

export default AuthForm;