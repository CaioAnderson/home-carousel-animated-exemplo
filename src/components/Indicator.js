import React from 'react-native';
import { StyleSheet, View } from 'react-native';
import { DATA } from '../service/data';

export const Indicator = ({ scrollX }) => {
    return <View>
        {DATA.map((_, i) => {
            return <View
                key={`indicator-${i}`}
                style={styles.container}
            />
        })}
    </View>
}


const styles = StyleSheet.create({
    container: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: '#333',

    }
})