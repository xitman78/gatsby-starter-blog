import * as React from "react"
import { Link } from "gatsby"
import Menu from "./menu"
import styled from "styled-components"

import { rhythm, scale } from "../utils/typography"

const H1Title = styled.h1`
  margin-bottom: ${rhythm(1.5)};
  margin-top: 0;
`

const H3Title = styled.h3`
  margin-top: 0;
  color: #21b5e2;
`

const MainWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MainContent = styled.div`
  flex: 1;
  max-width: ${rhythm(24)};
  padding: 0 10px;
`

const Footer = styled.footer`
  flex: 0;
  font-size: ${rhythm(0.5)};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(to top, rgba(255,204,216,1) 0%, rgba(254,254,254,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e2e2e2', endColorstr='#fefefe', GradientType=0 );
`

const FooterContent = styled.div`
  width: 100%;
  max-width: ${rhythm(24)};
  padding: ${rhythm(1)} 10px ${rhythm(0.5)};
`

const HomeLink = styled(Link)`
  box-shadow: none;
  text-decoration: none;
  color: inherit;
`

class Layout extends React.Component<{
  location: any,
  title: string,
  children: any,
}> {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <H1Title>
          <HomeLink to={`/`}>
            {title}
          </HomeLink>
        </H1Title>
      )
    } else {
      header = (
        <H3Title>
          <HomeLink to={`/`}>
            {title}
          </HomeLink>
        </H3Title>
      )
    }
    return (
      <MainWrapper>
        <Menu />
        <MainContent>
          <header>{header}</header>
          <main>{children}</main>
        </MainContent>
        <Footer>
          <FooterContent>
            © {new Date().getFullYear()}, Built with 💗
            {` `}
            <a href="https://www.gatsbyjs.com">GatsbyJS</a>
          </FooterContent>
        </Footer>
      </MainWrapper>
    )
  }
}

export default Layout
