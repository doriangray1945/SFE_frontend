import { ScrollView, Text, TouchableOpacity, TextInput, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setCities } from '@/app/store/slices/citiesSlice';
import axios from 'axios';
import { URI, URI_minio } from '../config';
import CityCard from '../components/CityCard'
import Header from '../components/Header';


export default function CitiesPage({ navigation }) {
    const  dispatch = useDispatch();
    const cities = useSelector((state) => state.cities.cities);

    const [searchValue, setSearchValue] = useState(null);

    const handleSearch = () => {
        getCitiesList();
    }

    async function getCitiesList() {
        try {
            const query = searchValue ? searchValue : '';
            const response = await axios.get(`${URI}/cities/?city_name=${query}`);
            const updatedCities = response.data.cities.map((item) => ({
                ...item,
                url: item.url.replace("http://localhost:9000", `${URI_minio}`)
            }))
            dispatch(setCities(updatedCities));
        } catch (error) {
            console.error("Ошибка при получении списка городов:", error);
        }
    }

    useEffect(() => {
        getCitiesList();
    }, [dispatch])

    return (
        <View style={styles.safeArea}>
            <Header/>
            <ScrollView style={styles.scrollView}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Города для размещения Вашей вакансии</Text>
                </View>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder='Поиск'
                        value={searchValue}
                        onChangeText={(text) => setSearchValue(text)}
                    />
                    <TouchableOpacity 
                        style={styles.btnSearch} 
                        onPress={handleSearch}
                    >
                        <Text style={styles.btnText}>Найти</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {cities.length ? (
                        cities.map((item) => (
                            <CityCard key={item.city_id} {...item} navigation={navigation} />
                        ))
                    ) : (
                        <View style={styles.noResults}>
                            <Text style={styles.noResultsText}>К сожалению, пока ничего не найдено :(</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#ECF4FF',
        flex: 1,
    },
    scrollView: {
        padding: 8,
        flexGrow: 1,
    },
    btnSearch: {
        marginLeft: 10,
        backgroundColor: '#1890FF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
    },
    title: {
        marginTop: 100,
        alignItems: 'center',
    },
    titleText: {
        fontFamily: 'Arial',
        fontWeight: 'bold',
        letterSpacing: '-0.01',
        fontSize: 28,
        textAlign: 'center',
    },
    scrollView: {
        padding: 8,
    },
    searchContainer: {
        marginTop: 30,
        marginBottom: 20,
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'center', // Центрируем по горизонтали
        alignItems: 'center', 
    },
    searchInput: {
        height: 40,
        width: '75%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 12,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    noResults: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        padding: 10,
    },
    noResultsText: {
        fontSize: 20,
        color: '#555',
        textAlign: 'center'
    },
});