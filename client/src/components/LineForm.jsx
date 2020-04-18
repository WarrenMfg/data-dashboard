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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.lines.length !== this.state.lines.length) {
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

    this.props.handleHideManualForm();
    this.props.POST(data, 'manually', 'line');
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

  render() {
    return (
      <div className="ManualForm">
        <form onBlur={this.handleChange}>
          <p>Title:&nbsp;<input type="text" name="title-0" autoFocus/></p>

          {
            this.state.lines.map((line, i) => {
              return (
                <div className="ManualForm-line" key={i}>
                  <p>Line Name:&nbsp;<input type="text" name={`lineName-${i}`}/></p>
                  {
                    line.data.map((datum, j) => {
                      return (
                        <p key={j}>Label:&nbsp;<input type="text" name={`label-${j}`}/>&nbsp;Data:&nbsp;<input type="text" data-line={i} name={`data-${j}`}/></p>
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
