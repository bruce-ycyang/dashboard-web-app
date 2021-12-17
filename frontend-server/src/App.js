import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./component/Layout";
import Dashboard from "./page/Dashboard";
import Arbitrage from "./page/Arbitrage";
import GridTrading from "./page/GridTrading";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" caseSensitive={false} element={<Dashboard />} />
          <Route path="/arbitrage" caseSensitive={false} element={<Arbitrage />} />
          <Route path="/gridTrading" caseSensitive={false} element={<GridTrading />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
