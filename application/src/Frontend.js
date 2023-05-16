import React, { Component } from "react";
import { useState, useEffect } from "react";

function Frontend(props) {
  const [item1, setItem1] = useState("");
  const [item2, setItem2] = useState("");
  const [item3, setItem3] = useState("");
  const [item4, setItem4] = useState("");
  const [item5, setItem5] = useState("");
  const [item6, setItem6] = useState("");
  const [item7, setItem7] = useState("");

  console.log(props);
  return (
    <div
      style={{
        backgroundImage: `url(${props.background})`,
        height: "100vh",
        width: "100vw",
        fontSize: "50px",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          boxShadow: "-1px 2px 4px 0px",
          position: "relative",
          height: "auto",
          width: "300px",
          borderRadius: "25px",
          padding: "20px 20px 20px 20px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <form style={{ display: "grid", fontSize: "30px" }}>
          <label>
            A:
            <input type="text" name="name" />
          </label>
          <label>
            B:
            <input type="text" name="name" />
          </label>
          <label>
            C:
            <input type="text" name="name" />
          </label>
          <label>
            D:
            <input type="text" name="name" />
          </label>
          <label>
            E:
            <input type="text" name="name" />
          </label>
          <label>
            F:
            <input type="text" name="name" />
          </label>
          <label>
            G:
            <input type="text" name="name" />
          </label>

          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Frontend;
