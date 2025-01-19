import { ScrollView, Text, Button, TextInput } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setCities } from '@/app/store/slices/citiesSlice';
import axios from 'axios';
import { URI, URI_minio } from '../config';
import CityCard from '../components/CityCard/CityCard'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CitiesPage({ navigation }) {
    const  dispatch = useDispatch();
    const cities = useSelector((state) => state.cities.cities);

    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (query) => {
        setSearchValue(query);
    }

    useEffect(() => {
        async function getCitiesList() {
            try {
                const response = await axios.get(`${URI}/cities/?city_name=${searchValue}`);
                const updatedCities = response.data.cities.map((item) => ({
                    ...item,
                    url: item.url.replace("http://localhost:9000", `${URI_minio}`)
                }))
                dispatch(setCities(updatedCities));
            } catch (error) {
                console.error("Ошибка при получении списка городов:", error);
            }
        }
        getCitiesList();
    }, [dispatch, searchValue])

    return (
        <SafeAreaView>
            <ScrollView>
                <TextInput
                    placeholder='Поиск'
                    value={searchValue}
                    onChangeText={(text) => handleSearch(text)}
                />
                {cities.map((item) => (
                    <CityCard key={item.city_id} {...item} navigation={navigation}/>
                ))}
                <Text>CitiesPage</Text>
            </ScrollView>
        </SafeAreaView>
    );
}