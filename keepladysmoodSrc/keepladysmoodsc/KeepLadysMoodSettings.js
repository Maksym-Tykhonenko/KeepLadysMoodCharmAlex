import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import KeepLadysMoodCharmBack from '../keepladysmoodcmp/KeepLadysMoodCharmBack';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStore } from '../keepladysmoodst/keepLadysMoodCharmContext';

const { height } = Dimensions.get('window');

const KeepLadysMoodSettings = () => {
  const navigation = useNavigation();
  const {
    setCharmName,
    setCharmImage,
    isEnabledCharmDailyReminder,
    setIsEnabledCharmDailyReminder,
    isEnabledCharmMusic,
    setIsEnabledCharmMusic,
  } = useStore();

  const deleteKeepLadysMoodCharmProfile = async () => {
    await AsyncStorage.removeItem('keepLadysMoodCharmProfile');
    await AsyncStorage.removeItem('@ladys_mood_result');
    await AsyncStorage.removeItem('@ladys_mood_last_shown');

    setCharmName('');
    setCharmImage(null);
    navigation.navigate('KeepLadysMoodCharmEntry');
  };

  const toggleCharmDailyReminder = async value => {
    try {
      await AsyncStorage.setItem('dailyCharmReminder', JSON.stringify(value));
      setIsEnabledCharmDailyReminder(value);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const toggleCharmMusic = async value => {
    try {
      await AsyncStorage.setItem('dailyCharmMusic', JSON.stringify(value));
      setIsEnabledCharmMusic(value);
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <KeepLadysMoodCharmBack>
      <View style={styles.charmcontainer}>
        <TouchableOpacity
          style={styles.charmbackbtn}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Image source={require('../../assets/images/ladysmoodback.png')} />
        </TouchableOpacity>
        <Text style={styles.charmtitle}>SETTINGS</Text>

        <View style={styles.charmwlccontainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              toggleCharmDailyReminder(!isEnabledCharmDailyReminder)
            }
            style={styles.charmswwrap}
          >
            <Text style={styles.charmpickertext}>DAILY TALISMAN REMINDER</Text>
            {isEnabledCharmDailyReminder ? (
              <Image
                source={require('../../assets/images/ladysmoodswon.png')}
              />
            ) : (
              <Image
                source={require('../../assets/images/ladysmoodswoff.png')}
              />
            )}
          </TouchableOpacity>

          {Platform.OS === 'ios' && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => toggleCharmMusic(!isEnabledCharmMusic)}
              style={styles.charmswwrap}
            >
              <Text style={styles.charmpickertext}>MUSIC</Text>
              {isEnabledCharmMusic ? (
                <Image
                  source={require('../../assets/images/ladysmoodswon.png')}
                />
              ) : (
                <Image
                  source={require('../../assets/images/ladysmoodswoff.png')}
                />
              )}
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={{ alignSelf: 'center', marginTop: 26 }}
            activeOpacity={0.7}
            onPress={deleteKeepLadysMoodCharmProfile}
          >
            <LinearGradient
              colors={['#E25088', '#D52A6C']}
              style={{
                borderRadius: 18,
                width: 180,
              }}
            >
              <LinearGradient
                colors={['#CE0000', '#CE0000']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  borderRadius: 14,
                  padding: Platform.OS === 'ios' ? 7 : 0,
                  margin: Platform.OS === 'ios' ? 0 : 7,
                }}
              >
                <View
                  style={{
                    height: 65,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      color: '#fff',
                      fontFamily: 'Moul-Regular',
                      textTransform: 'uppercase',
                      bottom: Platform.OS === 'ios' ? 5 : 0,
                      right: Platform.OS === 'ios' ? 5 : 0,
                      textAlign: 'center',
                    }}
                  >
                    DELETE ACCOUNT
                  </Text>
                </View>
              </LinearGradient>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </KeepLadysMoodCharmBack>
  );
};

const styles = StyleSheet.create({
  charmcontainer: {
    paddingHorizontal: 25,
    paddingTop: height * 0.1,
    flex: 1,
    paddingBottom: 40,
  },
  charmwlccontainer: {
    width: '100%',
    paddingHorizontal: 16,
    padding: 25,
    paddingBottom: 12,
    borderRadius: 20,
    borderWidth: 7,
    borderColor: '#B8DE20',
    backgroundColor: '#520426',
  },
  charmtitle: {
    fontSize: 20,
    color: '#FFF',
    fontFamily: 'Moul-Regular',
    textAlign: 'center',
    marginBottom: 30,
    textTransform: 'uppercase',
  },
  charmbackbtn: {
    position: 'absolute',
    top: height * 0.1 - 5,
    left: 20,
    zIndex: 10,
  },
  charmpickertext: {
    fontSize: 16,
    color: '#FFC7DF',
    fontFamily: 'Moul-Regular',
    width: '70%',
  },
  charmswwrap: {
    flexDirection: 'row',
    marginBottom: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default KeepLadysMoodSettings;
