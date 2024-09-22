import { useFetcher } from "@remix-run/react";
import { FC } from "react";
import { FavoriteButton } from "~/components/ui/FavoriteButton";
import { Article } from "~/domain/entities/Article";

interface ArticleFavoriteButtonProps  {
  article: Pick<Article, "isFavorited">;
}

export const ArticleFavoriteButton: FC<ArticleFavoriteButtonProps> = ({ article }) => {
  const fetcher = useFetcher();
  const isFavorited = fetcher.formData ? fetcher.formData.get("isFavorited") === "true" : article.isFavorited;

  return (
    <fetcher.Form method="post">
      <FavoriteButton
        isFavorited={isFavorited}
        ariaLabel={isFavorited ? "Remove from favorites" : "Add to favorites"}
      />
    </fetcher.Form>
  );
};
