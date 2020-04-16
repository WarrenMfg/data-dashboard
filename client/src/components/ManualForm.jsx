import React from 'react';
import PieForm from './PieForm.jsx';
import LineForm from './LineForm.jsx';


class ManualForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const type = this.props.displayData;

    if (type === 'pie') {
      return <PieForm 
        POST={this.props.POST}
        handleHideManualForm={this.props.handleHideManualForm}
      />
    } else if (type === 'line') {
      return <LineForm
        POST={this.props.POST}
        handleHideManualForm={this.props.handleHideManualForm}
      />
    }
  }
}

export default ManualForm;