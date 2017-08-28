import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Layer, Stage, Image} from 'react-konva';

import trialImageSRC from './game_map.png'

class GameMapImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {image: null};
        this.dragBounds = this.dragBounds.bind(this);
    }

    render () {
        return (
            <Image
                draggable="true"
                dragBoundFunc={this.dragBounds}
                image={this.state.image}
                onClick={this.props.clickEvent}
            />
        )
    }

    componentDidMount () {
        const image = new window.Image();
        image.src = trialImageSRC;
        image.onload = () => {
            this.setState({image: image})
        };
    }

    dragBounds (pos) {
        let newX, newY;
        let mainStage = this.props.mainStage.getStage();

        if (pos.x > 0) {
            newX = 0;
        } else if (pos.x < -(this.state.image.width * mainStage.scaleX()) + window.innerWidth) {
            newX = -(this.state.image.width * mainStage.scaleX()) + window.innerWidth;
        } else {newX = pos.x;}

        if (pos.y > 0) {
            newY = 0;
        } else if (pos.y < -(this.state.image.height * mainStage.scaleX()) + window.innerHeight) {
            newY = -(this.state.image.height * mainStage.scaleX()) + window.innerHeight;
        } else {newY = pos.y}

        return {
            x: newX,
            y: newY
        }
    }
}

class App extends React.Component {
    constructor (props) {
        super(props);
        this.mouseWheel = this.mouseWheel.bind(this);
        this.gameMapImageClick = this.gameMapImageClick.bind(this);
        this.state = {stageElement: null}
    }

    render () { return (
        <div style={{width: "100vw", height: "100vh", overflowX: 'hidden', overflowY: 'hidden', position: "absolute"}}>
            <Stage ref="mainStage" width={3000} height={4200} onWheel={this.mouseWheel}>
                <Layer>
                    <GameMapImage mainStage={this.state.stageElement} clickEvent={this.gameMapImageClick} />
                </Layer>
            </Stage>
        </div>
    )}

    componentDidMount () {
        this.setState({stageElement: this.refs.mainStage});
    }

    mouseWheel (e) {
        let scaleBy = 1.05;

        let mainStage = this.refs.mainStage.getStage();
        let oldScale = mainStage.scaleX();

        let mousePointTo = {
            x: mainStage.getPointerPosition().x / oldScale - mainStage.x() / oldScale,
            y: mainStage.getPointerPosition().y / oldScale - mainStage.y() / oldScale,
        };

        let newScale = e.evt.deltaY < 0 ? Math.min(2, oldScale * scaleBy) : Math.max(0.5, oldScale / scaleBy); // Min Max for zooms hard coded here.
        mainStage.scale({ x: newScale, y: newScale });

        let newPos = {
            x: -(mousePointTo.x - mainStage.getPointerPosition().x / newScale) * newScale,
            y: -(mousePointTo.y - mainStage.getPointerPosition().y / newScale) * newScale
        };

        mainStage.position(newPos);
        mainStage.batchDraw();
        console.log(mainStage.position())
    }

    gameMapImageClick (e) {
        let mainStage = this.refs.mainStage.getStage();
        console.log("X: ");
        console.log(mainStage.position())
    }
}



ReactDOM.render(<App />, document.getElementById('root'));

