import * as React from "react";
import Link from "next/link";
import { blog } from "../../data";
import BlogCard from "../BlogCard";
import { Grid, ViewMoreContainer } from "./style";
import { GhostButton } from "../Button";

export default function BlogGrid(props) {
  const { truncated } = props;
  const posts = truncated ? blog.slice(0, 4) : blog;

  return (
    <React.Fragment>
      <Grid>
        {posts.map(post => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </Grid>

      {truncated && (
        <ViewMoreContainer data-cy="view-all-blog-posts">
          <Link href="/blog">
            <GhostButton>View all {blog.length} blog posts</GhostButton>
          </Link>
        </ViewMoreContainer>
      )}
    </React.Fragment>
  );
}
