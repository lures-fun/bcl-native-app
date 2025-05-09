import { IComponents } from "@gluestack-ui/config";
import { AlertCircleIcon, FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabel, FormControlLabelText, Input, InputField, InputIcon, InputSlot } from "@gluestack-ui/themed"
import { UseFormRegister } from "react-hook-form";
import { TextInputProps } from "react-native";

type Props = TextInputProps & {
  label: string;
  subLabel?: string;
  name: string;
  type?: 'text' | 'password';
  placeholder?: string;
  error?: any;
  register: UseFormRegister<any>;
  validation?: any;
  showLine?: boolean;
  onBlur: () => void;
  onChangeText: () => void;
  rightElement?: IComponents;
  value: string;
  color?: string;
}
export const FormInput = ({
  label,
  subLabel,
  name,
  type,
  placeholder,
  error,
  register,
  validation,
  showLine,
  value,
  rightElement,
  onBlur,
  onChangeText,
  ...rest
}: Props) => {
  return (
    <FormControl
      isDisabled={false}
      isInvalid={!!error}
      isReadOnly={false}
      isRequired={false}
    >
      <FormControlLabel marginBottom={1}>
        <FormControlLabelText color="white" fontWeight="bold" fontSize="$md" textAlign="left">{label}</FormControlLabelText>
      </FormControlLabel>
      <Input display="flex" alignItems="center">
        <InputField {...rest} type={type || 'text'} defaultValue={value} color={rest.color || '$white'} placeholder={placeholder} onBlur={onBlur} onChange={onChangeText} />
        {
          rightElement && (
            <InputSlot pr="$3">
              {/* EyeIcon, EyeOffIcon are both imported from 'lucide-react-native' */}
              <InputIcon as={rightElement} size="md" color='$white' />
            </InputSlot>
          )
        }
      </Input>
      <FormControlError>
        <FormControlErrorIcon as={AlertCircleIcon} />
        <FormControlErrorText>
          {error && error.message}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  )
}