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
import KeepLadysMoodCharmBack from '../keepladysmoodcmp/KeepLadysMoodCharmBack';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const KeepLadysMoodAbout = () => {
  const navigation = useNavigation();

  const shareCharmInfo = async () => {
    try {
      await Share.share({
        message:
          Platform.OS === 'ios'
            ? `Keep Lady’s Mood Charm is your personal space of feminine harmony. Discover magical talismans every day, get inspiring tips and leave your memories. The application is created for real ladies who value peace, beauty and small moments that make up happiness`
            : `Luxury Lady’s Mood is your personal space of feminine harmony. Discover magical talismans every day, get inspiring tips and leave your memories. The application is created for real ladies who value peace, beauty and small moments that make up happiness`,
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
          <Text style={styles.charmtitle}>ABOUT THE APP</Text>
        </View>

        <View style={styles.charmwlccontainer}>
          {Platform.OS === 'ios' ? (
            <Text style={styles.charmpickertext}>
              Keep Lady’s Mood Charm is your personal space of feminine harmony.
              Discover magical talismans every day, get inspiring tips and leave
              your memories. The application is created for real ladies who
              value peace, beauty and small moments that make up happiness
            </Text>
          ) : (
            <Text style={styles.charmpickertext}>
              Luxury Lady’s Mood is your personal space of feminine harmony.
              Discover magical talismans every day, get inspiring tips and leave
              your memories. The application is created for real ladies who
              value peace, beauty and small moments that make up happiness
            </Text>
          )}

          {Platform.OS === 'ios' ? (
            <Image
              source={require('../../assets/images/ladysmoodabout.png')}
              style={{ top: 10, alignSelf: 'center' }}
            />
          ) : (
            <Image
              source={require('../../assets/images/anrdlogo.png')}
              style={{
                width: 220,
                height: 220,
                borderRadius: 80,
                alignSelf: 'center',
                marginTop: 10,
              }}
            />
          )}
        </View>

        <TouchableOpacity
          style={{ alignSelf: 'center', marginTop: 36 }}
          activeOpacity={0.7}
          onPress={shareCharmInfo}
        >
          <LinearGradient
            colors={['#E25088', '#D52A6C']}
            style={{
              borderRadius: 18,
              width: 120,
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
                    right: Platform.OS === 'ios' ? 5 : 0,
                  }}
                >
                  SHARE
                </Text>
              </View>
            </LinearGradient>
          </LinearGradient>
        </TouchableOpacity>
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
    paddingHorizontal: 36,
    padding: 35,
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
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Moul-Regular',
    textAlign: 'center',
    marginBottom: 14,
  },
});

export default KeepLadysMoodAbout;
