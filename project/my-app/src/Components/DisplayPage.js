import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

class DisplayPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
        this.redirectoEditPage = this.redirectoEditPage.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }
    componentWillMount(){
        // axios.get('http://localhost:4000/home')
        //         .then(res => {
        //             console.log(res.data);
        //             this.setState({
        //                 data: res.data
        //             })
        //         });
                this.getData();
    }
    getData(){
        axios.get('http://localhost:4000/home')
                .then(res => {
                    console.log(res.data);
                    this.setState({
                        data: res.data
                    })
                });
    }
    redirectoEditPage(e){
        console.log(e);
        var itemID = "/edit/" + e.target.dataset.id;
        this.props.history.push(itemID);
    }
    deleteItem(e){
        var reactHandler = this;
        var requrl = "http://localhost:4000/home/delete/" + e.target.dataset.id;
        axios.delete(requrl)
            .then(res => {
                console.log(res)
                reactHandler.getData();
            })
    }
    render(){
        const formHTML = this.state.data.filter((value, key)=>{
            return (typeof(value.emp_ID) !== typeof(undefined))
        })
        .map((value, key)=> {
            var statusValue;
            if(value.emp_status){
                statusValue = "Active";
            }
            else{
                statusValue = "Inactive";
            }
            return(
                <Row key={key}>
                    <Col>Employee ID</Col>
                    <Col>{value.emp_ID}</Col>
                    <Col>Employee Name</Col>
                    <Col>{value.emp_Name}</Col>
                    <Col>Employee Status</Col>
                    <Col>{statusValue}</Col>
                    <Col><Button data-id={value._id} onClick={this.redirectoEditPage} >Edit</Button></Col>
                    <Col><Button data-id={value._id} onClick={this.deleteItem} >Delete</Button></Col>
                </Row>
            )
        });
        return(
            <div>
                <Row>
                    <Col>
                        <h2>Home Page</h2>
                    </Col>
                </Row>
                {formHTML}
            </div>
        );
    }
}

export default DisplayPage;