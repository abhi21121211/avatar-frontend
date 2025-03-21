import React from "react";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
// import createEmotionServer from "@emotion/server/create-instance";
import { createEmotionCache } from "@/utils/emotionCache";

/**
 * Custom Next.js Document component
 * Adds necessary MUI configuration and emotion caching
 */
class MyDocument extends Document {
  //   static async getInitialProps(ctx: DocumentContext) {
  //     const originalRenderPage = ctx.renderPage;
  //     const cache = createEmotionCache();
  //     const { extractCriticalToChunks } = createEmotionServer(cache);

  //     ctx.renderPage = () =>
  //       originalRenderPage({
  //         // eslint-disable-next-line react/display-name
  //         enhanceApp: (App: any) => (props) =>
  //           <App emotionCache={cache} {...props} />,
  //       });

  //     const initialProps = await Document.getInitialProps(ctx);
  //     const emotionStyles = extractCriticalToChunks(initialProps.html);
  //     const emotionStyleTags = emotionStyles.styles.map((style) => (
  //       <style
  //         data-emotion={`${style.key} ${style.ids.join(" ")}`}
  //         key={style.key}
  //         // eslint-disable-next-line react/no-danger
  //         dangerouslySetInnerHTML={{ __html: style.css }}
  //       />
  //     ));

  //     return {
  //       ...initialProps,
  //       emotionStyleTags,
  //     };
  //   }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
          />
          {(this.props as any).emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
