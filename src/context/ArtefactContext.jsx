import { createContext, useState, useRef, useEffect } from 'react';

const ArtefactContext = createContext();

const ArtefactProvider = ({ children }) => {
  const [isShowArtefact, setShowArtefact] = useState(false);

  const value = {
    isShowArtefact,
    setShowArtefact
  };

  return (
    <ArtefactContext.Provider value={value}>
      {children}
    </ArtefactContext.Provider>
  );
};

export { ArtefactProvider, ArtefactContext };