import React from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
} from 'react-native';
import Constants from 'expo-constants';

function Separator() {
  return <View style={styles.separator} />;
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>
          Project Safety
        </Text>
        <Text style={styles.remain}>
          used for the location purpose
        </Text>
        </View>
      <View>
        <View style={styles.fixToText}>
          <Button
            title="Person Safety"
            onPress={() => Alert.alert('Coming soon')}
          />
          <Button
            title="Women Safety"
            onPress={() => Alert.alert('Coming soon')}
          />
        </View>
      </View>
      
      <View>
        <View style={styles.fixToText}>
          <Button
            title="Transport Safety"
            onPress={() => Alert.alert('Coming soon')}
          />
          <Button
            title="Local News"
            onPress={() => Alert.alert('Coming soon')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
    fontSize : 40,
    color: 'aqua'
  },
  remain: {
    textAlign: 'center',
    marginVertical: 100,
    fontSize : 15,
    marginHorizontal: 50
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // padding:50,
    marginTop:100,
    // marginHorizontal:100
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});