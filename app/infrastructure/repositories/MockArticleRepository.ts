import { ArticleRepository } from "~/domain/repositories/ArticleRepository";
import { Article } from "~/domain/entities/Article";

export class MockArticleRepository implements ArticleRepository {
  async getArticles(): Promise<Article[]> {
    return [
      { id: 1, title: "First Article" },
      { id: 2, title: "Second Article" },
    ];
  }
}
