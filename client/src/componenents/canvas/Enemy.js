import React, { Component } from 'react';
import enemy from '../../assets/dog.png';
import { withInterfaceStore } from '../../shared/InterfaceStore';

class Enemy extends Component {
    constructor(){
        super()

        this.state = {
            left:0,
            top:0,
            intervalID: ''
        }
    }
    //starts movement interval on load
    componentDidMount() {
        this.trigger()
    }

    //Triggers dog movement on a timer.  Timer is incremented by "intervalSpeed" from props.
    trigger = () => {
        this.setState({
            intervalID: setInterval(() => { 
                this.trackingMovement()
            }, `${this.props.intervalSpeed}`)
        })
    }

    //stops the interval when you leave the page
    componentWillUnmount() {
        clearInterval(this.state.intervalID)
    }

    //Tracks player position via props and moves enemy towards player.
    trackingMovement = () => {
        const { playerTop, playerLeft } = this.props 
        const { left, top } = this.state 
        if((playerLeft < left) && (playerTop < top) ){
                this.moveUp()
                this.moveLeft()
        }
        else if((playerLeft > left) && (playerTop > top)){
                this.moveDown()
                this.moveRight()
        }
        else if ((playerLeft < left) && (playerTop > top)){
                this.moveDown()
                this.moveLeft()
        } 
        else if((playerLeft > left) && (playerTop < top)){
                this.moveUp()
                this.moveRight()
        }
        else if((playerLeft === left) && (playerTop < top)){
                this.moveUp()
        }
        else if ((playerLeft === left) && (playerTop > top)){
                this.moveDown()
        }
        else if ((playerLeft < left) && (playerTop === top)){
                this.moveLeft()
        }
        else if ((playerLeft > left) && (playerTop === top)){
                this.moveRight()
        }
        //Checks to see if enemy reaches player.
        this.checkCollision()
        //Stops interval to allow state to update interval speed.
        clearInterval(this.state.intervalID)
        //Runs trigger/interval with same speed, or with new speed if updated.
        this.trigger();
    }

    //Enemy movement.  If statement values are based off the size of the game canvas.
    moveDown = () => {
        if(this.state.top < 380) {
        this.setState(prevState => ({
            top: prevState.top + 1
        }), () => {
            const enemy = document.getElementById('enemy')
            enemy.style.top = `${this.state.top}px`
        })
        }
    }

    moveUp = () => {
        if(this.state.top > 0) {
        this.setState(prevState => ({
            top: prevState.top - 1
        }), () => {
            const enemy = document.getElementById('enemy')
            enemy.style.top = `${this.state.top}px`
        })
        }
    }

    moveRight = () => {
        if(this.state.left < 380) {
        this.setState(prevState => ({
            left: prevState.left + 1
        }), () => {
            const enemy = document.getElementById('enemy')
            enemy.style.left = `${this.state.left}px`
        })
    }
    }

    moveLeft = () => {
        if(this.state.left > 0) {
        this.setState(prevState => ({
            left: prevState.left - 1
        }), () => {
            const enemy = document.getElementById('enemy')
            enemy.style.left = `${this.state.left}px`
        })
    }
    }

    //Checks player position against enemy posistion and if they are within a specific range, it route's to endgame page.
    checkCollision = () => {
        const { playerTop, playerLeft } = this.props
        if ((Math.abs((playerTop + 30) - (this.state.top + 40)) <= 55) && (Math.abs((playerLeft + 30) - (this.state.left + 40)) <= 55)) {
            setTimeout(() => {
                this.props.history.push('/gameover')     
            }, 500)
        }
    }

    render() {
        return (
            <img id="enemy" src={enemy} alt="avoid this guy!"/>
        );
    }
}

export default withInterfaceStore(Enemy);