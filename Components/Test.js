import React, { useState, useEffect } from "react";

function Test() {
  const [choice, setChoice] = useState({
    sugar: [],
  });
  const handleChange = (e) => {
    const { value, checked } = e.target;
    const { sugar } = choice;
    console.log(`${value} is ${checked}`);
    if (checked) {
      setChoice({
        sugar: [value],
      });
    } else {
      setChoice({
        sugar: sugar.filter((e) => e !== value),
      });
    }
  };
  return (
    <div>
      <form action="">
        <div className="form-check m-3">
          <input
            className="form-check-input"
            type="checkbox"
            name="languages"
            value="Javascript"
            id="flexCheckDefault"
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Javascript
          </label>
        </div>
        <div className="form-check m-3">
          <input
            className="form-check-input"
            type="checkbox"
            name="languages"
            value="Python"
            id="flexCheckDefault"
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Python
          </label>
        </div>
      </form>
    </div>
  );
}

export default Test;
