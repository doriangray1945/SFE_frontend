export interface City {
  city_id: number;
  name: string;
  population: string; 
  salary: string; 
  unemployment_rate: string; 
  description: string; 
  url: string;
}

export interface CitiesResult {
  cities: City[];
}

// Функция для поиска городов по имени
export const CitiesList = async (name = ""): Promise<CitiesResult> => {
  const response = await fetch(`api/cities/?city_name=${name}`);
  console.log("OOOOhhhO", response);
  return response.json()
};

// Функция для поиска города по ID
export const GetCityById = async (id: number | string): Promise<City> => {
  const response = await fetch(`http://localhost:8000/cities/${id}`);
  if (response.ok) {
    console.log("OOOOOOO", response);
  }
  return response.json();
};











/*export interface ITunesMusic {
    wrapperType: string;
    artworkUrl100: string;
    artistName: string;
    collectionCensoredName: string;
    trackViewUrl: string;
    collectionId: number;
  }
  export interface ITunesResult {
    resultCount: number;
    results: ITunesMusic[];
  }
  
  /*export const getMusicByName = async (name = ""): Promise<ITunesResult> => {
    return fetch(`https://itunes.apple.com/search?term=${name}`).then(
      (response) => response.json()
    );
  };*//*

  export const getMusicByName = async (name = ""): Promise<ITunesResult> => {
    return fetch(`https://localhost:8000/cities/city_name?${name}`).then(
      (response) => response.json()
    );
  };
  
  export const getAlbumById = async (
    id: number | string
  ): Promise<ITunesResult> => {
    return fetch(`https://itunes.apple.com/lookup?id=${id}`).then(
      (response) => response.json()
    );
  };*/