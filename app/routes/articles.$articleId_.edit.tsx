import { ActionFunction, LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { ArticleUseCases } from "~/application/usecases/ArticleUseCases";
import { EntityNotFoundError } from "~/domain/errors/EntityNotFoundError";
import { MockArticleRepository } from "~/infrastructure/repositories/MockArticleRepository";

export const action: ActionFunction = async ({
  params,
  request,
}) => {
  invariant(params.articleId, "Missing articleId param");

  const articleId = parseInt(params.articleId);

  const formData = await request.formData();
  const updateArticleDTO = Object.fromEntries(formData);

  const articleRepository = new MockArticleRepository();
  const useCases = new ArticleUseCases(articleRepository);
  await useCases.updateArticle(articleId, updateArticleDTO);

  return redirect(`/articles/${articleId}`);
}

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

export default function EditArticle() {
  const { article } = useLoaderData<typeof loader>();
  const { title } = article;

  return (
    <Form method="post">
      <label>
        <span>Title</span>
        <input
          type="text"
          placeholder="Title"
          name="title"
          defaultValue={title}
          aria-label="Title"
        />
      </label>
      <p>
        <button type="submit">Save</button>
      </p>
    </Form>
  )
}
