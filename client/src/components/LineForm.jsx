import React from "react";


class LineForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      lines: [{
        lineName: '',
        data: ['']
      }],
      labels: ['']
    };

    this.handleChange = this.handleChange.bind(this);
    this.addMoreData = this.addMoreData.bind(this);
    this.addMoreLines = this.addMoreLines.bind(this);
    this.handleSubmitLineForm = this.handleSubmitLineForm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    // if editing, populate state with chartData
    if (this.props.chartData) {
      const title = this.props.chartData.options.title.text;
      const lines = [];
      this.props.chartData.data.datasets.forEach(dataset => {
        lines.push({
          lineName: dataset.label,
          data: dataset.data
        });
      });
      const labels = [...this.props.chartData.data.labels];

      this.setState({ title, lines, labels });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.title !== this.state.title && prevState.lines !== this.state.lines && prevState.labels !== this.state.labels) {
      document.querySelector('input[name|="title"]').value = this.state.title;
      document.querySelectorAll('input[name|="lineName"]').forEach((input, i) => input.value = this.state.lines[i].lineName);
      this.updateAllLabels();
      this.updateAllData();

    } else if (prevState.lines.length !== this.state.lines.length) {
      const lines = document.querySelectorAll('.ManualForm-line');
      const lastLine = lines[lines.length - 1];
      const inputs = Array.from(lastLine.querySelectorAll('input[name|="label"]'));

      this.state.labels.forEach((label, i) => {
        inputs[i].value = label;
      });

    } else if (prevState.labels !== this.state.labels) {
      this.updateAllLabels();
    }
  }

  handleChange(e) {
    if (!e.target?.name) return;
    if (!e.target.value) return;
    e.persist();

    let [key, index] = e.target.name.split('-');
    index = Number(index);

    if (key === 'title') {
      this.setState({ title: e.target.value });
      
    } else if (key === 'lineName') {

      this.setState(prevState => {
        const newLines = [...prevState.lines];
        newLines[index].lineName = e.target.value;

        return { lines: newLines };
      });

    } else if (key === 'label') {

      this.setState(prevState => {
        const newLabels = [...prevState.labels];
        newLabels[index] = e.target.value;

        return { labels: newLabels };
      });

    } else if (key === 'data') {

      const line = e.target.dataset.line;

      this.setState(prevState => {
        const newLines = [...prevState.lines];
        newLines[line].data[index] = e.target.value;

        return { lines: newLines };
      });
    }
  }

  addMoreData() {
    this.setState(prevState => {
      const newLines = [...prevState.lines];

      newLines.forEach(line => {
        line.data = [...line.data, ''];
      });

      return { lines: newLines };
    });
  }

  addMoreLines() {
    const dataLength = this.state.lines[0].data.length;
    const newLine = {
      lineName: '',
      data: Array(dataLength).fill('')
    };

    this.setState(prevState => {
      const newLines = [...prevState.lines, newLine];
      
      return { lines: newLines };
    });
  }

  handleSubmitLineForm() {
    // overall data shape
    const data = {
      title: this.state.title,
      datasets: this.state.lines,
      labels: this.state.labels
    };

    // if editing, add id property for findOneAndUpdate in database
    if (this.props.chartData) data.id = this.props.chartData._id;

    // POST for new chart, PUT for editing existing chart
    this.props.POST ? this.props.POST(data, 'manually', 'line') : this.props.PUT(data, 'manually', 'line');
    this.props.handleHideManualForm();
  }

  handleCancel() {
    this.props.handleHideManualForm();
  }

  updateAllLabels() {
    const lines = document.querySelectorAll('.ManualForm-line');
    lines.forEach(line => {
      const DOMlabels = line.querySelectorAll('input[name|="label"]');
      this.state.labels.forEach((label, i) => DOMlabels[i].value = label);
    });
  }

  updateAllData() {
    const lines = document.querySelectorAll('.ManualForm-line');
    lines.forEach((line, i) => {
      line.querySelectorAll('input[name|="data"]')
        .forEach((datum, j) => datum.value = this.state.lines[i].data[j]);
    });
  }

  render() {
    return (
      <div className="ManualForm">
        <form onBlur={this.handleChange}>
          <p>Title:&nbsp;<input type="text" name="title-0" autoFocus placeholder="chart title"/></p>

          {
            this.state.lines.map((line, i) => {
              return (
                <div className="ManualForm-line" key={i}>
                  <p>Line Name:&nbsp;<input type="text" name={`lineName-${i}`} placeholder="legend label"/></p>
                  {
                    line.data.map((datum, j) => {
                      return (
                        <p key={j}>Label:&nbsp;<input type="text" name={`label-${j}`} placeholder="x-axis"/>&nbsp;Datum:&nbsp;<input type="text" data-line={i} name={`data-${j}`} placeholder="number"/></p>
                      );
                    })
                  }
                </div>
              );
            })
          }

          <p>
            <button type="button" onClick={this.addMoreData}>+ Data</button>
            <button type="button" onClick={this.addMoreLines}>+ Lines</button>
            <button type="button" onClick={this.handleSubmitLineForm}>Submit</button>
            <button type="button" onClick={this.handleCancel}>Cancel</button>
          </p>
        </form>
      </div>
    );
  }
}

export default LineForm;
