import React from "react";


class PieForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputCount: 1
    };

    this.handleCancel = this.handleCancel.bind(this);
    this.addMorePieData = this.addMorePieData.bind(this);
    this.handleSubmitPieForm = this.handleSubmitPieForm.bind(this);
  }

  handleCancel() {
    this.props.handleHideManualForm();
  }

  addMorePieData(e) {
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
      data: [],
      labels: []
    };
    const allInputs = document.querySelectorAll('input');
    data.title = allInputs[0].value;

    allInputs.forEach((input, i) => {
      if (i === 0) {
        return;
      }
      if (i % 2 === 0) {
        data.data.push(input.value);
      } else {
        data.labels.push(input.value);
      }
    });

    this.props.handleHideManualForm();
    this.props.POST(data, 'manually', 'pie');
  }

  render() {
    return (
      <div className="ManualForm">
        <form>
          <p>Title:&nbsp;<input type="text" name="title" autoFocus placeholder="chart title"/></p>
          <p>Label:&nbsp;<input type="text" name="label0" placeholder="legend label"/>&nbsp;Datum:&nbsp;<input type="text" name="data0" placeholder="number"/></p>

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
