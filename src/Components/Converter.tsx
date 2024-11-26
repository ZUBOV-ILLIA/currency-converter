import { useEffect, useState } from "react";
import CustomDropdownInput from "./CustomDropdownInput";
import { getFromLocalStorage } from "../helpers/helpers";
import { Row } from "../types";

export default function Converter() {
  const [activeCur, setActiveCur] = useState("");
  const [rows, setRows] = useState<Row[] | []>([]);

  useEffect(() => {
    const initialCurrency = getFromLocalStorage("activeCurrency") || "UAH";
    const initialEntries = getFromLocalStorage("entries") || [
      { id: 0, cur: "UAH" },
      { id: 1, cur: "USD" },
      { id: 2, cur: "EUR" },
    ];

    setActiveCur(initialCurrency);
    setRows(initialEntries);
  }, []);

  function handleCurrencyChange(currency: string) {
    setActiveCur(currency);
  }

  function handleAddRow() {
    const newId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
    setRows([...rows, { id: newId, cur: activeCur }]);
  }

  function handleRemoveRow() {
    setRows(rows.slice(0, -1));
  }

  return (
    <>
      {activeCur && rows.length > 0 && (
        <ul className="p-4 w-full border rounded-lg shadow-2xl">
          {rows.map((_, i) => (
            <CustomDropdownInput key={i} setActiveCur={handleCurrencyChange} />
          ))}

          <li className="mt-3 flex justify-end">
            <button
              className="pb-0 h-9 w-9 flex justify-center items-center font-bold border border-green-600 rounded-3xl relative"
              onClick={handleAddRow}
            >
              <div className="absolute bg-green-600 h-0.5 w-4"></div>
              <div className="absolute bg-green-600 h-4 w-0.5"></div>
            </button>

            {rows.length > 3 && (
              <button
                className="ml-4 pb-0 h-9 w-9 flex justify-center items-center font-bold border border-red-600 rounded-3xl relative"
                onClick={handleRemoveRow}
              >
                <div className="absolute bg-red-600 h-0.5 w-4"></div>
              </button>
            )}
          </li>
        </ul>
      )}
    </>
  );
}
