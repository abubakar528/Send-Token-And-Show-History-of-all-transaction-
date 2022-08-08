import React, { useState } from "react";

function History() {
  const data = JSON.parse(localStorage.getItem('hash'))
  return (
    <>
    <div id="uper">
      <div id="in"><h3>Index</h3></div>
      <div id="hs"><h3>Hash</h3></div>
      <div id="st"><h3>Code</h3></div>
      <div id="st1"><h3>Status</h3></div>
    </div>
    {data ? data.map((item,index) => {

          return (
            <div id="his">
            <tr key={index}>
              <div id="index">{index+1}</div>
              <div id="hash">{item.hash}</div>
              <div id="status" >{item.status}</div>
              <div id="statusCode" style={{color:"green"}}><h5>{item.status==1 ? "Success" : "Failed"}</h5></div>
            </tr>
            </div>
          )
        }
        ) : null}
    </>
  );
}

export default History;