import { ARTICLE_ENTITY_NAME, Article } from "~/domain/entities/Article";
import { EntityNotFoundError } from "~/domain/errors/EntityNotFoundError";
import { ArticleRepository } from "~/domain/repositories/ArticleRepository";
import { CreateArticleDTO } from "~/application/dtos/CreateArticleDTO";
import { UpdateArticleDTO } from "~/application/dtos/UpdateArticleDTO";

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

  async createArticle(createArticleDTO: CreateArticleDTO): Promise<Article> {
    return this.articleRepository.createArticle(createArticleDTO);
  }

  async updateArticle(articleId: number, updateArticleDTO: UpdateArticleDTO): Promise<Article> {
    return this.articleRepository.updateArticle(articleId, updateArticleDTO);
  }
}
