import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import TableCandidates from './components/tableCandidates';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/">
          <Route path="/candidates" element={
              <>
                <div><nav><ul><li><Link to="/">Home</Link></li><li><Link to="/candidates">Candidates</Link></li></ul></nav><hr /><Outlet /></div>
                <TableCandidates></TableCandidates>
              </>
          } />
        </Route>
      </Routes>
    </div>
  );
}
