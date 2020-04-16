import React from "react";
import SelectTemplateAndData from './SelectTemplateAndData.jsx';
import DisplayData from './DisplayData.jsx';
import DisplaySelected from './DisplaySelected.jsx';


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
    const { POST, handleDisplayData, handleSelectedCharts, displayCharts, selectedCharts, displayData, dashboardData } = this.props;
    return (
      <div className="LeftSide">

        <section>
          <SelectTemplateAndData 
            POST={POST} 
            handleDisplayData={handleDisplayData}
            displayData={displayData}
          />
        </section>

        <section className="LeftSide-data" onClick={handleSelectedCharts}>
          {
            displayData !== '' ? 
            displayCharts.map(chart => {
              return <DisplayData 
                key={chart._id} 
                chart={chart} 
                selectedCharts={selectedCharts}
                displayData={displayData}
              />
            }) :
            dashboardData.map(chart => {
              return <DisplaySelected 
                key={chart._id} 
                chart={chart} 
              />
            })
          }
        </section>

      </div>
    );
  }
}

export default LeftSide;
