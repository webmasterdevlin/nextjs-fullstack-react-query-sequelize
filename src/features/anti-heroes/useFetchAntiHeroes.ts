import { useQuery } from "react-query";
import { api, EndPoints } from "src/axios/api-config";
import { AntiHeroModel } from "src/models/client/antiHeroModel";

/*This function won't send an http request if not necessary.
 * So we can use this function to sync states in different components
 * */
export default function useFetchAntiHeroes() {
  return useQuery("antiHeroes", () =>
    api.get<AntiHeroModel[]>(EndPoints.antiHeroes)
  );
}
