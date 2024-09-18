import { ArticleRepository } from "~/domain/repositories/ArticleRepository";
import { Article } from "~/domain/entities/Article";

export class MockArticleRepository implements ArticleRepository {
  async getArticles(): Promise<Article[]> {
    return [
      { id: 1, title: "First Article" },
      { id: 2, title: "Second Article" },
    ];
  }

  async getArticle(articleId: number): Promise<Article | null> {
    if (articleId === 1) {
      return { id: 1, title: "First Article" };
    }

    return null;
  }
}
