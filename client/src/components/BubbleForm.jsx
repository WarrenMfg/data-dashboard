import React from "react";


class BubbleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      bubbles: [{
        setName: '',
        data: [{ x: '', y: '', r: '' }]
      }],
      // labels: ['']
    };

    this.handleChange = this.handleChange.bind(this);
    this.addMoreData = this.addMoreData.bind(this);
    this.addMoreSets = this.addMoreSets.bind(this);
    this.handleSubmitBubbleForm = this.handleSubmitBubbleForm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.bubbles.length !== this.state.bubbles.length) {
  //     // copy all labels to new set of .ManualForm-bubble
  //     const bubbles = document.querySelectorAll('.ManualForm-bubble');
  //     const lastBubble = bubbles[bubbles.length - 1];
  //     const inputs = Array.from(lastBubble.querySelectorAll('input[name|="label"]'));

  //     this.state.labels.forEach((label, i) => {
  //       inputs[i].value = label;
  //     });
  //   } else if (prevState.labels !== this.state.labels) {
  //     // if one label from one set changes, update all sets
  //     this.updateAllLabels();
  //   }
  // }

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

    // } else if (key === 'label') {

    //   this.setState(prevState => {
    //     const newLabels = [...prevState.labels];
    //     newLabels[index] = e.target.value;

    //     return { labels: newLabels };
    //   });

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
      // labels: this.state.labels
    };

    this.props.handleHideManualForm();
    this.props.POST(data, 'manually', 'bubble');
  }

  handleCancel() {
    this.props.handleHideManualForm();
  }

  // updateAllLabels() {
  //   const bubbles = document.querySelectorAll('.ManualForm-bubble');
  //   bubbles.forEach(bubble => {
  //     const DOMlabels = bubble.querySelectorAll('input[name|="label"]');
  //     this.state.labels.forEach((label, i) => DOMlabels[i].value = label);
  //   });
  // }

  render() {
    return (
      <div className="ManualForm">
        <form onBlur={this.handleChange}>
          <p>Title:&nbsp;<input type="text" name="title-0" autoFocus/></p>

          {
            this.state.bubbles.map((bubble, i) => {
              return (
                <div className="ManualForm-bubble" key={i}>
                  <p>Set Name:&nbsp;<input type="text" name={`setName-${i}`}/></p>
                  {
                    bubble.data.map((datum, j) => {
                      return (
                        <div key={j}>
                          {/* <p>Label:&nbsp;<input type="text" name={`label-${j}`}/></p> */}
                          <p>x:&nbsp;<input type="text" data-x={i} name={`dataX-${j}`}/>&nbsp;y:&nbsp;<input type="text" data-y={i} name={`dataY-${j}`}/>&nbsp;r:&nbsp;<input type="text" data-r={i} name={`dataR-${j}`} placeholder="in pixels"/></p>
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
