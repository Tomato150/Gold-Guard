import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Layer, Stage, Image} from 'react-konva';

import trialImageSRC from './trial.jpg'

class GameMapImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {image: null}
    }

    render () {return(
        <Image
            draggable="true"
            image={this.state.image}
            onMouseDown={function (e) {console.log(e)}}
        />
    )}

    componentDidMount () {
        const image = new window.Image();
        image.src = trialImageSRC;
        image.onload = () => {
            this.setState({image: image})
        };
    }
}

class App extends React.Component {
    constructor (props) {
        super(props);
    }

    render () { return (
        <Stage width={100} height={100}>
            <Layer>
                <GameMapImage/>
            </Layer>
        </Stage>
    )}
}

ReactDOM.render(<App />, document.getElementById('root'));

