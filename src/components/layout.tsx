import * as React from "react"
import { Link } from "gatsby"
import Menu from "./menu"
import styled from "styled-components"

import { rhythm, scale } from "../utils/typography"

const H1Title = styled.h1`
  font-size: ${scale(1.5).fontSize};
  line-height: ${scale(1.5).lineHeught};
  margin-bottom: ${rhythm(1.5)};
  margin-top: 0;
`

const H3Title = styled.h3`
  font-family: Montserrat, sans-serif;
  margin-top: 0;
`

const MainWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(24)};
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
`

const HomeLink = styled(Link)`
  box-shadow: none;
  text-decoration: none;
  color: inherit;
`

class Layout extends React.Component {
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
        <header>{header}</header>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with 💗
          {` `}
          <a href="https://www.gatsbyjs.org">Heart</a>
        </footer>
      </MainWrapper>
    )
  }
}

export default Layout
