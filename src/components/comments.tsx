import * as React from "react"
import { useEffect, useState } from "react"
import styled from "styled-components"
import fireBaseService from "../services/firebase"

var dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };

function secondsToLocalDate(seconds: number) {
  return new Date(seconds * 1000).toLocaleDateString(navigator.languages[0], dateOptions);
}

const CommentContainer = styled.div`
  margin-bottom: 20px;
`

const CommentText = styled.pre`
  font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
  font-size: 14px;
  margin: 0;
`

const CommentCreatedDate = styled.div`
  font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
  font-size: 12px;
  color: #999;
`

const Comments = ({ postId }: { postId: string }) => {

  const [comments, setComments] = useState([]);

  useEffect(() => {
    const unsubscribe = fireBaseService.comments
      .where('postId', '==', postId.replace(/\//g, ''))
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const _comments = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        setComments(_comments);
      }, error => {
        console.log('Error while listening to comments', error);
      });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {
        comments.map(comment => <CommentContainer key={comment.id}>
          <CommentText>{comment.text}</CommentText>
          <CommentCreatedDate>
            {comment.author.displayName}, {secondsToLocalDate(comment.createdAt.seconds)}
          </CommentCreatedDate>
        </CommentContainer>)
      }
    </div>
  );
};

export default Comments