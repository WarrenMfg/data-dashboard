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

  handleChange(e) {
    e.persist();
    const [key, index] = e.target.name.split('-');

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
        const newLines = [...prevState.lines];
        newLines[index].lineName = e.target.value;

        return { lines: newLines };
      });

    } else if (key === 'data') {
      const newLines = [];

      this.setState(prevState => {
        prevState.lines.forEach(line => {
          const newLineData = { ...line };
          newLineData.labels[index] = e.target.value;
          newLines.push(newLineData);
        });

        return { lines: newLines };
      });
    }
  }

  addMoreData() {
    this.setState(prevState => {
      const newLines = [];
      const newLineData = {
        lineName: '',
        labels: [],
        data: []
      };

      prevState.lines.forEach(line => {
        newLineData.lineName = line.lineName;
        newLineData.labels = [...line.labels, ''];
        newLineData.data = [...line.data, ''];
        newLines.push(newLineData);
      });

      return { lines: newLines };
    });
  }

  addMoreLines() {
    // copy all labels to add new line with new data
    this.setState(prevState => {
      const newLineData = {
        lineName: '',
        labels: [...prevState.lines[0].labels],
        data: Array(prevState.lines[0].data.length).fill('')
      };
      const newLines = [...prevState.lines, newLineData];

      return { lines: newLines };
    });
  }

  handleSubmitLineForm() {
    // overall data shape
    const data = {
      title: this.state.title,
      datasets: [],
      labels: this.state.lines[0].labels
    };

    // for data.datasets
    let dataset = {
      label: '',
      data: []
    }
    
    this.state.lines.forEach(line => {
      dataset.label = line.lineName;
      dataset.data = line.data;
      data.datasets.push(dataset);
    });

    this.props.handleHideManualForm();
    this.props.POST(data, 'manually', 'line');
  }

  handleCancel() {
    this.props.handleHideManualForm();
  }

  render() {
    const { title, lines } = this.state;
    return (
      <div className="ManualForm">
        <form>
          <p>Title:&nbsp;<input type="text" name="title-0" onChange={this.handleChange} value={title} autoFocus/></p>
          {
            lines.map((line, i) => {
              return (
                <div className="ManualForm-line" key={i}>
                  <p>Line Name:&nbsp;<input type="text" name="lineName-0" onChange={this.handleChange} value={this.state.lines[i].lineName}/></p>
                  {
                    line.labels.map((val, j) => {
                      return (
                        <p key={j}>Label:&nbsp;<input type="text" name="label-0" onChange={this.handleChange} value={this.state.lines[i].labels[j]}/>&nbsp;Data:&nbsp;<input type="text" name="data-0" onChange={this.handleChange} value={this.state.lines[i].data[j]}/></p>
                      );
                    })
                  }
                </div>
              );
            })
          }

          <p>
            <button type="button" onClick={this.addMoreData}>Add More Data</button>
            <button type="button" onClick={this.addMoreLines}>Add More Lines</button>
            <button type="button" onClick={this.handleSubmitLineForm}>Submit</button>
            <button type="button" onClick={this.handleCancel}>Cancel</button>
          </p>
        </form>
      </div>
    );
  }
}

export default LineForm;
