import React from "react";



class HorizontalBarForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      bars: [{
        barName: '',
        data: ['']
      }],
      labels: ['']
    };

    this.handleChange = this.handleChange.bind(this);
    this.addMoreData = this.addMoreData.bind(this);
    this.addMoreBars = this.addMoreBars.bind(this);
    this.handleSubmitBarForm = this.handleSubmitBarForm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.bars.length !== this.state.bars.length) {
      // copy all labels to new set of .ManualForm-bar
      const bars = document.querySelectorAll('.ManualForm-bar');
      const lastBar = bars[bars.length - 1];
      const inputs = Array.from(lastBar.querySelectorAll('input[name|="label"]'));

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
      
    } else if (key === 'barName') {

      this.setState(prevState => {
        const newBars = [...prevState.bars];
        newBars[index].barName = e.target.value;

        return { bars: newBars };
      });

    } else if (key === 'label') {

      this.setState(prevState => {
        const newLabels = [...prevState.labels];
        newLabels[index] = e.target.value;

        return { labels: newLabels };
      });

    } else if (key === 'data') {

      const bar = e.target.dataset.bar;

      this.setState(prevState => {
        const newBars = [...prevState.bars];
        newBars[bar].data[index] = e.target.value;

        return { bars: newBars };
      });
    }
  }

  addMoreData() {
    this.setState(prevState => {
      const newBars = [...prevState.bars];

      newBars.forEach(bar => {
        bar.data = [...bar.data, ''];
      });

      return { bars: newBars };
    });
  }

  addMoreBars() {
    const dataLength = this.state.bars[0].data.length;
    const newBar = {
      barName: '',
      data: Array(dataLength).fill('')
    };

    this.setState(prevState => {
      const newBars = [...prevState.bars, newBar];
      
      return { bars: newBars };
    });
  }

  handleSubmitBarForm() {
    // overall data shape
    const data = {
      title: this.state.title,
      datasets: this.state.bars,
      labels: this.state.labels
    };

    this.props.handleHideManualForm();
    this.props.POST(data, 'manually', 'horizontalBar');
  }

  handleCancel() {
    this.props.handleHideManualForm();
  }

  updateAllLabels() {
    const bars = document.querySelectorAll('.ManualForm-bar');
    bars.forEach(bar => {
      const DOMlabels = bar.querySelectorAll('input[name|="label"]');
      this.state.labels.forEach((label, i) => DOMlabels[i].value = label);
    });
  }

  render() {
    return (
      <div className="ManualForm">
        <form onBlur={this.handleChange}>
          <p>Title:&nbsp;<input type="text" name="title-0" autoFocus/></p>

          {
            this.state.bars.map((bar, i) => {
              return (
                <div className="ManualForm-bar" key={i}>
                  <p>Bar Name:&nbsp;<input type="text" name={`barName-${i}`}/></p>
                  {
                    bar.data.map((datum, j) => {
                      return (
                        <p key={j}>Label:&nbsp;<input type="text" name={`label-${j}`}/>&nbsp;Data:&nbsp;<input type="text" data-bar={i} name={`data-${j}`}/></p>
                      );
                    })
                  }
                </div>
              );
            })
          }

          <p>
            <button type="button" onClick={this.addMoreData}>Add More Data</button>
            <button type="button" onClick={this.addMoreBars}>Add More Bars</button>
            <button type="button" onClick={this.handleSubmitBarForm}>Submit</button>
            <button type="button" onClick={this.handleCancel}>Cancel</button>
          </p>
        </form>
      </div>
    );
  }
}

export default HorizontalBarForm;
