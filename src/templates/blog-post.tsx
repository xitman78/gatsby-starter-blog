import * as React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import fireBaseService from "../services/firebase";

const StyledUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
`

const StyledHr = styled.hr`
  margin-bottom: ${rhythm(1)};
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

  componentDidMount() {
    const slug = this.props.data.markdownRemark.fields.slug;

    fireBaseService.comments.where('postId', '==', slug.replace(/\//g, '')).get().then(res => {
      console.log('comments', res);
      if (!res.empty) {
        const comments = res.docs.map(v => v.data());
        console.log('-- Comments', comments);
      }
    }).catch(err => {
      console.error('+++++', err);
    });
  }

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
        <StyledHr />
        <Bio />

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
