import { BoardsFavoriteToggle } from "../ui/boards-favorite-toggle";
import { BoardsListCard } from "../ui/boards-list-card";
import { Button } from "@/shared/ui/kit/button";
import { useUpdateFavorite } from "../model/use-update-favorite";
import { useBoardsDelete } from "../model/use-boards-delete";
import type { ApiSchemas } from "@/shared/api/schema";

export function BoardCard({ board }: { board: ApiSchemas["Board"] }) {
  const deleteBoard = useBoardsDelete();
  const updateFavorite = useUpdateFavorite();

  return (
    <BoardsListCard
      key={board.id}
      board={board}
      rightTopActions={
        <BoardsFavoriteToggle
          isFavorite={updateFavorite.isOptimisticFavorite(board)}
          onToggle={() => updateFavorite.toggleFavorite(board)}
        />
      }
      bottomActions={
        <Button
          variant="destructive"
          disabled={deleteBoard.getIsPanding(board.id)}
          onClick={() => deleteBoard.deleteBoard(board.id)}
        >
          Удалить
        </Button>
      }
    />
  );
}