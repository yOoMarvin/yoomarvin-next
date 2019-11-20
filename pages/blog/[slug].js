import * as React from "react";
import { api } from "../../config";
import Page, {
  SectionHeading,
  Heading,
  Subheading
} from "../../components/Page";
import BlogView from "../../components/BlogView";
import BlogGrid from "../../components/BlogGrid";

class Blog extends React.Component {
  static async getInitialProps({ query, res }) {
    if (res) {
      const cacheAge = 60 * 60;
      res.setHeader("Cache-Control", `public,s-maxage=${cacheAge}`);
    }

    const post = api.getBlogPostFromSlug(query.slug);
    return { post };
  }

  render() {
    const { post } = this.props;

    if (post) {
      return (
        <Page>
          <BlogView post={post} />
        </Page>
      );
    }

    // bad slug
    return (
      <Page>
        <SectionHeading>
          <Heading>Design Details</Heading>
          <Subheading>A visual exploration of digital products</Subheading>
        </SectionHeading>

        <BlogGrid truncated={false} />
      </Page>
    );
  }
}

export default Blog;
