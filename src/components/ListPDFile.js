import React, { useState, useEffect, useCallback } from "react";
import { CallData } from "../apiCall/call";
const ListPDF = () => {
  const [getData, setData] = useState([]);
  const loadData = useCallback(async e => {
    const url = "pdfList";
    const dataget = await CallData(url);
    setData(dataget);
    console.log(dataget);
  }, []);
  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="container">
      <h1>List PDF-s</h1>
      {getData
        ? getData.map((ar, i) => {
            return (
              <ul key={i}>
                <li
                  onClick={() => {
                    let blob = new Blob([ar.pdffile], {
                      type: `${ar.pdffile.type}`
                    });
                    window.location = URL.createObjectURL(blob);
                  }}
                >
                  {ar.pdffile}
                </li>
              </ul>
            );
          })
        : null}
    </div>
  );
};
export default ListPDF;
