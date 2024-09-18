import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { ArticleUseCases } from "~/application/usecases/ArticleUseCases";
import { MockArticleRepository } from "~/infrastructure/repositories/MockArticleRepository";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.articleId, "Missing articleId param");

  const articleRepository = new MockArticleRepository();
  const useCases = new ArticleUseCases(articleRepository);

  const articleId = parseInt(params.articleId, 10);
  const article = await useCases.getArticle(articleId);

  return json({ article });
}

export default function Article() {
  const { article } = useLoaderData<typeof loader>();
  const { title } = article;

  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
}
