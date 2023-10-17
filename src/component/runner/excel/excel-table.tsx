import { useReactTable, createColumnHelper, getCoreRowModel, flexRender, ColumnDef } from '@tanstack/react-table'
import { useState, useEffect } from 'react'

export default function ExcelTable() {

  const productLetters = (args: IProductLetters) => {
    const defaultArgs = {
      prefix: '',
    }
    args = { ...defaultArgs, ...args }

    if (args.numLoop < 1) {
      args.result.push(`${args.prefix}`);
      return;
    }
    for (let l of args.target) {
      productLetters({
        target: args.target,
        result: args.result,
        numLoop: args.numLoop - 1,
        prefix: `${args.prefix}${l}`,
        lenResult: args.lenResult,
      })

      if (args.lenResult && args.result.length >= args.lenResult) {
        return;
      }
    }
  }

  const getColKeys = (numCols: number) => {
    const result: string[] = [];
    const alphabets = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    for (let i = 1; i < Infinity; i++) {
      const powed = Math.pow(alphabets.length, i);
      productLetters(
        {
          target: alphabets,
          result: result,
          numLoop: i,
          lenResult: numCols,
        });

      if (numCols < powed) {
        // console.log('powed', powed);
        // console.log('i', i);
        break;
      }
    }
    // console.log('result', result);
    return result;
  }

  const colKeys = getColKeys(100);

  const defaultData: IExcelTable[] = [
    {
      "A": "1",
      "B": "2",
      "C": "4",
    },
    {
      "A": "3",
      "B": "6",
      "C": "9",
    },
  ];

  // Give our default column cell renderer editing superpowers!
  const defaultColumn: Partial<ColumnDef<IExcelTable>> = {
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
      const initialValue = getValue()
      // We need to keep and update the state of the cell normally
      const [value, setValue] = useState(initialValue)

      // If the initialValue is changed external, sync it up with our state
      useEffect(() => {
        setValue(initialValue)
      }, [initialValue])

      return (
        <input
          value={value as string}
          onChange={e => setValue(e.target.value)}
        />
      )
    },
  }
  const columnHelper = createColumnHelper<IExcelTable>();
  const columns = colKeys.map(colKey => (
    columnHelper.accessor(colKey, {
      footer: info => info.column.id,
    })
  ))

  const [data, setData] = useState(() => [...defaultData])
  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
  })

  useEffect(() => {
    console.log('table.getHeaderGroups()', table.getHeaderGroups());
    console.log('table.getRowModel().rows', table.getRowModel().rows);
  }, [])

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

}
