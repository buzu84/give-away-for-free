import React from "react";
import RingLoader from "react-spinners/RingLoader";

const style = {
  display: "block",
  margin: "0 auto",
  borderColor: "red"
}

class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  render() {
    return (
      <div>
        <RingLoader
          style={style}
          size={150}
          color={"#123abc"}
          loading={this.state.loading}
        />
      </div>
    );
  }
}

export default Spinner;
