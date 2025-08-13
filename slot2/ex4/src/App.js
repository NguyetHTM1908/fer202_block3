import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // Data
  const courses = ["HTML", "CSS", "JavaScript", "React"];
  const people = [
    { name: 'Jack', age: 50 },
    { name: 'Michael', age: 9 },
    { name: 'John', age: 40 },
    { name: 'Ann', age: 19 },
    { name: 'Elisabeth', age: 16 }
  ];

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

  const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];
  const person = { name: "Costas", address: { street: "Lalaland 12" } };

  // 1. Mảng people
  const firstTeen = people.find(p => p.age >= 10 && p.age <= 20);
  const allTeens = people.filter(p => p.age >= 10 && p.age <= 20);
  const allAreTeens = people.every(p => p.age >= 10 && p.age <= 20);
  const anyTeen = people.some(p => p.age >= 10 && p.age <= 20);

  // 2. Mảng array
  const array = [1, 2, 3, 4];
  const sumArray = array.reduce((acc, val) => acc + val, 0);
  const productArray = array.reduce((acc, val) => acc * val, 1);

  // 3. Companies + ages
  const retailCompanies = companies
    .filter(c => c.category === "Retail")
    .map(c => ({ ...c, start: c.start + 1 }));
  const sortedCompanies = [...companies].sort((a, b) => a.end - b.end);
  const sortedAgesDesc = [...ages].sort((a, b) => b - a);
  const sumAges = ages.reduce((acc, age) => acc + age, 0);

  // 4. Object destructuring
  const { name, category } = companies[0];
  const newObj = {
    name,
    category,
    print() { console.log(this.name); }
  };

  const sumArgs = (...nums) => nums.reduce((a, b) => a + b, 0);
  const collectItems = (...args) => args.flat();
  const { address: { street } } = person;

  let counter = (() => {
    let count = 0;
    return () => count++;
  })();

  function parseQuery(url) {
    const query = url.split('?')[1];
    return Object.fromEntries(new URLSearchParams(query));
  }

  function randomNumberPromise() {
    return new Promise((resolve, reject) => {
      const num = Math.floor(Math.random() * 10) + 1;
      if (num > 5) {
        resolve(num);
      } else {
        reject("Error");
      }
    });
  }

  // Chạy thử Promise
  randomNumberPromise()
    .then(num => console.log("Number:", num))
    .catch(err => console.error(err));

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/">My Website</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active"><a className="nav-link" href="/">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="/about">About</a></li>
            <li className="nav-item"><a className="nav-link" href="/courses">Courses</a></li>
          </ul>
        </div>
      </nav>

      {/* Courses */}
      <h2>List of Courses</h2>
      <ul>
        {courses.map((course, index) => <li key={index}>{course}</li>)}
      </ul>

      {/* People results */}
      <h3>First Teenager: {firstTeen ? firstTeen.name : "None"}</h3>
      <h3>All Teenagers: {allTeens.map(p => p.name).join(", ")}</h3>
      <p>All are teenagers? {allAreTeens.toString()}</p>
      <p>Any teenager? {anyTeen.toString()}</p>

      {/* Array reduce */}
      <p>Sum: {sumArray}</p>
      <p>Product: {productArray}</p>

      {/* Retail companies */}
      <h3>Retail Companies + start incremented</h3>
      {retailCompanies.map((c, i) => (
        <div key={i}>
          <p>{c.name}</p>
          <p>{c.category}</p>
          <p>{c.start}</p>
          <p>{c.end}</p>
        </div>
      ))}

      {/* Others */}
      <p>Sorted by end date: {sortedCompanies.map(c => c.name).join(", ")}</p>
      <p>Sorted ages desc: {sortedAgesDesc.join(", ")}</p>
      <p>Sum ages: {sumAges}</p>
      <p>Street: {street}</p>
      <p>Counter test: {counter()}, {counter()}, {counter()}</p>
      <p>Parse URL: {JSON.stringify(parseQuery("https://example.com?name=John&age=30"))}</p>
      <p>Sum args (1,2,3): {sumArgs(1, 2, 3)}</p>
      <p>Collect items: {collectItems(1, [2, 3], 4).join(", ")}</p>
    </div>
  );
}

export default App;

