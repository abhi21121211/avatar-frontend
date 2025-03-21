import React from "react";
import Head from "next/head";

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string[];
}

/**
 * SEO component for managing page head metadata
 */
const SEO: React.FC<SEOProps> = ({
  title,
  description = "Convert PHP code to Node.js with our online converter tool",
  keywords = ["PHP", "Node.js", "code converter", "migration tool"],
}) => {
  const fullTitle = title
    ? `${title} | Avatar Project`
    : "Avatar Project - PHP to Node.js Converter";

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default SEO;
