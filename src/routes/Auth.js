import AuthForm from "components/AuthForm";
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { auth } from "myBase";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Auth=()=>{
    const onSocialClick=async(e)=>{
        const {target:{name}}=e;
        let provider;
        if(name==="google"){
            provider = new GoogleAuthProvider();
        }else if(name==="github"){
            provider = new GithubAuthProvider();
        }
        await signInWithPopup(auth, provider);
    }

    return (
        <div className="authContainer">
            <FontAwesomeIcon
                icon={faTwitter}
                color={"#04AAFF"}
                size="3x"
                style={{ marginBottom: 30 }}
            />
            <AuthForm />
            <div className="authBtns">
                <button className="authBtn" name="google" onClick={onSocialClick}>Continue with Google <FontAwesomeIcon icon={faGoogle}/></button>
                <button className="authBtn" name="github" onClick={onSocialClick}>Continue with Github <FontAwesomeIcon icon={faGithub} /></button>
            </div>
        </div>
    );
    }
export default Auth;