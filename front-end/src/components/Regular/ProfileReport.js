import React, { Component } from 'react';

class ProfileReport extends Component{
	constructor(props){
		super(props)
		this.state = {
			category: "",
			details: "",
			user_id: this.props.user_id,
			restaurant_id: this.props.restaurant_id
		}

		this.handleAddReport = this.handleAddReport.bind(this)
		this.handleCategoryChange = this.handleCategoryChange.bind(this)
		this.handleDetailsChange = this.handleDetailsChange.bind(this)
	}

	handleAddReport(e){
		fetch('/add-report', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"category": this.state.category,
				"details": this.state.details,
				"user_id": this.state.user_id,
				"restaurant_id": this.state.restaurant_id
			})
		})
		.then(function(response){
			return response.json()
		}).then(function(body){
			console.log(body)
		});
		document.getElementById("reportForm").reset()
		this.props.setReportVisibilityToFalse()
	}

	handleCategoryChange(e){
		this.setState({
			category: e.target.value,
		})
	}

	handleDetailsChange(e){
		this.setState({
			details: e.target.value,
		})
	}

	componentWillMount(){
	    fetch("/check-session")
	    .then(function(response){
	      return response.json()})
	    .then((body) => {
	      if(body.statusCode === 200){
	        this.setState({
	          user_id: body.userData.user_id
	        })
	        console.log(body.userData)
	      }else{
	      	console.log('unauthorized')
	      }
	    }) 
	  }

	render(){
		return(
			<div>
				<form id="reportForm" className="report-div">
					<select className="report-select" onChange={this.handleCategoryChange}>
						<option style={{"display": "none"}} hidden>Select Value</option>
						<option value="closed">Closed</option>
						<option value="changedLocation">Changed Location</option>
						<option value="Changed Operating Hours">Changed Operating Hours</option>
						<option value="others">Others</option>
					</select>
					
					<br/>
					<br/>

					<textarea className="report-textarea" style={{"resize": "none"}} placeholder="details" onChange={this.handleDetailsChange}></textarea>

					<br/>
					<br/>
				</form>
				<div className="profile-buttons-div">
					<button className="profile-button" type="submit" onClick={this.handleAddReport}>Submit</button>
				</div>
			</div>
		)
	}
}

export default ProfileReport;