import * as React from "react";
import Head from "next/head";
import Link from "next/link";
import Page, { SectionHeading, Heading, Paragraph } from "../components/Page";

export default function About() {
  return (
    <Page>
      <Head>
        <title>Marvin Messenzehl · About</title>
        <meta
          content="Marvin Messenzehl · About"
          name="og:title"
          key="og:title"
        />
        <meta content="Developer" name="og:description" key="og:description" />
        <meta
          content="Marvin Messenzehl · About"
          name="twitter:title"
          key="twitter:title"
        />
      </Head>

      <SectionHeading>
        <Heading>About me</Heading>

        <div style={{ padding: "8px" }} />

        <Paragraph>
          👋 I'm a product designer, podcaster and writer living in Mannheim,
          Germany.
        </Paragraph>

        <Paragraph>
          Currently doing my master's degree at the{" "}
          <a
            href="https://www.uni-mannheim.de/en/"
            target="_blank"
            rel="noopener noreferrer"
          >
            University of Mannheim
          </a>
          , writing my{" "}
          <a
            href="https://github.com/yOoMarvin/master-thesis-nudges"
            target="_blank"
            rel="noopener noreferrer"
          >
            thesis
          </a>
          . Besides that I'm building a tech innovation team at{" "}
          <a
            href="https://www.sparkassenversicherung.de/"
            taget="_blank"
            rel="noopener noreferrer"
          >
            SparkassenVersicherung
          </a>
          . I mainly work on digital products in the insurtech domain from start
          to finish and solve problems with the help of technology and design.
        </Paragraph>

        <Paragraph>
          Before that I’ve studied business informatics at the DHBW in Mannheim
          and developed my own little{" "}
          <a
            href="https://www.github.com/yoomarvin"
            taget="_blank"
            rel="noopener noreferrer"
          >
            projects
          </a>
          .
        </Paragraph>

        <Paragraph>
          Beside that, I enjoy spending time to the next generations of
          designers and developers. Learning a lot of awesome things and create
          wonderful projects with talented people.
        </Paragraph>

        <Paragraph>
          In my spare time I am a passionate endurance athlete. I also like to
          visit awesome places with awesome people. A dog and some human friends
          are also involved in my life. Both groups are very nice to me.
        </Paragraph>

        <div style={{ padding: "16px" }} />

        <Heading>How can I help?</Heading>

        <div style={{ padding: "8px" }} />

        <Paragraph>
          I love helping designers, engineers, and founders in any way I can. I
          like to do this in two ways:
        </Paragraph>

        <Paragraph>
          1. My{" "}
          <a
            href="https://twitter.com/yoomarvin"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter DMs
          </a>{" "}
          are open. Let me know how I can help, ideally with specific questions
          or problems you're working through. I can be helpful in thinking about
          job interviews, product presentations, design work, working at
          startups vs. large companies, being a developer/designer hybrid,
          working in the open source community, building side projects, and
          podcasting. If I don't reply right away, please follow up – sometimes
          things slip through the cracks! But I'll do my best to reply quickly.
        </Paragraph>

        <Paragraph>
          2. If you find yourself in Mannheim, I'd love to meet you for coffee.
          I like to do this on Wednesday afternoons each week, for about an
          hour. Just shoot me an email or DM on Twitter and we can find a time.
          This hour will be most productive if there are specific questions or
          problems you’d like to talk about. Of course, I won't always have
          answers, but I think I can be a helpful listener and bounce questions
          back at you to hopefully provide logical next steps to pursue. If
          you’d rather just meet and chat casually, that’s fine too!
        </Paragraph>
      </SectionHeading>
    </Page>
  );
}
