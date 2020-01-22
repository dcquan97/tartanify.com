import React from "react"
import Layout from "../components/layout.js"
import SvgTile from "../components/svgtile.js"
import SvgBg from "../components/svgbg.js"
import Info from "../components/info.js"
import DownLoadAsSvg from "../components/tartandownloadsvg.js"
import DownLoadAsPng from "../components/tartandownloadpng.js"
import { graphql } from "gatsby"
import MyLink from "../components/mylink.js"
import SEO from "../components/seo"

export const query = graphql`
  query($id: String!) {
    tartansCsv(id: { eq: $id }) {
      Name
      Palette
      Threadcount
      Origin_URL
      fields {
        Uniquename
      }
    }
  }
`
const TartanTemplate = props => {
  const pageContext = props.pageContext
  const tartansCsv = props.data.tartansCsv
  const uniqueName = tartansCsv.fields.Uniquename

  const svg = SvgTile({
    palette: tartansCsv.Palette,
    threadcount: tartansCsv.Threadcount,
  })

  const description = `You can download here this beautiful seamless ${uniqueName} tartan pattern. It's available both as an svg file or in a PNG format.`
  return (
    <Layout>
      <SEO title={uniqueName} description={description}></SEO>
      <SvgBg svg={svg} />
      <div className={`info info-${props.transitionStatus}`}>
        <h1 className="title-font etiquette">
          <span>{uniqueName}</span>
          <Info className="info-icon" url={tartansCsv.Origin_URL} />
        </h1>

        <nav className="nav">
          {pageContext.previous && (
            <MyLink
              className="prev"
              to={`/tartan/${pageContext.previous.fields.slugg}`}
              rel="prev"
            >
              <span className="icon">&lsaquo;</span>
              <span className="hide-m">
                {pageContext.previous.fields.Uniquename}
              </span>
            </MyLink>
          )}
          {pageContext.next && (
            <MyLink
              className="next"
              to={`/tartan/${pageContext.next.fields.slugg}`}
              rel="next"
            >
              <span className="hide-m">
                {pageContext.next.fields.Uniquename}
              </span>
              <span className="icon">&rsaquo;</span>
            </MyLink>
          )}
          <Info className="info-icon hide-plus" url={tartansCsv.Origin_URL} />
        </nav>
      </div>
      <div className="downloads">
        <DownLoadAsSvg svg={svg} name={pageContext.slugg} />
        <DownLoadAsPng svg={svg} name={pageContext.slugg} />
      </div>
    </Layout>
  )
}

export default TartanTemplate
