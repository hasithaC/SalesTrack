import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

type Props = {
  onCancel: () => void;
  onSave: () => void;
  cancelText?: string;
  saveText?: string;
};

const ConfirmCancelButton = ({
  onCancel,
  onSave,
  cancelText = 'Cancel',
  saveText = 'Save',
}: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.saveButton} onPress={onSave}>
        <Text style={styles.saveText}>{saveText}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
        <Text style={styles.cancelText}>{cancelText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmCancelButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 16,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#E5E5EA',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#007AFF',
  },
  cancelText: {
    textAlign: 'center',
    color: '#333',
    fontWeight: '500',
  },
  saveText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '500',
  },
});
