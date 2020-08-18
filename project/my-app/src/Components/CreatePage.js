import React, { Component } from 'react';
// import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class CreatePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            empid: '',
            empname: '',
            empstatus: false
        };
        this.saveform = this.saveform.bind(this);
        this.saveempstatus = this.saveempstatus.bind(this);
        this.saveempname = this.saveempname.bind(this);
        this.saveempid = this.saveempid.bind(this);
    }
    saveform(e){
        var reactHandler = this;
        const newdata = {
            emp_ID: this.state.empid,
            emp_Name: this.state.empname,
            emp_status: this.state.empstatus
        }
        axios.post('http://localhost:4000/home/add', newdata)
            .then(res => {
                console.log(res);
                reactHandler.props.history.push("/");
            })
            .catch(error => {
                console.log(error);
            });

    }
    saveempstatus(e){
        var temp;
        if(e.target.value === "Active"){
            temp = true;
        }else{
            temp = false;
        }
        this.setState({
            empstatus: temp
        });
    }
    saveempname(e){
        var temp = e.target.value;
        this.setState({
            empname: temp
        });
    }
    saveempid(e){
        var temp = e.target.value;
        this.setState({
            empid: temp
        });
    }
    render(){
        const formHTML =  
        <div>
            <Row>
                <Col><h2>Create Page</h2></Col>
            </Row>
            <Row>
                <Col><label>Employee ID</label></Col>
                <Col><input type="text" id="empid" value={this.state.empid} onChange={this.saveempid}></input></Col>
            </Row>
            <Row>
                <Col><label>Employee Name</label></Col>
                <Col><input type="text" id="empname" value={this.state.empname} onChange={this.saveempname}></input></Col>
            </Row>
            <Row>
                <Col><label>Employee Status</label></Col>
                <Col>
                    <input type="radio" id="empstatusActive" value="Active" name="status" onChange={this.saveempstatus}></input>
                    <label>Active</label>
                    <input type="radio" id="empstatusInactive" value="Inactive" name="status" onChange={this.saveempstatus}></input>
                    <label>Inactive</label>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button onClick={this.saveform} >Save Form</Button>
                </Col>
            </Row>
            </div>;
        
        return(
            <div>
                {formHTML}
            </div>
        );
    }
}

export default CreatePage;