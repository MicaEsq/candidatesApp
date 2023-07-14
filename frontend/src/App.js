import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import TableCandidates from './components/tableCandidates';
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={
              <>
                <Navbar></Navbar>
                <TableCandidates></TableCandidates>
              </>
          } />
        <Route path="/newCandidate" element={
            <>
              <Navbar></Navbar>
            </>
        } />
      </Routes>
    </div>
  );
}
