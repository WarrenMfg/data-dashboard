import React from "react";
import Chart from 'chart.js';


class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  // LIFECYCLE
  componentDidMount() {
    Chart.defaults.global.responsive = true;
    Chart.defaults.global.title.fontSize = 20;
    const { _id, type, data } = this.props.chart;
    const ctx = document.getElementById(_id).getContext('2d');
    new Chart(ctx, this.props.chart);
  }

  componentWillUnMount() {
    // const chart = document.getElementById(this.props._id);
    // chart.destroy();
  }

  // CLICK HANDLERS
  
  

  // UI
  render() {
    return (
      <div className="Canvas">
        <canvas id={this.props.chart._id}></canvas>
      </div>
    );
  }
}

export default Canvas;
