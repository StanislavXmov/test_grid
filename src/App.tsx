import styles from './App.module.scss';
import { Grid } from './components/Grid/Grid';
import { GridSvg } from './components/GridSvg/GridSvg';

function App() {

  return (
    <div className={styles.app}>
      <Grid />
      <GridSvg width={200} height={200} />
    </div>
  );
}

export default App;
