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
  resultCount: number;
}

// Функция для поиска городов по имени
export const getCityByName = async (name = ""): Promise<CitiesResult> => {
  return fetch(`http://localhost:8000/cities/?city_name=${name}/`).then(
    (response) => response.json()
  );
};

// Функция для поиска города по ID
export const getCityById = async (id: number | string): Promise<CitiesResult> => {
  return fetch(`http://localhost:8000/cities/${id}/`).then(
    (response) => response.json()
  );
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