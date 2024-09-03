import { View, Text, TextInput, TouchableOpacity, Alert, Platform,Button, KeyboardAvoidingView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors } from '../../constants/Colors';
import { createItem, getItems } from '../api/empapi'; 
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { API_BASE_URL } from './../api/ApiURL'; 


export default function EmployeeComponent() {
  const router = useRouter();
  const [formData, setFormData] = useState({
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
    imgProfile:'',
    fkRank: 0,
    fkDept: 0,
    fkLoc: 0,
  });
  const [ranks, setRanks] = useState([]);
  const [depts, setDepts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [EntryDate, setEntryDate] = useState(new Date());
  const [DepartureDate, setDepartureDate] = useState(new Date());
  const [selectedField, setSelectedField] = useState(null);
  const [error, setError] = useState('');
  

  useEffect(() => {
    async function fetchRanks() {
        const fetchedRanks = await axios.get(`${API_BASE_URL}/secure/admin/rank/all`); 
        setRanks(fetchedRanks.data.data);
        console.log(fetchedRanks.data.data); 
    }
    fetchRanks();
  }, []);

  const ranksArray = Array.isArray(ranks) ? ranks : [];

  useEffect(() => {
    async function fetchDepts() {
        const fetchedDepts = await axios.get(`${API_BASE_URL}/secure/admin/dept/all`); 
        setDepts(fetchedDepts.data.data);
        console.log(fetchedDepts.data.data); 
    }
    fetchDepts();
  }, []);

  const deptsArray = Array.isArray(depts) ? depts : [];


  useEffect(() => {
    async function fetchLocations() {
        const fetchedLocations = await axios.get(`${API_BASE_URL}/secure/admin/location/all`); 
        setLocations(fetchedLocations.data.data);
        console.log(fetchedLocations.data.data); 
    }
    fetchLocations();
  }, []);

  const locationsArray = Array.isArray(locations) ? locations : [];

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

  useEffect(() => {
    const generatedNumber = generateForceNumber();
    setFormData(prevFormData => ({ ...prevFormData, forceNumber: generatedNumber }));
}, []);

  const fetchItems = async () => {
    const response = await getItems();
    console.log(response.data.data);
    setItems(response.data.data);
  };

  const handleSubmit = async () => {
    try {
       
        const response = await createItem(formData);
        if (!formData.pinNumber) {
            setError('Pin number is required');
        } else {
            setError('');
            if (response.status === 200) {
                console.log('Item created successfully:', response.data);
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
    
            } else {
                console.log('Failed to create item. Status code:', response.status);
                Alert.alert('Error', 'Failed to create item.');
            }
        }
        
    } catch (error) {
        console.error('Error during form submission:', error);
        Alert.alert('Error', 'An unexpected error occurred.');
    }
};



const generateForceNumber = () => {
    const prefix = 'CID';
    const randomNumber = Math.floor(1000 + Math.random() * 9000); 
    return `${prefix}${randomNumber}`;
};

const [currentStep, setCurrentStep] = useState(1); 
const handleNextStep = () => {
if (currentStep < 7) {
    setCurrentStep(currentStep + 1);
}
};

const handlePrevStep = () => {
if (currentStep > 1) {
    setCurrentStep(currentStep - 1);
}
};

  return (
    <View style={{ marginTop: 30, marginLeft:5 }}>
    {currentStep === 1 && (
        <View>
          <Text style={{ fontFamily: 'outfit-bold', color: '#9586A8', fontSize: 20, marginBottom: 5, marginLeft:5 }}>
            Step 1: Basic Information
          </Text>
            <View style={{ marginTop:10, marginBottom:5,display: 'flex',flexDirection:'row' }}>
                <View>
                    <Text style={{ fontFamily: 'outfit-medium', color: '#9586A8',  marginBottom: 5, marginLeft: 15 }}>
                        {'Force Number:'}
                    </Text>
                    <TextInput
                        style={{
                            backgroundColor: '#e9e9f2',
                            borderColor: '#D8D0E3',
                            borderRadius: 8,
                            borderWidth: 1,
                            paddingVertical: 10,
                            paddingHorizontal: 15,
                            width:150,
                            marginBottom: 20,
                            fontFamily:'outfit-regular',
                            marginLeft: 10,
                            color: '#2D0C57',
                        }}
                        value={formData.forceNumber}
                        editable={false}
                        onChangeText={(text) => setFormData({ ...formData, forceNumber: text })}
                    />
                </View>
                <View>
                    <Text style={{ fontFamily: 'outfit-medium', color: '#9586A8', marginBottom: 5, marginLeft: 25 }}>
                        {'Pin Number:'}
                    </Text>
                    <TextInput
                        style={{
                            backgroundColor: '#FFFFFF',
                            borderColor: '#D8D0E3',
                            borderRadius: 8,
                            paddingHorizontal: 15,
                            borderWidth: 1,
                            paddingVertical: 10,
                            width: 150,
                            marginBottom: 20,
                            fontSize: 15,
                            marginLeft: 20,
                            color: '#2D0C57',
                        }}
                        value={formData.pinNumber}
                        onChangeText={(text) => {
                            const numericText = text.replace(/[^0-9]/g, '');
                            setFormData({ ...formData, pinNumber: numericText });
                        }}
                        keyboardType="numeric" 
                    />

                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft:20, marginRight:25, marginBottom:10 }}>
                <Button title="Next" onPress={handleNextStep} />
            </View>
            
        </View>
    )}
    {currentStep === 2 && (
        <View>
          <Text style={{ fontFamily: 'outfit-bold', color: '#9586A8', fontSize: 20, marginBottom: 5, marginLeft:5 }}>
            Step 2: Personal Details
          </Text>

            <View style={{ marginTop:10, display: 'flex',flexDirection:'row' }}>
                <View>
                    <Text style={{ fontFamily: 'outfit-medium', color: '#9586A8',  marginBottom: 5, marginLeft: 25 }}>
                        {'First Name:'}
                    </Text>
                    <TextInput
                        style={{
                            backgroundColor: '#FFFFFF',
                            borderColor: '#D8D0E3',
                            borderRadius: 8,
                            paddingHorizontal: 15,
                            borderWidth: 1,
                            paddingVertical: 10,
                            width: 150,
                            marginBottom: 20,
                            fontSize: 15,
                            marginLeft: 20,
                            color: '#2D0C57',
                        }}
                        value={formData.firstName}
                        onChangeText={(text) => {
                            const lettersOnly = text.replace(/[^a-zA-Z]/g, '');
                            setFormData({ ...formData, firstName: lettersOnly })
                        }
                        }
                    />
                </View>
                <View>
                    <Text style={{ fontFamily: 'outfit-medium', color: '#9586A8',  marginBottom: 5, marginLeft: 25 }}>
                        {'Last Name:'}
                    </Text>
                    <TextInput
                        style={{
                            backgroundColor: '#FFFFFF',
                            borderColor: '#D8D0E3',
                            borderRadius: 8,
                            paddingHorizontal: 15,
                            borderWidth: 1,
                            paddingVertical: 10,
                            width: 150,
                            marginBottom: 20,
                            fontSize: 15,
                            marginLeft: 20,
                            color: '#2D0C57',
                        }}
                    value={formData.lastName}
                    onChangeText={(text) => setFormData({ ...formData, lastName: text })}
                    />
                </View>
            </View>
            <View style={{marginBottom:5,display: 'flex',flexDirection:'row' }}>
                <View>
                    <Text style={{ fontFamily: 'outfit-medium', color: '#9586A8',  marginBottom: 5, marginLeft: 25 }}>
                        {'Middle Name:'}
                    </Text>
                    <TextInput
                        style={{
                            backgroundColor: '#FFFFFF',
                            borderColor: '#D8D0E3',
                            borderRadius: 8,
                            paddingHorizontal: 15,
                            borderWidth: 1,
                            paddingVertical: 10,
                            width: 150,
                            marginBottom: 20,
                            fontSize: 15,
                            marginLeft: 20,
                            color: '#2D0C57',
                        }}
                        value={formData.middleName}
                        onChangeText={(text) => setFormData({ ...formData, middleName: text })}
                    />
                </View>
                <View>
                    <Text style={{ fontFamily: 'outfit-medium', color: '#9586A8',  marginBottom: 5, marginLeft: 25 }}>
                        {'DOB:'}
                    </Text>
                    <TouchableOpacity onPress={() => showDatepicker('dob')}>
                        <TextInput
                            style={{
                                backgroundColor: '#FFFFFF',
                                borderColor: '#D8D0E3',
                                borderRadius: 8,
                                paddingHorizontal: 15,
                                borderWidth: 1,
                                paddingVertical: 10,
                                width: 150,
                                marginBottom: 20,
                                fontSize: 15,
                                marginLeft: 20,
                                color: '#2D0C57',
                            }}
                        value={formData.dob}
                        editable={false}
                        placeholder="Date of Birth"
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
                </View>
            </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft:20, marginRight:25,marginBottom:10 }}>
            <Button title="Previous" onPress={handlePrevStep} />
            <Button title="Next" onPress={handleNextStep} />
          </View>
        </View>
    )}
    {currentStep === 3 && (
        <View>
            <Text style={{ fontFamily: 'outfit-bold', color: '#9586A8', fontSize: 20, marginBottom: 5, marginLeft:5  }}>
                Step 3: Contact  Information
            </Text>
            <View>
                <Text style={{ fontFamily: 'outfit-medium', color: '#9586A8',  marginBottom: 5, marginLeft: 25 }}>
                    {'Enter Email:'}
                </Text>
                <View>
                    <TextInput
                        style={{
                            backgroundColor: '#FFFFFF',
                            borderColor: '#D8D0E3',
                            borderRadius: 8,
                            borderWidth: 1,
                            paddingVertical: 10,
                            paddingHorizontal: 14,
                            marginBottom: 20,
                            marginLeft:20,
                            marginRight:28,
                            fontSize: 20,
                            color: '#2D0C57',
                        }}
                    value={formData.email}
                    onChangeText={(text) => setFormData({ ...formData, email: text })}
                    />
                </View>
            </View>
            <View>
                <Text style={{ fontFamily: 'outfit-medium', color: '#9586A8',  marginBottom: 5, marginLeft: 25 }}>
                    {'Enter Mobile:'}
                </Text>
                <View>
                    <TextInput
                        style={{
                            backgroundColor: '#FFFFFF',
                            borderColor: '#D8D0E3',
                            borderRadius: 8,
                            borderWidth: 1,
                            paddingVertical: 10,
                            paddingHorizontal: 14,
                            marginBottom: 20,
                            marginLeft:20,
                            marginRight:28,
                            fontSize: 20,
                            color: '#2D0C57',
                        }}
                    value={formData.mobile}
                    onChangeText={(text) => setFormData({ ...formData, mobile: text })}
                    />
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft:20, marginRight:25, marginBottom:10 }}>
                <Button title="Previous" onPress={handlePrevStep} />
                <Button title="Next" onPress={handleNextStep} />
            </View>
        </View> 
    )}
    {currentStep === 4 && (
        <View>
            <Text style={{ fontFamily: 'outfit-bold', color: '#9586A8', fontSize: 20, marginBottom: 5, marginLeft:5  }}>
                Step 4: Date Information
            </Text>
            <View style={{ marginTop: 10, marginBottom: 5, display: 'flex', flexDirection: 'row' }}>
                <View>
                    <Text style={{ fontFamily: 'outfit-medium', color: '#9586A8',  marginBottom: 5, marginLeft: 25 }}>
                        {'Employed Date:'}
                    </Text>
                    <TouchableOpacity onPress={() => showDatepicker('entryDate')}>
                        <TextInput
                            style={{
                                backgroundColor: '#FFFFFF',
                                borderColor: '#D8D0E3',
                                borderRadius: 8,
                                paddingHorizontal: 15,
                                borderWidth: 1,
                                paddingVertical: 10,
                                width: 150,
                                marginBottom: 20,
                                fontSize: 15,
                                marginLeft: 20,
                                color: '#2D0C57',
                            }}
                        value={formData.entryDate}
                        editable={false}
                        placeholder="Employed Date"
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
            
                <View>
                <Text style={{ fontFamily: 'outfit-medium', color: '#9586A8',  marginBottom: 5, marginLeft: 25 }}>
                    {'Departure Date:'}
                </Text>
                <TouchableOpacity onPress={() => showDatepicker('departureDate')}>
                    <TextInput
                        style={{
                            backgroundColor: '#FFFFFF',
                            borderColor: '#D8D0E3',
                            borderRadius: 8,
                            paddingHorizontal: 15,
                            borderWidth: 1,
                            paddingVertical: 10,
                            width: 150,
                            marginBottom: 20,
                            fontSize: 15,
                            marginLeft: 20,
                            color: '#2D0C57',
                        }}
                    value={formData.departureDate}
                    editable={false}
                    placeholder="Departure Date"
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
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft:20, marginRight:25, marginBottom:10 }}>
                <Button title="Previous" onPress={handlePrevStep} />
                <Button title="Next" onPress={handleNextStep} />
            </View>
        </View>
    )}
    {currentStep === 5 && (
        <View>
            <Text style={{color:"#000000", marginBottom:5,fontFamily: 'outfit-medium'}}>Step 5: Employment Information</Text>
            <Text style={{ fontFamily: 'outfit-regular', color: '#000000', fontSize: 15, marginBottom: 5, marginLeft: 15 }}>
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
                selectedValue={formData.fkRank} onValueChange={(value) => setFormData({ ...formData, fkRank: value })}>
                {ranks.map(rank => <Picker.Item label={rank.rankName} value={rank.id} key={rank.id} />)}
            </Picker>
            <Text style={{ fontFamily: 'outfit-regular', color: '#000000', fontSize: 15, marginBottom: 5, marginLeft: 15 }}>
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
            selectedValue={formData.fkDept} onValueChange={(value) => setFormData({ ...formData, fkDept: value })}>
            {depts.map(dept => <Picker.Item label={dept.deptName} value={dept.id} key={dept.id} />)}
            </Picker>
            <Text style={{ fontFamily: 'outfit-regular', color: '#000000', fontSize: 15, marginBottom: 5, marginLeft: 15 }}>
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
            selectedValue={formData.fkLoc} onValueChange={(value) => setFormData({ ...formData, fkLoc: value })}>
            {locations.map(location => <Picker.Item label={location.district} value={location.id} key={location.id} />)}
            </Picker>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft:20, marginRight:25 }}>
                <Button title="Previous" onPress={handlePrevStep} />
                <Button title="Next" onPress={handleNextStep} />
            </View>
      </View>
    )}
    {currentStep === 6 && (
        <View>
            <Text style={{ fontFamily: 'outfit-bold', color: '#9586A8', fontSize: 20, marginBottom: 5, marginLeft:5  }}>
                Step 6: 
            </Text>
            <View style={{ marginTop:10, display: 'flex',flexDirection:'row' }}>
                <View>
                <Text style={{ fontFamily: 'outfit-medium', color: '#9586A8',  marginBottom: 5, marginLeft: 20 }}>
                    Departure Reason
                </Text>
                    <TextInput
                        style={{
                            backgroundColor: '#FFFFFF',
                            borderColor: '#D8D0E3',
                            borderRadius: 8,
                            borderWidth: 1,
                            paddingVertical: 10,
                            paddingHorizontal:18,
                            width: 320,
                            marginBottom: 20,
                            fontSize: 15,
                            marginLeft: 10,
                            color: '#2D0C57',
                        }}
                    value={formData.departureReason}
                    onChangeText={(text) => setFormData({ ...formData, departureReason: text })}
                    />
                </View>
            </View>
            <View style={{  marginBottom:5,display: 'flex',flexDirection:'row' }}>
                <View>
                <Text style={{ fontFamily: 'outfit-medium', color: '#9586A8',  marginBottom: 5, marginLeft: 20 }}>
                    Profile Picture : Enter image url
                </Text>
                    <TextInput
                        style={{
                            backgroundColor: '#FFFFFF',
                            borderColor: '#D8D0E3',
                            borderRadius: 8,
                            borderWidth: 1,
                            paddingVertical: 10,
                            paddingHorizontal:18,
                            width: 320,
                            marginBottom: 20,
                            fontSize: 15,
                            marginLeft: 10,
                            color: '#2D0C57',
                        }}
                    value={formData.imgProfile}
                    onChangeText={(text) => setFormData({ ...formData, imgProfile: text })}
                    />
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom:20, marginLeft:15 }}>
                <Button title="Previous" onPress={handlePrevStep} />
            </View>
            {/* submit button */}
            {error ? <Text style={{ color: 'red', marginLeft: 20 }}>{error}</Text> : null}
            <TouchableOpacity
                style={{
                    alignItems: 'center',
                    backgroundColor: Colors.PRIMARY,
                    borderRadius: 8,
                    paddingVertical: 13,
                    marginHorizontal: 95,
                }}
                onPress={handleSubmit}
            >
                <Text style={{ color: '#FFFFFF', fontSize: 15 }}>
                {'Add'}
                </Text>
            </TouchableOpacity>
        </View>
    )}

    <TouchableOpacity style={{
        margin: 10,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 8,
        paddingVertical: 13,
        marginHorizontal: 20,
        }}
        onPress={()=>router.push('/emp')}>
            <Text style={{ color: '#FFFFFF', fontSize: 15, marginLeft: 10, marginLeft:100 }}>
                {'View Employees'}
            </Text>
    </TouchableOpacity>


    </View>
  );
}
