import { Button, ButtonText, SafeAreaView, Text, VStack } from '@gluestack-ui/themed';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormInput } from 'src/components/Form/FormInput';

export default function FishingResultRegister() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<{ firstName: string; lastName: string }>({
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  });
  const onSubmit = (data: any) => console.log(data);
  return (
    <SafeAreaView>
      <VStack gap="$3" bgColor="$black" minHeight="$full" $base-px="$4" $md-px="$12" p="$8">
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              name="firstName"
              label="First Name"
              register={register}
              error={errors.firstName}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              rightElement={() => <Text color="$white">cm</Text>}
            />
          )}
          name="firstName"
        />
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              name="lastName"
              label="Last Name"
              register={register}
              error={errors.lastName}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="lastName"
        />

        <Button onPress={handleSubmit(onSubmit)} bgColor="$bclBlue">
          <ButtonText fontSize="$md" fontWeight="$medium" color="white">
            Submit
          </ButtonText>
        </Button>
      </VStack>
    </SafeAreaView>
  );
}
