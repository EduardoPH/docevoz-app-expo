import api from "../..";

export default async function requestResendSms(id: string) {

  const reponse = await api.get(
    `/user/${id}/resend_sms`,
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
        status: e.response?.status,
        error: e.response?.data
      };

    });

  return reponse;
}
