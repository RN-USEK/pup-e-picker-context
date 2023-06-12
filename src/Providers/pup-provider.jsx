import React, { useState, useContext, useEffect } from 'react';
import { addDogToDb } from "../fetch/add-dog";
import { updateFavoriteForDog } from "../fetch/update-favorite";
import { deleteDogFromDb } from "../fetch/delete-dog-from-db";

const PupContext = React.createContext();

export const PupProvider = ({ children }) => {
  const [showComponent, setShowComponent] = useState("all-dogs");
  const [dogs, setDogs] = useState([]);

  const favoriteDogs = dogs.filter((dog) => dog.isFavorite);
  const unfavoriteDogs = dogs.filter((dog) => !dog.isFavorite);
  const favoriteDogCount = favoriteDogs.length;
  const unfavoriteDogCount = unfavoriteDogs.length;

  useEffect(() => {
    refetchDogs();
  }, []);

  const refetchDogs = () => {
    fetch("http://localhost:3000/dogs")
      .then((response) => response.json())
      .then(setDogs);
  };

  const addDog = (dog) => {
    addDogToDb({
      name: dog.name,
      description: dog.description,
      image: dog.image,
    }).then(() => {
      refetchDogs();
    });
  };

  const deleteDog = (dogId) => {
    deleteDogFromDb(dogId).then(() => refetchDogs());
  };

  const unfavoriteDog = (dogId) => {
    updateFavoriteForDog({ dogId, isFavorite: false }).then(() =>
      refetchDogs()
    );
  };

  const favoriteDog = (dogId) => {
    updateFavoriteForDog({ dogId, isFavorite: true }).then(() => refetchDogs());
  };

  const dogsData = {
    'all-dogs': dogs,
    'favorite-dogs': favoriteDogs,
    'unfavorite-dogs': unfavoriteDogs,
  }

  const onClickSections = (name) => {
    const modeValue = showComponent === name
      ? 'all-dogs'
      : name;
    setShowComponent(modeValue);
  }

  const pupActions = {
    refetchDogs,
    addDog,
    deleteDog,
    unfavoriteDog,
    favoriteDog,
    onClickSections,
  };

  return (
    <PupContext.Provider value={{ pupState: { dogsData,favoriteDogCount, unfavoriteDogCount, showComponent }, pupActions }}>
      {children}
    </PupContext.Provider>
  );
};

export const usePupContext = () => useContext(PupContext);
