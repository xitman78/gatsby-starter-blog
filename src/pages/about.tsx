import * as React from "react"
import styled from "styled-components"
import { graphql as gql} from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { AboutPageQuery } from "../graphql-types"

const PageTitle = styled.h1`
`

class AboutPage extends React.Component<{data: AboutPageQuery, location: any}> {
  render() {
    const siteTitle = this.props.data!.site!.siteMetadata!.title!

    return (
      <Layout location={location} title={siteTitle}>
      <SEO title="About Me"/>
        <PageTitle>About Me</PageTitle>
        <p>
          Welcome to my blog. My name is Alexander and I'm merely a human being. At least I believe in that.
          That's all I can say about myself at the moment.
        </p>
        <p>
          If you want to know more find me on
          &nbsp;<a href="https://www.instagram.com/alexander_cherepnya/">Instagram</a>,&nbsp;
          <a href="https://www.facebook.com/alexander.cherepnya">Facebook</a>,&nbsp;
          <a href="https://www.linkedin.com/in/alexander-cherepnya-1149a632/">LinkedIn</a> and&nbsp;
          <a href="https://github.com/xitman78">GitHub</a>
        </p>
      </Layout>
    )
  }
}

export default AboutPage

export const pageQuery = gql`
  query AboutPage {
    site {
      siteMetadata {
        title
      }
    }
  }
`
