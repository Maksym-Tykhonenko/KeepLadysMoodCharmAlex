import KeepLadysMoodCharmBack from '../keepladysmoodcmp/KeepLadysMoodCharmBack';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useStore } from '../keepladysmoodst/keepLadysMoodCharmContext';
import { useEffect, useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';

const { height } = Dimensions.get('window');

const KeepLadysMoodCreateMemory = () => {
  const navigation = useNavigation();
  const { saveCharmMemory } = useStore();
  const [todayLadysCharmDate, setTodayLadysCharmDate] = useState('');
  const [memoryCharmText, setMemoryCharmText] = useState('');
  const [memoryCharmImage, setMemoryCharmImage] = useState(null);

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    setTodayLadysCharmDate(formattedDate);
  }, []);

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
      setMemoryCharmImage(uri);
    });
  };

  const handleSaveCharmMemory = async () => {
    const newMemory = {
      id: Date.now().toString(),
      text: memoryCharmText,
      image: memoryCharmImage,
    };

    saveCharmMemory(newMemory);
    navigation.goBack();
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
          <Text style={styles.charmpickertext}>{`WRITE ABOUT
YOUR DAY`}</Text>

          <TextInput
            style={styles.charminput}
            placeholder="Today I..."
            placeholderTextColor={'#fff'}
            multiline={true}
            value={memoryCharmText}
            onChangeText={text => setMemoryCharmText(text)}
          />

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={CharmPicker}
            style={[styles.charmspickcontainer]}
          >
            {memoryCharmImage ? (
              <Image
                source={{ uri: memoryCharmImage }}
                style={{ width: '100%', height: '100%', borderRadius: 10 }}
              />
            ) : (
              <>
                <Image
                  source={require('../../assets/images/ladysmoodcreatmem.png')}
                  style={{ alignSelf: 'center' }}
                />
                <Text style={styles.charmpickertxt}>Add photo</Text>
              </>
            )}
          </TouchableOpacity>

          {memoryCharmImage && memoryCharmText && (
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-around' }}
            >
              <TouchableOpacity
                style={{ alignSelf: 'center', marginTop: 26 }}
                activeOpacity={0.7}
                onPress={() => {
                  setMemoryCharmImage(null);
                  setMemoryCharmText('');
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
                          fontSize: 13,
                          color: '#520426',
                          fontFamily: 'Moul-Regular',
                          textTransform: 'uppercase',
                          bottom: Platform.OS === 'ios' ? 5 : 0,
                          right: Platform.OS === 'ios' ? 5 : 0,
                        }}
                      >
                        CANCEL
                      </Text>
                    </View>
                  </LinearGradient>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ alignSelf: 'center', marginTop: 26 }}
                activeOpacity={0.7}
                onPress={() => {
                  handleSaveCharmMemory();
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
                          textAlign: 'center',
                        }}
                      >
                        SAVE MEMORY
                      </Text>
                    </View>
                  </LinearGradient>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
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
  charmswwrap: {
    flexDirection: 'row',
    marginBottom: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  charminput: {
    width: '100%',
    minHeight: 177,
    borderWidth: 1,
    borderColor: '#FFC7DF',
    borderRadius: 10,
    padding: 13,
    paddingHorizontal: 16,
    color: '#FFFFFF',
    fontFamily: 'Moul-Regular',
    textAlignVertical: 'top',
    fontSize: 12,
    marginBottom: 20,
  },
  charmpickertxt: {
    fontSize: 12,
    color: '#520426',
    fontFamily: 'Moul-Regular',
    textAlign: 'center',
  },
  charmspickcontainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#FF97C1',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 7,
    marginTop: 10,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFF',
  },
});

export default KeepLadysMoodCreateMemory;
