import React from "react";



class DisplaySelected extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.handleEdit = this.handleEdit.bind(this);
  }

  // LIFECYCLE
  componentDidMount() {

  }


  // CLICK HANDLERS
  handleEdit(e) {
    e.stopPropagation();
    this.props.handleEnableEditMode(this.props.chart);
  }

  // UI
  render() {
    const { chart } = this.props;

    return (
      <div 
        className="DisplaySelected"
        onClick={this.handleEdit}
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

export default DisplaySelected;
