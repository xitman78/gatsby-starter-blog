import * as React from "react"
import styled from "styled-components"
import { useState } from "react"
import { graphql as gql} from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { AboutPageQuery } from "../graphql-types"

const PageTitle = styled.h1`
  color: red;
`

const AboutPage = ({data, location}: {data: AboutPageQuery, location: any}) =>  {
  const siteTitle = data!.site!.siteMetadata!.title!

  // const [count, seCount] = useState<number>(0);

  return (
    <Layout location={location} title={siteTitle}>
    <SEO title="About Me"/>
      <PageTitle>About Me</PageTitle>
      {/* <svg width="580" height="400" xmlns="http://www.w3.org/2000/svg">
      <g>
        <rect fill="#7Cf" id="canvas_background" height="402" width="582" y="-1" x="-1"/>
      </g>
      <g>
        <path id="svg_2" d="m0,192.4375c0,0 37,-54 199,-53c162,1 218,86 320,87c102,1 129,-50 129,-50c0,0 -19,288 -19,288c0,0 -645,6 -645,3c0,-3 -11,-256 -11,-256.4375c0,0.4375 27,-18.5625 27,-18.5625z" strokeOpacity="null" strokeWidth="0" stroke="#000" fill="#00ff00"/>
        <ellipse ry="111.5" rx="111.5"  cy="150.9375" cx="161.5" strokeWidth="0" fill="#FFF"/>
      </g>
      </svg> */}
      <p>
        This component was using React Hooks with Gatsby! This is dope!
      </p>
    </Layout>
  )
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
