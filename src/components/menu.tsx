import * as React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const MenuWrapper = styled.div`
  margin-bottom: 40px;
`
const StyledLink = styled(Link)`
  margin-right: 20px;
`

const Menu = () => (
  <MenuWrapper>
    <StyledLink to={"/"}>Home</StyledLink>
    <StyledLink to={"/about"}>About Me</StyledLink>
  </MenuWrapper>
);

export default Menu;