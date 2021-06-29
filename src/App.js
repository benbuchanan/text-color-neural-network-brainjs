import './App.css';
import React, { useState } from 'react';
import brain from 'brain.js/src';

function App() {
    const [color, setColor] = useState({ r: 0.35, g: 0.65, b: 1 });
    const [confidence, setConfidence] = useState(0);
    const [guessColor, setGuessColor] = useState('black');
    const [trainingData, setTrainingData] = useState([
        { input: { r: 1, g: 1, b: 1 }, output: { black: 1 } },
        { input: { r: 0, g: 0, b: 0 }, output: { white: 1 } },
    ]);
    const [config] = useState({
        hiddenLayers: [7],
    });
    const [net, setNet] = useState(new brain.NeuralNetwork());

    // const net = new brain.NeuralNetwork();

    function newColor() {
        let rVal = Math.random();
        let gVal = Math.random();
        let bVal = Math.random();
        let newColorVal = { r: rVal, g: gVal, b: bVal };
        return newColorVal;
    }

    function whiteClicked() {
        let tempData = trainingData;
        tempData.push({
            input: { r: color.r, g: color.g, b: color.b },
            output: { white: 1 },
        });
        setTrainingData(tempData);
        net.train(trainingData);
        setColor(newColor());
        const output = net.run({ r: color.r, g: color.g, b: color.b });
        if (output.black > output.white) {
            setGuessColor('black');
            setConfidence(output.black);
        } else {
            setGuessColor('white');
            setConfidence(output.white);
        }
    }

    function blackClicked() {
        let tempData = trainingData;
        tempData.push({
            input: { r: color.r, g: color.g, b: color.b },
            output: { black: 1 },
        });
        setTrainingData(tempData);
        net.train(trainingData);
        setColor(newColor());
        const output = net.run({ r: color.r, g: color.g, b: color.b });
        if (output.black > output.white) {
            setGuessColor('black');
            setConfidence(output.black);
        } else {
            setGuessColor('white');
            setConfidence(output.white);
        }
    }

    function showTrainingData() {
        console.log(trainingData);
    }

    return (
        <div className='App'>
            <div className='container'>
                <div
                    style={{
                        backgroundColor: `rgb(${color.r * 255}, ${
                            color.g * 255
                        }, ${color.b * 255})`,
                        width: '100vw',
                        height: '100vh',
                    }}
                    className='box'
                >
                    <div className='text-container'>
                        <p className='white'>
                            This is the <strong>white</strong> text
                        </p>
                        <p className='guess' style={{ color: guessColor }}>
                            The network's <strong>Guess</strong>
                        </p>
                        <p className='black'>
                            This is the <strong>black</strong> text
                        </p>
                    </div>
                    <div>
                        <h3 style={{ color: guessColor }}>
                            Train the neural network by selecting the color that
                            looks best
                        </h3>
                        <p style={{ color: guessColor }}>
                            Network's confidence:{' '}
                            {(confidence * 100).toFixed(2)}%
                        </p>
                    </div>
                    <div className='button-container'>
                        <button
                            onClick={whiteClicked}
                            className='buttons white-button'
                        >
                            White
                        </button>
                        <button
                            onClick={blackClicked}
                            className='buttons black-button'
                        >
                            Black
                        </button>
                    </div>
                    <button
                        className='small-button'
                        onClick={showTrainingData}
                        style={{ color: guessColor }}
                    >
                        Print Data to Console
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
