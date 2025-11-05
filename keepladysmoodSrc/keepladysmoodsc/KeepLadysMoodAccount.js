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
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import { launchImageLibrary } from 'react-native-image-picker';
import { useStore } from '../keepladysmoodst/keepLadysMoodCharmContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height } = Dimensions.get('window');

const KeepLadysMoodAccount = () => {
  const {
    charmName,
    setCharmName,
    charmImage,
    setCharmImage,
    loadCharmProfile,
  } = useStore();
  const navigation = useNavigation();

  useEffect(() => {
    loadCharmProfile();
  }, []);

  const saveCharmProfile = async (name, image) => {
    try {
      const data = { name, image };
      await AsyncStorage.setItem(
        'keepLadysMoodCharmProfile',
        JSON.stringify(data),
      );
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleNameChange = text => {
    setCharmName(text);
    saveCharmProfile(text, charmImage);
    navigation.replace('KeepLadysMoodHome');
  };

  const CharmPicker = () => {
    const options = {
      mediaType: 'photo',
      maxHeight: 700,
      maxWidth: 700,
      quality: 0.8,
    };

    launchImageLibrary(options, async response => {
      if (response.didCancel) return;
      const uri = response?.assets?.[0]?.uri;
      if (uri) {
        setCharmImage(uri);
        saveCharmProfile(charmName, uri);
      }
    });
  };

  return (
    <KeepLadysMoodCharmBack>
      <View style={styles.charmcontainer}>
        <Text style={styles.charmtitle}>Welcome to your world of mood!</Text>

        <View style={styles.charmwlccontainer}>
          <TouchableOpacity
            style={styles.charmpickercont}
            onPress={CharmPicker}
            activeOpacity={0.7}
          >
            {charmImage ? (
              <Image
                source={{ uri: charmImage }}
                style={{ width: 123, height: 123, borderRadius: 20 }}
              />
            ) : (
              <Image
                source={require('../../assets/images/ladysmoodpicker.png')}
              />
            )}
          </TouchableOpacity>
          <Text style={styles.charmpickertext}>Tap to add photo</Text>

          <TextInput
            placeholder="Your name..."
            style={[styles.charminput, charmName && { marginBottom: 10 }]}
            placeholderTextColor={'rgba(173, 40, 101, 0.49)'}
            value={charmName}
            onChangeText={setCharmName}
            maxLength={20}
          />

          <Text style={styles.charmcinftxt}>
            Your info stays on your device only.
          </Text>

          {charmName && charmImage && (
            <>
              <Image
                source={require('../../assets/images/ladysmoodacc.png')}
                style={{ top: 10, alignSelf: 'center' }}
              />
              <TouchableOpacity
                style={{ alignSelf: 'center' }}
                activeOpacity={0.7}
                onPress={() => {
                  handleNameChange(charmName);
                }}
              >
                <LinearGradient
                  colors={['#E25088', '#D52A6C']}
                  style={{
                    borderRadius: 18,
                    width: 214,
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
                        height: 65,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#520426',
                          fontFamily: 'Moul-Regular',
                          textTransform: 'uppercase',
                          bottom: Platform.OS === 'ios' ? 5 : 0,
                        }}
                      >
                        START MY DAY
                      </Text>
                    </View>
                  </LinearGradient>
                </LinearGradient>
              </TouchableOpacity>
              <Text style={styles.charmcinftxt}>
                Your info stays on your device only.
              </Text>
            </>
          )}
        </View>
      </View>
    </KeepLadysMoodCharmBack>
  );
};

const styles = StyleSheet.create({
  charmcontainer: {
    paddingHorizontal: 25,
    paddingTop: height * 0.11,
    flex: 1,
    paddingBottom: 40,
  },
  charmwlccontainer: {
    width: '100%',
    paddingHorizontal: 36,
    padding: 22,
    borderRadius: 20,
    borderWidth: 7,
    borderColor: '#B8DE20',
    backgroundColor: '#520426',
  },
  charmtitle: {
    fontSize: 20,
    color: '#FFC7DF',
    fontFamily: 'Moul-Regular',
    textAlign: 'center',
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  charmsubtitle: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Moul-Regular',
    textAlign: 'center',
    marginBottom: 28,
  },
  charmpickercont: {
    width: 120,
    height: 120,
    borderRadius: 20,
    backgroundColor: '#FF97C1',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 7,
    marginTop: 10,
  },
  charmpickertext: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Moul-Regular',
    textAlign: 'center',
    marginBottom: 14,
  },
  charminput: {
    width: '80%',
    paddingVertical: 8,
    backgroundColor: '#FF97C1',
    borderRadius: 14,
    paddingHorizontal: 10,
    color: '#AD2865',
    fontFamily: 'Moul-Regular',
    fontSize: 12,
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 170,
  },
  charmcinftxt: {
    fontSize: 12,
    color: '#FF97C1',
    fontFamily: 'Moul-Regular',
    textAlign: 'center',
    marginTop: 14,
  },
});

export default KeepLadysMoodAccount;
