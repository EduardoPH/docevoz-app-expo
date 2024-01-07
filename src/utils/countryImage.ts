import Angola from "../../assets/angola.png";
import Brasil from "../../assets/brasil.webp";
import CaboVerde from "../../assets/cabo-verde.png";
import Eua from "../../assets/estados-unidos.png";
import Franca from "../../assets/franca.webp";
import Moçambique from "../../assets/moçambique.png";
import Portgual from "../../assets/portugal.png";
import SaoTome from "../../assets/sao-tome.webp";

const countries = {
  angola: Angola,
  brasil: Brasil,
  caboverde: CaboVerde,
  eua: Eua,
  franca: Franca,
  moçambique: Moçambique,
  portgual: Portgual,
  saotome: SaoTome,
};

export function getCountryImage(country: string): any {
  return countries[country.toLowerCase()];
}
