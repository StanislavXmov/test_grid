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

    if (nCell && nCell.isActive) {
      if (cell.isActive) {
        cell.neighbor++;
        nCell.neighbor++;
      } else {
        cell.neighbor--;
        nCell.neighbor--;
      }
      
      setTypeByNeighbor(nCell);
    }

    if (sCell && sCell.isActive) {
      if (cell.isActive) {
        cell.neighbor++;
        sCell.neighbor++;
      } else {
        cell.neighbor--;
        sCell.neighbor--;
      }
      
      setTypeByNeighbor(sCell);
    }

    if (eCell && eCell.isActive) {
      if (cell.isActive) {
        cell.neighbor++;
        eCell.neighbor++;
      } else {
        cell.neighbor--;
        eCell.neighbor--;
      }
      
      setTypeByNeighbor(eCell);
    }

    if (wCell && wCell.isActive) {
      if (cell.isActive) {
        cell.neighbor++;
        wCell.neighbor++;
      } else {
        cell.neighbor--;
        wCell.neighbor--;
      }
      
      setTypeByNeighbor(wCell);
    }

    setTypeByNeighbor(cell);

    set({ cells });
  },
}));