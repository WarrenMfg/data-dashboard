import React from "react";
import SelectTemplateAndData from './SelectTemplateAndData.jsx';
import DisplayData from './DisplayData.jsx';
import DisplaySelected from './DisplaySelected.jsx';
import ManualForm from './ManualForm.jsx';


class LeftSide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      editModeChart: null
    };

    this.handleEnableEditMode = this.handleEnableEditMode.bind(this);
    this.handleHideManualForm = this.handleHideManualForm.bind(this);
  }

  // LIFECYCLE
  componentDidMount() {

  }


  // CLICK HANDLERS
  handleEnableEditMode(chart) {
    document.getElementsByTagName('SELECT')[0].disabled = true;
    this.setState({ editMode: true, editModeChart: chart });
  }

  handleHideManualForm() {
    const buttons = Array.from(document.getElementsByTagName('BUTTON'));
    buttons.forEach(button => button.disabled = true);

    document.getElementsByTagName('SELECT')[0].disabled = false;

    this.setState({ editMode: false });
  }
  

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

        <section className={this.state.editMode ? "" : "LeftSide-data"} onClick={handleSelectedCharts}>
          {
            displayData !== '' ? 
            displayCharts.map(chart => {
              // display generated charts
              return <DisplayData 
                key={chart._id} 
                chart={chart} 
                selectedCharts={selectedCharts}
                displayData={displayData}
              />
            }) 
            
            : this.state.editMode ?

            <ManualForm 
              displayData={this.state.editModeChart.type} 
              PUT={this.props.PUT}
              chartData={this.state.editModeChart}
              handleHideManualForm={this.handleHideManualForm}
              editMode={this.state.editMode}
            />

            :

            dashboardData.map(chart => {
              // display dashboard charts
              return <DisplaySelected 
                key={chart._id} 
                chart={chart} 
                handleEnableEditMode={this.handleEnableEditMode}
              />
            })
          }
        </section>

      </div>
    );
  }
}

export default LeftSide;
