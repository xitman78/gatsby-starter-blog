import * as React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"
import CommentForm from "../components/commentForm"
import Comments from "../components/comments"
import { rhythm, scale } from "../utils/typography"
import FacebookShareButton from "../components/facebookShare";

const StyledUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
`

const DateParagraph = styled.p`
  font-size: ${scale(-1 / 5).fontSize};
  line-height: ${scale(-1 / 5).lineHeight};
  display: block;
  marginBottom: ${rhythm(1)};
  marginTop: ${rhythm(-1)};
`

class BlogPostTemplate extends React.Component<{
  data: any,
  location: string,
  pageContext: any,
}> {

  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext
    const slug = post.fields.slug;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={post.frontmatter.title} description={post.excerpt} />
        <h1>{post.frontmatter.title}</h1>
        <DateParagraph>
          {post.frontmatter.date}
        </DateParagraph>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <FacebookShareButton url={'https://alexander-cherepnya.netlify.app' + slug} />

        <StyledUl>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </StyledUl>

        <CommentForm postId={slug} />
        <Comments postId={slug} />
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
      fields {
        slug
      }
    }
  }
`
