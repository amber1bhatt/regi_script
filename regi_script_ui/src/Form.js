import React from 'react';

export default class Form extends React.Component {
  state = {
    firstname: '',
    email: '',
    session: '',
    year: '',
    course: '',
    section: '',
    department: ''

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

    const styles = {
      transform: 'translate(0px, 35vh)',
    };

    const inputStyle = {
      border: '1px solid black',
      margin: '5px',
      borderRadius: '4px',
      padding: '6px 0px 6px 3px'
    };

    const buttonStyle = {
      border: '1px solid black',
      margin: '5px',
      borderRadius: '4px',
      padding: '3px 3px 3px 3px'
    }

    return (
      <form style={styles}>
        <input
        style={inputStyle}
        name="firstname"
        placeholder='First name'
        value={this.state.firstname}
        onChange={e=>this.change(e)}
        />
        <input
        style={inputStyle}
        name="email"
        placeholder='Email'
        value={this.state.email}
        onChange={e=>this.change(e)}
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

        <button style={buttonStyle} onClick={e => this.onSubmit(e)}>Submit</button>

      </form>
    )
  }

}
