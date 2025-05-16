import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { LoadingSpinner } from '../LoadingSpinner';

const SpinnerExample: React.FC = () => {
  const [spinnerType, setSpinnerType] = useState<'circle' | 'dots' | 'pulse' | 'wave'>('circle');

  const cycleSpinnerType = () => {
    setSpinnerType(current => {
      switch (current) {
        case 'circle': return 'dots';
        case 'dots': return 'pulse';
        case 'pulse': return 'wave';
        case 'wave': return 'circle';
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LoadingSpinner: {spinnerType}</Text>
      
      <LoadingSpinner 
        size={50} 
        color="#8A2BE2" 
        type={spinnerType} 
        dotCount={5}
      />
      
      <Button 
        title="Change Spinner Type" 
        onPress={cycleSpinnerType} 
        color="#8A2BE2"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default SpinnerExample;