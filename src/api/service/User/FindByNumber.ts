import api from "../..";

type Body = {
  number: string;
}

export default async function findUserByNumber(body: Body) {

  const reponse = await api.post(
    "/user/find_number",
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
        status: 500,
        error: e.response?.data
      };

    });

  return reponse;
}
