import React, { useEffect } from "react";
import "./App.css";
import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { Section } from "./Components/Section";
import "./fonts/RubikBubbles-Regular.ttf";
import { usePupContext } from './Providers/pup-provider';



function App() {
  const { pupState, pupActions } = usePupContext();
  const { showComponent } = pupState;
  const { refetchDogs, addDog } = pupActions;

  useEffect(() => {
    refetchDogs();
  }, []);

  return (
    <div className="App">
      <header>
        <h1>pup-e-picker</h1>
      </header>
      <Section label={"Dogs: "}>
        {["all-dogs", "favorite-dogs", "unfavorite-dogs"].includes(
          showComponent
        ) && (
          <Dogs/>
        )}
        {showComponent === "create-dog-form" && (
          <CreateDogForm addDog={addDog} />
        )}
      </Section>
    </div>
  );
}

export default App;
