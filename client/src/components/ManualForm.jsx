import React from 'react';


class ManualForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputCount: 1
    };

    this.addMoreData = this.addMoreData.bind(this);
    this.handleSubmitPieForm = this.handleSubmitPieForm.bind(this);
  }

  addMoreData(e) {
    const clone = e.target.parentElement.previousElementSibling.cloneNode(true);

    clone.querySelectorAll('input').forEach((el, i) => {
      el.value = '';
      if (i === 0) {
        el.name = `label${this.state.inputCount}`;
      } else {
        el.name = `data${this.state.inputCount}`;
      }
    });
    document.querySelector('form').insertBefore(clone, e.target.parentElement);
    clone.children[0].focus();

    this.setState({ inputCount: this.state.inputCount + 1 });
  }

  handleSubmitPieForm() {
    const data = {
      title: '',
      labels: [],
      data: []
    };
    const allInputs = document.querySelectorAll('input');
    data.title = allInputs[0].value;
    allInputs[0].value = '';

    allInputs.forEach((input, i) => {
      if (i === 0) {
        return;
      }
      if (i % 2 === 0) {
        data.data.push(input.value);
        input.value = '';
      } else {
        data.labels.push(input.value);
        input.value = '';
      }
    });

    this.props.handleHideManualForm();
    this.props.POST(data, 'manually', 'pie');
  }

  makePie() {
    return (
      <div className="ManualForm">
        <form /*action={ `/api/manually/${this.props.displayData}` } method="POST" onsubmit="(event) => event.preventDefault()" */ >
          <p>Title:&nbsp;<input type="text" name="title" autoFocus/></p>
          <p>Label:&nbsp;<input type="text" name="label0"/>&nbsp;Data:&nbsp;<input type="text" name="data0"/></p>

          <p><button type="button" onClick={this.addMoreData}>Add More Data</button></p>
          <p><button type="button" onClick={this.handleSubmitPieForm}>Submit</button></p>
        </form>
      </div>
    );
  }


  render() {
    const type = this.props.displayData;
    if (type === 'pie') {
      return this.makePie();
    }
  }
}

export default ManualForm;