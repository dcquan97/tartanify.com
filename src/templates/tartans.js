import React from "react"
import Layout from "../components/layout"
import SvgTile from "../components/svgtile"
import SvgBg from "../components/svgbg"
import MyLink from "../components/mylink"
import PaletteEl from "../components/paletteel"
import SEO from "../components/seo"
import { useStaticQuery, graphql } from "gatsby"

const letters = "abcdefghijklmnopqrstuvwxyz".split("")

const TartansListing = ({ pageContext }) => {
  const {
    group,
    index,
    first,
    last,
    pageCount,
    letter,
    previousLetterLastIndex,
  } = pageContext

  const letterIndex = letters.indexOf(letter)
  const previousLetter = letterIndex > 0 ? letters[letterIndex - 1] : ""
  const nextLetter =
    letterIndex < letters.length - 1 ? letters[letterIndex + 1] : ""

  const previousUrl =
    index === 0
      ? previousLetterLastIndex === 1
        ? `/tartans/${previousLetter}`
        : `/tartans/${previousLetter}/${previousLetterLastIndex}`
      : index === 1
      ? `/tartans/${letter}`
      : `/tartans/${letter}/${index.toString()}`

  const nextUrl = last
    ? `/tartans/${nextLetter}`
    : `/tartans/${letter}/${(index + 2).toString()}`

  const dataBg = useStaticQuery(graphql`
    {
      tartansCsv(fields: { slug: { eq: "corrie" } }) {
        Palette
        Threadcount
      }
    }
  `)
  const svg = SvgTile({
    palette: dataBg.tartansCsv.Palette,
    threadcount: dataBg.tartansCsv.Threadcount,
  })
  return (
    <Layout>
      <SEO
        description={`All Tartans starting by letter ${letter.toUpperCase()} - page ${index +
          1} / ${pageCount}`}
        title={`${letter.toUpperCase()} - page ${index + 1}`}
      ></SEO>
      <SvgBg className="tartans-bg" svg={svg} />
      <nav className="nav-top nav">
        <div className="previousLink">
          {(!first || previousLetter) && (
            <MyLink to={previousUrl} aria-label="Go to Previous Page">
              <span className="icon">&lsaquo;</span>
            </MyLink>
          )}
        </div>
        <div className="nextLink">
          {(!last || nextLetter) && (
            <MyLink to={nextUrl} aria-label="Go to Next Page ">
              <span className="icon">&rsaquo;</span>
            </MyLink>
          )}
        </div>
      </nav>
      <section className="etiquette section-all-tartans">
        <header>
          <h1>
            <span className="title-font listing">A-Z Index</span>
            <span className="title-font letter">{letter.toUpperCase()}</span>
            <small>
              {index + 1} / {pageCount}
            </small>
            <span className="discrete">
              <span className="ellipsis">{group[0].fields.Unique_Name}</span>-
              <span className="ellipsis">
                {group[group.length - 1].fields.Unique_Name}
              </span>
            </span>
          </h1>
        </header>
        <ul className="index">
          {group.map(node => {
            return (
              <li className="index-el" key={node.fields.slug}>
                <MyLink to={`/tartan/${node.fields.slug}`}>
                  <span>{node.fields.Unique_Name}</span>
                  {<PaletteEl colors={node.Palette} id={node.id} />}
                </MyLink>
              </li>
            )
          })}
          {group.length < 6 && (
            <>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </>
          )}
        </ul>
        {group.length > 30 && (
          <nav className="hide-plus nav">
            <div className="previousLink">
              {(!first || previousLetter) && (
                <MyLink to={previousUrl} aria-label="Go to Previous Page">
                  <span className="icon">&lsaquo;</span>
                </MyLink>
              )}
            </div>
            <div className="nextLink">
              {(!last || nextLetter) && (
                <MyLink to={nextUrl} aria-label="Go to Next Page ">
                  <span className="icon">&rsaquo;</span>
                </MyLink>
              )}
            </div>
          </nav>
        )}
      </section>
    </Layout>
  )
}

export default TartansListing
