import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';


export default function CityCard({ navigation, ...props }) {
    const clickHandler = () => {
        navigation.navigate('Город', { id: props.city_id, name: props.name });
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
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        margin: 10,
        flex: 1,
        flexDirection: 'column',
    },
    cityCardBody: {
        padding: 10,
        alignItems: 'center',
    },
    cityCardImg: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 8,
        marginTop: 5,
    },
    cityName: {
        fontSize: 22,
        textOverflow: 'ellipsis',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginVertical: 5,
        marginTop: 15,
    },
    cityInfo: {
        fontSize: 16,
        textAlign: 'center',
        color: '#555555',
    },
    statistics: {
        fontWeight: 'bold',
        color: '#3166B6',
    },
    cityBtn: {
        backgroundColor: '#1890FF',
        padding: 10,
        borderRadius: 8,
        marginTop: 15,
        marginBottom: 10,
        height: 40,
    },
    btnText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    }
});
