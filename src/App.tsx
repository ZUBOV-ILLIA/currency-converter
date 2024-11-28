import { createContext, useEffect, useState } from "react";
import Header from "./Components/Header";
import { calculateExchangeRates, saveToLocalStorage } from "./helpers/helpers";
import Converter from "./Components/Converter";
import { getCurrency } from "./api/currency";
import Footer from "./Components/Footer";
import { Rates } from "./types";

export const RatesContext = createContext<Rates | null>(null);

function App() {
  const [rates, setRates] = useState<Rates | null>(null);

  useEffect(() => {
    (async function () {
      const res = await getCurrency();

      if (!res) return;

      const newRates = res;

      newRates.rates[res.base] = 1;

      setRates(newRates);

      saveToLocalStorage("rates", newRates);
      saveToLocalStorage("headerRates", {
        USD: calculateExchangeRates("USD"),
        EUR: calculateExchangeRates("EUR"),
      });
    })();
  }, []);

  return (
    <RatesContext.Provider value={rates}>
      <Header />

      <main className="pt-8 pb-24 flex grow items-center">
        <div className="container mx-auto px-4 w-full">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <Converter />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </RatesContext.Provider>
  );
}

export default App;
