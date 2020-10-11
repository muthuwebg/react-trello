import './App.css';

import React, { Component } from 'react';
import Board from 'react-trello';

const data = require('./data.json')

const handleDragStart = (cardId, laneId) => {
  console.log('drag started')
  console.log(`cardId: ${cardId}`)
  console.log(`laneId: ${laneId}`)
}

const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
  console.log('drag ended')
  console.log(`cardId: ${cardId}`)
  console.log(`sourceLaneId: ${sourceLaneId}`)
  console.log(`targetLaneId: ${targetLaneId}`)
}

class Dashboard extends Component {
  state = { boardData: { lanes: [] } }

  setEventBus = (eventBus) => {
    this.setState({ eventBus })
  }

  async componentWillMount() {
    const { match: { params } } = this.props;
    console.log(params);
    let projectName = params.id;
    this.setState({ projectName: projectName })
    const response = await this.getBoard(projectName)
    this.setState({ boardData: response })
    console.log(this.state);
  }

  getBoard(boardName) {
    return new Promise((resolve) => {
      let localData = localStorage.getItem(boardName);
      if (localData) {
        let parsedData = JSON.parse(localData);
        resolve(parsedData)
      } else {
        console.log("NolocalData");
        resolve(data)
      }
    })
  }

  completeCard = () => {
    this.state.eventBus.publish({
      type: 'ADD_CARD',
      laneId: 'COMPLETED',
      card: {
        id: 'Milk',
        title: 'Buy Milk',
        label: '15 mins',
        description: 'Use Headspace app',
      },
    })
    this.state.eventBus.publish({
      type: 'REMOVE_CARD',
      laneId: 'PLANNED',
      cardId: 'Milk',
    })
  }

  addCard = () => {
    this.state.eventBus.publish({
      type: 'ADD_CARD',
      laneId: 'BLOCKED',
      card: {
        id: 'Ec2Error',
        title: 'EC2 Instance Down',
        label: '30 mins',
        description: 'Main EC2 instance down',
      },
    })
  }

  shouldReceiveNewData = (nextData) => {
    console.log('New card has been added')
    console.log(nextData)
    localStorage.setItem(this.state.projectName, JSON.stringify(nextData));
  }

  handleCardAdd = (card, laneId) => {
    console.log(`New card added to lane ${laneId}`)
    console.dir(card)
  }

  handleAddLane = (params) => {
    console.log(localStorage);
    console.log(`handleAddLane ${params}`)
  }

  changeBoard = () => {
    console.log(this.props.history);
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h3>React Trello With LocalStorage</h3>
          <button onClick={this.changeBoard}>
            Go To Board
          </button>
        </div>
        <div className="App-intro">
          <Board
            editLaneTitle={true}
            canAddLanes
            collapsibleLanes
            editable={true}
            onCardAdd={this.handleCardAdd}
            data={this.state.boardData}
            draggable
            onDataChange={this.shouldReceiveNewData}
            eventBusHandle={this.setEventBus}
            handleDragStart={handleDragStart}
            handleDragEnd={handleDragEnd}
            onLaneAdd={this.handleAddLane}
          />
        </div>
      </div>
    )
  }
}

export default Dashboard
