import React from "react";
import { Link, graphql } from "gatsby";
import moment from "moment";
import _ from "lodash";

import Bio from "../components/Bio";
import Layout from "../components/Layout";
import SEO from "../components/seo";
import { rhythm } from "../utils/typography";

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const posts = data.allPrismicBlogPost.edges;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <Bio />
        {posts.map(({ node }) => {
          const title = _.get(node.data.title, "text");
          const date = moment(node.data.date).format("MMMM D, YYYY");

          console.log(node);

          return (
            <div key={node.uid}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4)
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.uid}>
                  {title}
                </Link>
              </h3>
              <small>{date}</small>
              <p dangerouslySetInnerHTML={{ __html: node.data.spoiler.text }} />
            </div>
          );
        })}
      </Layout>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allPrismicBlogPost {
      edges {
        node {
          id
          uid
          data {
            date
            title {
              text
            }
            spoiler {
              text
            }
          }
        }
      }
    }
  }
`;

// allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
//   edges {
//     node {
//       excerpt
//       fields {
//         slug
//       }
//       frontmatter {
//         date(formatString: "MMMM DD, YYYY")
//         title
//         spoiler
//       }
//     }
//   }
// }
