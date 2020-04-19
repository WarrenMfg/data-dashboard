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

    this.props.handleHideManualForm();
    this.props.POST(data, 'manually', 'scatter');
  }

  handleCancel() {
    this.props.handleHideManualForm();
  }

  render() {
    return (
      <div className="ManualForm">
        <form onBlur={this.handleChange}>
          <p>Title:&nbsp;<input type="text" name="title-0" autoFocus/></p>

          {
            this.state.plots.map((plot, i) => {
              return (
                <div className="ManualForm-scatter" key={i}>
                  <p>Scatter Plot Name:&nbsp;<input type="text" name={`plotName-${i}`}/></p>
                  {
                    plot.data.map((datum, j) => {
                      return (
                        <div key={j}>
                          <p>x:&nbsp;<input type="text" data-x={i} name={`dataX-${j}`}/>&nbsp;y:&nbsp;<input type="text" data-y={i} name={`dataY-${j}`}/></p>
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
