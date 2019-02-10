import * as React from "react"
import { useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = ({data, location}) =>  {
  const siteTitle = data.site.siteMetadata.title

  const [count, seCount] = useState<number>(0);

  return (
    <Layout location={location} title={siteTitle}>
    <SEO title="About Me"/>
      <h1>About me</h1>
      <div>{count}</div>
      <button onClick={() => seCount(count + 1)}>Click me</button>
      <p>
        This component is using React Hooks with Gatsby! This is dope!
      </p>
    </Layout>
  )
}

export default AboutPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
