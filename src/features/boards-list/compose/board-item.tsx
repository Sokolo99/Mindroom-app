import { BoardsFavoriteToggle } from "../ui/boards-favorite-toggle";
import { BoardsListItem } from "../ui/boards-list-item";
import { DropdownMenuItem } from "@/shared/ui/kit/dropdown-menu";
import { useUpdateFavorite } from "../model/use-update-favorite";
import type { ApiSchemas } from "@/shared/api/schema";
import { useBoardsDelete } from "../model/use-boards-delete";

export function BoardItem({ board }: { board: ApiSchemas["Board"] }) {
  const deleteBoard = useBoardsDelete();
  const updateFavorite = useUpdateFavorite();

  return (
    <BoardsListItem
      key={board.id}
      board={board}
      rightActions={
        <BoardsFavoriteToggle
          isFavorite={updateFavorite.isOptimisticFavorite(board)}
          onToggle={() => updateFavorite.toggleFavorite(board)}
        />
      }
      menuActions={
        <DropdownMenuItem
          variant="destructive"
          disabled={deleteBoard.getIsPanding(board.id)}
          onClick={() => deleteBoard.deleteBoard(board.id)}
        >
          Удалить
        </DropdownMenuItem>
      }
    />
  );
}