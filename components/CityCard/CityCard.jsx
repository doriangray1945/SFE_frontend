import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';


export default function CityCard({ navigation, ...props }) {
    const clickHandler = () => {
        navigation.navigate('city', { id: props.city_id });
    };

    return (
        <View style={styles.card}>
            <TouchableOpacity onPress={clickHandler} style={styles.cityCardBody}>
                <Image
                    source={{ uri: props.url || '' }} // Используйте uri через объект
                    style={styles.cityCardImg}
                />
                <Text style={styles.cityName}>{props.name}</Text>
                <Text style={styles.cityInfo}>
                    Население: <Text style={styles.statistics}>{props.population}</Text>
                    {"\n"} {/* Разрыв строки */}
                    Средняя зарплата: <Text style={styles.statistics}>{props.salary} тыс.</Text>
                    {"\n"} {/* Разрыв строки */}
                    Уровень безработицы: <Text style={styles.statistics}>{props.unemployment_rate} %</Text>
                </Text>
                <TouchableOpacity 
                    style={styles.cityBtn} 
                    onPress={clickHandler}
                >
                    <Text style={styles.btnText}>Подробнее</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        overflow: 'hidden',
        margin: 10,
    },
    cityCardBody: {
        padding: 10,
        alignItems: 'center',
    },
    cityCardImg: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    cityName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    cityInfo: {
        fontSize: 14,
        textAlign: 'center',
    },
    statistics: {
        fontWeight: 'bold',
    },
    cityBtn: {
        backgroundColor: '#007bff', // Цвет кнопки
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    btnText: {
        color: 'white',
        textAlign: 'center',
    }
});
