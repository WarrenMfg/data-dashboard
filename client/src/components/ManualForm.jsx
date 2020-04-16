import React from 'react';


class ManualForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputCount: 1
    };

    this.handleCancel = this.handleCancel.bind(this);
    this.addMorePieData = this.addMorePieData.bind(this);
    this.handleSubmitPieForm = this.handleSubmitPieForm.bind(this);
    this.addMoreLineData = this.addMoreLineData.bind(this);
    this.addMoreLines = this.addMoreLines.bind(this);
    this.handleSubmitLineForm = this.handleSubmitLineForm.bind(this);
  }

  handleCancel() {
    this.props.handleHideManualForm();
  }

  // PIE
  makePie() {
    return (
      <div className="ManualForm">
        <form>
          <p>Title:&nbsp;<input type="text" name="title" autoFocus/></p>
          <p>Label:&nbsp;<input type="text" name="label0"/>&nbsp;Data:&nbsp;<input type="text" name="data0"/></p>

          <p>
            <button type="button" onClick={this.addMorePieData}>Add More Data</button>
            <button type="button" onClick={this.handleSubmitPieForm}>Submit</button>
            <button type="button" onClick={this.handleCancel}>Cancel</button>
          </p>
        </form>
      </div>
    );
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

  // LINE
  makeLine() {
    return (
      <div className="ManualForm">
        <form>
          <p>Title:&nbsp;<input type="text" name="title" autoFocus/></p>
          <div className="ManualForm-line">
            <p>Line Name:&nbsp;<input type="text" name="lineName0"/></p>
            <p>Label:&nbsp;<input type="text" name="label0"/>&nbsp;Data:&nbsp;<input type="text" name="data0"/></p>
          </div>

          <p>
            <button type="button" onClick={this.addMoreLineData}>Add More Data</button>
            <button type="button" onClick={this.addMoreLines}>Add More Lines</button>
            <button type="button" onClick={this.handleSubmitLineForm}>Submit</button>
          </p>
        </form>
      </div>
    );
  }

  addMoreLineData() {
    const parents = document.querySelectorAll('.ManualForm-line');
    const clones = Array.from(parents).map(div => div.lastElementChild.cloneNode(true));

    parents.forEach((parent, i) => {
      clones[i].children[0].value = '';
      clones[i].children[1].value = '';
      clones[i].children[0].name = `label${this.state.inputCount}`;
      clones[i].children[1].name = `data${this.state.inputCount}`;
      parent.append(clones[i]);
    });

    this.setState({ inputCount: this.state.inputCount + 1 });
  }

  addMoreLines() {
    // get last parent
    const parents = Array.from(document.querySelectorAll('.ManualForm-line'));
    const lastParentClone = parents[parents.length - 1].cloneNode(true);
    
    // remove values from inputs
    lastParentClone.querySelectorAll('input').forEach(input => input.value = '');
    
    // update name attribute for Line Name
    let lineName = lastParentClone.firstElementChild.firstElementChild.name;
    lineName = `lineName${+lineName.split('lineName')[1] + 1}`;
    lastParentClone.firstElementChild.firstElementChild.name = lineName;
    
    // insert into DOM
    const lastChild = document.querySelector('form').lastElementChild;
    lastChild.before(lastParentClone);
  }

  handleSubmitLineForm() {
    const data = {
      title: document.querySelector('input[name="title"]').value,
      datasets: [],
      labels: []
    };

    const lines = document.querySelectorAll('.ManualForm-line');

    let dataset = {
      label: '',
      data: []
    }
    lines.forEach(line => {
      const inputs = line.querySelectorAll('input');
      inputs.forEach((input, j) => {
        if (j === 0) {
          dataset.label = input.value;
        } else if (j % 2 === 0) {
          dataset.data.push(input.value)
        } else {
          data.labels.push(input.value);
        }
      });

      data.datasets.push(dataset);
      dataset = {
        label: '',
        data: []
      };
    });


    this.props.handleHideManualForm();
    // this.props.POST(data, 'manually', 'line');
    console.log(data);
  }


  render() {
    const type = this.props.displayData;
    if (type === 'pie') {
      return this.makePie();
    } else if (type === 'line') {
      return this.makeLine();
    }
  }
}

export default ManualForm;