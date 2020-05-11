import React from 'react';



var emailCheck = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/

function validate(firstname, email) {
  return {
    firstname: firstname.length === 0,
    email: !emailCheck.test(email)

    // email: email.length <= 4
  };
}

export default class Form extends React.Component {
  state = {
    firstname: '',
    email: '',
    session: '',
    year: '',
    course: '',
    section: '',
    department: '',
    touch: {
      firstname: false,
      email: false
    }
  }

  handleEmailChange = e => {
    this.setState({email: e.target.value});
  }

  handleNameChange = e => {
    this.setState({firstname: e.target.value});
  }

  handleBlur = f => e => {
    this.setState({
      touch: {...this.state.touch, [f]: true}
    });
  };

  handleSubmit = e => {
    if(!this.canBeSubmitted) {
      e.preventDefault();
      return;
    }
    const {firstname, email} = this.state;
  }

  canBeSubmitted() {
    const errors = validate(this.state.firstname, this.state.email);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });

  };


  onSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    this.setState({
      firstname: '',
      email: '',
      session: '',
      year: '',
      course: '',
      section: '',
      department: ''

    });
  };

  render() {

    const errors = validate(this.state.firstname, this.state.email);
    const isDisabled = Object.keys(errors).some(x => errors[x]);

    const displayError = f => {
      const hasError = errors[f];
      const show = this.state.touch[f];

      return hasError ? show : false;
    }

    const styles = {
      transform: 'translate(0px, 35vh)',
    };

    const inputStyle = {
      border: '1px solid black',
      margin: '5px',
      borderRadius: '4px',
      padding: '6px 0px 6px 3px',
      borderColor: 'red'
    };

    const inputStyleEmail = {
      border: '1px solid black',
      margin: '5px',
      borderRadius: '4px',
      padding: '6px 0px 6px 3px',
      borderColor: 'red'
    };

    const inputStyleName = {
      border: '1px solid black',
      margin: '5px',
      borderRadius: '4px',
      padding: '6px 0px 6px 3px',
      borderColor: 'red'
    }

    if(this.state.firstname.length > 0) {
      inputStyleName.borderColor = '';
    }

    if(emailCheck.test(this.state.email)) {
      inputStyleEmail.borderColor = '';
    }


    const buttonStyle = {
      border: '1px solid black',
      margin: '5px',
      borderRadius: '4px',
      padding: '3px 3px 3px 3px'
    }

    return (
      <form onSubmit={this.handleSubmit} style={styles}>
        <input
        className={displayError("firstname") ? "error" : ""}
        style={inputStyleName}
        name="firstname"
        placeholder='First name'
        value={this.state.firstname}
        onChange={this.handleNameChange}
        onBlur={this.handleBlur("firstname")}
        />
        <input
        className={displayError("email") ? "error" : ""}
        style={inputStyleEmail}
        name="email"
        placeholder='Email'
        value={this.state.email}
        onChange={this.handleEmailChange}
        onBlur={this.handleBlur("email")}
        />
        <br/>
        <input
        style={inputStyle}
        name="session"
        placeholder='Session'
        value={this.state.session}
        onChange={e=>this.change(e)}
        />
        <input
        style={inputStyle}
        name="year"
        placeholder='Year'
        value={this.state.year}
        onChange={e=>this.change(e)}
        />
        <br/>
        <input
        style={inputStyle}
        name="course"
        placeholder='Course'
        value={this.state.course}
        onChange={e=>this.change(e)}
        />
        <input
        style={inputStyle}
        name="section"
        placeholder='Section'
        value={this.state.section}
        onChange={e=>this.change(e)}
        />
        <input
        style={inputStyle}
        name="department"
        placeholder='Department'
        value={this.state.department}
        onChange={e=>this.change(e)}
        />
        <br/>
        <br/>

        <button disabled={isDisabled} style={buttonStyle} onClick={e => this.onSubmit(e)}>Submit</button>

      </form>
    )
  }

}
