import React from 'react';
import ReactDOM from 'react-dom';
import 'react-konva';
import './index.css';

import trialImageSRC from './trial.jpg'

class App extends React.Component {
    /** @namespace this.refs.gameCanvas */
    constructor (props) {
        super(props);
        this.state = {
            gameCanvasMouseDown: null,
            gameCanvasMoved: false,
            gameCanvasX: 0,
            gameCanvasY: 0,
            adjustedX: 0,
            adjustedY: 0,
            downX: 0,
            downY: 0
        };
        this.canvasMouseUp = this.canvasMouseUp.bind(this);
        this.canvasMouseDown = this.canvasMouseDown.bind(this);
        this.canvasMouseMove = this.canvasMouseMove.bind(this);
    }

    render () { return (
        <div style={{width: "100vw", height:"100vh", overflow: "hidden"}}>
            <canvas
                ref="gameCanvas"
                onMouseUp={this.canvasMouseUp}
                onMouseDown={this.canvasMouseDown}
                onMouseMove={this.state.gameCanvasMouseDown ? this.canvasMouseMove : null}
                width="3000px"
                height="4200px"
                style={{top: this.state.gameCanvasY, left: this.state.gameCanvasX, position: "relative"}}>
                You need to un-fuck yourself to run this
            </canvas>
        </div>
    )}

    componentDidMount () {
        const ctx = this.refs.gameCanvas.getContext('2d');

        const image = new window.Image();
        image.src = trialImageSRC;
        image.onload = () => {
            ctx.drawImage(image, 0, 0)
        }
    }

    canvasMouseUp (e) {
        e.preventDefault();
        if (!this.state.gameCanvasMoved) {
            // preform click action here
        }
        let canvasX = this.state.gameCanvasX + this.state.adjustedX;
        let canvasY = this.state.gameCanvasY + this.state.adjustedY;
        this.setState({
            gameCanvasMouseDown: false,
            gameCanvasMoved: false,
            gameCanvasX: canvasX,
            gameCanvasY: canvasY,
        });
        console.log("Mouse Up");
    }

    canvasMouseDown (e) {
        e.preventDefault();
        this.setState({
            gameCanvasMouseDown: true,
            gameCanvasX: this.state.gameCanvasX + this.state.adjustedX,
            gameCanvasY: this.state.gameCanvasY + this.state.adjustedY,
            downX: e.pageX,
            downY: e.pageY
        });
        console.log("Mouse Down");
    }

    canvasMouseMove (e) {
        // Only fired if the mouse is down
        e.preventDefault();
        this.setState({
            gameCanvasMoved: true,
            adjustedX: (e.pageX - this.state.downX),
            adjustedY: -(e.pageY - this.state.downY),
        });
        console.log("Mouse Moving");
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

