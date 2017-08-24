import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import trialImageSRC from './trial.jpg'

class App extends React.Component {
    /** @namespace this.refs.gameCanvas */
    constructor (props) {
        super(props);
        this.state = {
            gameCanvasMouseDown: null,
            gameCanvasMoved: false,
            initialX: 0,
            initialY: 0
        };
        this.canvasMouseUp = this.canvasMouseUp.bind(this);
        this.canvasMouseDown = this.canvasMouseDown.bind(this);
        this.canvasMouseMove = this.canvasMouseMove.bind(this);
    }

    render () { return (
        <canvas
            ref="gameCanvas"
            onMouseUp={this.canvasMouseUp}
            onMouseDown={this.canvasMouseDown}
            onMouseMove={this.state.gameCanvasMouseDown ? this.canvasMouseMove : null}
            width="3000px"
            height="4200px" >
            You need to un-fuck yourself to run this
        </canvas>
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
        this.setState({gameCanvasMouseDown: false, gameCanvasMoved: false});
        console.log("Mouse Up");
    }

    canvasMouseDown (e) {
        e.preventDefault();
        this.setState({gameCanvasMouseDown: true});
        console.log("Mouse Down");
    }

    canvasMouseMove (e) {
        this.setState({gameCanvasMoved: true});
        console.log("Mouse Moving");
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

