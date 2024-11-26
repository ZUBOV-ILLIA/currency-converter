// import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;

export async function getCurrency() {
  console.log("apiKey >>>", apiKey);
  // try {
  //   const responce = axios.get(
  //     `https://api.fxfeed.io/v1/latest?base=UAH&api_key=${apiKey}`
  //   );

  //   console.log("responce >>>", responce);
  // } catch (err) {
  //   console.log(err);
  // }
}
