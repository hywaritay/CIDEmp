import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, Modal, Alert, Platform, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors } from '../../constants/Colors';
import { getItems, updateItem, deleteItem } from '../api/empapi'; 
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { API_BASE_URL } from './../api/ApiURL'; 

export default function emp() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    id:0,
    rank: '',
    dept: '',
    location: '',
    forceNumber: '',
    pinNumber: '',
    firstName: '',
    lastName: '',
    middleName: '',
    dob: '',
    mobile: '',
    email: '',
    entryDate: '',
    departureDate: '',
    departureReason: ''
  });

  const [currentStep, setCurrentStep] = useState(1); 
  
  const [ranks, setRanks] = useState([]);
  const [depts, setDepts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [EntryDate, setEntryDate] = useState(new Date());
  const [DepartureDate, setDepartureDate] = useState(new Date());
  const [selectedField, setSelectedField] = useState(null);

  useEffect(() => {
    async function fetchRanks() {
      const fetchedRanks = await axios.get(`${API_BASE_URL}/secure/admin/rank/all`);
      setRanks(fetchedRanks.data.data);
    }
    fetchRanks();
  }, []);

  useEffect(() => {
    async function fetchDepts() {
      const fetchedDepts = await axios.get(`${API_BASE_URL}/secure/admin/dept/all`);
      setDepts(fetchedDepts.data.data);
    }
    fetchDepts();
  }, []);

  useEffect(() => {
    async function fetchLocations() {
      const fetchedLocations = await axios.get(`${API_BASE_URL}/secure/admin/location/all`);
      setLocations(fetchedLocations.data.data);
    }
    fetchLocations();
  }, []);

  const onChangeDate = (event, selectedDate, field) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    
    if (field === 'dob') setDate(currentDate);
    if (field === 'entryDate') setEntryDate(currentDate);
    if (field === 'departureDate') setDepartureDate(currentDate);

    let tempDate = new Date(currentDate);
    let year = tempDate.getFullYear();
    let month = ('0' + (tempDate.getMonth() + 1)).slice(-2); 
    let day = ('0' + tempDate.getDate()).slice(-2); 
    let fDate = `${year}-${month}-${day}`;

    setFormData({ ...formData, [field]: fDate });
  };

  const showDatepicker = (field) => {
    setShowPicker(true);
    setSelectedField(field); 
};


  useEffect(() => {
    fetchItems();
  }, []);


  const fetchItems = async () => {
    const response = await getItems();
    setItems(response.data.data);
  };


  const confirmDelete = (item) => {
    setSelectedItem(item);
    setDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    if (selectedItem) {
      await deleteItem(selectedItem.id);
      setDeleteModalVisible(false);
      fetchItems();
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setFormData({
      rank: item.rank,
      dept: item.dept,
      location: item.location,
      forceNumber: item.forceNumber,
      pinNumber: item.pinNumber,
      firstName: item.firstName,
      lastName: item.lastName,
      middleName: item.middleName,
      dob: item.dob,
      mobile: item.mobile,
      email: item.email,
      entryDate: item.entryDate,
      departureDate: item.departureDate,
      departureReason: item.departureReason
    });
    setCurrentStep(1);
    setModalVisible(true);
  };

  const handleSaveEdit = async () => {
    await updateItem(formData);
    setModalVisible(false);
    fetchItems();
    try {
      console.log('Submitting form data:', formData);

      const response = await updateItem(formData);

      if (response.status === 200) {
          console.log('Item Updated successfully:', response.data);

          setFormData({
              forceNumber: '',
              pinNumber: '',
              firstName: '',
              lastName: '',
              middleName: '',
              dob: '',
              mobile: '',
              email: '',
              entryDate: '',
              departureDate: '',
              departureReason: '',
              fkRank: 0,
              fkDept: 0,
              fkLoc: 0,
          });
         Alert.alert('Success', 'Employee Record Updated successfully!');

      } else {
          console.log('Failed to  item. Status code:', response.status);
          Alert.alert('Error', 'Failed to Update employee record.');
      }
    } catch (error) {
        console.error('Error during form submission:', error);
        Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <View>
            <Text style={{color:"#ffffff", marginBottom:5,fontFamily: 'outfit-medium'}}>Step 1: Personal Information</Text>
              <Text style={{ fontFamily: 'outfit-regular', color: '#FFFFFF', fontSize: 15, marginBottom: 5, marginLeft: 15 }}>
                  {'First name:'}
              </Text>
              <TextInput 
                  style={{
                    backgroundColor: '#e9e9f2',
                    borderColor: '#D8D0E3',
                    borderRadius: 8,
                    borderWidth: 1,
                    paddingVertical: 10,
                    paddingHorizontal: 5,
                    marginBottom: 20,
                    fontSize: 15,
                    marginLeft: 10,
                    color: '#2D0C57',
                }}
              placeholder="First Name" value={formData.firstName} onChangeText={(text) => setFormData({ ...formData, firstName: text })} />
              <Text style={{ fontFamily: 'outfit-regular', color: '#FFFFFF', fontSize: 15, marginBottom: 5, marginLeft: 15 }}>
                  {'First name:'}
              </Text>
              <TextInput 
                  style={{
                    backgroundColor: '#e9e9f2',
                    borderColor: '#D8D0E3',
                    borderRadius: 8,
                    borderWidth: 1,
                    paddingVertical: 10,
                    paddingHorizontal: 5,
                    marginBottom: 20,
                    fontSize: 15,
                    marginLeft: 10,
                    color: '#2D0C57',
                }}
              placeholder="Last Name" value={formData.lastName} onChangeText={(text) => setFormData({ ...formData, lastName: text })} />
              <Text style={{ fontFamily: 'outfit-regular', color: '#FFFFFF', fontSize: 15, marginBottom: 5, marginLeft: 15 }}>
                  {'Middle name:'}
              </Text>
              <TextInput 
                  style={{
                    backgroundColor: '#e9e9f2',
                    borderColor: '#D8D0E3',
                    borderRadius: 8,
                    borderWidth: 1,
                    paddingVertical: 10,
                    paddingHorizontal: 5,
                    marginBottom: 20,
                    fontSize: 15,
                    marginLeft: 10,
                    color: '#2D0C57',
                }}
              placeholder="Middle Name" value={formData.middleName} onChangeText={(text) => setFormData({ ...formData, middleName: text })} />
          </View>
        );
      case 2:
        return (
          <View>
            <Text style={{color:"#ffffff", marginBottom:5,fontFamily: 'outfit-medium'}}>Step 2: Contact Information</Text>
              <Text style={{ fontFamily: 'outfit-regular', color: '#FFFFFF', fontSize: 15, marginBottom: 5, marginLeft: 15 }}>
                  {'Mobile:'}
              </Text>
              <TextInput 
                  style={{
                    backgroundColor: '#e9e9f2',
                    borderColor: '#D8D0E3',
                    borderRadius: 8,
                    borderWidth: 1,
                    paddingVertical: 10,
                    paddingHorizontal: 5,
                    marginBottom: 20,
                    fontSize: 15,
                    marginLeft: 10,
                    color: '#2D0C57',
                  }}
              placeholder="Mobile" value={formData.mobile} onChangeText={(text) => setFormData({ ...formData, mobile: text })} />
              <Text style={{ fontFamily: 'outfit-regular', color: '#FFFFFF', fontSize: 15, marginBottom: 5, marginLeft: 15 }}>
                  {'Email:'}
              </Text>
              <TextInput 
                  style={{
                    backgroundColor: '#e9e9f2',
                    borderColor: '#D8D0E3',
                    borderRadius: 8,
                    borderWidth: 1,
                    paddingVertical: 10,
                    paddingHorizontal: 5,
                    marginBottom: 20,
                    fontSize: 15,
                    marginLeft: 10,
                    color: '#2D0C57',
                }}
                placeholder="Email" value={formData.email} onChangeText={(text) => setFormData({ ...formData, email: text })} />
          </View>
        );
      case 3:
        return (
          <View>
            <Text style={{color:"#ffffff", marginBottom:5,fontFamily: 'outfit-medium'}}>Step 3: Employment Information</Text>
            <Text style={{ fontFamily: 'outfit-regular', color: '#FFFFFF', fontSize: 15, marginBottom: 5, marginLeft: 15 }}>
                  {'Rank:'}
            </Text>
            <Picker 
              style={{
                backgroundColor: '#e9e9f2',
                borderColor: '#D8D0E3',
                borderRadius: 8,
                borderWidth: 1,
                paddingVertical: 10,
                paddingHorizontal: 5,
                marginBottom: 20,
                fontSize: 15,
                marginLeft: 10,
                color: '#2D0C57',
              }}
              selectedValue={formData.rank} onValueChange={(value) => setFormData({ ...formData, rank: value })}>
              {ranks.map(rank => <Picker.Item label={rank.rankName} value={rank.rankName} key={rank.id} />)}
            </Picker>
            <Text style={{ fontFamily: 'outfit-regular', color: '#FFFFFF', fontSize: 15, marginBottom: 5, marginLeft: 15 }}>
                  {'Department:'}
            </Text>
            <Picker
              style={{
                backgroundColor: '#e9e9f2',
                borderColor: '#D8D0E3',
                borderRadius: 8,
                borderWidth: 1,
                paddingVertical: 10,
                paddingHorizontal: 5,
                marginBottom: 20,
                fontSize: 15,
                marginLeft: 10,
                color: '#2D0C57',
              }}
             selectedValue={formData.dept} onValueChange={(value) => setFormData({ ...formData, dept: value })}>
              {depts.map(dept => <Picker.Item label={dept.deptName} value={dept.deptName} key={dept.id} />)}
            </Picker>
            <Text style={{ fontFamily: 'outfit-regular', color: '#FFFFFF', fontSize: 15, marginBottom: 5, marginLeft: 15 }}>
                  {'Location:'}
            </Text>
            <Picker
              style={{
                backgroundColor: '#e9e9f2',
                borderColor: '#D8D0E3',
                borderRadius: 8,
                borderWidth: 1,
                paddingVertical: 10,
                paddingHorizontal: 5,
                marginBottom: 20,
                fontSize: 15,
                marginLeft: 10,
                color: '#2D0C57',
              }}
              selectedValue={formData.location} onValueChange={(value) => setFormData({ ...formData, location: value })}>
              {locations.map(location => <Picker.Item label={location.district} value={location.district} key={location.id} />)}
            </Picker>
          </View>
        );
      case 4:
        return (
          <View>
            <Text style={{color:"#ffffff", marginBottom:5,fontFamily: 'outfit-medium'}}>Step 4: Date </Text>
              <Text style={{ fontFamily: 'outfit-regular', color: '#FFFFFF', fontSize: 15, marginBottom: 5, marginLeft: 15 }}>
                  {'Date of Birth:'}
              </Text>
              <TouchableOpacity onPress={() => showDatepicker('dob')}>
                  <TextInput
                    style={{
                      backgroundColor: '#e9e9f2',
                      borderColor: '#D8D0E3',
                      borderRadius: 8,
                      borderWidth: 1,
                      paddingVertical: 10,
                      paddingHorizontal: 5,
                      marginBottom: 20,
                      fontSize: 15,
                      marginLeft: 5,
                      color: '#2D0C57',
                    }}
                    value={formData.dob}
                    editable={false}
                    placeholder="Select Date of Birth"
                    onChangeText={(text) => setFormData({ ...formData, dob: text })}
                  />
              </TouchableOpacity>
              {showPicker && selectedField === 'dob' && (
                  <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => onChangeDate(event, selectedDate, 'dob')}
                  />
              )}

              <Text style={{ fontFamily: 'outfit-regular', color: '#FFFFFF', fontSize: 15, marginBottom: 5, marginLeft: 15 }}>
                  {'Entry Date:'}
              </Text>
              <TouchableOpacity onPress={() => showDatepicker('entryDate')}>
                  <TextInput
                    style={{
                      backgroundColor: '#e9e9f2',
                      borderColor: '#D8D0E3',
                      borderRadius: 8,
                      borderWidth: 1,
                      paddingVertical: 10,
                      paddingHorizontal: 5,
                      marginBottom: 20,
                      fontSize: 15,
                      marginLeft: 5,
                      color: '#2D0C57',
                    }}
                    value={formData.entryDate}
                    editable={false}
                    placeholder="Select Date of Birth"
                    onChangeText={(text) => setFormData({ ...formData, entryDate: text })}
                  />
              </TouchableOpacity>
              {showPicker && selectedField === 'entryDate' && (
                  <DateTimePicker
                  value={EntryDate}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => onChangeDate(event, selectedDate, 'entryDate')}
                  />
              )}
          </View>
        );
      case 5:
        return (
          <View>
            <Text style={{color:"#ffffff", marginBottom:5,fontFamily: 'outfit-medium'}}>Step 5: Security Information</Text>
              <Text style={{ fontFamily: 'outfit-regular', color: '#FFFFFF', fontSize: 15, marginBottom: 5, marginLeft: 15 }}>
                  {'PIN Number:'}
              </Text>
            <TextInput
              style={{
                backgroundColor: '#e9e9f2',
                borderColor: '#D8D0E3',
                borderRadius: 8,
                borderWidth: 1,
                paddingVertical: 10,
                paddingHorizontal: 5,
                marginBottom: 20,
                fontSize: 15,
                marginLeft: 10,
                color: '#2D0C57',
              }}
             placeholder="PIN Number" value={formData.pinNumber} onChangeText={(text) => setFormData({ ...formData, pinNumber: text })} />

                <View>
                    <Text style={{ fontFamily: 'outfit-bold', color: '#FFFFFF', fontSize: 20, marginBottom: 5, marginLeft: 15 }}>
                        {'Force Number:'}
                    </Text>
                    <TextInput
                        style={{
                            backgroundColor: '#9586A8',
                            borderColor: '#D8D0E3',
                            borderRadius: 8,
                            borderWidth: 1,
                            paddingVertical: 18,
                            paddingHorizontal: 10,
                            marginBottom: 20,
                            fontSize: 15,
                            marginLeft: 10,
                            color: '#2D0C57',
                        }}
                        value={formData.forceNumber}
                        editable={false}
                        onChangeText={(text) => setFormData({ ...formData, forceNumber: text })}
                    />
                </View>
          </View>
        );
      case 6:
        return (
          <View>
            <Text style={{color:"#ffffff", marginBottom:5,fontFamily: 'outfit-medium'}}>Step 6: Departure Information</Text>
            <Text style={{ fontFamily: 'outfit-regular', color: '#FFFFFF', fontSize: 15, marginBottom: 5, marginLeft: 15 }}>
                  {'Departure Date:'}
            </Text>
                <TouchableOpacity onPress={() => showDatepicker('departureDate')}>
                    <TextInput
                    style={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#D8D0E3',
                        borderRadius: 8,
                        borderWidth: 1,
                        paddingVertical: 18,
                        paddingHorizontal: 5,
                        marginBottom: 20,
                        fontSize: 15,
                        marginLeft: 20,
                        color: '#2D0C57',
                    }}
                    value={formData.departureDate}
                    editable={false}
                    placeholder="Select Departure Date"
                    onChangeText={(text) => setFormData({ ...formData, departureDate: text })}
                    />
                </TouchableOpacity>
                {showPicker && selectedField === 'departureDate' && (
                    <DateTimePicker
                    value={DepartureDate}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => onChangeDate(event, selectedDate, 'departureDate')}
                    />
                )}
            <Text style={{ fontFamily: 'outfit-regular', color: '#FFFFFF', fontSize: 15, marginBottom: 5, marginLeft: 15 }}>
                  {'Departure Reason:'}
            </Text>
            <TextInput
              style={{
                backgroundColor: '#e9e9f2',
                borderColor: '#D8D0E3',
                borderRadius: 8,
                borderWidth: 1,
                paddingVertical: 10,
                paddingHorizontal: 5,
                marginBottom: 20,
                fontSize: 15,
                marginLeft: 10,
                color: '#2D0C57',
              }}
             placeholder="Departure Reason" value={formData.departureReason} onChangeText={(text) => setFormData({ ...formData, departureReason: text })} />
          </View>
        );
      default:
        return null;
    }
  };

  const handleNextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <View style={{ marginTop: 30 }}>
      <View
        style={{
          backgroundColor: '#F6F5F5',
          borderColor: '#5E27FD',
          borderWidth: 1,
          height: 400,
          paddingTop: 30,
          paddingBottom: 53,
          borderTopStartRadius: 15,
          borderTopEndRadius: 15,
          marginTop: 20,
        }}
      >
        <Text style={{ fontFamily: 'outfit-bold', fontSize: 20, paddingLeft: 20 }}>
          #employees
        </Text>

        <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                paddingVertical: 15,
                paddingHorizontal: 5,
                marginTop: 20,
                marginLeft: 20,
                marginRight: 20,
                marginBottom: 16,
                shadowColor: '#00000040',
                shadowOpacity: 0.3,
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowRadius: 4,
                elevation: 4,
              }}
            >
                <View style={{display:'flex', flexDirection:'column'}}>
                    <Text style={{ fontFamily: 'outfit-bold', fontSize: 20 }}>
                        {item.firstName + ' ' + item.lastName}
                    </Text>
                    <Text style={{ fontFamily: 'outfit-bold', fontSize: 20 }}>
                        {item.forceNumber}
                    </Text>
                </View>
                
                <View
                style={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    alignItems: 'flex-start',
                    marginTop: 10,
                }}
                >
                <TouchableOpacity
                    style={{
                    backgroundColor: '#cc1706',
                    borderRadius: 8,
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    }}
                    onPress={() => confirmDelete(item)}
                >
                    <Text style={{ color: '#FFFFFF', fontSize: 15 }}>
                    Delete
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                    backgroundColor: '#020452',
                    borderRadius: 8,
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    marginRight: 10,
                    }}
                    onPress={() => handleEdit(item)}
                >
                    <Text style={{ color: '#FFFFFF', fontSize: 15 }}>
                    Edit
                    </Text>
                </TouchableOpacity>
                </View>
            </View>
            )}
        />
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '90%', backgroundColor: Colors.PRIMARY, padding: 20, borderRadius: 10 }}>
            <ScrollView>
              {renderStep()}
            </ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <Button title="Previous" onPress={handlePrevStep} disabled={currentStep === 1} />
              <Button title="Next" onPress={handleNextStep} disabled={currentStep === 6} />
            </View>
            {currentStep === 6 && (
              <TouchableOpacity 
              onPress={handleSaveEdit} 
              style={{
                backgroundColor: '#007BFF', 
                paddingVertical: 12, 
                paddingHorizontal: 20, 
                borderRadius: 5, 
                marginTop: 10, 
                alignItems: 'center', 
                justifyContent: 'center', 
                elevation: 3, 
                shadowColor: '#000', 
                shadowOffset: { width: 0, height: 2 }, 
                shadowOpacity: 0.2, 
                shadowRadius: 3, 
              }}
            >
              <Text style={{
                color: '#FFFFFF', 
                fontSize: 18,
                fontWeight: 'bold', 
              }}>
                Save
              </Text>
            </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>

      <Modal visible={deleteModalVisible} animationType="slide" transparent={true}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '80%', backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text>Are you sure you want to delete this item?</Text>
            <Button title="Delete" onPress={handleDelete} />
            <Button title="Cancel" onPress={() => setDeleteModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
