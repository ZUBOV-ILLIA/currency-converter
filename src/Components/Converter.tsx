import { useContext, useEffect, useState } from "react";
import CustomDropdownInput from "./CustomDropdownInput";
import { getFromLocalStorage, saveToLocalStorage } from "../helpers/helpers";
import { CurrencyRow, Rates } from "../types";
import { RatesContext } from "../App";
import AddRemoveRows from "./AddRemoveRows";

export default function Converter() {
  const ratesContext = useContext(RatesContext);
  const [rows, setRows] = useState<CurrencyRow[]>(
    getFromLocalStorage("rows") || [
      { id: 1, cur: "UAH", value: "0.00" },
      { id: 2, cur: "USD", value: "0.00" },
      { id: 3, cur: "EUR", value: "0.00" },
    ]
  );
  const [activeCurrency, setActiveCurrency] = useState(
    getFromLocalStorage("activeCur") || "UAH"
  );

  useEffect(() => {
    if (!getFromLocalStorage("rows")) {
      saveToLocalStorage("rows", rows);
    }

    if (!getFromLocalStorage("activeCur")) {
      saveToLocalStorage("activeCur", activeCurrency);
    }
  }, []);

  function handleUpdateRows(updatedRow: CurrencyRow) {
    const updatedRows = [...rows].map((row) => {
      if (row.id === updatedRow.id) {
        return updatedRow;
      }

      return row;
    });

    setRows(updatedRows);
    saveToLocalStorage("rows", updatedRows);
  }

  function handleUpdateCurrency(currency: string, value: string) {
    const updatedRates = updateRatesBase(
      getFromLocalStorage("rates"),
      currency
    );

    const updatedRows = rows.map((row) => {
      if (row.cur === currency) {
        return { ...row, value };
      }

      return {
        ...row,
        value: (updatedRates.rates[row.cur] * +value).toFixed(2).toString(),
      };
    });

    setActiveCurrency(currency);
    saveToLocalStorage("activeCur", currency);

    setRows(updatedRows);
    saveToLocalStorage("rows", updatedRows);
  }

  function updateRatesBase(ratesObject: Rates, newBase: string) {
    const newBaseRate = ratesObject.rates[newBase];
    const updatedRates = { ...ratesObject };

    // Recalculate all rates relative to the new base
    for (const [currency, rate] of Object.entries(ratesObject.rates)) {
      updatedRates.rates[currency] = rate / newBaseRate;
    }

    // Update the base and rates in the original object
    updatedRates.base = newBase;

    return updatedRates;
  }

  function handleAddRow() {
    const lastEl = rows[rows.length - 1];

    setRows([...rows, { ...lastEl, id: lastEl.id + 1 }]);
  }

  function handleRemoveRow() {
    setRows(rows.slice(0, -1));
  }

  if (!ratesContext) return;

  return (
    <ul className="p-4 w-full border rounded-lg shadow-2xl">
      {rows.map((el) => (
        <CustomDropdownInput
          key={el.id}
          currentElement={el}
          activeCurrency={activeCurrency}
          updateCurrency={handleUpdateCurrency}
          updateRow={handleUpdateRows}
        />
      ))}

      <AddRemoveRows
        rows={rows}
        addRow={handleAddRow}
        removeRow={handleRemoveRow}
      />
    </ul>
  );
}
