import React from "react"
import Layout from "../components/layout"
import SvgTile from "../components/svgtile"
import SvgBg from "../components/svgbg"
import SEO from "../components/seo"
import { useStaticQuery, graphql } from "gatsby"

export default () => {
  const dataBg = useStaticQuery(graphql`
    {
      tartansCsv(fields: { slug: { eq: "aon" } }) {
        Threadcount
        Palette
      }
    }
  `)
  const svg = SvgTile({
    palette: dataBg.tartansCsv.Palette,
    threadcount: dataBg.tartansCsv.Threadcount,
  })
  return (
    <Layout>
      <SEO description={`404 error - Page not found.`} title={`404`}></SEO>
      <SvgBg svg={svg} />
      <section className="etiquette section-page section-404">
        <header>
          <h1 className="title-font">
            <span className="letter">404</span>
            <span>Page not found</span>
          </h1>
        </header>
        <p>We are sorry, but we can’t find the page you were looking for.</p>
      </section>
    </Layout>
  )
}
