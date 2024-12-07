import React from 'react';
import { Container } from 'react-bootstrap';
import YumyNavbar from './components/Navbar';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import FallingFruits from './components/FallingFruits';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SuggestImprovement from './components/SuggestImprovements';
import { ChatProvider } from './context/ChatContext';
import { MealProvider } from './context/MealsContext';
import { ArtefactProvider } from './context/ArtefactContext';
import { InformationsForProvider } from './context/InformationsForMeals';

function App() {
  return (
    <ArtefactProvider>
      <MealProvider>
        <InformationsForProvider>
          <ChatProvider>
            <BrowserRouter>
              <YumyNavbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/suggest-improvement" element={<SuggestImprovement />} />
              </Routes>
              <FallingFruits />
            </BrowserRouter>
          </ChatProvider>
        </InformationsForProvider>
      </MealProvider>
    </ArtefactProvider>
  );
}

export default App;