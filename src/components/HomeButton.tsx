import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

interface HomeButtonProps { onPress: () => void; }

export default function HomeButton({ onPress }: HomeButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Image
        source={require('../assets/icons/Back.png')}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 14,
    left: -2,
    padding: 10,
    borderRadius: 30,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
