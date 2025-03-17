
import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";
import { SpeedInsights } from "@vercel/speed-insights/next"
class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        
        <body>
        <SpeedInsights />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
