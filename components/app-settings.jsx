import * as React from "react";

const SettingsContext = React.createContext();

export const useSettings = () => {
  const context = React.useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = React.useState({
    maxResults: 5,
    threshold: 20,
    processor: "GPU",
    model: "pose_landmarker_full",
  });

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext };