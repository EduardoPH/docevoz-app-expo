import api from "../..";

type Body = {
  number: string;
}

export default async function requestLogin(body: Body) {

  const reponse = await api.post(
    "/user/login_mobile",
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
