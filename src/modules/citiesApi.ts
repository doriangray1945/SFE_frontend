import { api } from '../api'

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
  draft_vacancy_application: number,
  count: number
}

export interface VacancyApplication {
  app_id: number,
  city_id: City[],
  count: number
}


export const CitiesList = async (name: string): Promise<CitiesResult> => {
  const response = await fetch(`/api/cities/?city_name=${name}`);
  const data = await response.json();
  return data
};


export const GetCityById = async (city_id: number | string): Promise<City> => {
  const response = await fetch(`/api/cities/${city_id}/`);
  const data = await response.json();
  return data
};


export const GetVacancyApplicationById = async (app_id: number | string): Promise<VacancyApplication> => {
  const response = await fetch(`/api/vacancy_applications/${app_id}/`);
  const data = await response.json();
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