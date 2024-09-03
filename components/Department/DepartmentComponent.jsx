import { View, Text, TextInput, TouchableOpacity, FlatList, Modal, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors } from '../../constants/Colors';
import { createItem, getItems, updateItem, deleteItem } from '../api/deptapi'; 
import { useRouter } from 'expo-router';

export default function DepartmentComponent() {
  const router = useRouter();
  const [deptName, setdeptName] = useState('');
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
    console.log(deptName);
    await createItem({ deptName });
    setdeptName('');
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
    setNameUpdate(item.deptName);
    setModalVisible(true);
  };

  const handleSaveEdit = async () => {
    if (selectedItem) {
      console.log(`Edited dept: ${name}`);
      await updateItem({ 
        id: selectedItem.id, 
        deptName: name, 
        active: true,
        deleted: false,
        dateCreated: selectedItem.dateCreated,
        dateUpdated: new Date().toISOString(),
        createdBy: selectedItem.createdBy,
        updatedBy: 'admin', 
        deletedBy: null,
        deletedReason: null
      }); 
      setModalVisible(false);
      fetchItems(); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {'Enter Department Name :'}
      </Text>
      <View>
        <TextInput
          style={styles.input}
          value={deptName}
          onChangeText={setdeptName}
        />
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleSubmit}
      >
        <Text style={styles.addButtonText}>
          {'Add'}
        </Text>
      </TouchableOpacity>

      <View style={styles.listContainer}>
        <Text style={styles.listHeader}>
          #depts
        </Text>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.listItemText}>
                {item.deptName}
              </Text>
              <View style={styles.listItemButtons}>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => confirmDelete(item)}
                >
                  <Text style={styles.buttonText}>
                    Delete
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => handleEdit(item)}
                >
                  <Text style={styles.buttonText}>
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
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Edit dept Name
            </Text>
            <TextInput
              style={styles.modalInput}
              value={name}
              onChangeText={setNameUpdate}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveEdit}
              >
                <Text style={styles.modalButtonText}>
                  Save
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>
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
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.deleteModalTitle}>
              Are you sure you want to delete this dept?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.confirmDeleteButton}
                onPress={handleDelete}
              >
                <Text style={styles.modalButtonText}>
                  Yes, Delete
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>
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

// Stylesheet
const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  label: {
    fontFamily: 'outfit-bold',
    color: '#9586A8',
    marginBottom: 5,
    marginLeft: 36,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D8D0E3',
    borderRadius: 8,
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 10,
    marginHorizontal: 20,
    fontFamily: 'outfit-regular',
    color: '#2D0C57',
  },
  addButton: {
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY,
    borderRadius: 8,
    paddingVertical: 13,
    marginHorizontal: 95,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
  },
  listContainer: {
    backgroundColor: '#F6F5F5',
    borderColor: '#5E27FD',
    borderWidth: 1,
    height: 350,
    paddingTop: 30,
    paddingBottom: 53,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    marginTop: 20,
  },
  listHeader: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
    paddingLeft: 20,
  },
  listItem: {
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
  },
  listItemText: {
    fontFamily: 'outfit-bold',
    fontSize: 15,
    marginLeft: 5,
  },
  listItemButtons: {
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: '#cc1706',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  editButton: {
    backgroundColor: '#020452',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
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
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
    fontFamily: 'outfit-bold',
  },
  modalInput: {
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
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  cancelButton: {
    backgroundColor: '#CCCCCC',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginLeft: 10,  // Adds space between Save and Cancel buttons
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  deleteModalTitle: {
    fontSize: 18,
    marginBottom: 20,
    fontFamily: 'outfit-bold',
    textAlign: 'center',
  },
  confirmDeleteButton: {
    backgroundColor: '#cc1706',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginBottom: 10,
  },
});
