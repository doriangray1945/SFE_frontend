import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCity, resetCity } from '@/app/store/slices/citiesSlice';
import { ScrollView, Text, Button, View, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import { URI, URI_minio } from '../config';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function CityPage({ route }) {
    const { id } = route.params;

    const dispatch = useDispatch();
    const city = useSelector((state) => state.cities.city);

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
        <SafeAreaView>
            <ScrollView>
                {city && city.url ? ( // Добавленный условия для отображения изображения
                    <Image
                        source={{ uri: city.url }}
                        style={styles.cityCardImg}
                    />
                    ) : (
                        <Text>Загрузка изображения...</Text> // Сообщение при загрузке
                    )
                }    
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    cityCardImg: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
});