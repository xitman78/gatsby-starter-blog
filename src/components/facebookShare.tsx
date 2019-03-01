import * as React from 'react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FacebookShareButton as FacebookShareButtonO } from 'react-share'

const ShareOuterContainer = styled.button`
  background-color: #365899;
  border-radius: 4px;
  padding: 0;
  cursor: pointer;
  margin-bottom: 20px;
`

const FancyInnerContainer = styled.div`
  padding: 6px 8px;
  display: flex;
  align-items: center;
`

const ShareText = styled.span`
  font-family: Helvetica, Arial, sans-serif;
  font-weight: bolder;
  color: white;
  margin-left: 8px;
  font-size: 13px;
  line-height: 1;
`

const ShareCountText = styled.span`
  font-family: Helvetica, Arial, sans-serif;
  font-weight: normal;
  color: white;
  margin-left: 8px;
  font-size: 13px;
  line-height: 1;
`

const FacebookShareButton = ({ url }: { url: string }) => {

  const [sharesCount, setSharesCount] = useState<number | undefined>(undefined);

  useEffect(() => {
    fetch(`https://graph.facebook.com/?fields=id,share,og_object{engagement{count}}&id=${encodeURIComponent(url)}`)
      .then(data => {
        return data.json();
      }).then(res => {
        if (res.share && res.share.share_count !== undefined) {
          setSharesCount(res.share.share_count);
        }
      }).catch(err => {
        console.error('Error getting facebook shares', err);
      });
  }, []);

  return (
    <ShareOuterContainer>
      <FacebookShareButtonO url={url}>
        <FancyInnerContainer>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
            <path fill="white" d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
          </svg>
          <ShareText className="text">Share</ShareText>
          {sharesCount !== undefined && <ShareCountText>{sharesCount.toString()}</ShareCountText>}
        </FancyInnerContainer>
      </FacebookShareButtonO>
    </ShareOuterContainer>
  );

};

export default FacebookShareButton;