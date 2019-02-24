import * as React from "react"
import { useState, useEffect } from "react"
import styled from "styled-components"
import TextareaAutosize from "react-textarea-autosize"
import firebaseService from "../services/firebase"

const Container = styled.div`
  margin-bottom: 20px;
`

const Teaxtarea = styled(TextareaAutosize)`
  width: 100%;
  padding: 10px;
  font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
  font-size: 14px;
`

const CommentButtonContainer = styled.div`
  text-align: right;
`

const CommentButton = styled.button`
  border: 0;
  background-color: #AAAAAA;
  color: white;
  padding: 8px 14px;
  cursor: pointer;
  font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
  font-size: 14px;
  &:hover {
    background-color: #999999;
  }
  &[disabled] {
    background-color: #CCCCCC;
    cursor: auto;
  }
`

const ScrollTopSignInLink = styled.a`
  cursor: pointer;
`

const CommentForm = ({ postId }: { postId: string }) => {

  const [commentText, setCommentText] = useState<string>('');
  const [isSigned, setIsSigned] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const subsription = firebaseService.isSigned.subscribe(value => {
      setIsSigned(value);
    });
    return () => subsription.unsubscribe();
  }, []);

  const onButtonClick = () => {
    firebaseService.createComment(postId, commentText).then(() => {
      setCommentText('');
    }).catch(err => {
      console.error('Exception', err);
    });

  };

  if (isSigned === undefined) {
    return null;
  }

  if (isSigned === false) {
    return (
      <Container>
        <h4>Comments</h4>
        <ScrollTopSignInLink onClick={() => {
          window.scrollTo(0, 0);
        }}>To leave a comment please sign in above using your Facebook account.</ScrollTopSignInLink>
      </Container>
    );
  }

  if (isSigned) {
    return (
      <Container>
        <h4>Comments</h4>
        Your comment:
      <Teaxtarea minRows={1} value={commentText} onInput={(event) => setCommentText(event.target.value)} />
        <CommentButtonContainer>
          <CommentButton value="Submit" onClick={onButtonClick} disabled={commentText.length === 0 || commentText.trim().length === 0}>Comment</CommentButton>
        </CommentButtonContainer>
      </Container>
    );
  }
};

export default CommentForm