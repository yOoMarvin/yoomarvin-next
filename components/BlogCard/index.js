import * as React from "react";
import Link from "next/link";
import Card from "../Card";
import { Title, CardContent, DetailsText, DateContainer } from "./style";

export default function BlogCard(props) {
  const {
    post: { title, slug, description }
  } = props;
  return (
    <Link href="/blog/[slug]" as={`/blog/${slug}`}>
      <a>
        <Card style={{ display: "flex" }}>
          {/*<DateContainer>{date}</DateContainer>*/}
          <CardContent>
            <Title>{title}</Title>
            <DetailsText>{description}</DetailsText>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
}
