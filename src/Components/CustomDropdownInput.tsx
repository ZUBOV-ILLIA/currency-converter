import { useContext, useEffect, useState } from "react";
import { RatesContext } from "../App";

export default function CustomDropdownInput({
  setActiveCur,
}: {
  setActiveCur: (currency: string) => void;
}) {
  const ratesContext = useContext(RatesContext);

  const [filteredRates, setFilteredRates] = useState<string[] | []>([]);
  const [currency, setCurrency] = useState<string>("UAH");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!ratesContext) return;

    setFilteredRates(Object.keys(ratesContext.rates));
  }, [isOpen, ratesContext]);

  useEffect(() => {
    if (!ratesContext) return;

    const filtered = Object.keys(ratesContext.rates).filter((rate) =>
      rate.toLowerCase().includes(currency.toLowerCase())
    );

    setFilteredRates(filtered);
  }, [currency]);

  return (
    <li className="relative text-slate-100">
      <div className="w-full flex py-2">
        <div onClick={() => setIsOpen(!isOpen)}>
          <input
            className="h-11 w-24 pl-6 rounded-l-3xl bg-gradient-to-r from-slate-500 to-slate-600"
            type="text"
            value={currency}
            onChange={(e) => {
              setCurrency(e.target.value);
              setIsOpen(true);
            }}
            maxLength={3}
          />
          <div className="absolute left-16 top-7 w-0 h-0 border-l-[6px] border-l-transparent border-t-[9px] border-t-red-500 border-r-[6px] border-r-transparent"></div>
        </div>
        <input
          className="pl-6 h-11 w-full rounded-r-3xl bg-slate-600"
          type="number"
          min={0}
        />
      </div>

      {/* currencies list */}
      {isOpen && ratesContext && (
        <ul className="absolute max-h-36 overflow-y-scroll w-full bg-slate-400 rounded-md z-10">
          {filteredRates.length > 0 &&
            filteredRates.map((rate) => (
              <li
                className="px-4 py-2 hover:bg-slate-500"
                key={rate}
                onClick={() => {
                  setCurrency(rate);
                  setIsOpen(false);
                  setActiveCur(rate);
                }}
              >
                {rate}
              </li>
            ))}
        </ul>
      )}
    </li>
  );
}
