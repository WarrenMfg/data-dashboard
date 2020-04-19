import React from "react";
import ManualForm from './ManualForm.jsx';

class SelectTemplateAndData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chart: '',
      manualForm: false
    };

    this.handleSelectChart = this.handleSelectChart.bind(this);
    this.handleDataButtons = this.handleDataButtons.bind(this);
    this.handleHideManualForm = this.handleHideManualForm.bind(this);
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
      this.setState({ chart, manualForm: false });
    } else {
      if (this.state.manualForm) {
        this.setState({ chart });
      } else {
        this.setState({ chart });
        buttons.forEach(button => button.disabled = false);
      }
    }

    this.props.handleDisplayData(chart);
  }
  
  handleDataButtons(e) {
    const button = e.target.innerText;

    if (button === 'Automatically') {
      this.props.POST({}, 'automatically', this.state.chart);

    } else if (button === 'Manually') {
      const buttons = Array.from(document.getElementsByTagName('BUTTON'));
      buttons.forEach(button => button.disabled = true);
      this.setState({ manualForm: true });
    }
  }

  handleHideManualForm() {
    const buttons = Array.from(document.getElementsByTagName('BUTTON'));
    buttons.forEach(button => button.disabled = false);
    this.setState({ manualForm: false });
  }


  // UI
  render() {
    return (
      <div className="SelectTemplateAndData">

        <label htmlFor="SelectTemplateAndData-chart">Select A Chart</label>
        <select id="SelectTemplateAndData-select" onChange={this.handleSelectChart}>
          <option value=""></option>
          <option value="pie">Pie</option>
          <option value="line">Line</option>
          <option value="bar">Vertical Bar</option>
          <option value="horizontalBar">Horizontal Bar</option>
          <option value="radar">Radar</option>
          <option value="bubble">Bubble</option>
          <option value="scatter">Scatter</option>
        </select>

        <section onClick={this.handleDataButtons}>
          <label htmlFor="SelectTemplateAndData-buttons">Generate New Data</label>
          <div id="buttonContainer">
            <button type="button" disabled>Automatically</button> 
            <button type="button" disabled>Manually</button>
          </div>
        </section>

        {
          this.state.manualForm && 
            <ManualForm 
              displayData={this.props.displayData} 
              POST={this.props.POST}
              handleHideManualForm={this.handleHideManualForm}
              editMode={false}
            />
        }

      </div>
    );
  }
}

export default SelectTemplateAndData;
