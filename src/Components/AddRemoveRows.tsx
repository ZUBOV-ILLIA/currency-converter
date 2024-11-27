import { CurrencyRow } from "../types";

export default function AddRemoveRows({
  rows,
  addRow,
  removeRow,
}: {
  rows: CurrencyRow[] | [];
  addRow: () => void;
  removeRow: () => void;
}) {
  return (
    <li className="mt-3 flex justify-end">
      <button
        className="pb-0 h-9 w-9 flex justify-center items-center font-bold border border-green-600 rounded-3xl relative"
        onClick={addRow}
      >
        <div className="absolute bg-green-600 h-0.5 w-4"></div>
        <div className="absolute bg-green-600 h-4 w-0.5"></div>
      </button>

      {rows.length > 3 && (
        <button
          className="ml-4 pb-0 h-9 w-9 flex justify-center items-center font-bold border border-red-600 rounded-3xl relative"
          onClick={removeRow}
        >
          <div className="absolute bg-red-600 h-0.5 w-4"></div>
        </button>
      )}
    </li>
  );
}
