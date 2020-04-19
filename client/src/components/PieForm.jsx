import React from "react";


class PieForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      data: [''],
      labels: ['']
    };

    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addMorePieData = this.addMorePieData.bind(this);
    this.handleSubmitPieForm = this.handleSubmitPieForm.bind(this);
  }

  componentDidMount() {
    // if editing, populate state with chartData
    if (this.props.chartData) {
      const title = this.props.chartData.options.title.text;
      const data = [...this.props.chartData.data.datasets[0].data];
      const labels = [...this.props.chartData.data.labels];

      this.setState({ title, data, labels });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { title, data, labels } = this.state;
    // if state has been populated with chartData, then populate DOM elements
    if (prevState.title !== title && prevState.data !== data && prevState.labels !== labels) {
      document.querySelector('input[name|="title"]').value = title;
      document.querySelectorAll('input[name|="label"]').forEach((input, i) => input.value = labels[i]);
      document.querySelectorAll('input[name|="data"]').forEach((input, i) => input.value = data[i]);
    }
  }

  handleCancel() {
    this.props.handleHideManualForm(this.props.editMode);
  }

  handleChange(e) {
    if (!e.target?.name) return;
    if (!e.target.value) return;
    e.persist();

    let [key, index] = e.target.name.split('-');
    index = Number(index);

    if (key === 'title') {
      this.setState({ title: e.target.value });

    } else if (key === 'label') {
      this.setState(prevState => {
        const newLabels = [...prevState.labels];
        newLabels[index] = e.target.value;

        return { labels: newLabels };
      });

    } else if (key === 'data') {
      this.setState(prevState => {
        const newData = [...prevState.data];
        newData[index] = e.target.value;

        return { data: newData };
      });
    }
  }

  addMorePieData(e) {
    const newData = [...this.state.data, ''];
    const newLabels = [...this.state.labels, ''];
    this.setState({ data: newData, labels: newLabels });
  }

  handleSubmitPieForm() {
    const data = {
      title: this.state.title,
      data: this.state.data,
      labels: this.state.labels
    };

    // if editing, add id property for findOneAndUpdate in database
    if (this.props.chartData) data.id = this.props.chartData._id;

    // POST for new chart, PUT for editing existing chart
    this.props.POST ? this.props.POST(data, 'manually', 'pie') : this.props.PUT(data, 'manually', 'pie');
    this.props.handleHideManualForm(this.props.editMode);
  }

  render() {
    return (
      <div className="ManualForm">
        <form onBlur={this.handleChange}>
          <p>Title:&nbsp;<input type="text" name="title-0" autoFocus placeholder="chart title"/></p>

          {
            this.state.data.map((datum, i) => <p key={i}>Label:&nbsp;<input type="text" name={`label-${i}`} placeholder="legend label"/>&nbsp;Datum:&nbsp;<input type="text" name={`data-${i}`} placeholder="number"/></p>)
          }

          <p>
            <button type="button" onClick={this.addMorePieData}>+ Data</button>
            <button type="button" onClick={this.handleSubmitPieForm}>Submit</button>
            <button type="button" onClick={this.handleCancel}>Cancel</button>
          </p>
        </form>
      </div>
    );
  }
}

export default PieForm;
