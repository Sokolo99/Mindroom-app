import { useState } from "react";
import { useBoardsList } from "./model/use-boards-list";
import {
  BoardsListLayout,
  BoardsListLayoutCards,
  BoardsListLayoutContent,
  BoardsListLayoutHeader,
  BoardsListLayoutList,
  BoardsListLayoutContentGroups,
} from "./ui/boards-list-layout";

import { useRecentGroups } from "./model/use-recent-groups";
import { ViteModelToggle, type ViteMode } from "./ui/vite-model-toggle";
import { BoardItem } from "./compose/board-item";
import { BoardCard } from "./compose/board-card";
import { BoardsSidebar } from "./ui/boards-sidebar";

function BoardsListPage() {
  const boardsQuery = useBoardsList({
    sort: "lastOpenedAt",
  });

  const [viewMode, setViewMode] = useState<ViteMode>("list");

  const recentGroups = useRecentGroups(boardsQuery.boards);

  return (
    <BoardsListLayout
      sidebar={<BoardsSidebar />}
      header={
        <BoardsListLayoutHeader
          title="Последние доски"
          description="Здесь вы можете просматривать и управлять своими последними досками"
          actions={
            <ViteModelToggle
              value={viewMode}
              onChange={(value) => setViewMode(value)}
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
        mode={viewMode}
      >
        <BoardsListLayoutContentGroups
          groups={recentGroups.map((group) => ({
            items: {
              list: (
                <BoardsListLayoutList>
                  {group.items.map((board) => (
                    <BoardItem board={board} />
                  ))}
                </BoardsListLayoutList>
              ),
              cards: (
                <BoardsListLayoutCards>
                  {group.items.map((board) => (
                    <BoardCard board={board} />
                  ))}
                </BoardsListLayoutCards>
              ),
            }[viewMode],
            title: group.title,
          }))}
        />
      </BoardsListLayoutContent>
    </BoardsListLayout>
  );
}

export const Component = BoardsListPage;