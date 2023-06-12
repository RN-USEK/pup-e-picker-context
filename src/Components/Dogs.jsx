import { DogCard } from "./DogCard";
import { usePupContext } from '../Providers/pup-provider';


// Right now these dogs are constant, but in reality we should be getting these from our server
// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)
export const Dogs = () => {
const { pupState: { showComponent, dogsData } } = usePupContext();
  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element
    <>
      {dogsData[showComponent].map((dog) => (
        <DogCard
          dog={dog}
          key={dog.id}
        />
      ))}
    </>
  );
}; 
