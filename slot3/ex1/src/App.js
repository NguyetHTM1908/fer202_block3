import React, { useMemo, useState } from "react";
import "./index.css";

const companies = [
  { name: "Company One", category: "Finance", start: 1981, end: 2004 },
  { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
  { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
  { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
  { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
  { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
  { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
  { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
  { name: "Company Nine", category: "Retail", start: 1981, end: 1989 }
];

const categories = ["All", ...Array.from(new Set(companies.map(c => c.category)))];

export default function App() {
  const [q, setQ] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [sortBy, setSortBy] = useState("start-asc");
  const [cat, setCat] = useState("All");
  const [fromYear, setFromYear] = useState("");
  const [toYear, setToYear] = useState("");

  const onSearch = () => setSearchKey(q.trim());

  const view = useMemo(() => {
    let list = [...companies];

    // 1) Lọc theo tên (đã bấm Tìm)
    if (searchKey) {
      const k = searchKey.toLowerCase();
      list = list.filter(c => c.name.toLowerCase().includes(k));
    }

    // 2) Lọc theo Category
    if (cat !== "All") list = list.filter(c => c.category === cat);

    // 3) Lọc theo khoảng năm: start >= from và end <= to
    const from = fromYear !== "" ? Number(fromYear) : null;
    const to = toYear !== "" ? Number(toYear) : null;

    list = list.filter(c => {
      if (from !== null && c.start < from) return false;
      if (to !== null && c.end > to) return false;
      return true;
    });

    // 4) Sắp xếp theo start ↑/↓
    list.sort((a, b) => {
      if (sortBy === "start-asc") return a.start - b.start;
      if (sortBy === "start-desc") return b.start - a.start;
      return 0;
    });

    return list;
  }, [searchKey, sortBy, cat, fromYear, toYear]);

  return (
    <div className="container">
      <h1>Company List</h1>

      <div className="controls">
        <div className="row">
          <input
            type="text"
            placeholder="Nhập tên công ty..."
            value={q}
            onChange={e => setQ(e.target.value)}
          />
          <button onClick={onSearch}>Tìm</button>
        </div>

        <div className="row">
          <label>
            Sắp xếp:&nbsp;
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="start-asc">Start year ↑</option>
              <option value="start-desc">Start year ↓</option>
            </select>
          </label>

          <label>
            Category:&nbsp;
            <select value={cat} onChange={e => setCat(e.target.value)}>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>

          <label>
            Start từ:&nbsp;
            <input
              type="number"
              placeholder="1980"
              value={fromYear}
              onChange={e => setFromYear(e.target.value)}
              className="year"
            />
          </label>
          <label>
            đến:&nbsp;
            <input
              type="number"
              placeholder="2016"
              value={toYear}
              onChange={e => setToYear(e.target.value)}
              className="year"
            />
          </label>
          <button
            className="ghost"
            onClick={() => {
              setQ(""); setSearchKey("");
              setCat("All"); setSortBy("start-asc");
              setFromYear(""); setToYear("");
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {view.length === 0 ? (
        <div className="empty">No result</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Tên công ty</th>
              <th>Category</th>
              <th>Start</th>
              <th>End</th>
              <th>Duration (năm)</th>
            </tr>
          </thead>
          <tbody>
            {view.map((c, i) => (
              <tr key={c.name}>
                <td>{i + 1}</td>
                <td>{c.name}</td>
                <td><span className={`badge ${c.category.toLowerCase()}`}>{c.category}</span></td>
                <td>{c.start}</td>
                <td>{c.end}</td>
                <td>{c.end - c.start}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
