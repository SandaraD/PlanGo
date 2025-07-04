import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

const HomeScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [completedTaskIds, setCompletedTaskIds] = useState([]);


  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "https://60a21a08745cd70017576014.mockapi.io/api/v1/todo"
      );
      //Newest to oldest
      setTasks(response.data.reverse());
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchText.toLowerCase()) ||
      task.description.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderTask = ({ item }) => {

    // DELETE function
    const handleDelete = () => {
      Alert.alert(
        "Confirm Delete",
        "Are you sure you want to delete this task?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Yes",
            onPress: async () => {
              try {
                await axios.delete(
                  `https://60a21a08745cd70017576014.mockapi.io/api/v1/todo/${item.id}`
                );
                fetchTasks(); // reload task list after deleting
              } catch (error) {
                console.error("Delete failed:", error);
                Alert.alert("Error", "Failed to delete task.");
              }
            },
          },
        ]
      );
    };

    const toggleCompleted = (taskId) => {
      setCompletedTaskIds((prev) =>
        prev.includes(taskId)
          ? prev.filter((id) => id !== taskId)
          : [...prev, taskId]
      );
    };

    return (
      <View style={styles.taskCard}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>
          {item.description.length > 35
            ? item.description.substring(0, 35) + "..."
            : item.description}
        </Text>

        {/* View Task */}
        <TouchableOpacity
          onPress={() => navigation.navigate("ViewTask", { task: item })}
        >
          {/* Checkbox */}
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              onPress={() => toggleCompleted(item.id)}
              style={styles.checkboxRow}
            >
              <Icon
                name={
                  completedTaskIds.includes(item.id)
                    ? "check-box"
                    : "check-box-outline-blank"
                }
                size={22}
                color={completedTaskIds.includes(item.id) ? "#4CAF50" : "#888"}
              />
              <Text style={styles.checkboxLabel}>
                {completedTaskIds.includes(item.id)
                  ? "Completed"
                  : "To be completed"}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={{ color: "#1976D2", marginTop: 8 }}>View Details</Text>
        </TouchableOpacity>

        {/* Edit Icon */}
        <View style={styles.iconRow}>
          <TouchableOpacity
            onPress={() => navigation.navigate("EditTask", { task: item })}
            style={styles.iconButton}
          >
            <Icon name="edit" size={22} color="#1976D2" />
          </TouchableOpacity>

          {/* Delete Icon */}
          <TouchableOpacity onPress={handleDelete} style={styles.iconButton}>
            <Icon name="delete" size={22} color="#E53935" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Todo List</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search tasks..."
        value={searchText}
        onChangeText={setSearchText}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#1976D2" />
      ) : (
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          renderItem={renderTask}
          contentContainerStyle={{ paddingBottom: 120 }}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddTask")}
      >
        <Text style={styles.addButtonText}>Add New Task</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F9",
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
  },
  taskCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    marginTop: 4,
    color: "#555",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#1976D2",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  trashButton: {
    position: "absolute",
    top: 16,
    right: 16,
    padding: 4,
  },
  iconRow: {
  position: "absolute",
  top: 12,
  right: 12,
  flexDirection: "row",
  gap: 8,
},

iconButton: {
  padding: 4,
},
searchInput: {
  backgroundColor: "#fff",
  borderRadius: 8,
  padding: 12,
  fontSize: 16,
  marginBottom: 16,
  borderColor: "#ddd",
  borderWidth: 1,
},
checkboxContainer: {
  marginTop: 10,
  marginBottom: 4,
},

checkboxRow: {
  flexDirection: "row",
  alignItems: "center",
},

checkboxLabel: {
  marginLeft: 8,
  fontSize: 14,
  color: "#444",
},

});

export default HomeScreen;
