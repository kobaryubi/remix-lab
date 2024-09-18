import { json } from "@remix-run/node";
import { Links, Meta, Scripts, ScrollRestoration } from "@remix-run/react";
import { MockArticleRepository } from "~/infrastructure/repositories/MockArticleRepository";
import { ArticleUseCases } from "~/application/usecases/ArticleUseCases";

export const loader = async () => {
  const articleRepository = new MockArticleRepository();
  const useCases = new ArticleUseCases(articleRepository);
  const articles = await useCases.getArticles();

  return json({ articles});
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Scripts />
         <ScrollRestoration />
      </body>
    </html>
  )
}
