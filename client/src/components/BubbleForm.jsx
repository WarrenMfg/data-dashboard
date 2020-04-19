import React from "react";


class BubbleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      bubbles: [{
        setName: '',
        data: [{ x: '', y: '', r: '' }]
      }]
    };

    this.handleChange = this.handleChange.bind(this);
    this.addMoreData = this.addMoreData.bind(this);
    this.addMoreSets = this.addMoreSets.bind(this);
    this.handleSubmitBubbleForm = this.handleSubmitBubbleForm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    // if editing, populate state with chartData
    if (this.props.chartData) {
      const title = this.props.chartData.options.title.text;
      const bubbles = [];
      this.props.chartData.data.datasets.forEach(dataset => {
        bubbles.push({
          setName: dataset.label,
          data: dataset.data
        });
      });

      this.setState({ title, bubbles });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.title !== this.state.title && prevState.bubbles !== this.state.bubbles) {
      document.querySelector('input[name|="title"]').value = this.state.title;
      document.querySelectorAll('input[name|="setName"]').forEach((input, i) => input.value = this.state.bubbles[i].setName);
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
      
    } else if (key === 'setName') {

      this.setState(prevState => {
        const newBubbles = [...prevState.bubbles];
        newBubbles[index].setName = e.target.value;

        return { bubbles: newBubbles };
      });

    } else if (key === 'dataX') {

      const bubble = Number(e.target.dataset.x);

      this.setState(prevState => {
        const newBubbles = [...prevState.bubbles];
        newBubbles[bubble].data[index].x = e.target.value;

        return { bubbles: newBubbles };
      });
    } else if (key === 'dataY') {

      const bubble = Number(e.target.dataset.y);

      this.setState(prevState => {
        const newBubbles = [...prevState.bubbles];
        newBubbles[bubble].data[index].y = e.target.value;

        return { bubbles: newBubbles };
      });
    } else if (key === 'dataR') {
      if (Number(e.target.value) <= 0 || Number(e.target.value) > 10) {
        e.target.value = '';
        e.target.focus();
        return;
      }

      const bubble = Number(e.target.dataset.r);

      this.setState(prevState => {
        const newBubbles = [...prevState.bubbles];
        newBubbles[bubble].data[index].r = Number(e.target.value);

        return { bubbles: newBubbles };
      });
    }
  }

  addMoreData() {
    this.setState(prevState => {
      const newBubbles = [...prevState.bubbles];

      newBubbles.forEach(bubble => {
        bubble.data = [...bubble.data, { x: '', y: '', r: '' }];
      });

      return { bubbles: newBubbles };
    });
  }

  addMoreSets() {
    const dataLength = this.state.bubbles[0].data.length;
    const newBubble = {
      setName: '',
      data: Array(dataLength).fill(null).map( () => ( { x: '', y: '', r: '' } ) )
    };

    this.setState(prevState => {
      const newBubbles = [...prevState.bubbles, newBubble];
      
      return { bubbles: newBubbles };
    });
  }

  handleSubmitBubbleForm() {
    // overall data shape
    const data = {
      title: this.state.title,
      datasets: this.state.bubbles
    };

    // if editing, add id property for findOneAndUpdate in database
    if (this.props.chartData) data.id = this.props.chartData._id;

    // POST for new chart, PUT for editing existing chart
    this.props.POST ? this.props.POST(data, 'manually', 'bubble') : this.props.PUT(data, 'manually', 'bubble');
    this.props.handleHideManualForm();
  }

  handleCancel() {
    this.props.handleHideManualForm();
  }

  updateAllData() {
    const bubbles = document.querySelectorAll('.ManualForm-bubble');
    bubbles.forEach((bubble, i) => {
      bubble.querySelectorAll('input[name|="dataX"]')
        .forEach((datum, j) => datum.value = this.state.bubbles[i].data[j].x);

      bubble.querySelectorAll('input[name|="dataY"]')
        .forEach((datum, j) => datum.value = this.state.bubbles[i].data[j].y);

      bubble.querySelectorAll('input[name|="dataR"]')
        .forEach((datum, j) => datum.value = this.state.bubbles[i].data[j].r);
    });
  }

  render() {
    return (
      <div className="ManualForm">
        <form onBlur={this.handleChange}>
          <p>Title:&nbsp;<input type="text" name="title-0" autoFocus placeholder="chart title"/></p>

          {
            this.state.bubbles.map((bubble, i) => {
              return (
                <div className="ManualForm-bubble" key={i}>
                  <p>Set Name:&nbsp;<input type="text" name={`setName-${i}`} placeholder="legend label"/></p>
                  {
                    bubble.data.map((datum, j) => {
                      return (
                        <div key={j}>
                          <p>x:&nbsp;<input type="text" data-x={i} name={`dataX-${j}`} placeholder="number"/>&nbsp;y:&nbsp;<input type="text" data-y={i} name={`dataY-${j}`} placeholder="number"/>&nbsp;r:&nbsp;<input type="text" data-r={i} name={`dataR-${j}`} placeholder="number (max 10)"/></p>
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
            <button type="button" onClick={this.addMoreSets}>+ Set</button>
            <button type="button" onClick={this.handleSubmitBubbleForm}>Submit</button>
            <button type="button" onClick={this.handleCancel}>Cancel</button>
          </p>
        </form>
      </div>
    );
  }
}

export default BubbleForm;
