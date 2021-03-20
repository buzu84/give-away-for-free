import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import Spinner from "./Spinner";

class HomeThreeColumnsBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organizations: 0,
      collections: 0,
      bagsNo: 0,
      loading: true,
    };
  }

  componentDidMount() {
    if (this.props.firebase != null) {
      this.props.firebase.assemblies().once("value", (snapshot) => {
        const assemblyObject = snapshot.val();

        if (assemblyObject) {
          let noBags = 0;
          Object.values(assemblyObject).map(
            (element) => (noBags = noBags + parseInt(JSON.parse(element).bags))
          );
          this.setState({
            bagsNo: noBags,
            collections: Object.keys(assemblyObject).length,
            loading: false,
          });
        }
      });
    }

    if (this.props.firebase != null) {
      this.props.firebase.foundations().once("value", (snapshot) => {
        const foundationObject = snapshot.val();

        if (foundationObject) {
          this.setState({
            foundations: Object.keys(foundationObject).length,
            loading: false,
          });
        }
      });
    }
  }

  componentWillUnmount() {
    if (this.props.firebase != null) {
      this.props.firebase.assemblies().off();
      this.props.firebase.foundations().off();
    }
  }

  render() {
    const { bagsNo, foundations, collections, loading } = this.state;
    return (
      <section
        id="section1"
        className="columns info-section container"
        style={{ height: 400 }}
      >
        <div className="info-item">
          <div className="info-box">
            {loading ? (
              <Spinner />
            ) : (
              <>
                <h1 className="icon">{bagsNo}</h1>
                <h2>ODDANYCH WORKÓW</h2>
              </>
            )}
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              ullamcorper ante ut tellus sagittis, rhoncus elementum massa
              bibendum. Cras sed maximus orci.
            </p>
          </div>
          <div className="info-box">
            {loading ? (
              <Spinner />
            ) : (
              <>
                <h1 className="icon">{foundations}</h1>
                <h2>WSPARTYCH ORGANIZACJI</h2>
              </>
            )}
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              ullamcorper ante ut tellus sagittis, rhoncus elementum massa
              bibendum. Cras sed maximus orci.{" "}
            </p>
          </div>
          <div className="info-box">
            {loading ? (
              <Spinner />
            ) : (
              <>
                <h1 className="icon">{collections}</h1>
                <h2>ZORGANIZOWANYCH ZBIÓREK</h2>
              </>
            )}
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              ullamcorper ante ut tellus sagittis, rhoncus elementum massa
              bibendum. Cras sed maximus orci.
            </p>
          </div>
        </div>
      </section>
    );
  }
}

const HomeThreeColumns = withFirebase(HomeThreeColumnsBase);

export default HomeThreeColumns;
