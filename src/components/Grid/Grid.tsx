import { Fragment, MouseEvent } from 'react';
import { useGrid } from '../../store';
import styles from './Grid.module.scss';


export const Grid = () => {
  const cells = useGrid(s => s.cells);
  const setCells = useGrid(s => s.setCells);
  
  const handler = (e: MouseEvent) => {
    
    if (e.target instanceof HTMLDivElement && e.target.dataset.cell) {
      const row = e.target.dataset.row;
      const col = e.target.dataset.col;
      if (row && col) {
        setCells(+row, +col);
      }
    }

  }

  return (
    <div
      className={styles.grid}
      onClick={handler}
    >
      {/* <div className={styles.cell}></div> */}
      {cells.map((c, i) => (
        <Fragment key={i}>
          {c.map(cell => (
            <div
              key={cell.id}
              className={`${styles.cell} ${cell.isActive ? styles.active: ''}`}
              data-cell={true}
              data-col={cell.col}
              data-row={cell.row}
            />
              
          ))}
        </Fragment>
      ))}
    </div>
  );
}
