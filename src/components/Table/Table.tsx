import React, { FunctionComponent } from 'react';
import { StyleSheet, Text } from 'react-native';
import { View } from 'react-native';

type Props = {
    data: any[];
}

const Table: FunctionComponent<Props> = ({ data }) => {
    return (
        <View style={styles.container}>
            <View style={[styles.row, { borderBottomColor: 'lightblue', borderBottomWidth: 1 }]}>
                <Text style={{ fontSize: 24,flex:1,textAlign:'center' }}>Name</Text>
                <Text style={{ fontSize: 24,flex:1 ,textAlign:'center'}}>Score</Text>
            </View>
            {data.map((item, index) =>
                <View style={[styles.row, { marginTop: 10 }]} key={index}>
                    <Text style={{ fontSize: 16,flex:1,textAlign:'center' }}>{item.name}</Text>
                    <Text style={{ fontSize: 16,flex:1 ,textAlign:'center'}}>{item.score}</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: 'white',
        textAlign:'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default Table;