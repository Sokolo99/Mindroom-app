import { rqClient } from "@/shared/api/instance.ts";
import { useQueryClient } from "@tanstack/react-query";

export function useBoardsDelete() {
  const queryClient = useQueryClient();

  const deleteBoardMutation = rqClient.useMutation(
    "delete",
    "/boards/{boardId}",
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(
          rqClient.queryOptions("get", "/boards"),
        );
      },
    },
  );

  return {
    getIsPanding: (boardId: string) =>
      deleteBoardMutation.isPending &&
      deleteBoardMutation.variables?.params?.path?.boardId === boardId,
    deleteBoard: (boardId: string) =>
      deleteBoardMutation.mutate({
        params: {
          path: {
            boardId,
          },
        },
      }),
  };
}
