import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';

export const SettingInput = ({
  type,
  label,
  disabled = false,
  placeholder,
  defaultValue,
  onClick,
}) => {
  const {
    reset,
    formState: { defaultValues },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      value: defaultValue,
    },
  });
  const [testValue, onChangeTestValue] = React.useState('');

  useEffect(() => {
    reset({ value: defaultValue });
  }, [defaultValue, reset]);

  return (
    <View style={{ padding: 10, paddingBottom: 0, marginTop: 15, marginBottom: 15 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>{label}</Text>
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={() => onClick(testValue)}>
          <Text style={{ color: 'white' }}>
            変更する
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'column', justifyContent: 'center', paddingVertical: 5 }} >
        <TextInput
          style={{
            backgroundColor: 'gray',
            color: 'white',
            borderColor: 'white',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
          }}
          placeholderTextColor="rgba(255,255,255,0.4)"
          placeholder={placeholder || ''}
          defaultValue={defaultValues?.value}
          onChangeText={onChangeTestValue}
          keyboardType={type === 'number' ? 'numeric' : 'default'}
          editable={!disabled}
        />
      </View>
      <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, marginTop: 15 }} />
    </View>
  );
};
