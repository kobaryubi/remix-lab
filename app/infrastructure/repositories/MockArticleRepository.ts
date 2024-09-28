import { ArticleRepository } from "~/domain/repositories/ArticleRepository";
import { Article } from "~/domain/entities/Article";
import { CreateArticleDTO } from "~/application/dtos/CreateArticleDTO";
import { UpdateArticleDTO } from "~/application/dtos/UpdateArticleDTO";

export class MockArticleRepository implements ArticleRepository {
  async getArticles(query: string | null): Promise<Article[]> {
    if (query?.startsWith("F")) {
      return Promise.resolve([{ id: 1, title: "First Article", isFavorited: false }]);
    }
    if (query?.startsWith("S")) {
      return Promise.resolve([{ id: 2, title: "Second Article", isFavorited: true }]);
    }
    return Promise.resolve([
      { id: 1, title: "First Article", isFavorited: false },
      { id: 2, title: "Second Article", isFavorited: true },
    ]);
  }

  async getArticle(articleId: number): Promise<Article | null> {
    const articles = [
    { id: 1, title: "First Article", isFavorited: false },
    { id: 2, title: "Second Article", isFavorited: true },
    { id: 3, title: "New Article", isFavorited: false },
    ];

    return Promise.resolve(articles[articleId] || null);
  }

  async createArticle(createArticleDTO: CreateArticleDTO): Promise<Article> {
    return Promise.resolve({ id: 3, isFavorited: false, ...createArticleDTO });
  }

  async updateArticle(articleId: number, updateArticleDTO: UpdateArticleDTO): Promise<Article> {
    return Promise.resolve({ id: articleId, title: "Updated Article", isFavorited: false, ...updateArticleDTO });
  }

  async deleteArticle(articleId: number): Promise<void> {}
}
