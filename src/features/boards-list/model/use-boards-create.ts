import { rqClient } from "@/shared/api/instance.ts";
import { ROUTES } from "@/shared/model/routes.ts";
import { useQueryClient } from "@tanstack/react-query";
import { href, useNavigate } from "react-router-dom";

export function useBoardsCreate() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createBoardMutation = rqClient.useMutation("post", "/boards", {
    onSettled: async () => {
      await queryClient.invalidateQueries(
        rqClient.queryOptions("get", "/boards"),
      );
    },
    onSuccess: (data) => {
      navigate(href(ROUTES.BOARD, { boardId: data.id }));
    },
  });

  return {
    isPending: createBoardMutation.isPending,
    createBoard: () => createBoardMutation.mutate({}),
  };
}
