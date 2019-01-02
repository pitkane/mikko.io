const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve(`./src/templates/blog-post.js`);

    resolve(
      graphql(
        `
          {
            allPrismicBlogPost {
              edges {
                node {
                  id
                  uid
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        // Create blog posts pages.
        const posts = result.data.allPrismicBlogPost.edges;

        posts.forEach((post, index) => {
          console.log(post);
          const previous =
            index === posts.length - 1 ? null : posts[index + 1].node;
          const next = index === 0 ? null : posts[index - 1].node;

          createPage({
            // path: post.node.fields.slug,
            // component: blogPost,
            // context: {
            //   slug: post.node.fields.slug,
            //   previous,
            //   next
            // }path: `/${edge.node.uid}`,
            path: `/${post.node.uid}`,
            component: blogPost,
            context: {
              uid: post.node.uid
            }
          });
        });
      })
    );
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value
    });
  }
};
