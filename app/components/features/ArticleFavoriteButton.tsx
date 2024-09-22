import { useFetcher } from "@remix-run/react";
import { FC } from "react";
import { FavoriteButton } from "~/components/ui/FavoriteButton";

interface ArticleFavoriteButtonProps {
  isFavorited: boolean;
}

export const ArticleFavoriteButton: FC<ArticleFavoriteButtonProps> = ({ isFavorited }) => {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="post">
      <FavoriteButton
        isFavorited={isFavorited}
        ariaLabel={isFavorited ? "Remove from favorites" : "Add to favorites"}
      />
    </fetcher.Form>
  );
};
