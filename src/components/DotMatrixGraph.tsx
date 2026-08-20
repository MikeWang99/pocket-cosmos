'use client';

import { DOT_MATRIX_GRID_SIZE, DOT_MATRIX_ROWS } from '../data/dotMatrixSeed';

const isCornerMarkerArea = (rowIndex: number, columnIndex: number) =>
  (rowIndex < 7 && columnIndex < 7) ||
  (rowIndex < 7 && columnIndex >= 30) ||
  (rowIndex >= 30 && columnIndex < 7);

const DOT_MATRIX_POINTS = DOT_MATRIX_ROWS.flatMap((row, rowIndex) =>
  row.split('').flatMap((value, columnIndex) => (
    value === '1' && !isCornerMarkerArea(rowIndex, columnIndex)
      ? [{
          key: `${rowIndex}-${columnIndex}`,
          left: `${((columnIndex + 0.5) / DOT_MATRIX_GRID_SIZE) * 100}%`,
          top: `${((rowIndex + 0.5) / DOT_MATRIX_GRID_SIZE) * 100}%`,
        }]
      : []
  )),
);

export function DotMatrixGraph() {
  return (
    <div
      aria-label="Dot matrix graph"
      className="relative mx-auto w-full max-w-[320px] rounded-[28px] bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.10)]"
    >
      <div
        className="relative aspect-square w-full bg-white p-[10.8108%]"
      >
        <div aria-hidden="true" className="relative h-full w-full bg-white">
          <div className="absolute left-0 top-0 h-[18.9189%] w-[18.9189%] rounded-[8%] bg-black before:absolute before:inset-[14.2857%] before:rounded-[5%] before:bg-white before:content-[''] after:absolute after:inset-[28.5714%] after:rounded-[4%] after:bg-black after:content-['']" />
          <div className="absolute right-0 top-0 h-[18.9189%] w-[18.9189%] rounded-[8%] bg-black before:absolute before:inset-[14.2857%] before:rounded-[5%] before:bg-white before:content-[''] after:absolute after:inset-[28.5714%] after:rounded-[4%] after:bg-black after:content-['']" />
          <div className="absolute bottom-0 left-0 h-[18.9189%] w-[18.9189%] rounded-[8%] bg-black before:absolute before:inset-[14.2857%] before:rounded-[5%] before:bg-white before:content-[''] after:absolute after:inset-[28.5714%] after:rounded-[4%] after:bg-black after:content-['']" />

          {DOT_MATRIX_POINTS.map((module) => (
            <span
              key={module.key}
              aria-hidden="true"
              className="absolute h-[1.8919%] w-[1.8919%] -translate-x-1/2 -translate-y-1/2 rounded-[22%] bg-black"
              style={{ left: module.left, top: module.top }}
            />
          ))}

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
