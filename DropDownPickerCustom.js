import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

// fonts
import TextRobotoRegular from "../fonts/TextRobotoRegular";

// const
import colors from "../../config/ColorsSet";

// Formik Context
import { useFormikContext } from "formik";

function DropDownPickerCustom({ items, name, label, style, ...rest }) {
  console.log("DropDownPickerCustom", name);
  const { values } = useFormikContext();
  const [open, setOpen] = useState(false);

  const styles = StyleSheet.create({
    container: {
      marginBottom: open ? 100 : 0,
    },
    label: {
      fontSize: 18,
      color: colors.primary_100,
      marginLeft: 13,
      marginBottom: 12,
      transform: [{ translateY: -10 }],
    },
    dropdown: {
      borderWidth: 1,
      height: 48,
      borderRadius: 7,
      borderColor: colors.primary_100,
      color: colors.primary,
      fontSize: 18,
      marginBottom: 24,
      padding: 13,
      zIndex: 100,
    },
    dropDownContainerStyle: {
      borderRadius: 7,
      borderColor: colors.primary_100,
      color: colors.primary,
      zIndex: 100,
    },
    labelStyle: {
      fontSize: 18,
    },
    error: {
      color: colors.error,
      fontSize: 12,
      marginLeft: 20,
      marginBottom: 14,
    },
  });

  return (
    <></>
    // <View style={styles.container}>
    //   <TextRobotoRegular style={styles.label}>{label}</TextRobotoRegular>
    //   {/* <DropDownPicker
    //     open={open}
    //     value={values[name]}
    //     items={items}
    //     setOpen={setOpen}
    //     // setValue={handleChange(name)} //State callback that is called when the value changes.
    //     // setItems={setItems} // State callback that is called to modify or add new items.
    //     style={styles.dropdown}
    //     // containerStyle={styles.containerStyle}
    //     labelStyle={styles.labelStyle}
    //     dropDownContainerStyle={styles.dropDownContainerStyle}
    //     // onSelectItem={() => setFieldTouched(name)} // Callback that returns the selected item / items.
    //   /> */}
    //   <TextRobotoRegular style={styles.error}>
    //     {/* {touched[name] && errors[name]} */}
    //   </TextRobotoRegular>
    // </View>
  );
}

export default DropDownPickerCustom;
