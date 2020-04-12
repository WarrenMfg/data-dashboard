import React from "react";
import Canvas from './Canvas.jsx';


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
        {dashboardData.map(chart => <Canvas key={chart._id} chart={chart} />)}
      </div>
    );
  }
}

export default RightSide;
