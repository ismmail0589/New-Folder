import React, { useState } from 'react';
import { View, TextInput, Button, TouchableOpacity, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const Med = ({ onSave }) => {
  const [medicineName, setMedicineName] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const handleSave = () => {
    const medicineTime = selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    onSave({ medicineName, medicineTime });
    setMedicineName('');
    setSelectedDate(new Date());
  };

  const showDateTimePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDateTimePicker = () => {
    setDatePickerVisible(false);
  };

  const handleDatePicked = (date) => {
    hideDateTimePicker();
    setSelectedDate(date);
  };

  return (
    <View>
      <TextInput
        placeholder="Medicine Name"
        value={medicineName}
        onChangeText={setMedicineName}
      />
      <TouchableOpacity onPress={showDateTimePicker}>
        <Text>Select Date and Time</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleDatePicked}
        onCancel={hideDateTimePicker}
      />
      <Button title="Save Medication" onPress={handleSave} />
    </View>
  );
};

export default Med;


// // MedicationForm.js
// import React, { useState } from 'react';
// import { View, TextInput, Button } from 'react-native';

// const Med = ({ onSave }) => {
//   const [medicineName, setMedicineName] = useState('');
//   const [medicineTime, setMedicineTime] = useState('');

//   const handleSave = () => {
//     onSave({ medicineName, medicineTime });
//     setMedicineName('');
//     setMedicineTime('');

//   };

//   return (
//     <View>
//       <TextInput
//         placeholder="Medicine Name"
//         value={medicineName}
//         onChangeText={setMedicineName}
//       />
//       <TextInput
//         placeholder="Medicine Time"
//         value={medicineTime}
//         onChangeText={setMedicineTime}
//       />
//       <Button title="Save Medication" onPress={handleSave} />
//     </View>
//   );
// };

// export default Med;
