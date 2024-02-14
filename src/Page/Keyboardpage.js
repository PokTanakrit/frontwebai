import React, { useRef, useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./styles.css"; // Your custom styles (optional)
import thaiLayout from "simple-keyboard-layouts/build/layouts/thai";


function KeyboardPage() {
  const [input, setInput] = useState("");
  const [layout, setLayout] = useState("default");
  const keyboard = useRef(null);

  const onChange = (input) => {
    setInput(input);
    console.log("Input changed", input);
  };

  const handleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  };

  const onKeyPress = (button) => {
    console.log("Button pressed", button);

    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  const onChangeInput = (event) => {
    const input = event.target.value;
    setInput(input);
  };

  return (
    <div className="KeyboardPage">
      <input
        value={input}
        placeholder={"Type something..."}
        onChange={onChangeInput}
      />
      <Keyboard
        keyboardRef={keyboard}
        layoutName={layout}
        layouts={{ // Add the Thai layout
          thai: thaiLayout,
        }}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </div>
  );
}

export default KeyboardPage;
