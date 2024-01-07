import api from "../..";


export default async function requestCreateUser(body: any) {

  const reponse = await api.post(
    "/user/create",
    body
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
        status: e.response?.status,
        error: e.response?.data
      };

    });

  return reponse;
}
