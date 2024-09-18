import { ARTICLE_ENTITY_NAME, Article } from "~/domain/entities/Article";
import { EntityNotFoundError } from "~/domain/errors/EntityNotFoundError";
import { ArticleRepository } from "~/domain/repositories/ArticleRepository";

export class ArticleUseCases {
  constructor(
    private articleRepository: ArticleRepository,
  ) {}

  async getArticles(): Promise<Article[]> {
    return this.articleRepository.getArticles();
  }

  async getArticle(articleId: number): Promise<Article> {
    const article = await this.articleRepository.getArticle(articleId);
    if (article === null) {
      throw new EntityNotFoundError(ARTICLE_ENTITY_NAME, articleId);
    }

    return article;
  }
}
