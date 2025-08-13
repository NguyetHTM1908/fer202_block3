import React, { useMemo, useState } from "react";
import { persons } from "./person";
import "./index.css";

/** Lấy danh sách skill duy nhất */
const allSkills = ["All", ...Array.from(new Set(persons.flatMap(p => p.skills)))];

export default function App() {
  // --- Section 1: List + sort A↔Z theo firstName ---
  const [nameSortAsc, setNameSortAsc] = useState(true);

  const listSortedByFirstName = useMemo(() => {
    const arr = [...persons];
    arr.sort((a, b) => {
      const x = a.firstName.localeCompare(b.firstName, undefined, { sensitivity: "base" });
      return nameSortAsc ? x : -x;
    });
    return arr;
  }, [nameSortAsc]);

  // --- Section 2: Lọc theo tuổi (min-max) + skill ---
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [skill, setSkill] = useState("All");

  const filteredByAgeAndSkill = useMemo(() => {
    return persons
      .filter(({ age }) => (minAge === "" || age >= Number(minAge)))
      .filter(({ age }) => (maxAge === "" || age <= Number(maxAge)))
      .filter(({ skills }) => (skill === "All" ? true : skills.includes(skill)));
  }, [minAge, maxAge, skill]);

  // --- Ranking skill bằng reduce ---
  const skillCount = useMemo(() => {
    const freq = persons.reduce((acc, { skills }) => {
      skills.forEach(s => { acc[s] = (acc[s] || 0) + 1; });
      return acc;
    }, {});
    // chuyển sang mảng để render có thứ tự
    const rows = Object.entries(freq).map(([s, c]) => ({ skill: s, count: c }));
    rows.sort((a, b) => b.count - a.count || a.skill.localeCompare(b.skill));
    return rows;
  }, []);
  const topCount = skillCount.length ? skillCount[0].count : 0;

  // --- Section 4: Search + sort đa tiêu chí ---
  const [q, setQ] = useState("");
  const multiSorted = useMemo(() => {
    const key = q.trim().toLowerCase();
    const list = persons.filter(({ firstName, lastName }) => {
      const full = `${firstName} ${lastName}`.toLowerCase();
      return full.includes(key);
    });
    // sort ưu tiên: isActive (true trước), age ↑, lastName A→Z
    list.sort((a, b) => {
      if (a.isActive !== b.isActive) return a.isActive ? -1 : 1;
      if (a.age !== b.age) return a.age - b.age;
      return a.lastName.localeCompare(b.lastName, undefined, { sensitivity: "base" });
    });
    return list;
  }, [q]);

  // --- Statistics bằng reduce ---
  const stats = useMemo(() => {
    const { total, ageSum, active } = persons.reduce(
      (acc, { age, isActive }) => {
        acc.total += 1;
        acc.ageSum += age;
        if (isActive) acc.active += 1;
        return acc;
      },
      { total: 0, ageSum: 0, active: 0 }
    );
    return {
      total,
      avgAge: total ? (ageSum / total).toFixed(1) : "0.0",
      active
    };
  }, []);

  return (
    <div className="wrap">
      <h1>Exercise 2 – Persons</h1>

      {/* ---------- Section 1: List + sort theo FirstName ---------- */}
      <section className="card">
        <div className="card-head">
          <h2>Danh sách (Full name, Age, City, Skills)</h2>
          <button onClick={() => setNameSortAsc(s => !s)}>
            Sort first name: {nameSortAsc ? "A → Z" : "Z → A"}
          </button>
        </div>
        <ul className="list">
          {listSortedByFirstName.map(({ id, firstName, lastName, age, city, skills, isActive }) => (
            <li key={id} className="row">
              <div className="grow">
                <div className="title">
                  {firstName} {lastName} {isActive && <span className="chip active">active</span>}
                </div>
                <div className="sub">
                  Age: {age} · City: {city} · Skills: {skills.join(", ")}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Section 2: Lọc theo tuổi + skill ---------- */}
      <section className="card">
        <h2>Lọc theo khoảng tuổi & skill</h2>
        <div className="controls">
          <label>Min:&nbsp;
            <input type="number" value={minAge} onChange={e => setMinAge(e.target.value)} placeholder="min"/>
          </label>
          <label>Max:&nbsp;
            <input type="number" value={maxAge} onChange={e => setMaxAge(e.target.value)} placeholder="max"/>
          </label>
          <label>Skill:&nbsp;
            <select value={skill} onChange={e => setSkill(e.target.value)}>
              {allSkills.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
          <button className="ghost" onClick={() => { setMinAge(""); setMaxAge(""); setSkill("All"); }}>
            Reset
          </button>
        </div>

        {filteredByAgeAndSkill.length === 0 ? (
          <div className="empty">No found.</div>
        ) : (
          <ul className="list">
            {filteredByAgeAndSkill.map(({ id, firstName, lastName, skills }) => (
              <li key={id} className="row">
                <div className="title">
                  {firstName} – {lastName} – {skill === "All" ? skills.join(", ") : skill}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ---------- Section 3: Bảng xếp hạng skill ---------- */}
      <section className="card">
        <h2>Bảng xếp hạng Skill</h2>
        <table className="table">
          <thead>
            <tr><th>Skill</th><th>Count</th></tr>
          </thead>
          <tbody>
            {skillCount.map(({ skill, count }) => (
              <tr key={skill} className={count === topCount ? "top1" : ""}>
                <td><strong>{skill}</strong></td>
                <td>{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ---------- Section 4: Search + sort đa tiêu chí ---------- */}
      <section className="card">
        <div className="card-head">
          <h2>Kết quả (Search + Sort đa tiêu chí)</h2>
          <input
            type="text"
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Tìm theo họ tên (ví dụ: 'Linh Nguyen')"
          />
        </div>
        {multiSorted.length === 0 ? (
          <div className="empty">No found.</div>
        ) : (
          <ul className="list">
            {multiSorted.map(({ id, firstName, lastName, age, isActive }) => (
              <li key={id} className="row">
                <div className="title">
                  {firstName} {lastName} {isActive && <span className="chip active">active</span>}
                </div>
                <div className="sub">Age: {age}</div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ---------- Statistics ---------- */}
      <section className="stats">
        <div className="stat">
          <div className="stat-label">Tổng người</div>
          <div className="stat-value">{stats.total}</div>
        </div>
        <div className="stat">
          <div className="stat-label">Tuổi trung bình</div>
          <div className="stat-value">{stats.avgAge}</div>
        </div>
        <div className="stat">
          <div className="stat-label">Số người active</div>
          <div className="stat-value">{stats.active}</div>
        </div>
      </section>
    </div>
  );
}
