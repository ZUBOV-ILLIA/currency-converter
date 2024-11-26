import { useContext } from "react";
import { RatesContext } from "../App";
import Loader from "./Loader";
import mainLogo from "/main-icon.svg";

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
                <div>1 USD = {+ratesContext.rates.USD.toFixed(2)} UAH</div>
                <div>1 EUR = {+ratesContext.rates.EUR.toFixed(2)} UAH</div>
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
