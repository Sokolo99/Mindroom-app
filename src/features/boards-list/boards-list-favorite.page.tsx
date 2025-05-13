import { useBoardsList } from "./model/use-boards-list.ts";
import {
  BoardsListLayout,
  BoardsListLayoutContent,
  BoardsListLayoutHeader,
} from "./ui/boards-list-layout.tsx";
import { ViteModelToggle, type ViteMode } from "./ui/vite-model-toggle.tsx";
import { useState } from "react";
import { BoardItem } from "./compose/board-item.tsx";
import { BoardCard } from "./compose/board-card.tsx";
import { BoardsSidebar } from "./ui/boards-sidebar.tsx";

function BoardsListFavoritePage() {
  const boardsQuery = useBoardsList({ isFavorite: true });

  const [viteMode, setViteMode] = useState<ViteMode>("list");


  return (
    <BoardsListLayout
      sidebar={<BoardsSidebar />}
      header={
        <BoardsListLayoutHeader
          title="Избранные доски"
          description="Здесь вы можите просматривать и управлять совими досками"
          actions={
            <ViteModelToggle
              value={viteMode}
              onChange={(value) => setViteMode(value)}
            />
          }
        />
      }
    >
      <BoardsListLayoutContent
        isEmpty={boardsQuery.boards.length === 0}
        isPending={boardsQuery.isPending}
        isPendingNext={boardsQuery.isFetchingNextPage}
        cursorRef={boardsQuery.cursorRef}
        hasCursor={boardsQuery.hasNextPage}
        mode={viteMode}
        renderList={() =>
          boardsQuery.boards.map((board) => (
            <BoardItem key={board.id} board={board} />
          ))
        }
        renderCards={() =>
          boardsQuery.boards.map((board) => (
            <BoardCard key={board.id} board={board} />
          ))
        }
      />
    </BoardsListLayout>
  );
}

export const Component = BoardsListFavoritePage;
