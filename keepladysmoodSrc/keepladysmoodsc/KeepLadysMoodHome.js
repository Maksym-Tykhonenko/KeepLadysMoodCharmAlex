import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  Platform,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import KeepLadysMoodCharmBack from '../keepladysmoodcmp/KeepLadysMoodCharmBack';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useStore } from '../keepladysmoodst/keepLadysMoodCharmContext';
const { height } = Dimensions.get('window');
import {
  CHARM_CATEGORIES,
  CHARM_QUIZ_QUESTIONS,
} from '../keepladysmooddt/keepLadysCharmCategories';
import Sound from 'react-native-sound';
import Orientation from 'react-native-orientation-locker';
import { BlurView } from '@react-native-community/blur';

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const KeepLadysMoodHome = () => {
  const {
    charmName,
    charmImage,
    loadCharmProfile,
    isEnabledCharmDailyReminder,
    setIsEnabledCharmDailyReminder,
    isEnabledCharmMusic,
    setIsEnabledCharmMusic,
    volume,
  } = useStore();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [stage, setStage] = useState('select');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [lastShown, setLastShown] = useState(null);
  const [displayResult, setDisplayResult] = useState(null);
  const [countdown, setCountdown] = useState('24:00');

  const [charmBgMusicTrackIndex, setCharmBgMusicTrackIndex] = useState(0);
  const [sound, setSound] = useState(null);
  const charmBgMusicTracks = [
    'relaxing-piano-383294.mp3',
    'relaxing-piano-383294.mp3',
  ];

  useEffect(() => {
    playCharmBgMusicTrack(charmBgMusicTrackIndex);

    return () => {
      if (sound) {
        sound.stop(() => {
          sound.release();
        });
      }
    };
  }, [charmBgMusicTrackIndex]);

  useFocusEffect(
    useCallback(() => {
      Platform.OS === 'android' && Orientation.lockToPortrait();

      return () => Orientation.unlockAllOrientations();
    }, []),
  );

  const playCharmBgMusicTrack = index => {
    if (sound) {
      sound.stop(() => {
        sound.release();
      });
    }

    const trackPath = charmBgMusicTracks[index];

    const newPartyDareSound = new Sound(trackPath, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('error', error);
        return;
      }

      newPartyDareSound.play(success => {
        if (success) {
          setCharmBgMusicTrackIndex(
            prevIndex => (prevIndex + 1) % charmBgMusicTracks.length,
          );
        } else {
          console.log('error');
        }
      });
      setSound(newPartyDareSound);
    });
  };

  useFocusEffect(
    useCallback(() => {
      loadCharmBgMusic();
      loadCharmDailyReminder();
    }, []),
  );

  useEffect(() => {
    const setCharmBgMusic = async () => {
      try {
        const musicValue = await AsyncStorage.getItem('dailyCharmMusic');

        const isBgMusicOn = JSON.parse(musicValue);
        setIsEnabledCharmMusic(isBgMusicOn);
        if (sound) {
          sound.setVolume(isBgMusicOn ? volume : 0);
        }
      } catch (error) {
        console.error('Error', error);
      }
    };

    setCharmBgMusic();
  }, [sound, volume]);

  useEffect(() => {
    if (sound) {
      sound.setVolume(isEnabledCharmMusic ? volume : 0);
    }
  }, [volume, isEnabledCharmMusic]);

  const loadCharmBgMusic = async () => {
    try {
      const musicValue = await AsyncStorage.getItem('dailyCharmMusic');

      const isBgMusicOn = JSON.parse(musicValue);
      setIsEnabledCharmMusic(isBgMusicOn);
    } catch (error) {
      console.error('Error', error);
    }
  };

  const loadCharmDailyReminder = async () => {
    try {
      const vibrValue = await AsyncStorage.getItem('dailyCharmReminder');

      if (vibrValue !== null) {
        const isVibrationOn = JSON.parse(vibrValue);

        setIsEnabledCharmDailyReminder(isVibrationOn);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    loadCharmProfile();
    (async () => {
      try {
        const raw = await AsyncStorage.getItem('@ladys_mood_last_shown');
        const rawResult = await AsyncStorage.getItem('@ladys_mood_result');
        const last = raw ? Number(raw) : null;
        setLastShown(last);
        if (rawResult) {
          setDisplayResult(JSON.parse(rawResult));
        }

        const now = Date.now();
        if (!last || now - last >= ONE_DAY_MS) {
          ladysCharmOpenModal();
        }

        ladysCharmUpdateCountdown(last);
        const int = setInterval(() => ladysCharmUpdateCountdown(last), 1000);
        return () => clearInterval(int);
      } catch (e) {
        console.warn('Error', e);
      }
    })();
  }, []);

  const ladysCharmUpdateCountdown = (last = lastShown) => {
    const now = Date.now();
    const base = last ? last : 0;
    const diff = ONE_DAY_MS - (now - base);
    if (!base || diff <= 0) {
      setCountdown('24:00');
      return;
    }
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    const hh = String(hours).padStart(2, '0');
    const mm = String(mins).padStart(2, '0');
    setCountdown(`${hh}h ${mm}m`);
  };

  const ladysCharmOpenModal = () => {
    if (!isEnabledCharmDailyReminder) return;
    setStage('select');
    setSelectedCategory(null);
    setQuestionIndex(0);
    setAnswers([]);
    setResult(null);
    setModalVisible(true);
  };

  const ladysCharmCloseModalAndSave = async (finalResult = null) => {
    try {
      const now = Date.now();
      await AsyncStorage.setItem('@ladys_mood_last_shown', String(now));
      if (finalResult) {
        await AsyncStorage.setItem(
          '@ladys_mood_result',
          JSON.stringify(finalResult),
        );
        setDisplayResult(finalResult);
      }
      setLastShown(now);
      ladysCharmUpdateCountdown(now);
    } catch (e) {
      console.warn('Error', e);
    }
    setModalVisible(false);
  };

  const ladysCharmOnSelectCategory = cat => {
    setSelectedCategory(cat);
    setStage('quiz');
    setQuestionIndex(0);
    setAnswers([]);
  };

  const ladysCharmOnAnswer = optionIndex => {
    setAnswers(prev => [...prev, optionIndex]);

    if (questionIndex + 1 < CHARM_QUIZ_QUESTIONS[selectedCategory].length) {
      setQuestionIndex(i => i + 1);
    } else {
      ladysCharmFinishQuiz();
    }
  };

  const ladysCharmFinishQuiz = () => {
    const cat = CHARM_CATEGORIES.find(c => c.id === selectedCategory);
    const quoteArr = (cat && cat.quotes) || ['Keep going!'];
    const quote = quoteArr[Math.floor(Math.random() * quoteArr.length)];
    const final = {
      quote,
      category: selectedCategory,
      image: cat ? cat.image : null,
      timestamp: Date.now(),
    };
    setResult(final);
    setStage('result');
  };

  const ladysCharmShareQuote = async () => {
    try {
      await Share.share({
        message: `Today's mood tip from Keep Lady’s Mood Charm:\n\n"${result.quote}"`,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const ladysCharmRenderMainResult = () => {
    if (!displayResult) return null;

    const found = CHARM_CATEGORIES.find(c => c.id === displayResult.category);
    return (
      <Image
        source={found ? found.image : displayResult.image}
        style={styles.resultImage}
      />
    );
  };

  return (
    <KeepLadysMoodCharmBack>
      <View
        style={[
          styles.charmcontainer,
          Platform.OS === 'android' && modalVisible && { filter: 'blur(4px)' },
        ]}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
            <Image
              source={{ uri: charmImage }}
              style={{ width: 104, height: 104, borderRadius: 20 }}
            />
            <Text style={styles.charmtitle}>{`GOOD DAY,\n${charmName}!`}</Text>
          </View>

          {ladysCharmRenderMainResult()}
        </View>

        <View style={styles.charmwlccontainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text style={[styles.charmpickertext, { width: '60%' }]}>
              daily mood tip:
            </Text>
            <View style={{ flexDirection: 'row', gap: 5 }}>
              <Image
                source={require('../../assets/images/ladysmoodtimer.png')}
                style={{ marginBottom: 15 }}
              />
              <Text style={styles.charmtimertext}>{countdown}</Text>
            </View>
          </View>
          <Text style={styles.charmquotetext}>
            Stay positive, work hard, make it happen.
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.charmwlcbtncontainer}
          onPress={() => navigation.navigate('KeepLadysMoodCreateMemory')}
        >
          <LinearGradient
            colors={['#FF60A0', '#E94E99', '#A33293', '#932C91', '#E94E99']}
            style={{
              borderRadius: 10,
            }}
          >
            <View
              style={{ alignItems: 'center', flex: 1, paddingVertical: 15 }}
            >
              <Text style={styles.charmbtntext}>CREATE MEMORY</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.charmwlcbtncontainer, { borderColor: '#D52A6C' }]}
          onPress={() => navigation.navigate('KeepLadysMoodCharmMemoriesList')}
        >
          <LinearGradient
            colors={['#B9E11C', '#FAF046']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 10,
            }}
          >
            <View style={[styles.charmsecbtncnt]}>
              <Text style={[styles.charmsecbtntext]}>GALLERY OF MEMORIES</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.charmwlcbtncontainer, { borderColor: '#D52A6C' }]}
          onPress={() => navigation.navigate('KeepLadysMoodSettings')}
        >
          <LinearGradient
            colors={['#B9E11C', '#FAF046']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 10,
            }}
          >
            <View style={styles.charmsecbtncnt}>
              <Text style={styles.charmsecbtntext}>SETTINGS</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.charmwlcbtncontainer, { borderColor: '#D52A6C' }]}
          onPress={() => navigation.navigate('KeepLadysMoodAbout')}
        >
          <LinearGradient
            colors={['#B9E11C', '#FAF046']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 10,
            }}
          >
            <View style={styles.charmsecbtncnt}>
              <Text style={styles.charmsecbtntext}>ABOUT</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <Image
        source={require('../../assets/images/ladysmoodhmimg.png')}
        style={
          Platform.OS === 'android' && modalVisible && { filter: 'blur(4px)' }
        }
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        statusBarTranslucent={Platform.OS === 'android'}
      >
        <View
          style={[
            styles.modalOverlay,
            Platform.OS === 'android' && {
              backgroundColor: 'rgba(0, 0, 0, 0.47)',
            },
          ]}
        >
          {Platform.OS === 'ios' && (
            <BlurView
              blurType="light"
              blurAmount={2}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            />
          )}
          <View style={styles.charmmodalcontainer}>
            {stage === 'select' && (
              <View>
                <Text style={styles.modalTitle}>
                  CHOOSE YOUR TODAY'S TALISMAN
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    flexWrap: 'wrap',
                    gap: 7,
                  }}
                >
                  {CHARM_CATEGORIES.map(cat => (
                    <View key={cat.id} style={styles.categoryCard}>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => ladysCharmOnSelectCategory(cat.id)}
                      >
                        <Image
                          source={cat.image}
                          style={styles.categoryImage}
                        />
                        <Text style={styles.categoryTitle}>{cat.title}</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {stage === 'quiz' && selectedCategory && (
              <View>
                <Text style={styles.modalTitle}>
                  ANSWER A FEW QUESTIONS TO GET ADVICE
                </Text>
                <Text style={styles.questionText}>
                  {CHARM_QUIZ_QUESTIONS[selectedCategory][questionIndex].q}
                </Text>

                <View style={styles.trackerContainer}>
                  {CHARM_QUIZ_QUESTIONS[selectedCategory].map((_, idx) => (
                    <View
                      key={idx}
                      style={[
                        styles.trackerDot,
                        {
                          backgroundColor:
                            idx <= answers.length ? '#B8DE20' : '#fff',
                        },
                      ]}
                    />
                  ))}
                </View>
                <View style={{ marginTop: 12 }}>
                  {CHARM_QUIZ_QUESTIONS[selectedCategory][
                    questionIndex
                  ].opts.map((opt, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={styles.optionBtn}
                      activeOpacity={0.6}
                      onPress={() => ladysCharmOnAnswer(idx)}
                      disabled={answers.length > questionIndex}
                    >
                      <Text style={styles.optionText}>{opt}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={{ alignSelf: 'center', marginTop: 20 }}>
                  {ladysCharmRenderMainResult()}
                </View>
              </View>
            )}

            {stage === 'result' && result && (
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.modalTitle}>
                  THANK YOU FOR YOUR ANSWERS! FOR WHAT YOU HAVE ANSWERED, KEEP
                  THE ADVICE:
                </Text>
                <Image source={result.image} style={styles.resultImageModal} />
                <Text style={styles.resultQuoteModal}>{result.quote}</Text>
                <TouchableOpacity
                  onPress={() => ladysCharmCloseModalAndSave(result)}
                  style={styles.closeBtn}
                >
                  <Image
                    source={require('../../assets/images/ladysmoodcls.png')}
                  />
                </TouchableOpacity>
                <Image
                  source={require('../../assets/images/ladysmoodmodalim.png')}
                  style={{ top: 20 }}
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={ladysCharmShareQuote}
                  style={[
                    styles.charmwlcshrbtncontainer,
                    { borderColor: '#D52A6C' },
                  ]}
                >
                  <LinearGradient
                    colors={['#B9E11C', '#FAF046']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      borderRadius: 10,
                    }}
                  >
                    <View style={styles.charmshrbtncnt}>
                      <Text style={styles.charmsecbtntext}>SHARE</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </KeepLadysMoodCharmBack>
  );
};

const styles = StyleSheet.create({
  charmcontainer: {
    paddingHorizontal: 25,
    paddingTop: height * 0.08,
    flex: 1,
    paddingBottom: 40,
  },
  charmwlccontainer: {
    width: '100%',
    padding: 17,
    paddingRight: 24,
    borderRadius: 20,
    borderWidth: 7,
    borderColor: '#B8DE20',
    backgroundColor: '#520426',
    marginBottom: 12,
  },
  charmwlcbtncontainer: {
    width: '65%',
    borderRadius: 15,
    borderWidth: 7,
    borderColor: '#520426',
    marginBottom: 12,
    alignSelf: 'center',
  },
  charmwlcshrbtncontainer: {
    width: 120,
    borderRadius: 15,
    borderWidth: 7,
    borderColor: '#520426',
    alignSelf: 'center',
  },
  charmtitle: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Moul-Regular',
    textTransform: 'uppercase',
    width: '50%',
  },
  charmpickertext: {
    fontSize: 16,
    color: '#FFC7DF',
    fontFamily: 'Moul-Regular',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  charmquotetext: {
    fontSize: 13,
    color: '#FFFFFF',
    fontFamily: 'Moul-Regular',
  },
  charmtimertext: {
    fontSize: 13,
    color: '#FFFFFF',
    fontFamily: 'Moul-Regular',
  },
  charmbtntext: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Moul-Regular',
    textTransform: 'uppercase',
  },
  charmsecbtntext: {
    fontSize: 13,
    color: '#520426',
    fontFamily: 'Moul-Regular',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  charmsecbtncnt: {
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  charmshrbtncnt: {
    alignItems: 'center',
    paddingHorizontal: 8,
    justifyContent: 'center',
    height: 55,
  },
  resultImage: {
    width: 64,
    height: 64,
    borderRadius: 12,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 17,
    fontFamily: 'Moul-Regular',
    textAlign: 'center',
    color: '#FFC7DF',
    width: '100%',
  },
  categoryImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  categoryTitle: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 27,
    marginTop: 10,
    fontFamily: 'Moul-Regular',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  questionText: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 12,
    fontFamily: 'Moul-Regular',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  optionBtn: {
    padding: 12,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 16,
  },
  optionText: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Moul-Regular',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  trackerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
    marginTop: 10,
    gap: 4,
  },
  trackerDot: {
    width: 32,
    height: 9,
  },
  charmmodalcontainer: {
    width: '90%',
    backgroundColor: '#520426',
    borderRadius: 16,
    borderWidth: 7,
    borderColor: '#B8DE20',
    paddingHorizontal: 38,
    padding: 20,
  },
  resultImageModal: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  resultQuoteModal: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'Moul-Regular',
    textAlign: 'center',
    color: '#FFFFFF',
    marginTop: 12,
  },
  closeBtn: {
    position: 'absolute',
    top: -25,
    right: -40,
    padding: 8,
  },
});

export default KeepLadysMoodHome;
