import * as React from "react";
import Link from "next/link";
import Card from "../Card";
import { Title, CardContent, DetailsText, DateContainer } from "./style";

export default function BlogCard(props) {
  const { title, date, slug, details } = props;
  return (
    <Link href="/blog/[slug]" as={`/blog/${slug}`}>
      <a>
        <Card style={{ display: "flex" }}>
          {/*<DateContainer>{date}</DateContainer>*/}
          <CardContent>
            <Title>{title}</Title>
            <DetailsText>{details}</DetailsText>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
}
