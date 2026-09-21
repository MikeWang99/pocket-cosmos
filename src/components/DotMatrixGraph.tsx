'use client';

import { DOT_MATRIX_GRID_SIZE, DOT_MATRIX_ROWS } from '../data/dotMatrixSeed';

const isCornerMarkerArea = (rowIndex: number, columnIndex: number) =>
  (rowIndex < 7 && columnIndex < 7) ||
  (rowIndex < 7 && columnIndex >= DOT_MATRIX_GRID_SIZE - 7) ||
  (rowIndex >= DOT_MATRIX_GRID_SIZE - 7 && columnIndex < 7);

const DOT_MATRIX_PATH = DOT_MATRIX_ROWS.flatMap((row, rowIndex) =>
  row.split('').flatMap((value, columnIndex) =>
    value === '1' && !isCornerMarkerArea(rowIndex, columnIndex)
      ? [`M${columnIndex + 0.14} ${rowIndex + 0.14}h0.72v0.72h-0.72z`]
      : [],
  ),
).join('');

const FinderMarker = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect width="7" height="7" rx="0.45" fill="currentColor" />
    <rect x="1" y="1" width="5" height="5" rx="0.25" fill="white" />
    <rect x="2" y="2" width="3" height="3" rx="0.2" fill="currentColor" />
  </g>
);

export function DotMatrixGraph() {
  return (
    <div aria-label="Dot matrix graph" className="relative mx-auto w-full max-w-[320px]">
      <div className="relative aspect-square w-full bg-white p-[10.8108%]">
        <div aria-hidden="true" className="relative h-full w-full bg-white text-black">
          <svg
            viewBox={`0 0 ${DOT_MATRIX_GRID_SIZE} ${DOT_MATRIX_GRID_SIZE}`}
            className="h-full w-full"
            role="presentation"
            shapeRendering="crispEdges"
          >
            <FinderMarker x={0} y={0} />
            <FinderMarker x={DOT_MATRIX_GRID_SIZE - 7} y={0} />
            <FinderMarker x={0} y={DOT_MATRIX_GRID_SIZE - 7} />
            <path d={DOT_MATRIX_PATH} fill="currentColor" />
          </svg>

          <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[25.9459%] w-[25.9459%] -translate-x-1/2 -translate-y-1/2 bg-white">
            <img
              src="/assets/mike-wang-portrait.jpg"
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
