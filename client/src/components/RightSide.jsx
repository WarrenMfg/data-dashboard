import React from "react";
import Chart from './Chart.jsx';


class RightSide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  // LIFECYCLE
  componentDidMount() {

  }


  // CLICK HANDLERS
  
  

  // UI
  render() {
    const { dashboardData } = this.props;

    return (
      <div className="RightSide">
        {dashboardData.map(chart => <Chart key={chart._id} chart={chart} />)}
      </div>
    );
  }
}

export default RightSide;
