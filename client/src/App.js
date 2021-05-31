import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import './App.css';
import Web3 from 'web3';
import { teacherAbi } from './abi/abis';

const web3 = new Web3(Web3.givenProvider);
const contractAddr='0x96A6F0BAeFA219Bc402fd5725fA2b22ce44e4410';
const teacher = new web3.eth.Contract(teacherAbi, contractAddr);

class App extends Component {
  state = {
    teachers: '',
    students: [],
    studId1: '',
    studId2: '',
    studId3: '',
    studId4: '',
    fName: '',
    lName: '',
    age: '',
    showLoader1: 'none',
    showLoader2: 'none',
    showLoader3: 'none',
    showLoader4: 'none',
    studentDetails: '',
    allstudents: [],
  };
  async componentDidMount() {
    const teachers = await teacher.methods.teachername().call();
    const students = await teacher.methods.countStudent().call(); 
    console.log(teachers);
    this.setState({students});
    this.setState({teachers});
    console.log(this.state.teachers)
  }


  onCreateStudent = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({ showLoader1: 'block' });
    await teacher.methods.addstudent(this.state.studId1, web3.utils.fromAscii(this.state.fName), web3.utils.fromAscii(this.state.lName)).send({
      from: accounts[0]
    });
    this.setState({ showLoader1: 'none' });
  };

  onIncrementAttendance = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({ showLoader2: 'block' });
    await teacher.methods.incrementAttendance(this.state.studId2).send({
      from: accounts[0]
    });
    this.setState({ showLoader2: 'none' });
  };

  onGetStudentDetails = async (event) => {
    event.preventDefault();
    //const accounts = await web3.eth.getAccounts();
    this.setState({ showLoader3: 'block' });
    var result = await teacher.methods.getOneStudent(this.state.studId3).call();
    // eslint-disable-next-line
    console.log(result)
    this.setState({ studentDetails: 'Mr/Mrs ' + web3.utils.toAscii(result[0]).replace(/\u0000/g, '') + ' ' + web3.utils.toAscii(result[1]).replace(/\u0000/g, '')   + ' has attended ' + result[2]+ ' classes'});

    this.setState({ showLoader3: 'none' });
  };

  onGetAllStudentDetails = async (event) => {
    event.preventDefault();
    //const accounts = await web3.eth.getAccounts();
    this.setState({ showLoader4: 'block' });
    var result = await teacher.methods.getAllStudent().call();
    this.setState({ allstudents:'Roll No. of students:'+' ' + result});
    this.setState({ showLoader4: 'none' });
  };

  onCountStudent = async (event) => {
    event.preventDefault();
    //const accounts = await web3.eth.getAccounts();
    this.setState({ showLoader5: 'block' });
    var result = await teacher.methods.getOneStudent().call();
    this.setState({ studentDetails:'Total student count is'+  result});
    this.setState({ showLoader5: 'none' });
  };

  render() {
    return (
      <div style={{paddingLeft:"550px"}}>
      <Card style={{paddingLeft:"50px", width: "400px", backgroundColor:"white"}}>
      <Card.Title className="text-center" >
                 </Card.Title>
        <h1>Attendance Sheet</h1>
        <p>
          This contract is owned by teacher with address {this.state.teachers} .
          <br/>
          There are currently {this.state.students} students in this sheet.
        </p>
        <hr/>
        <Card.Body  style={{width: "400px"}}>
        <div class="container">
          <h2>Student Creation</h2>   
          <label for="studId1" class="col-lg-2 control-label">Student ID</label>
          <input id="studId1" value={this.state.studId1} onChange={event => this.setState({studId1: event.target.value})} type="text"/>
          <br></br>
          <label for="fName" class="col-lg-2 control-label">First Name</label>
          <input id="fName" value={this.state.fName} onChange={event => this.setState({fName: event.target.value})} type="text"/>
          <br></br>
          <label for="lName" class="col-lg-2 control-label">Last Name</label>
          <input id="lName" value={this.state.lName} onChange={event => this.setState({lName: event.target.value})} type="text"/>
          <br></br>
          <label for="age" class="col-lg-2 control-label">Student Age</label>
          <input id="age" value={this.state.age} onChange={event => this.setState({age: event.target.value})} type="text"/>
          <br></br>
          <button onClick={this.onCreateStudent}>Create Student</button>
          <hr/>
        </div>
        <div class="container">
            <h2>Increment Attendance</h2> 
            <label for="studId2" class="col-lg-2 control-label">Student ID</label>
            <input id="studId2" value={this.state.studId2} onChange={event => this.setState({studId2: event.target.value})} type="text"/>
            <br></br>
            <button onClick={this.onIncrementAttendance}>Increment Attendance</button>
            <hr/>
        </div>
        <div class="container">
            <h2>View Student Details</h2>
            
            <label for="studId3" class="col-lg-2 control-label">Student ID</label>
            <input id="studId3" value={this.state.studId3} onChange={event => this.setState({studId3: event.target.value})} type="text"/>
            <br></br>
            <button onClick={this.onGetStudentDetails}>Check</button>
            <br></br>
            <span>{this.state.studentDetails}</span>
            <hr/>
        </div>
        <div class="container">
            <h2>View All Student </h2>
            <button onClick={this.onGetAllStudentDetails}>View</button>
            <br></br>
            <span>{this.state.allstudents}</span>
            <hr/>
        </div>
        </Card.Body>
        </Card>
        </div>
    );
  }
}

export default App;
