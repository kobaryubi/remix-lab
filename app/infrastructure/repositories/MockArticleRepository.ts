import { ArticleRepository } from "~/domain/repositories/ArticleRepository";
import { Article } from "~/domain/entities/Article";
import { CreateArticleDTO } from "~/application/dtos/CreateArticleDTO";

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

    if (articleId === 2) {
      return { id: 2, title: "Second Article" };
    }

    if (articleId === 3) {
      return { id: 3, title: "New Article" };
    }

    return null;
  }

  async createArticle(createArticleDTO: CreateArticleDTO): Promise<Article> {
    return { id: 3, ...createArticleDTO };
  }

  async updateArticle(articleId: number, updateArticleDTO: CreateArticleDTO): Promise<Article> {
    return { id: articleId, ...updateArticleDTO };
  }

  async deleteArticle(articleId: number): Promise<void> {}
}
