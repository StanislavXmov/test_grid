import { Fragment } from 'react';
import { Cell, CellTypes, useGrid } from '../../store';

import styles from './GridSvg.module.scss';

type GridSvgProps = {
  width: number;
  height: number;
}

const n = 20;
// const color = "#292929";
const color = "#f0f0f0";

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
  fill: color,  
}

const type2 = {
  width: 20,
  height: 20,
  rx:10,
  fill: color,  
}

const type3 = {
  width: 20,
  height: 20,
  rx:7,
  fill: color,  
}

const type4 = {
  width: 20,
  height: 20,
  rx:3,
  fill: color,  
}

const types: Record<CellTypes, CellTypeVariant> = {
  "1": type1,
  "2": type2,
  "3": type3,
  "4": type4,
}

const getX = (cell: Cell) => {
  if (cell.type === '1') {
    return cell.col * n  + 1;
  } else {
    return cell.col * n;
  }
}

const getY = (cell: Cell) => {
  if (cell.type === '1') {
    return cell.row * n  + 1;
  } else {
    return cell.row * n;
  }
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
            if (cell.isActive) {
              return (
                <rect
                  key={cell.id}
                  x={getX(cell)}
                  y={getY(cell)}
                  {...types[cell.type]}
                />
              );
            } else {
              return null;
            }
          })}
        </Fragment>
      ))}
    </svg>
  );
}

<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="20" height="20" rx="7" fill="black"/>
</svg>


