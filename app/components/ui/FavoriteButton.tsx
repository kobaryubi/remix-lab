import { FC } from "react";

interface FavoriteButtonProps {
  isFavorited: boolean;
  ariaLabel: string;
}

export const FavoriteButton: FC<FavoriteButtonProps> = ({ isFavorited, ariaLabel }) => {
  return (
    <button
      aria-label={ariaLabel}
      name="favorite"
      value={isFavorited ? "false" : "true"}
    >
      {isFavorited ? "★" : "☆"}
    </button>
  );
};
