
import { Article } from "~/domain/entities/Article";
import { CreateArticleDTO } from "~/application/dtos/CreateArticleDTO";
import { UpdateArticleDTO } from "~/application/dtos/UpdateArticleDTO";

export interface ArticleRepository {
  getArticles(query: string | null): Promise<Article[]>
  getArticle(articleId: number): Promise<Article | null>
  createArticle(createArticleDTO: CreateArticleDTO): Promise<Article>
  updateArticle(articleId: number, updateArticleDTO: UpdateArticleDTO): Promise<Article>
  deleteArticle(articleId: number): Promise<void>
}
