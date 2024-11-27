import { useContext } from "react";
import Loader from "./Loader";
import mainLogo from "/main-icon.svg";
import { calculateExchangeRates } from "../helpers/helpers";
import { RatesContext } from "../App";

export default function Header() {
  const ratesContext = useContext(RatesContext);

  return (
    <header className="bg-slate-800 text-slate-100 shadow-xl">
      <div className="container mx-auto px-2 w-full">
        <nav className="h-14 flex items-center justify-between">
          <div className="flex items-center">
            <img src={mainLogo} className="h-10" alt="main logo" />
            <span className="text-xl hidden sm:inline">Currency</span>
            <span className="ml-1 text-xl">Converter</span>
          </div>
          <div className="text-sm font-thin font-sans">
            {ratesContext ? (
              <>
                <div>USD = {calculateExchangeRates("USD")} UAH</div>
                <div>EUR = {calculateExchangeRates("EUR")} UAH</div>
              </>
            ) : (
              <Loader size={32} />
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
