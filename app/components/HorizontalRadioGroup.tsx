import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

type Props = {
  label: string;
  options: string[];
  selected: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
};

const selectedColors = ['#34C759', '#FF9500', '#FF3B30'];

const HorizontalRadioGroup = ({
  label,
  options,
  selected,
  onChange = () => {},
  disabled = false,
}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.radioContainer}>
        {options.map((option, index) => {
          const isSelected = selected === option;
          const selectedColor = selectedColors[index] || '#007AFF';

          return (
            <TouchableOpacity
              disabled={disabled}
              key={option}
              style={[
                styles.radioButton,
                isSelected && {
                  backgroundColor: selectedColor,
                  borderColor: selectedColor,
                },
              ]}
              onPress={() => onChange(option)}>
              <Text
                style={[
                  styles.radioText,
                  isSelected && styles.radioTextSelected,
                ]}>
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default HorizontalRadioGroup;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
  },
  radioContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  radioButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f2f2f2',
  },
  radioText: {
    textAlign: 'center',
    color: '#555',
    fontWeight: '500',
  },
  radioTextSelected: {
    color: '#fff',
  },
});
