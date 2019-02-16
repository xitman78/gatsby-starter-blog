import * as React from "react"
import { Link, graphql as gql } from "gatsby"
import styled from "styled-components"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import { IndexPageQuery } from "../graphql-types";

const PostTitle = styled.h3({
  marginBottom: rhythm(1 / 4),
})

const PostLink = styled(Link)({
  boxShadow: `none`,
})

class BlogIndex extends React.Component<{
  data: IndexPageQuery,
  location: string,
}> {
  render() {
    const { data } = this.props
    const siteTitle = data!.site!.siteMetadata!.title!
    const posts = data!.allMarkdownRemark!.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="All posts"
          keywords={[`blog`, `alexander`, `cherepnya`]}
        />
        <Bio />
        {posts!.map(({ node }) => {
          const title = node!.frontmatter!.title || node!.fields!.slug
          return (
            <div key={node!.fields!.slug!}>
              <PostTitle>
                <PostLink to={node!.fields!.slug!}>
                  {title}
                </PostLink>
              </PostTitle>
              <small>{node!.frontmatter!.date}</small>
              <p dangerouslySetInnerHTML={{ __html: node!.excerpt! }} />
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = gql`
  query IndexPage {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
