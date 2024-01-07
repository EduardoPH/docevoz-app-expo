import api from "../..";

export default async function findEpisodesByProgram(id) {

  const reponse = await api.post(
    `/program/${id}/episode/find_all`,
    null
  )
    .then(res => {

      return {
        data: res.data.data,
        status: res.status,
        error: {}
      };

    })
    .catch((e) => {

      return {
        data: false,
        status: 500,
        error: e.response?.data
      };

    });

  return reponse;
}
