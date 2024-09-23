import { ActionFunction, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { ArticleUseCases } from "~/application/usecases/ArticleUseCases";
import { MockArticleRepository } from "~/infrastructure/repositories/MockArticleRepository";

export const action: ActionFunction = async ({ params }) => {
  invariant(params.articleId, "Missing articleId param");

  const articleId = parseInt(params.articleId);

  const articleRepository = new MockArticleRepository();
  const useCases = new ArticleUseCases(articleRepository);
  await useCases.deleteArticle(articleId);

  return redirect("/");
};
