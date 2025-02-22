import React from 'react';
import PieForm from './PieForm.jsx';
import LineForm from './LineForm.jsx';
import BarForm from './BarForm.jsx';
import HorizontalBarForm from './HorizontalBarForm.jsx';
import RadarForm from './RadarForm.jsx';
import BubbleForm from './BubbleForm.jsx';
import ScatterForm from './ScatterForm.jsx';


class ManualForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const type = this.props.displayData;

    if (type === 'pie') {
      return (<PieForm 
        POST={this.props.POST}
        PUT={this.props.PUT}
        chartData={this.props.chartData}
        handleHideManualForm={this.props.handleHideManualForm}
        editMode={this.props.editMode}
      />);
    } else if (type === 'line') {
      return (<LineForm
        POST={this.props.POST}
        PUT={this.props.PUT}
        chartData={this.props.chartData}
        handleHideManualForm={this.props.handleHideManualForm}
        editMode={this.props.editMode}
      />);
    } else if (type === 'bar') {
      return (<BarForm
        POST={this.props.POST}
        PUT={this.props.PUT}
        chartData={this.props.chartData}
        handleHideManualForm={this.props.handleHideManualForm}
        editMode={this.props.editMode}
      />);
    } else if (type === 'horizontalBar') {
      return (<HorizontalBarForm
        POST={this.props.POST}
        PUT={this.props.PUT}
        chartData={this.props.chartData}
        handleHideManualForm={this.props.handleHideManualForm}
        editMode={this.props.editMode}
      />);
    } else if (type === 'radar') {
      return (<RadarForm
        POST={this.props.POST}
        PUT={this.props.PUT}
        chartData={this.props.chartData}
        handleHideManualForm={this.props.handleHideManualForm}
        editMode={this.props.editMode}
      />);
    } else if (type === 'bubble') {
      return (<BubbleForm
        POST={this.props.POST}
        PUT={this.props.PUT}
        chartData={this.props.chartData}
        handleHideManualForm={this.props.handleHideManualForm}
        editMode={this.props.editMode}
      />);
    } else if (type === 'scatter') {
      return (<ScatterForm
        POST={this.props.POST}
        PUT={this.props.PUT}
        chartData={this.props.chartData}
        handleHideManualForm={this.props.handleHideManualForm}
        editMode={this.props.editMode}
      />);
    }
  }
}

export default ManualForm;