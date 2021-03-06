import * as React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { rhythm, scale } from "../utils/typography"
import AuthMenu from "./authMenu";

const MenuWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(to bottom, rgba(183,222,237,1) 0%, rgba(254,254,254,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e2e2e2', endColorstr='#fefefe', GradientType=0 );
`

const MenuWidthHolder = styled.div`
  width: 100%;
  max-width: ${rhythm(24)};
  text-align: left;
  padding: 20px 10px 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const StyledLink = styled(Link)`
  margin-right: 20px;
`

const Menu = () => (
  <MenuWrapper>
    <MenuWidthHolder>
      <div>
        <StyledLink to={"/"}>Blog</StyledLink>
        <StyledLink to={"/about"}>About</StyledLink>
      </div>
      <AuthMenu />
    </MenuWidthHolder>
  </MenuWrapper>
);

export default React.memo(Menu, () => true);