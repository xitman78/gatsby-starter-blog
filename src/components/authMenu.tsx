import * as React from "react"
import styled from "styled-components"
import { useEffect, useState } from "react"
import firebaseService from "../services/firebase";
import { StyledFirebaseAuth } from "react-firebaseui"

const AuthMenuContainer = styled.div`
  align-self: flex-end;
  display: flex;
  flex-direction: row;
  min-height: 43px;
`

const Avatar = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  margin: 0;
  background-color: #AAAAAA;
`

const NoAvatar = styled.div`
  background-color: #AAAAAA;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
`

const SignOutContainer = styled.div`
 padding: 2px 0 10px 10px;
`

const SignOutLink = styled.a`
  cursor: pointer;
  line-height: 1.8;
  font-size: 14px;
`

const AuthMenu = () => {

  const [isSignedIn, setSigned] = useState<boolean | undefined>(firebaseService.isSigned);

  useEffect(() => {
    console.log('------auth status', firebaseService.isSigned);
    const stopAuthListener = firebaseService.auth().onAuthStateChanged(user => {
      if (user) {
        firebaseService.isSigned = true;
        setSigned(true);
      } else {
        firebaseService.isSigned = false;
        setSigned(false);
      }
    });

    return () => {
      stopAuthListener();
    }

  }, []);

  return (
    <AuthMenuContainer>
      {isSignedIn === undefined ? null :
        isSignedIn ?
          <>
            {firebaseService.auth().currentUser!.photoURL ?
              <Avatar src={firebaseService.auth().currentUser!.photoURL!} />
              :
              <NoAvatar />
            }
            <SignOutContainer>
              <SignOutLink onClick={() => firebaseService.signOut()}>Sign out</SignOutLink>
            </SignOutContainer>
          </>
          :
          <StyledFirebaseAuth uiConfig={firebaseService.uiConfig} firebaseAuth={firebaseService.auth()} />
      }
    </AuthMenuContainer>
  )
}

export default React.memo(AuthMenu, () => true)

// {/* <p>{firebaseService.auth().currentUser!.displayName}! You are now signed-in!</p> */}
