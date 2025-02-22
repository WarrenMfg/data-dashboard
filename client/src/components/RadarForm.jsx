import React from "react";


class RadarForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      radars: [{
        radarName: '',
        data: ['']
      }],
      labels: ['']
    };

    this.handleChange = this.handleChange.bind(this);
    this.addMoreData = this.addMoreData.bind(this);
    this.addMoreRadars = this.addMoreRadars.bind(this);
    this.handleSubmitRadarForm = this.handleSubmitRadarForm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    // if editing, populate state with chartData
    if (this.props.chartData) {
      const title = this.props.chartData.options.title.text;
      const radars = [];
      this.props.chartData.data.datasets.forEach(dataset => {
        radars.push({
          radarName: dataset.label,
          data: dataset.data
        });
      });
      const labels = [...this.props.chartData.data.labels];

      this.setState({ title, radars, labels });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.title !== this.state.title && prevState.radars !== this.state.radars && prevState.labels !== this.state.labels) {
      document.querySelector('input[name|="title"]').value = this.state.title;
      document.querySelectorAll('input[name|="radarName"]').forEach((input, i) => input.value = this.state.radars[i].radarName);
      this.updateAllLabels();
      this.updateAllData();

    } else if (prevState.radars.length !== this.state.radars.length) {
      // copy all labels to new set of .ManualForm-radar
      const radars = document.querySelectorAll('.ManualForm-radar');
      const lastRadar = radars[radars.length - 1];
      const inputs = Array.from(lastRadar.querySelectorAll('input[name|="label"]'));

      this.state.labels.forEach((label, i) => {
        inputs[i].value = label;
      });
    } else if (prevState.labels !== this.state.labels) {
      // if one label from one set changes, update all sets
      this.updateAllLabels();
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
      
    } else if (key === 'radarName') {

      this.setState(prevState => {
        const newRadars = [...prevState.radars];
        newRadars[index].radarName = e.target.value;

        return { radars: newRadars };
      });

    } else if (key === 'label') {

      this.setState(prevState => {
        const newLabels = [...prevState.labels];
        newLabels[index] = e.target.value;

        return { labels: newLabels };
      });

    } else if (key === 'data') {

      const radar = e.target.dataset.radar;

      this.setState(prevState => {
        const newRadars = [...prevState.radars];
        newRadars[radar].data[index] = e.target.value;

        return { radars: newRadars };
      });
    }
  }

  addMoreData() {
    this.setState(prevState => {
      const newRadars = [...prevState.radars];

      newRadars.forEach(radar => {
        radar.data = [...radar.data, ''];
      });

      return { radars: newRadars };
    });
  }

  addMoreRadars() {
    const dataLength = this.state.radars[0].data.length;
    const newRadar = {
      radarName: '',
      data: Array(dataLength).fill('')
    };

    this.setState(prevState => {
      const newRadars = [...prevState.radars, newRadar];
      
      return { radars: newRadars };
    });
  }

  handleSubmitRadarForm() {
    // overall data shape
    const data = {
      title: this.state.title,
      datasets: this.state.radars,
      labels: this.state.labels
    };

    // if editing, add id property for findOneAndUpdate in database
    if (this.props.chartData) data.id = this.props.chartData._id;

    // POST for new chart, PUT for editing existing chart
    this.props.POST ? this.props.POST(data, 'manually', 'radar') : this.props.PUT(data, 'manually', 'radar');
    this.props.handleHideManualForm();
  }

  handleCancel() {
    this.props.handleHideManualForm();
  }

  updateAllLabels() {
    const radars = document.querySelectorAll('.ManualForm-radar');
    radars.forEach(radar => {
      const DOMlabels = radar.querySelectorAll('input[name|="label"]');
      this.state.labels.forEach((label, i) => DOMlabels[i].value = label);
    });
  }

  updateAllData() {
    const radars = document.querySelectorAll('.ManualForm-radar');
    radars.forEach((radar, i) => {
      radar.querySelectorAll('input[name|="data"]')
        .forEach((datum, j) => datum.value = this.state.radars[i].data[j]);
    });
  }

  render() {
    return (
      <div className="ManualForm">
        <form onBlur={this.handleChange}>
          <p>Title:&nbsp;<input type="text" name="title-0" autoFocus placeholder="chart title"/></p>

          {
            this.state.radars.map((radar, i) => {
              return (
                <div className="ManualForm-radar" key={i}>
                  <p>Radar Name:&nbsp;<input type="text" name={`radarName-${i}`} placeholder="legend label"/></p>
                  {
                    radar.data.map((datum, j) => {
                      return (
                        <p key={j}>Label:&nbsp;<input type="text" name={`label-${j}`} placeholder="radii name"/>&nbsp;Datum:&nbsp;<input type="text" data-radar={i} name={`data-${j}`} placeholder="number"/></p>
                      );
                    })
                  }
                </div>
              );
            })
          }

          <p>
            <button type="button" onClick={this.addMoreData}>+ Data</button>
            <button type="button" onClick={this.addMoreRadars}>+ Radars</button>
            <button type="button" onClick={this.handleSubmitRadarForm}>Submit</button>
            <button type="button" onClick={this.handleCancel}>Cancel</button>
          </p>
        </form>
      </div>
    );
  }
}

export default RadarForm;
