
import { Article } from "~/domain/entities/Article";
import { CreateArticleDTO } from "~/application/dtos/CreateArticleDTO";

export interface ArticleRepository {
  getArticles(): Promise<Article[]>
  getArticle(articleId: number): Promise<Article | null>
  createArticle(createArticleDTO: CreateArticleDTO): Promise<Article>
}
