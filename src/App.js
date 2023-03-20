import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import classNames from 'classnames';

// me: declaration of javascript array of 40 random muted colors, excluding yellowish hues
// ChatGPT: Sure, here's an example of how you can declare a JavaScript array of 40 random muted colors, excluding yellowish hues:
const mutedColors = [];
const hueRanges = [
  [0, 30],    // Reddish hues
  [31, 60],   // Orangish hues
  [61, 150],  // Greenish hues
  [151, 210], // Bluish hues
  [211, 260], // Purplish hues
  [261, 330]  // Pinkish hues
];
while (mutedColors.length < 40) {
  const hueRange = hueRanges[Math.floor(Math.random() * hueRanges.length)];
  const hue = hueRange[0] + Math.floor(Math.random() * (hueRange[1] - hueRange[0] + 1));
  const saturation = Math.floor(Math.random() * 51) + 50; // Between 50 and 100
  const lightness = Math.floor(Math.random() * 26) + 40; // Between 40 and 65
  const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  if (!color.includes("yellow")) { // [I can't imagine that this does anything]
    mutedColors.push(color);
  }
}

function randomColor() {
  return mutedColors[Math.floor(Math.random() * mutedColors.length)]
}

const Menu = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <div className="relative">
      <button
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onMouseEnter={() => setShowMenu(true)}
      >
        Menu
      </button>
      {showMenu && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
          onMouseLeave={() => setShowMenu(false)}
        >
          <div className="py-1" onClick={() => setShowMenu(false)}>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 bg-gray hover:bg-blue-800 hover:text-gray-900"
            >
              Home
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              About
            </a>
          </div>
        </div>
      )}
    </div>
  );
};



const App = () => {
  function Square(props) {   
    // every Square has its own color and its own color picker
    const [color, setColor] = useState(randomColor());

    const ColorPicker = () => {
      const [showColorPicker, setShowColorPicker] = useState(false);


      const ColorPickerSwatch = (props) => {
        const myColor = mutedColors[props.index];
        return (
          <div
          className='rounded-lg'
          style={{
            width: 25,
            height: 25,
            backgroundColor: myColor
          }} 
            onClick={() => setColor(myColor)}
            >
          </div>
        );
      }
      const c1 = randomColor();

      return (
        <div className="relative">
          <button
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onMouseEnter={() => setShowColorPicker(true)}
          >
            ColorPicker
          </button>
          {showColorPicker && (
            <div
            className="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
             >
              <tbody>
                <tr>
                  <td>
                    <ColorPickerSwatch key={0} index={0}></ColorPickerSwatch>
                  </td>
                  <td>
                    <ColorPickerSwatch key={1} index={1}></ColorPickerSwatch>
                  </td>
                </tr>
                <tr>
                  <td>
                    <ColorPickerSwatch key={2} index={2}></ColorPickerSwatch>
                  </td>
                  <td>
                    <ColorPickerSwatch key={3} index={3}></ColorPickerSwatch>
                  </td>
                </tr>
              </tbody>
            </div>
          )}
        </div>
      );
    };
 
    return (
      <>
        <div
        style={{
          width: 100,
          height: 100,
          backgroundColor: color
        }} >
        {props.idx}
        </div>
        <div>
          <button onClick={() => setColor(randomColor())}>Change Color</button>
        </div>
        <div className="container mx-auto">
          <ColorPicker />
        </div>
      </>
    );
  };

  const [ squares, setSquares ] = useState([]);
  function addSquare() {
    let newSquares = squares
    const index = squares.length
    setSquares(newSquares.concat(<Square key={index} idx={index} />));
  }


  return (
    <>
      <div>
        <table>
          <tbody>
          <tr>
            {squares.map((sq, index) => {
              return(<td key={index}>{sq}</td>)
            })}
          </tr>
          </tbody>
        </table>
        <button onClick={() => addSquare()}>Add box</button>
      </div>
      <div className="container mx-auto">
          <Menu />
        </div>
    </>
  );


} //end of APP

export default App;
