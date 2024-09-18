
import { Article } from "app/domain/entities/Article";

export interface ArticleRepository {
  getArticles(): Promise<Article[]>
}
