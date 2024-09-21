import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { ArticleUseCases } from "~/application/usecases/ArticleUseCases";
import { EntityNotFoundError } from "~/domain/errors/EntityNotFoundError";
import { MockArticleRepository } from "~/infrastructure/repositories/MockArticleRepository";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.articleId, "Missing articleId param");

  const articleId = parseInt(params.articleId);
  if (isNaN(articleId)) {
    throw new Response("Invalid article ID", { status: 400 });
  }

  const articleRepository = new MockArticleRepository();
  const useCases = new ArticleUseCases(articleRepository);

  try {
    const article = await useCases.getArticle(articleId);

    return json({ article });
  } catch (error) {
    if (error instanceof EntityNotFoundError) {
      throw new Response("Not Found", { status: 404 });
    }
  }
}

export default function Article() {
  const { article } = useLoaderData<typeof loader>();
  const { title } = article;

  return (
    <div>
      <div>
        <h1>{title}</h1>
      </div>
      <div>
        <Form action="edit">
          <button type="submit">Edit</button>
        </Form>
        <Form
          action="destroy"
          method="post"
          onSubmit={(event) => {
            const response = confirm(
              "Please confirm you want to delete this record."
            );

            if (response) {
              return;
            }

            event.preventDefault();
          }}
        >
          <button type="submit">Delete</button>
        </Form>
      </div>
    </div>
  )
}
