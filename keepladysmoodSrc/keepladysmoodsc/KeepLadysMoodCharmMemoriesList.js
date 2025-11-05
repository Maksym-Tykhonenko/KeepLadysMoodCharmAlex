import KeepLadysMoodCharmBack from '../keepladysmoodcmp/KeepLadysMoodCharmBack';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useStore } from '../keepladysmoodst/keepLadysMoodCharmContext';
import { useCallback, useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { height } = Dimensions.get('window');

const KeepLadysMoodCharmMemoriesList = () => {
  const navigation = useNavigation();
  const { savedCharmMemories, getCharmMemories } = useStore();
  const [todayLadysCharmDate, setTodayLadysCharmDate] = useState('');

  useFocusEffect(
    useCallback(() => {
      getCharmMemories();
    }, []),
  );

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    setTodayLadysCharmDate(formattedDate);
  }, []);

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
          <Text style={styles.charmtitle}>GALLERY OF MEMORIES</Text>
        </View>

        <Text style={styles.charmdatetxt}>{todayLadysCharmDate}</Text>

        {savedCharmMemories.map(memory => (
          <TouchableOpacity
            activeOpacity={0.9}
            key={memory.id}
            style={{ alignItems: 'center', marginBottom: 20 }}
            onPress={() =>
              navigation.navigate('KeepLadysMoodCreateMemoryDetails', memory)
            }
          >
            {memory.image && (
              <View
                style={{
                  width: '75%',
                  height: 240,
                  borderRadius: 20,
                  overflow: 'hidden',
                }}
              >
                <Image
                  source={{ uri: memory.image }}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 20,
                  }}
                />
                <LinearGradient
                  colors={['rgba(217, 217, 217, 0)', 'rgba(81, 1, 37, 1)']}
                  style={styles.charmmemorynextbtn}
                >
                  <Text style={styles.charmmemorytxt} numberOfLines={1}>
                    {memory.text}
                  </Text>
                  <View style={{ position: 'absolute', right: 15, bottom: 15 }}>
                    <Image
                      source={require('../../assets/images/ladysmoodarr.png')}
                    />
                  </View>
                </LinearGradient>
              </View>
            )}
          </TouchableOpacity>
        ))}
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
  charmmemorytxt: {
    color: '#FFF',
    fontSize: 12,
    position: 'absolute',
    bottom: 10,
    left: 20,
    textTransform: 'uppercase',
    fontFamily: 'Moul-Regular',
    width: '30%',
  },
  charmmemorynextbtn: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});

export default KeepLadysMoodCharmMemoriesList;
