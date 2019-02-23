import * as React from "react"
import styled from "styled-components"
import {useEffect, useState} from "react"
import firebaseService from "../services/firebase";
import {StyledFirebaseAuth} from "react-firebaseui"

const AuthMenuContainer = styled.div`
  align-self: flex-end;
`

const Avatar = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
`

const NoAvatar = styled.div`
  background-color: #AAAAAA;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
`

const AuthMenu = () =>  {

  const [isSignedIn, setSigned] = useState<boolean | undefined>(undefined);

  useEffect(() => {

    const stopAuthListener = firebaseService.auth().onAuthStateChanged(user => {
      if (user) {
        setSigned(true);
      } else {
        setSigned(false);
      }
    });

    return () => {
      stopAuthListener();
    }

  }, []);

  return (
    <AuthMenuContainer>
      { isSignedIn === undefined ? null :
        isSignedIn ?
        <>
          {/* <p>{firebaseService.auth().currentUser!.displayName}! You are now signed-in!</p> */}
          {firebaseService.auth().currentUser!.photoURL ?
            <Avatar src={firebaseService.auth().currentUser!.photoURL!} />
            :
            <NoAvatar />
          }
          {/* <a onClick={() => firebaseService.auth().signOut()}>Sign-out</a> */}
        </>
        :
        <>
          {/* <span>Sign In</span> */}
          <StyledFirebaseAuth uiConfig={firebaseService.uiConfig} firebaseAuth={firebaseService.auth()}/>
        </>
      }
    </AuthMenuContainer>
  )
}

export default AuthMenu
