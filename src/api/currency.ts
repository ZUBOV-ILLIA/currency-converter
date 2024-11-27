import axios from "axios";

import { Rates } from "../types";

const apiKey = import.meta.env.VITE_API_KEY;

export async function getCurrency(base: string = "UAH"): Promise<void | Rates> {
  try {
    const res = await axios.get(
      `https://api.fxfeed.io/v1/latest?base=${base}&api_key=${apiKey}`
    );

    return res.data;
  } catch (err) {
    console.log(err);
  }
}
