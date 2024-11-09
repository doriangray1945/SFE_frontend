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


export const CitiesList = async (name: string): Promise<CitiesResult> => {
  const response = await fetch(`/api/cities/?city_name=${name}`);
  const data = await response.json();
  console.log("OOOOhhhO", data);
  return data
};


export const GetCityById = async (id: number | string): Promise<City> => {
  const response = await fetch(`/api/cities/${id}/`);
  const data = await response.json();
  console.log("OOOO0000O", data);
  return data
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