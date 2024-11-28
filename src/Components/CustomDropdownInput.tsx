import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { CurrencyRow } from "../types";
import { RatesContext } from "../App";

export default function CustomDropdownInput({
  currentElement,
  activeCurrency,
  updateCurrency,
  updateRow,
}: {
  currentElement: CurrencyRow;
  activeCurrency: string;
  updateCurrency: (currency: string, value: string) => void;
  updateRow: (row: CurrencyRow) => void;
}) {
  const curSelectorRef = useRef<HTMLDivElement>(null);
  const ratesContext = useContext(RatesContext);

  const [value, setValue] = useState(currentElement.value);
  const [isOpen, setIsOpen] = useState(false);
  const currencies = useMemo(
    () => (ratesContext?.rates && Object.keys(ratesContext.rates).sort()) || [],
    []
  );

  useEffect(() => {
    setValue(currentElement.value);
  }, [currentElement.value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        curSelectorRef.current &&
        !curSelectorRef.current.contains(event.target as Node)
      ) {
        setTimeout(() => {
          setIsOpen(false);
        }, 0);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleInputOnchange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;

    // Allow only numbers and dot
    if (/^[0-9]*\.?[0-9]*$/.test(newValue) || newValue === "") {
      setIsOpen(false);
      setValue(newValue);
      updateCurrency(currentElement.cur, newValue);
    }
  }

  function handleCurrencySelect(currency: string) {
    setIsOpen(false);
    updateRow({ ...currentElement, cur: currency });
  }

  if (!ratesContext) return;

  return (
    <li className="py-2 relative text-slate-100">
      <div
        className={`w-full flex rounded-3xl ${
          activeCurrency === currentElement.cur ? "shadow shadow-green-500" : ""
        }`}
      >
        {/* currency selector */}
        <div
          ref={curSelectorRef}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <div className="pl-6 h-11 w-24 flex items-center rounded-l-3xl bg-gradient-to-r from-slate-500 to-slate-600">
            {currentElement.cur}
          </div>
          <div className="absolute left-16 top-7 w-0 h-0 border-l-[6px] border-l-transparent border-t-[9px] border-t-red-500 border-r-[6px] border-r-transparent"></div>
        </div>

        {/* currency input */}
        <input
          className="pl-6 h-11 w-full rounded-r-3xl bg-slate-600"
          type="text"
          value={value}
          onChange={handleInputOnchange}
          onFocus={(e) => e.target.select()}
          inputMode="numeric"
          min={0}
        />
      </div>

      {/* currencies list */}
      {isOpen && (
        <ul className="absolute top-full max-h-36 overflow-y-scroll w-full bg-slate-400 rounded-md z-10">
          {currencies.length > 0 &&
            currencies.map((rate) => (
              <li
                className="px-4 py-2 hover:bg-slate-500"
                key={rate}
                onClick={() => handleCurrencySelect(rate)}
              >
                {rate}
              </li>
            ))}
        </ul>
      )}
    </li>
  );
}
