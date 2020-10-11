import React, { useRef, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

import './App.css';

const AddBoard = () => {
	const history = useHistory();
	const textInput = useRef(null);
	const [projects, setProject] = useState([]);

	const listItems = projects.map((projectName) => <option key={projectName}>{projectName}</option> );

	useEffect(() => {
		let projectList = localStorage.getItem("projectList");
		if (projectList) {
			let parsedProjectList = JSON.parse(projectList);
			setProject(parsedProjectList);
		}
	}, []);

	const handleProjectChange = (event) => {
		console.log(event.target.value);
		let selectproject = event.target.value;
		history.push(`/dashboard/${selectproject}`);
	};

	const addproject = (event) => {
		console.log(textInput.current.value);
		let projectName = textInput.current.value;
		if (projectName) {
			let projectList = localStorage.getItem("projectList");
			if (projectList) {
				let projectParsedList = JSON.parse(projectList);
				projectParsedList.push(projectName);
				localStorage.setItem("projectList", JSON.stringify(projectParsedList));
				history.push(`/dashboard/${projectName}`);
			} else {
				let projectArr = [];
				projectArr.push(projectName);
				localStorage.setItem("projectList", JSON.stringify(projectArr));
				history.push(`/dashboard/${projectName}`);
			}
		}
	};

	return (
		<div>
			<div className="l-lt-container">

			</div>
			<div className="l-rt-container">
				<h1>Boards</h1>
				<h2>Add New Board</h2>
				<div>
					<label>Board Name</label>
					<input type="text" ref={textInput}/>
					<button onClick={addproject}>Add</button>
				</div>
				
				{projects && projects.length ? <div>
					<h2>Your Boards</h2>
					<select name="selectproject" onChange={handleProjectChange}>
						{listItems}
					</select>
				</div> : ""}
			</div>
		</div>
	);
}

export default AddBoard;