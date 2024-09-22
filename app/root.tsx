import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, Links, Meta, NavLink, Outlet, Scripts, ScrollRestoration, useLoaderData, useNavigation } from "@remix-run/react";
import { MockArticleRepository } from "~/infrastructure/repositories/MockArticleRepository";
import { ArticleUseCases } from "~/application/usecases/ArticleUseCases";
import { useEffect } from "react";

export const action = async () => {
  const articleRepository = new MockArticleRepository();
  const useCases = new ArticleUseCases(articleRepository);
  const article = await useCases.createArticle({ title: "New Article" });

  return redirect(`/articles/${article.id}/edit`);
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");

  const articleRepository = new MockArticleRepository();
  const useCases = new ArticleUseCases(articleRepository);
  const articles = await useCases.getArticles(q);

  return json({ articles, q });
}

export default function App() {
  const { articles, q } = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  useEffect(() => {
    const searchField = document.getElementById("q");
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || "";
    }
  }, [q]);

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
          <Form role="search">
            <input
              id="q"
              aria-label="Search articles"
              name="q"
              placeholder="Search"
              type="search"
              defaultValue={q || ""}
            />
          </Form>
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
                    <NavLink
                      to={`articles/${id}`}
                      className={({ isActive, isPending }) => (isActive ? "active" : isPending ? "pending" : "")}
                    >
                      {title}
                    </NavLink>
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
        <div
          className={
            navigation.state === "loading" ? "loading" : ""
          }
        >
          <Outlet />
        </div>
        <Scripts />
        <ScrollRestoration />
      </body>
    </html>
  )
}
