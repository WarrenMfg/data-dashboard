import React from "react";



class DisplaySelected extends React.Component {
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
    const { chart } = this.props;

    return (
      <div 
        className="DisplaySelected"
        // onClick={this.handleChangeSecletedState}
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
