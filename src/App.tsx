import { useState, useEffect } from "react";
import "./App.css";
import LightScreen from "./components/LightScreen";
import TopBar from "./components/TopBar";
import Controls from "./components/Controls";

function App() {
  // Initialize state directly from localStorage
  const [brightness, setBrightness] = useState(() => {
    const saved = localStorage.getItem("brightness");
    return saved ? Number(saved) : 100;
  });

  const [temperature, setTemperature] = useState(() => {
    const saved = localStorage.getItem("temperature");
    return saved ? Number(saved) : 5500;
  });

  const [controlsVisible, setControlsVisible] = useState(true);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("brightness", brightness.toString());
  }, [brightness]);

  useEffect(() => {
    localStorage.setItem("temperature", temperature.toString());
  }, [temperature]);

  const toggleControls = () => {
    setControlsVisible(!controlsVisible);
  };

  return (
    <div className="app">
      <LightScreen brightness={brightness} temperature={temperature} />
      <TopBar
        controlsVisible={controlsVisible}
        onToggleControls={toggleControls}
      />
      {controlsVisible && (
        <Controls
          brightness={brightness}
          temperature={temperature}
          onBrightnessChange={setBrightness}
          onTemperatureChange={setTemperature}
        />
      )}
    </div>
  );
}

export default App;
