import React from "react";
import api from "../api-endpoints.js";
import LeftSide from './LeftSide.jsx';
import RightSide from './RightSide.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayData: '',
      displayCharts: [], // display all charts from current dropdown selection: [ [ 'title', [axes], [ { data }, { data } ] ] ]
      selectedCharts: {}, // all dashboard chart _ids
      selectedChartsChanged: 0,
      dashboardData: [] // passed to RightSide component: [ [ 'title', [axes], [ { data }, { data } ] ] ]
    };

    this.POST = this.POST.bind(this);
    this.handleDisplayData = this.handleDisplayData.bind(this);
    this.handleSelectedCharts = this.handleSelectedCharts.bind(this);
  }

  // LIFECYCLE
  componentDidMount() {
    // GET persisted selected charts
    this.GET('selected', 'charts');
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedChartsChanged !== this.state.selectedChartsChanged) {
      this.POST(this.state.selectedCharts, 'selected', 'charts');
    
    // triggered after componentDidMount
    } else if (prevState.selectedCharts !== this.state.selectedCharts) {
      this.GET('dashboard', JSON.stringify(this.state.selectedCharts));
    }
  }


  // API
  GET(type, chart) {
    api.GET(type, chart)
      .then(res => res.json())
      .then(data => {

        // set display of chart data
        if (type === 'display') {
          this.setState({ displayCharts: data });

        // set dashboard data
        } else if (type === 'dashboard') {
          this.setState({ dashboardData: data });

        // set selectedCharts
        } else if (type === 'selected') {
          this.setState({ selectedCharts: data }); // triggers componentDidUpdate
        }
      })
      .catch(err => console.error(err));
  }

  POST(data, a, b) {
    api.POST(data, a, b)
      .then(res => res.json())
      .then(data => {
        if (a === 'selected' && b === 'charts') {
          this.GET('dashboard', JSON.stringify(this.state.selectedCharts));
        
        } else if (a === 'automatically') {
          this.setState({ displayCharts: data });
        }
      })
      .catch(err => console.error(err));
  }

  DELETE() {

  }

  // CLICK HANDLERS
  handleDisplayData(chart) {
    // GET associated chart data to display
    if (chart) {
      this.GET('display', chart);
      this.setState({ displayData: chart });
    } else {
      this.setState({ displayData: chart, displayCharts: [] });
    }
  }

  // handle clicks on display data to make dashboard chart
  handleSelectedCharts(selection) {
    const id = selection.target.dataset?.id;
    const type = selection.target.dataset?.type;

    // if click is valid
    if (id) {
      // get array of selected charts
      const selectedChartArray = this.state.selectedCharts[type];

      // if property exists
      if (selectedChartArray) {
        const index = selectedChartArray.indexOf(id);

        // if id is present, then remove
        if (index > -1) {
          this.setState(prevState => {
            prevState.selectedCharts[type].splice(index, 1);

            // if array is empty, then delete property
            if (prevState.selectedCharts[type].length === 0) {
              delete prevState.selectedCharts[type];
            }

            return { selectedCharts: prevState.selectedCharts, selectedChartsChanged: prevState.selectedChartsChanged + 1 };
          });

        // otherwise, add it
        } else {
          this.setState(prevState => {
            prevState.selectedCharts[type].unshift(id);
            return { selectedCharts: prevState.selectedCharts, selectedChartsChanged: prevState.selectedChartsChanged + 1 };
          });
        }

      // click is valid but no selectedCharts property yet
      } else {
        this.setState(prevState => {
          prevState.selectedCharts[type] = [id];
          return { selectedCharts: prevState.selectedCharts, selectedChartsChanged: prevState.selectedChartsChanged + 1 };
        });
      }

      // POST selectedCharts to db in componentDidUpdate
    }
  }
  

  // UI
  render() {
    const { displayData, selectedCharts, dashboardData } = this.state;
    return (
      <div className="App">
        <h1>Data Dashboard</h1>
        <div className="App-sides">
          <LeftSide 
            POST={this.POST}
            handleDisplayData={this.handleDisplayData}
            displayCharts={this.state.displayCharts}
            handleSelectedCharts={this.handleSelectedCharts}
            selectedCharts={selectedCharts[displayData]}
            displayData={displayData}
            dashboardData={dashboardData}
          />
          <RightSide 
            dashboardData={dashboardData}
          />
        </div>
      </div>
    );
  }
}

export default App;
