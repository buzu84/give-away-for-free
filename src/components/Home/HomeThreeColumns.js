// import React from "react";
//
// const HomeThreeColumns = () => {
//   return (
//       <h1 id="section1" className="columns" style={{height: 400}}>3 columns</h1>
//   );
// }
//
// export default HomeThreeColumns;
import React from "react";



const HomeThreeColumns = () => {
  return (
    <section id="section1" className="columns info-section container" style={{height: 400}}>
      <div className="info-item">
        <div className="info-box">
          <h1 className="icon">10</h1>
          <h2>ODDANYCH WORKÓW</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ullamcorper ante ut tellus sagittis, rhoncus elementum massa bibendum. Cras sed maximus orci.
          </p>
        </div>
        <div className="info-box">
          <h1 className="icon">5</h1>
          <h2>WSPARTYCH ORGANIZACJI</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ullamcorper ante ut tellus sagittis, rhoncus elementum massa bibendum. Cras sed maximus orci.           </p>
        </div>
        <div className="info-box">
          <h1 className="icon">7</h1>
          <h2>ZORGANIZOWANYCH ZBIÓREK</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ullamcorper ante ut tellus sagittis, rhoncus elementum massa bibendum. Cras sed maximus orci.
          </p>
        </div>
      </div>
    </section>
  );
}

export default HomeThreeColumns;
