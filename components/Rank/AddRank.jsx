import { View, Text, TextInput, TouchableOpacity, FlatList,ScrollView, Modal, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors } from '../../constants/Colors';
import { createItem, getItems, updateItem, deleteItem } from './../api/rankapi'; 
import { useRouter } from 'expo-router';

export default function AddRank() {
  const router = useRouter();
  const [rankName, setRankName] = useState('');
  const [items, setItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [name, setNameUpdate] = useState('');
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await getItems();
    console.log(response.data.data);
    setItems(response.data.data);
  };

  const handleSubmit = async () => {
    console.log(rankName);
    await createItem({ rankName });
    setRankName(''); 
    fetchItems(); 
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
    setNameUpdate(item.rankName);
    setModalVisible(true);
  };

  const handleSaveEdit = async () => {
    if (selectedItem) {
      console.log(`Edited Rank: ${name}`);
      await updateItem({ 
        id: selectedItem.id, 
        rankName: name, 
        active: true,
        deleted: false,
        dateCreated: selectedItem.dateCreated,
        dateUpdated: new Date().toISOString(),
        createdBy: selectedItem.createdBy,
        updatedBy: 'admin', // Replace with actual user if needed
        deletedBy: null,
        deletedReason: null
      }); 
      setModalVisible(false);
      fetchItems(); 
    }
  };

  return (
    <View style={{ marginTop: 30 }}>
      <Text style={{ fontFamily: 'outfit-bold', color: '#9586A8', fontSize: 14, marginBottom: 4, marginLeft: 36 }}>
        {'Enter Rank Name :'}
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
            marginBottom: 10,
            marginHorizontal: 20,
            fontFamily:'outfit-regular',
            color: '#2D0C57',
          }}
          value={rankName}
          onChangeText={setRankName}
        />
      </View>
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
        <Text style={{ color: '#FFFFFF', fontFamily:'outfit-bold' }}>
          {'Add'}
        </Text>
      </TouchableOpacity>

      <View
        style={{
          backgroundColor: '#F6F5F5',
          borderColor: '#5E27FD',
          borderWidth: 2,
          height: 350,
          paddingTop: 30,
          borderTopStartRadius: 15,
          borderTopEndRadius: 15,
          marginTop: 20,
        }}
      >
        <Text style={{ fontFamily: 'outfit-bold', fontSize: 20, paddingLeft: 20 }}>
          #Ranks
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
              <Text style={{ fontFamily: 'outfit-bold', fontSize: 15, marginLeft:5 }}>
                {item.rankName}
              </Text>
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

      {/* Edit Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View
            style={{
              width: 300,
              backgroundColor: '#FFFFFF',
              borderRadius: 20,
              padding: 20,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 20, fontFamily: 'outfit-bold' }}>
              Edit Rank Name
            </Text>
            <TextInput
              style={{
                backgroundColor: '#FFFFFF',
                borderColor: '#D8D0E3',
                borderRadius: 8,
                borderWidth: 1,
                paddingVertical: 10,
                paddingHorizontal: 14,
                marginBottom: 20,
                width: '100%',
                fontSize: 16,
                color: '#2D0C57',
              }}
              value={name}
              onChangeText={setNameUpdate}
            />
            <View
              style={{
                flexDirection: 'row',      
                justifyContent: 'space-between', 
                marginBottom: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.PRIMARY,
                  borderRadius: 8,
                  paddingVertical: 12,
                  paddingHorizontal: 30,
                  marginBottom: 10,
                }}
                onPress={handleSaveEdit}
              >
                <Text style={{ color: '#FFFFFF', fontSize: 16 }}>
                  Save
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#CCCCCC',
                  borderRadius: 8,
                  paddingVertical: 12,
                  paddingHorizontal: 30,
                  marginBottom: 10,
                  marginLeft: 5
                }}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: '#FFFFFF', fontSize: 16 }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View
            style={{
              width: 300,
              backgroundColor: '#FFFFFF',
              borderRadius: 20,
              padding: 20,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 20, fontFamily: 'outfit-bold', textAlign: 'center' }}>
              Are you sure you want to delete this rank?
            </Text>
            <View
              style={{
                flexDirection: 'row',      
                justifyContent: 'space-between', 
                marginBottom: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: '#cc1706',
                  borderRadius: 8,
                  paddingVertical: 12,
                  paddingHorizontal: 30,
                  marginBottom: 10,
                }}
                onPress={handleDelete}
              >
                <Text style={{ color: '#FFFFFF', fontSize: 16 }}>
                  Delete
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#CCCCCC',
                  borderRadius: 8,
                  paddingVertical: 12,
                  paddingHorizontal: 30,
                  marginBottom: 10,
                  marginLeft: 5
                }}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={{ color: '#FFFFFF', fontSize: 16 }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
