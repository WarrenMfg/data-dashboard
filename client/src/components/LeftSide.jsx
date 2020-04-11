import React from "react";
import SelectTemplateAndData from './SelectTemplateAndData.jsx';
import DisplayData from './DisplayData.jsx';


class LeftSide extends React.Component {
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
    return (
      <div className="LeftSide">
        <section>
          <SelectTemplateAndData 
            GET={this.props.GET} 
            handleDisplayData={this.props.handleDisplayData}
          />
        </section>

        <section className="LeftSide-data" onClick={this.props.handleSelectedCharts}>
          {this.props.displayCharts.map(chart => {
            return <DisplayData 
              key={chart._id} 
              chart={chart} 
              selectedCharts={this.props.selectedCharts}
            />
          })}
        </section>
      </div>
    );
  }
}

export default LeftSide;
