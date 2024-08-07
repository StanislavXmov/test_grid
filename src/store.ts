import { create } from 'zustand';

export type Cell = {
  row: number;
  col: number;
  id: number;
  isActive: boolean;
}

interface GridStore {
  cells: Cell[][];
  setCells: (row: number, col: number) => void;
}

const n = 10;

const getCells = () => {
  const cells: Cell[][] = [];
  for (let i = 0; i < n; i++) {
    const cellsRow: Cell[] = [];
    for (let j = 0; j < n; j++) {
      cellsRow.push({
        row: i,
        col: j,
        id: i * n + j,
        isActive: false,
      });
    }
    cells.push(cellsRow);
  }
  return cells;
}

export const useGrid = create<GridStore>((set, get) => ({
  cells: getCells(),
  setCells: (row, col) => {
    const cells = [...get().cells];
    const cell = cells[row][col];
    cell.isActive = !cell.isActive;
    set({ cells });
  },
}));