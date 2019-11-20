import * as React from "react";
import Link from "next/link";
import Card from "../Card";
import { Title, CardContent, DetailsText, IconContainer } from "./style";

export default function BlogCard(props) {
  const {
    post: { title, slug, description, createdAt, category }
  } = props;
  return (
    <Link href="/blog/[slug]" as={`/blog/${slug}`}>
      <a>
        <Card style={{ display: "flex" }}>
          <IconContainer>
            {category == "work" ? <img src="/static/img/work.png" /> : null}
            {category == "life" ? <img src="/static/img/life.png" /> : null}
            {category == "code" ? <img src="/static/img/code.png" /> : null}
            {category == "design" ? <img src="/static/img/design.png" /> : null}
          </IconContainer>
          <CardContent>
            <Title>{title}</Title>
            <DetailsText>{createdAt}</DetailsText>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
}
