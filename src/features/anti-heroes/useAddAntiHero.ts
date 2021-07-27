import { useMutation } from "react-query";
import { queryClient } from "src/pages/_app";
import { api, EndPoints } from "src/axios/api-config";
import { AntiHeroModel } from "src/models/client/antiHeroModel";

export default function useAddAntiHero() {
  return useMutation(
    (antiHero) => api.post<AntiHeroModel>(EndPoints.antiHeroes, antiHero),
    {
      onMutate: async (antiHero: AntiHeroModel) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries("antiHeroes");

        // Snapshot the previous value
        const backup =
          queryClient.getQueryData<{ data: AntiHeroModel[] }>("antiHeroes");

        // Optimistically update by removing the antiHero
        if (backup)
          queryClient.setQueryData<{ data: AntiHeroModel[] }>("antiHeroes", {
            data: [...backup.data, antiHero],
          });

        return { backup };
      },

      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (err, variables, context) => {
        if (context?.backup)
          queryClient.setQueryData<AntiHeroModel[]>(
            "antiHeroes",
            context.backup.data
          );
      },
      // Always refetch after error or success:
      onSettled: () => queryClient.invalidateQueries("antiHeroes"),
    }
  );
}
