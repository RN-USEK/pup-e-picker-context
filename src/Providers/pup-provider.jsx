import React, { useState, useContext, useEffect } from 'react';
import { addDogToDb } from "../fetch/add-dog";
import { updateFavoriteForDog } from "../fetch/update-favorite";
import { deleteDogFromDb } from "../fetch/delete-dog-from-db";

const PupContext = React.createContext();

export const PupProvider = ({ children }) => {
  const [showComponent, setShowComponent] = useState("all-dogs");
  const [dogs, setDogs] = useState([]);
  const [favoriteDogCount, setFavoriteDogCount] = useState([]);
  const [unfavoriteDogCount, setUnFavoriteDogCount] = useState([]);

  useEffect(() => {
    setFavoriteDogCount(dogs.filter((dog) => dog.isFavorite).length);
    setUnFavoriteDogCount(dogs.filter((dog) => !dog.isFavorite).length);
  }, [dogs]);

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

  const unfavorited = dogs.filter((dog) => dog.isFavorite === false);
  const favorited = dogs.filter((dog) => dog.isFavorite === true);

  let filteredDogs = (() => {
    if (showComponent === "favorite-dogs") {
      return favorited;
    }

    if (showComponent === "unfavorite-dogs") {
      return unfavorited;
    }
    return dogs;
  })();

  const onClickFavorited = () => {
    if (showComponent === "favorite-dogs") {
      setShowComponent("all-dogs");
    } else {
      setShowComponent("favorite-dogs");
    }
  };

  const onClickUnfavorited = () => {
    if (showComponent === "unfavorite-dogs") {
      setShowComponent("all-dogs");
    } else {
      setShowComponent("unfavorite-dogs");
    }
  };

  const onClickCreateDog = () => {
    if (showComponent === "create-dog-form") {
      setShowComponent("all-dogs");
    } else {
      setShowComponent("create-dog-form");
    }
  };

  const pupActions = {
    refetchDogs,
    addDog,
    deleteDog,
    unfavoriteDog,
    favoriteDog,
    filteredDogs,
    onClickFavorited,
    onClickUnfavorited,
    onClickCreateDog,
  };

  return (
    <PupContext.Provider value={{ pupState: { dogs,favoriteDogCount, unfavoriteDogCount, showComponent }, pupActions }}>
      {children}
    </PupContext.Provider>
  );
};

export const usePupContext = () => useContext(PupContext);
