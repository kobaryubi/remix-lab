import { CreateArticleDTO } from "~/application/dtos/CreateArticleDTO";

export interface UpdateArticleDTO extends Partial<CreateArticleDTO> {};
