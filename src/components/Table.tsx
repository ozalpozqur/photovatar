import { cn } from "@/helpers";

interface Col {
  colName: string;
  className?: string;
}
interface TableProps {
  cols: Col[];
  rows: object[];
}
export default function Table({ rows, cols }: TableProps) {
  return (
    <div className="bg-red-500 w-ful p-2 overflow-scroll rounded-lg border border-gray-200">
      <table className="divide-y w-full divide-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            {cols.map((col, index) => (
              <th
                key={index}
                className={cn(
                  "whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900",
                  col.className
                )}
              >
                {col.colName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {rows.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, index) => (
                <td
                  key={index}
                  className={cn(
                    "px-4 py-2 font-medium text-gray-900",
                    index === 0 ? "w-fit" : "whitespace-nowrap"
                  )}
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
