import api from "../..";

export default async function findScheduleByProgram(id) {

  const reponse = await api.post(
    `/radio/${id}/schedule/find`,
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
