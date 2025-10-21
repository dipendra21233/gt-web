'use client'

import { theme } from '@/styles/theme'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table'
import React from 'react'

export type PremiumTableColumn<TData> = ColumnDef<TData> & {
  sticky?: 'left' | 'right' | false
  width?: number | string
  minWidth?: number
  maxWidth?: number
}

export interface PremiumDataTableProps<TData> {
  data: TData[]
  columns: PremiumTableColumn<TData>[]
  className?: string
  pageSize?: number
  maxHeight?: number | string
  loading?: boolean
  enableSorting?: boolean
  // enableFiltering?: boolean
  footer?: React.ReactNode
  enablePagination?: boolean
  onRowClick?: (row: TData) => void
}

export function PremiumDataTable<TData extends object>({
  data,
  columns,
  className,
  pageSize = 10,
  maxHeight = 500,
  loading = false,
  enableSorting = true,
  // enableFiltering = false,
  enablePagination = true,
  onRowClick,
  footer,
}: PremiumDataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  })

  // Palette from theme (orange-focused)
  const colors = (theme as any)?.colors ?? {}
  const palette = {
    primary: colors.primary_grenade ?? colors.orange_500 ?? '#EF9700',
    headerBg: colors.charcoal_gray ?? '#212529',
    headerText: '#ffffff',
    bodyText: colors.primary_text_dark ?? '#2b2b2b',
    subText: colors.grey_medium ?? '#85878a',
    hoverRowBg: 'rgba(239, 151, 0, 0.08)',
    border: colors.grey_300 ?? '#eeeeee',
    divider: colors.grey_300 ?? 'rgba(31, 41, 55, 0.12)',
    dividerAccent: (colors.orange_200 as string) ?? 'rgba(239, 151, 0, 0.18)',
  }

  // Auto-sticky first two columns unless explicitly disabled
  const enhancedColumns = React.useMemo(() => {
    return columns.map((col, idx) => {
      const stickyDefault = idx === 0 ? 'left' : false
      return {
        ...col,
        sticky: col.sticky === undefined ? stickyDefault : col.sticky,
      }
    })
  }, [columns])

  const table = useReactTable({
    data,
    columns: enhancedColumns as ColumnDef<TData, unknown>[],
    state: {
      sorting: enableSorting ? sorting : [],
      // columnFilters: enableFiltering ? columnFilters : [],
      columnVisibility,
      pagination: enablePagination
        ? pagination
        : { pageIndex: 0, pageSize: data.length },
    },
    onSortingChange: enableSorting ? setSorting : undefined,
    // onColumnFiltersChange: enableFiltering ? setColumnFilters : undefined,
    onPaginationChange: enablePagination ? setPagination : undefined,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    // getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
    getPaginationRowModel: enablePagination
      ? getPaginationRowModel()
      : undefined,
    debugTable: false,
  })

  const getStickyStyle = (
    columnIndex: number,
    sticky?: 'left' | 'right' | false
  ) => {
    if (!sticky) return {}

    // Compute cumulative left offset for left-sticky columns
    if (sticky === 'left') {
      let left = 0
      for (let i = 0; i < columnIndex; i++) {
        const col = enhancedColumns[i]
        if (col?.sticky === 'left') {
          const width = typeof col.width === 'number' ? col.width : 160
          left += width
        }
      }
      const isFirstSticky = columnIndex === 0
      return {
        position: 'sticky' as const,
        left: `${left}px`,
        zIndex: 3,
        background: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)',
        boxShadow: isFirstSticky ? 'none' : '2px 0 6px rgba(0,0,0,0.06)',
        borderRight: isFirstSticky ? 'none' : undefined,
      }
    }

    // Right-sticky could be extended similarly if needed
    return { position: 'sticky' as const, right: 0, zIndex: 2 }
  }

  return (
    <div
      className={`premium-table ${className ?? ''}`}
      role="region"
      aria-label="Data table"
    >
      {footer && footer}

      <div
        className="table-outer border rounded-xl overflow-hidden"
        style={{
          boxShadow:
            '0 20px 60px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)',
          background: '#ffffff',
          textWrap: 'nowrap',
        }}
      >
        <div
          className="table-scroll-wrapper"
          style={{ maxHeight, overflow: 'auto' }}
        >
          <table className="w-full" role="table">
            <thead className="sticky top-0 z-20" role="rowgroup">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  role="row"
                  className="border-b"
                  style={{
                    boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.06)',
                    backgroundColor: palette.headerBg,
                  }}
                >
                  {headerGroup.headers.map((header, columnIndex) => {
                    const ec = enhancedColumns[columnIndex]
                    const stickyStyle = getStickyStyle(columnIndex, ec?.sticky)
                    const width = ec?.width
                    const minWidth = ec?.minWidth ?? 140
                    const maxWidth = ec?.maxWidth

                    return (
                      <th
                        key={header.id}
                        role="columnheader"
                        aria-sort={
                          enableSorting
                            ? ((header.column.getIsSorted() as
                                | 'ascending'
                                | 'descending'
                                | 'none') ?? 'none')
                            : 'none'
                        }
                        className="px-5 py-3 text-center maison-16-normal border-r last:border-r-0"
                        style={{
                          ...stickyStyle,
                          width: width as number | string | undefined,
                          minWidth,
                          maxWidth,
                          color: palette.headerText,
                          background: 'none',
                          backgroundColor: palette.headerBg,
                        }}
                        onClick={
                          enableSorting
                            ? header.column.getToggleSortingHandler()
                            : undefined
                        }
                      >
                        {header.isPlaceholder ? null : (
                          <div className="flex items-center justify-center gap-2 select-none w-full">
                            <span>
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </span>
                            {enableSorting && (
                              <span
                                className="text-[10px]"
                                style={{ color: palette.primary }}
                              >
                                {header.column.getIsSorted() === 'asc'
                                  ? '▲'
                                  : header.column.getIsSorted() === 'desc'
                                    ? '▼'
                                    : '⇅'}
                              </span>
                            )}
                          </div>
                        )}
                      </th>
                    )
                  })}
                </tr>
              ))}
            </thead>

            <tbody role="rowgroup">
              {loading ? (
                <tr role="row">
                  <td
                    role="cell"
                    colSpan={enhancedColumns.length}
                    className="px-6 py-16 text-center text-slate-500"
                  >
                    Loading…
                  </td>
                </tr>
              ) : table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row, rowIndex) => (
                  <tr
                    key={row.id}
                    role="row"
                    className={`transition-colors ${
                      rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'
                    } `}
                    onClick={() => onRowClick?.(row.original)}
                  >
                    {row.getVisibleCells().map((cell, columnIndex) => {
                      const ec = enhancedColumns[columnIndex]
                      const stickyStyle = getStickyStyle(
                        columnIndex,
                        ec?.sticky
                      )
                      const width = ec?.width
                      const minWidth = ec?.minWidth ?? 140
                      const maxWidth = ec?.maxWidth

                      return (
                        <td
                          key={cell.id}
                          role="cell"
                          className="p-[16px] maison-16-normal whitespace-nowrap border-r last:border-r-0 text-center"
                          style={{
                            ...stickyStyle,
                            width: width as number | string | undefined,
                            minWidth,
                            maxWidth,
                            color: palette.bodyText,
                            background:
                              stickyStyle &&
                              (ec?.sticky === 'left' || ec?.sticky === 'right')
                                ? 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)'
                                : undefined,
                            boxShadow: columnIndex === 0 ? 'none' : undefined,
                            borderRight: columnIndex === 0 ? 'none' : undefined,
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))
              ) : (
                <tr role="row">
                  <td
                    role="cell"
                    colSpan={enhancedColumns.length}
                    className="px-6 py-16 text-center text-slate-500"
                  >
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {enablePagination && (
          <div className="flex items-center justify-between px-4 py-3 border-t bg-white/70 backdrop-blur">
            <div className="text-sm text-slate-600">
              Page {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()} — {table.getFilteredRowModel().rows.length}{' '}
              results
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="px-3 py-2 text-sm rounded-md border hover:shadow pagination-btn"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                aria-label="First page"
              >
                First
              </button>
              <button
                type="button"
                className="px-3 py-2 text-sm rounded-md border hover:shadow pagination-btn"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                aria-label="Previous page"
              >
                Prev
              </button>
              <div className="flex items-center gap-1 text-sm">
                <span>Page</span>
                <input
                  className="w-16 px-2 py-1 text-center border rounded-md"
                  type="number"
                  min={1}
                  max={table.getPageCount()}
                  value={table.getState().pagination.pageIndex + 1}
                  onChange={(e) => {
                    const next = e.target.value ? Number(e.target.value) - 1 : 0
                    table.setPageIndex(next)
                  }}
                  aria-label="Page number"
                />
                <span>of {table.getPageCount()}</span>
              </div>
              <button
                type="button"
                className="px-3 py-2 text-sm rounded-md border hover:shadow pagination-btn"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                aria-label="Next page"
              >
                Next
              </button>
              <button
                type="button"
                className="px-3 py-2 text-sm rounded-md border hover:shadow pagination-btn"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                aria-label="Last page"
              >
                Last
              </button>
              <select
                className="ml-2 px-2 py-1 text-sm border rounded-md"
                value={table.getState().pagination.pageSize}
                onChange={(e) => table.setPageSize(Number(e.target.value))}
                aria-label="Rows per page"
              >
                {[10, 25, 50, 100].map((size) => (
                  <option key={size} value={size}>
                    {size} / page
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .premium-table :global(table) {
          border-collapse: separate;
          border-spacing: 0;
        }
        .premium-table :global(thead th) {
          border-right: 1px solid ${palette.dividerAccent};
        }
        .premium-table :global(tbody td) {
          border-right: 1px solid ${palette.dividerAccent};
          border-bottom: 1px solid ${palette.divider};
        }
        .premium-table :global(tr) {
          border-bottom: 0;
        }
        .premium-table :global(thead th[style*='position: sticky']) {
          box-shadow:
            inset 0 -1px 0 rgba(0, 0, 0, 0.06),
            0 2px 8px rgba(0, 0, 0, 0.04);
        }
        .premium-table :global(td[style*='position: sticky']),
        .premium-table :global(th[style*='position: sticky']) {
          /* Edge highlight to hint elevation */
          box-shadow: 2px 0 6px rgba(0, 0, 0, 0.06);
        }
        .table-scroll-wrapper {
          overflow: auto;
          /* Enable horizontal scroll for many columns */
          width: 100%;
          /* Hide scrollbar but keep scroll */
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }
        .table-scroll-wrapper::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
          width: 0;
          height: 0;
        }
        .premium-table :global(tbody tr:hover td) {
          background: ${palette.hoverRowBg};
        }
        .premium-table :global(.pagination-btn) {
          color: ${palette.primary};
          border-color: ${palette.border};
          background: #ffffff;
          transition:
            background 0.15s ease,
            color 0.15s ease,
            box-shadow 0.15s ease;
        }
        .premium-table :global(.pagination-btn:hover) {
          background: ${palette.primary};
          color: #ffffff;
        }
        .premium-table :global(.pagination-btn:disabled) {
          opacity: 0.5;
          cursor: not-allowed;
          background: #f7f7f7;
          color: ${palette.subText};
        }
      `}</style>
    </div>
  )
}

export default PremiumDataTable
