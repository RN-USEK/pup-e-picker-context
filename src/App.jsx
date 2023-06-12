import "./App.css";
import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { Section } from "./Components/Section";
import "./fonts/RubikBubbles-Regular.ttf";
import { usePupContext } from './Providers/pup-provider';

function App() {
  const { pupState: { showComponent }} = usePupContext();

  return (
    <div className="App">
      <header>
        <h1>pup-e-picker</h1>
      </header>
      <Section label={"Dogs: "}>
        {showComponent !== "create-dog-form" && (
          <Dogs/>
        )}
        {showComponent === "create-dog-form" && (
          <CreateDogForm />
        )}
      </Section>
    </div>
  );
}

export default App;
