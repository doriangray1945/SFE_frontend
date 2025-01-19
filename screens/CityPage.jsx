import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCity, resetCity } from '@/app/store/slices/citiesSlice';
import { ScrollView, Text, Button, View, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import { URI, URI_minio } from '../config';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';


export default function CityPage({ route }) {
    const { id } = route.params; 

    const dispatch = useDispatch();
    const city = useSelector((state) => state.cities.city);

    const navigation = useNavigation();
    const { name } = route.params;

    useEffect(() => {
        navigation.setOptions({ title: name });
    }, [name]);

    useEffect(() => {
        async function getCity() {
            try {
                const response = await axios.get(`${URI}/cities/${id}`);
                
                const data = response.data;
                
                data.url = data.url.replace("http://localhost:9000", URI_minio);
                
                dispatch(setCity(data));

            } catch (error) {
                console.error("Ошибка при получении данных города:", error);
            }
        }

        getCity();

        return () => {
            dispatch(resetCity());
        }

    }, [dispatch])

    return (
        <View style={styles.container}>
            <Header/>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {city && city.url ? ( 
                    <Image
                        source={{ uri: city.url }}
                        style={styles.cityImage}
                    />
                    ) : (
                        <Text>Загрузка изображения...</Text> 
                    )
                }  

                <View style={styles.cityContent}>
                    <Text style={styles.cityTitle}>{city?.name || 'Название города'}</Text>
                    <Text style={styles.cityDescription}>{city?.description || 'Описание города'}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <View style={styles.infoBlock}>
                        <Text style={styles.infoText}>Статистика по рынку труда</Text>
                        <Text style={styles.infoDetails}>Население: {city?.population} человек.</Text>
                        <Text style={styles.infoDetails}>Средняя зарплата: {city?.salary} тыс. руб.</Text>
                        <Text style={styles.infoDetails}>Уровень безработицы: {city?.unemployment_rate}%.</Text>
                    </View>
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ECF4FF',
        flex: 1,
    },
    scrollView: {
        paddingTop: 20,
        paddingBottom: 20,
    },
    cityImage: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',
        marginBottom: 20,
    },
    cityContent: {
        paddingHorizontal: 20,
        marginTop: 10,
    },
    cityTitle: {
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fontSize: 28,
        color: '#000000',
        marginBottom: 10,
    },
    cityDescription: {
        fontFamily: 'Arial',
        fontSize: 18,
        color: '#393939',
        lineHeight: 26,
        marginBottom: 20,
    },
    infoContainer: {
        paddingHorizontal: 15,
        paddingTop: 20,
    },
    infoBlock: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    infoText: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
    },
    infoDetails: {
        fontSize: 16,
        color: '#393939',
        marginBottom: 8,
    },
});