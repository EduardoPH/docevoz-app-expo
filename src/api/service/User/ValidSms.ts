import api from "../..";

type Body = {
  number: string;
}

export default async function requestValidSms(id: string, body: Body) {

  const reponse = await api.post(
    `/user/${id}/validate_sms`,
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
