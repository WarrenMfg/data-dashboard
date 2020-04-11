import React from "react";


class SelectTemplateAndData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chart: ''
    };

    this.handleSelectChart = this.handleSelectChart.bind(this);
    this.handleDataButtons = this.handleDataButtons.bind(this);
  }

  // LIFECYCLE
  componentDidMount() {

  }


  // CLICK HANDLERS
  handleSelectChart(e) {
    const chart = e.target.value;
    const buttons = Array.from(document.getElementsByTagName('BUTTON'));

    if (chart === '') {
      buttons.forEach(button => button.disabled = true);
    } else {
      buttons.forEach(button => button.disabled = false);
    }

    this.props.handleDisplayData(chart);
    this.setState({ chart });
  }
  
  handleDataButtons(e) {
    const button = e.target.innerText;

    if (button === 'Automatically') {
      this.props.GET('automatically', this.state.chart);
    } else if (button === 'Manually') {
      console.log('display popup');
    }
  }

  


  // UI
  render() {
    return (
      <div className="SelectTemplateAndData">

        <label htmlFor="SelectTemplateAndData-chart">Select A Chart</label>
        <select id="SelectTemplateAndData-select" onChange={this.handleSelectChart}>
          <option defaultValue></option>
          <option value="pie">Pie chart</option>
          <option value="bar">Bar chart</option>
          <option value="line">Line chart</option>
          <option value="guage">Guage chart</option>
        </select>

        <section onClick={this.handleDataButtons}>
          <label htmlFor="SelectTemplateAndData-buttons">Generate New Data</label>
          <button disabled>Automatically</button> 
          <button disabled>Manually</button>
        </section>

      </div>
    );
  }
}

export default SelectTemplateAndData;
