import { Button } from "@/shared/ui/kit/button";
import { useBoardsList } from "./model/use-boards-list.ts";
import { useBoardsFilters } from "./model/use-boards-filters.ts";
import { useDebounceValue } from "@/shared/lib/react";
import { useBoardsCreate } from "./model/use-boards-create.ts";
import { PlusIcon } from "lucide-react";
import {
  BoardsListLayout,
  BoardsListLayoutContent,
  BoardsListLayoutFilters,
  BoardsListLayoutHeader,
} from "./ui/boards-list-layout.tsx";
import { ViteModelToggle, type ViteMode } from "./ui/vite-model-toggle.tsx";
import { useState } from "react";
import { BoardsSortSelect } from "./ui/boards-sort-select.tsx";
import { BoardsSearchInput } from "./ui/boards-search-input.tsx";
import { BoardItem } from "./compose/board-item.tsx";
import { BoardCard } from "./compose/board-card.tsx";
import { BoardsSidebar } from "./ui/boards-sidebar.tsx";
import { TemplatesGallery, TemplatesModal, useTemplatesModal } from "@/features/board-templates";

function BoardsListPage() {
  const boardsFilters = useBoardsFilters();
  const boardsQuery = useBoardsList({
    sort: boardsFilters.sort,
    search: useDebounceValue(boardsFilters.search, 300),
  });

  const templatesModal = useTemplatesModal();

  const createBoard = useBoardsCreate();

  const [viteMode, setViteMode] = useState<ViteMode>("list");

  return (
    <>
      <TemplatesModal />
      <BoardsListLayout
        template={<TemplatesGallery />}
        sidebar={<BoardsSidebar />}
        header={
          <BoardsListLayoutHeader
            title="Доска"
            description="Здесь вы можите просматривать и управлять совими досками"
            actions={
              <>
                <Button variant='outline' onClick={templatesModal.open}>
                  Выбрать шаблон
                </Button>
                <Button
                  variant="success"
                  disabled={createBoard.isPending}
                  onClick={createBoard.createBoard}
                >
                  <PlusIcon />
                  Создать доску
                </Button>
              </>
            }
          />
        }
        filters={
          <BoardsListLayoutFilters
            sort={
              <BoardsSortSelect
                value={boardsFilters.sort}
                onValueChange={boardsFilters.setSort}
              />
            }
            filters={
              <BoardsSearchInput
                value={boardsFilters.search}
                onChange={boardsFilters.setSearch}
              />
            }
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
    </>
  );
}

export const Component = BoardsListPage;
