import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

export const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

export const ContextProvider = ({ children }) => {
  const [charmName, setCharmName] = useState('');
  const [charmImage, setCharmImage] = useState(null);
  const [savedCharmMemories, setSavedCharmMemories] = useState([]);
  const [isEnabledCharmDailyReminder, setIsEnabledCharmDailyReminder] =
    useState(true);
  const [isEnabledCharmMusic, setIsEnabledCharmMusic] = useState(false);
  const [soundLevel, updateSoundLevel] = useState(1.0);

  const loadCharmProfile = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('keepLadysMoodCharmProfile');
      if (jsonValue) {
        const data = JSON.parse(jsonValue);
        if (data.name) setCharmName(data.name);
        if (data.image) setCharmImage(data.image);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  // charm memories

  const saveCharmMemory = async memory => {
    try {
      const stored = await AsyncStorage.getItem('charmMemories');
      let memories = stored !== null ? JSON.parse(stored) : [];

      const updatedMemories = [...memories, memory];

      await AsyncStorage.setItem(
        'charmMemories',
        JSON.stringify(updatedMemories),
      );
    } catch (e) {
      console.error('e', e);
    }
  };

  const getCharmMemories = async () => {
    try {
      const savedData = await AsyncStorage.getItem('charmMemories');
      const parsed = JSON.parse(savedData);

      if (parsed != null) {
        setSavedCharmMemories(parsed);
      }
    } catch (error) {
      console.log('e', error);
    }
  };

  const delCharmMemory = async memory => {
    const jsonValue = await AsyncStorage.getItem('charmMemories');
    let data = jsonValue != null ? JSON.parse(jsonValue) : [];

    const filtered = data.filter(item => item.id !== memory.id);

    setSavedCharmMemories(filtered);
    await AsyncStorage.setItem('charmMemories', JSON.stringify(filtered));
  };

  // charm music

  useEffect(() => {
    (async () => {
      try {
        const fetchedVol = await AsyncStorage.getItem('charmvolume');
        if (fetchedVol !== null && !isNaN(parseFloat(fetchedVol))) {
          updateSoundLevel(parseFloat(fetchedVol));
        }
      } catch (err) {
        console.log('Error', err);
      }
    })();
  }, []);

  const adjustVolumeLevel = async newLevel => {
    try {
      const stringifiedLevel = `${newLevel}`;
      await AsyncStorage.setItem('charmvolume', stringifiedLevel);
      updateSoundLevel(newLevel);
    } catch (err) {
      console.log('Error', err);
    }
  };

  const fishincatchcntxvalue = {
    savedCharmMemories,
    charmName,
    setCharmName,
    charmImage,
    volume: soundLevel,
    setVolume: adjustVolumeLevel,
    setCharmImage,
    loadCharmProfile,
    saveCharmMemory,
    getCharmMemories,
    delCharmMemory,
    isEnabledCharmDailyReminder,
    setIsEnabledCharmDailyReminder,
    isEnabledCharmMusic,
    setIsEnabledCharmMusic,
  };

  return (
    <StoreContext.Provider value={fishincatchcntxvalue}>
      {children}
    </StoreContext.Provider>
  );
};
