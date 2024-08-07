import { Fragment } from 'react';
import { Cell, useGrid } from '../../store';

import styles from './GridSvg.module.scss';

type GridSvgProps = {
  width: number;
  height: number;
}

type CellTypes = '1';
const n = 20;

type CellTypeVariant = {
  width: number;
  height: number;
  rx: number;
  fill: string;  
}
const type1 = {
  width: 18,
  height: 18,
  rx:9,
  fill:"#292929",  
}

const types: Record<CellTypes, CellTypeVariant> = {
  "1": type1,
}

const getX = (cell: Cell, type: CellTypes) => {
  if (type === '1') {
    return cell.col * n  + 1;
  }
}

const getY = (cell: Cell, type: CellTypes) => {
  if (type === '1') {
    return cell.row * n  + 1;
  }
}

const getType = (cell: Cell, cells: Cell[][]): CellTypes => {
  return '1';
}

export const GridSvg = ({height, width}: GridSvgProps) => {
  const cells = useGrid(s => s.cells);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={styles.svg}
    >
      {/* <rect x="41" y="101" {...type1}/> */}
      {cells.map((c, i) => (
        <Fragment key={i}>
          {c.map(cell => {
            const type = getType(cell, cells);

            return (
              cell.isActive ? 
              <rect
              key={cell.id}
              x={getX(cell, type)}
              y={getY(cell, type)}
              {...types[type]}
              /> 
              : null
            )
          })}
        </Fragment>
      ))}
    </svg>
  );
}
