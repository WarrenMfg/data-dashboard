import React from "react";
import Chart from 'chart.js';


class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chart: null
    };
  }

  // LIFECYCLE
  componentDidMount() {
    Chart.defaults.global.responsive = true;
    Chart.defaults.global.title.fontSize = 20;
    const { _id } = this.props.chart;
    const ctx = document.getElementById(_id).getContext('2d');
    const chart = new Chart(ctx, this.props.chart);
    this.setState({ chart });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.chart !== this.props.chart) {
      this.state.chart.destroy();

      const { _id } = this.props.chart;
      const ctx = document.getElementById(_id).getContext('2d');
      const chart = new Chart(ctx, this.props.chart);
      this.setState({ chart });
    }
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
