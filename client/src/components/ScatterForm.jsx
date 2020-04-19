import React from "react";


class ScatterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      plots: [{
        plotName: '',
        data: [{ x: '', y: '' }]
      }],
    };

    this.handleChange = this.handleChange.bind(this);
    this.addMoreData = this.addMoreData.bind(this);
    this.addMorePlots = this.addMorePlots.bind(this);
    this.handleSubmitScatterForm = this.handleSubmitScatterForm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    // if editing, populate state with chartData
    if (this.props.chartData) {
      const title = this.props.chartData.options.title.text;
      const plots = [];
      this.props.chartData.data.datasets.forEach(dataset => {
        plots.push({
          plotName: dataset.label,
          data: dataset.data
        });
      });

      this.setState({ title, plots });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.title !== this.state.title && prevState.plots !== this.state.plots) {
      document.querySelector('input[name|="title"]').value = this.state.title;
      document.querySelectorAll('input[name|="plotName"]').forEach((input, i) => input.value = this.state.plots[i].plotName);
      this.updateAllData();
    }
  }

  handleChange(e) {
    if (!e.target?.name) return;
    if (!e.target.value) return;
    e.persist(); // event pooling

    let [key, index] = e.target.name.split('-');
    index = Number(index);

    if (key === 'title') {
      this.setState({ title: e.target.value });
      
    } else if (key === 'plotName') {

      this.setState(prevState => {
        const newPlots = [...prevState.plots];
        newPlots[index].plotName = e.target.value;

        return { plots: newPlots };
      });

    } else if (key === 'dataX') {

      const plot = Number(e.target.dataset.x);

      this.setState(prevState => {
        const newPlots = [...prevState.plots];
        newPlots[plot].data[index].x = e.target.value;

        return { plots: newPlots };
      });
    } else if (key === 'dataY') {

      const plot = Number(e.target.dataset.y);

      this.setState(prevState => {
        const newPlots = [...prevState.plots];
        newPlots[plot].data[index].y = e.target.value;

        return { plots: newPlots };
      });
    }
  }

  addMoreData() {
    this.setState(prevState => {
      const newPlots = [...prevState.plots];

      newPlots.forEach(plot => {
        plot.data = [...plot.data, { x: '', y: '' }];
      });

      return { plots: newPlots };
    });
  }

  addMorePlots() {
    const dataLength = this.state.plots[0].data.length;
    const newPlot = {
      plotName: '',
      data: Array(dataLength).fill(null).map( () => ( { x: '', y: ''} ) )
    };

    this.setState(prevState => {
      const newPlots = [...prevState.plots, newPlot];
      
      return { plots: newPlots };
    });
  }

  handleSubmitScatterForm() {
    // overall data shape
    const data = {
      title: this.state.title,
      datasets: this.state.plots
    };

    // if editing, add id property for findOneAndUpdate in database
    if (this.props.chartData) data.id = this.props.chartData._id;

    // POST for new chart, PUT for editing existing chart
    this.props.POST ? this.props.POST(data, 'manually', 'scatter') : this.props.PUT(data, 'manually', 'scatter');
    this.props.handleHideManualForm();
  }

  handleCancel() {
    this.props.handleHideManualForm();
  }

  updateAllData() {
    const plots = document.querySelectorAll('.ManualForm-scatter');
    plots.forEach((plot, i) => {
      plot.querySelectorAll('input[name|="dataX"]')
        .forEach((datum, j) => datum.value = this.state.plots[i].data[j].x);

      plot.querySelectorAll('input[name|="dataY"]')
        .forEach((datum, j) => datum.value = this.state.plots[i].data[j].y);
    });
  }

  render() {
    return (
      <div className="ManualForm">
        <form onBlur={this.handleChange}>
          <p>Title:&nbsp;<input type="text" name="title-0" autoFocus placeholder="chart title"/></p>

          {
            this.state.plots.map((plot, i) => {
              return (
                <div className="ManualForm-scatter" key={i}>
                  <p>Scatter Plot Name:&nbsp;<input type="text" name={`plotName-${i}`} placeholder="legend label"/></p>
                  {
                    plot.data.map((datum, j) => {
                      return (
                        <div key={j}>
                          <p>x:&nbsp;<input type="text" data-x={i} name={`dataX-${j}`} placeholder="number"/>&nbsp;y:&nbsp;<input type="text" data-y={i} name={`dataY-${j}`} placeholder="number"/></p>
                        </div>
                      );
                    })
                  }
                </div>
              );
            })
          }

          <p>
            <button type="button" onClick={this.addMoreData}>+ Data</button>
            <button type="button" onClick={this.addMorePlots}>+ Plot</button>
            <button type="button" onClick={this.handleSubmitScatterForm}>Submit</button>
            <button type="button" onClick={this.handleCancel}>Cancel</button>
          </p>
        </form>
      </div>
    );
  }
}

export default ScatterForm;
