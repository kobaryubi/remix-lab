import { json, redirect } from "@remix-run/node";
import { Form, Link, Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react";
import { MockArticleRepository } from "~/infrastructure/repositories/MockArticleRepository";
import { ArticleUseCases } from "~/application/usecases/ArticleUseCases";

export const action = async () => {
  const articleRepository = new MockArticleRepository();
  const useCases = new ArticleUseCases(articleRepository);
  const article = await useCases.createArticle({ title: "New Article" });

  return redirect(`/articles/${article.id}/edit`);
}

export const loader = async () => {
  const articleRepository = new MockArticleRepository();
  const useCases = new ArticleUseCases(articleRepository);
  const articles = await useCases.getArticles();

  return json({ articles});
}

export default function App() {
  const { articles } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <div>
          <nav>
            {articles.length ? (
              <ul>
                {articles.map(({id, title}) => (
                  <li key={id}>
                    <Link to={`articles/${id}`} >{title}</Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No articles</i>
              </p>
            )}
          </nav>
        </div>
        <Outlet />
        <Scripts />
        <ScrollRestoration />
      </body>
    </html>
  )
}
