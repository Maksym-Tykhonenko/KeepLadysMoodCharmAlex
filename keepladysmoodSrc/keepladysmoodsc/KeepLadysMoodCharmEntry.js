import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '../keepladysmoodst/keepLadysMoodCharmContext';

const KeepLadysMoodCharmEntry = () => {
  const [currentWelcomeSlide, setCurrentWelcomeSlide] = useState(0);
  const navigation = useNavigation();
  const { charmName, loadCharmProfile } = useStore();

  useEffect(() => {
    loadCharmProfile();
  }, []);

  return (
    <ImageBackground
      source={
        currentWelcomeSlide > 1
          ? require('../../assets/images/ladysmoodbg2.png')
          : require('../../assets/images/ladysmoodbg.png')
      }
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.charmcontainer}>
          {currentWelcomeSlide === 0 && (
            <Image
              source={require('../../assets/images/ladysmoodon1.png')}
              style={{ top: 15 }}
            />
          )}
          {currentWelcomeSlide === 1 && (
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../../assets/images/ladysmoodon2.png')}
                style={{ left: -40 }}
              />
              <Image
                source={require('../../assets/images/ladysmoodon3.png')}
                style={{ right: -100 }}
              />
              <Image
                source={require('../../assets/images/ladysmoodon4.png')}
                style={{ top: -15 }}
              />
              <Image
                source={require('../../assets/images/ladysmoodon5.png')}
                style={{ left: -55, top: -5 }}
              />
            </View>
          )}

          <View style={styles.charmwlccontainer}>
            <Text style={styles.charmtitle}>
              {currentWelcomeSlide === 0 && 'Welcome to your world of mood!'}
              {currentWelcomeSlide === 1 &&
                `CHOOSE YOUR 
TALISMAN TODAY`}
              {currentWelcomeSlide === 2 && 'Leave warm moments'}
            </Text>
            <Text style={styles.charmsubtitle}>
              {currentWelcomeSlide === 0 &&
                `I am Lady, your charming companion in daily peace. Here you can stop for a moment, listen to yourself and feel how your mood has its own radiance.`}
              {currentWelcomeSlide === 1 &&
                `Every time you open the app, choose the talisman of the day, answer a few questions and get advice!`}
              {currentWelcomeSlide === 2 &&
                `Write short notes, add photos - all this will become your magical diary. And every day I will give you advice to cheer you up and bring back your smile.`}
            </Text>
            <TouchableOpacity
              style={{ alignSelf: 'center' }}
              activeOpacity={0.7}
              onPress={() => {
                if (currentWelcomeSlide < 2) {
                  setCurrentWelcomeSlide(currentWelcomeSlide + 1);
                } else {
                  navigation.replace(
                    !charmName ? 'KeepLadysMoodAccount' : 'KeepLadysMoodHome',
                  );
                }
              }}
            >
              <LinearGradient
                colors={['#E25088', '#D52A6C']}
                style={{
                  borderRadius: 18,
                  width: currentWelcomeSlide === 0 ? 200 : 160,
                }}
              >
                <LinearGradient
                  colors={['#B9E11C', '#FAF046']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    borderRadius: 14,
                    padding: Platform.OS === 'ios' ? 4 : 0,
                    margin: Platform.OS === 'ios' ? 0 : 4,
                  }}
                >
                  <View
                    style={{
                      height: currentWelcomeSlide === 0 ? 65 : 50,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: currentWelcomeSlide === 0 ? 17 : 14,
                        color: '#520426',
                        fontFamily: 'Moul-Regular',
                        textTransform: 'uppercase',
                        bottom: Platform.OS === 'ios' ? 2 : 0,
                      }}
                    >
                      {currentWelcomeSlide === 0 && 'Next'}
                      {currentWelcomeSlide === 1 && 'OKAY!'}
                      {currentWelcomeSlide === 2 && 'LET`S GO!'}
                    </Text>
                  </View>
                </LinearGradient>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  charmcontainer: {
    paddingHorizontal: 25,
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  charmwlccontainer: {
    width: '100%',
    paddingHorizontal: 36,
    padding: 22,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#B8DE20',
    backgroundColor: '#520426',
  },
  charmtitle: {
    fontSize: 20,
    color: '#FFC7DF',
    fontFamily: 'Moul-Regular',
    textAlign: 'center',
    marginBottom: 28,
    textTransform: 'uppercase',
  },
  charmsubtitle: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Moul-Regular',
    textAlign: 'center',
    marginBottom: 28,
  },
});

export default KeepLadysMoodCharmEntry;
