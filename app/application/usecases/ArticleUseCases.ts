import { Article } from "~/domain/entities/Article";
import { ArticleRepository } from "~/domain/repositories/ArticleRepository";

export class ArticleUseCases {
  constructor(
    private articleRepository: ArticleRepository,
  ) {}

  async getArticles(): Promise<Article[]> {
    return this.articleRepository.getArticles();
  }
}
