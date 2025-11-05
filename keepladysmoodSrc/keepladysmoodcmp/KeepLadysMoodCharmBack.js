import { ImageBackground, ScrollView } from 'react-native';

const KeepLadysMoodCharmBack = ({ children }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/ladysmoodbg.png')}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </ImageBackground>
  );
};

export default KeepLadysMoodCharmBack;
