import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import styles from './app.module.css';
import Login from './components/login/login';
import Maker from './components/maker/maker';

function App({authService}) {
  return (
    <div class={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login authService={authService}/>}>
            {/* <Login authService={authService} /> */}
          </Route>
          <Route path="/maker" element={<Maker authService={authService}/>}>
            {/* <Maker /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
