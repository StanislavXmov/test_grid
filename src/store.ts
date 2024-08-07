import { create } from 'zustand';

export type CellTypes = '1' | '2' | '3' | '4';

export type Cell = {
  row: number;
  col: number;
  id: number;
  isActive: boolean;
  neighbor: number;
  type: CellTypes;
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
        neighbor: 0,
        type: '1',
      });
    }
    cells.push(cellsRow);
  }
  return cells;
}

const setTypeByNeighbor = (cell: Cell) => {
  if (cell.neighbor > 3) {
    cell.type = '4';
  } else if (cell.neighbor > 2) {
    cell.type = '3';
  } else if (cell.neighbor > 1) {
    cell.type = '2';
  } else {
    cell.type = '1';
  }
}

const setNeighbor = (cell: Cell, neighborCell: Cell) => {
  if (neighborCell && neighborCell.isActive) {
    if (cell.isActive) {
      cell.neighbor++;
      neighborCell.neighbor++;
    } else {
      cell.neighbor--;
      neighborCell.neighbor--;
    }
    
    setTypeByNeighbor(neighborCell);
  }
}

export const useGrid = create<GridStore>((set, get) => ({
  cells: getCells(),
  setCells: (row, col) => {
    const cells = [...get().cells];
    const cell = cells[row][col];
    cell.isActive = !cell.isActive;
    
    const nCell = cells[row - 1] && cells[row - 1][col];
    const sCell = cells[row + 1] && cells[row + 1][col];
    const eCell = cells[row][col - 1];
    const wCell = cells[row][col + 1];

    setNeighbor(cell, nCell);
    setNeighbor(cell, sCell);
    setNeighbor(cell, eCell);
    setNeighbor(cell, wCell);

    setTypeByNeighbor(cell);

    set({ cells });
  },
}));