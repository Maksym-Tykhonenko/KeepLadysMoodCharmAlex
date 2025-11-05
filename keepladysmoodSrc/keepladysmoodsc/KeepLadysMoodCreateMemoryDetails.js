import KeepLadysMoodCharmBack from '../keepladysmoodcmp/KeepLadysMoodCharmBack';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '../keepladysmoodst/keepLadysMoodCharmContext';
import { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Platform,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { height } = Dimensions.get('window');

const KeepLadysMoodCreateMemoryDetails = ({ route }) => {
  const navigation = useNavigation();
  const { delCharmMemory } = useStore();
  const [todayLadysCharmDate, setTodayLadysCharmDate] = useState('');
  const memory = route.params;

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    setTodayLadysCharmDate(formattedDate);
  }, []);

  const handleDeleteCharmMemory = async () => {
    delCharmMemory(memory);
    setTimeout(() => {
      navigation.goBack();
    }, 300);
  };

  const shareCharmMemory = async () => {
    try {
      await Share.share({
        message: `${memory.text}`,
      });
    } catch (error) {
      Alert.alert(error.message);
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
        <View style={{ alignSelf: 'center', width: '70%' }}>
          <Text style={styles.charmtitle}>CREATE MEMORY</Text>
        </View>

        <Text style={styles.charmdatetxt}>{todayLadysCharmDate}</Text>

        <View style={styles.charmwlccontainer}>
          <Text style={styles.charmpickertext}>{`MY DAY`}</Text>

          <Image
            source={{ uri: memory.image }}
            style={{
              width: '85%',
              height: 240,
              borderRadius: 20,
              marginBottom: 20,
              alignSelf: 'center',
            }}
          />

          <Text style={styles.charmmemorytext}>{memory.text}</Text>

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-around' }}
          >
            <TouchableOpacity
              style={{ alignSelf: 'center', marginTop: 26 }}
              activeOpacity={0.7}
              onPress={() => {
                shareCharmMemory();
              }}
            >
              <LinearGradient
                colors={['#E25088', '#D52A6C']}
                style={{
                  borderRadius: 18,
                  width: 107,
                }}
              >
                <LinearGradient
                  colors={['#B9E11C', '#FAF046']}
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
                      height: 52,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#520426',
                        fontFamily: 'Moul-Regular',
                        textTransform: 'uppercase',
                        bottom: Platform.OS === 'ios' ? 5 : 0,
                        right: Platform.OS === 'ios' ? 5 : 0,
                      }}
                    >
                      SHARE
                    </Text>
                  </View>
                </LinearGradient>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ alignSelf: 'center', marginTop: 26 }}
              activeOpacity={0.7}
              onPress={() => {
                handleDeleteCharmMemory();
              }}
            >
              <LinearGradient
                colors={['#E25088', '#D52A6C']}
                style={{
                  borderRadius: 18,
                  width: 150,
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
                      height: 52,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#fff',
                        fontFamily: 'Moul-Regular',
                        textTransform: 'uppercase',
                        bottom: Platform.OS === 'ios' ? 5 : 0,
                        right: Platform.OS === 'ios' ? 5 : 0,
                        textAlign: 'center',
                      }}
                    >
                      DELETE MEMORY
                    </Text>
                  </View>
                </LinearGradient>
              </LinearGradient>
            </TouchableOpacity>
          </View>
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
    paddingHorizontal: 20,
    padding: 25,
    paddingBottom: 20,
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
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  charmdatetxt: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Moul-Regular',
    textAlign: 'center',
    marginBottom: 20,
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
    textAlign: 'center',
    marginBottom: 22,
  },
  charmmemorytext: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Moul-Regular',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default KeepLadysMoodCreateMemoryDetails;
