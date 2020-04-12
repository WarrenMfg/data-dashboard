import React from "react";



class DisplayData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };

    this.handleChangeSeletedState = this.handleChangeSeletedState.bind(this);
  }

  // LIFECYCLE
  componentDidMount() {
    const { selectedCharts, chart } = this.props;
    if (selectedCharts && selectedCharts.includes(chart._id)) {
      this.setState({ selected: true });
    }
  }


  // CLICK HANDLERS
  handleChangeSeletedState(e) {
    this.setState({ selected: !this.state.selected });
  }
  

  // UI
  render() {
    const { chart } = this.props;

    return (
      <div 
        className={`DisplayData ${this.state.selected ? 'DisplayData-selected' : ''}`}
        onClick={this.handleChangeSeletedState}
      >

        <p 
          data-id={chart._id}
          data-type={chart.type}
        >
          {chart.options.title.text}
        </p>

      </div>
    );
  }
}

export default DisplayData;
