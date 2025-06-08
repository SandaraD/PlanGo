import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

const HomeScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "https://60a21a08745cd70017576014.mockapi.io/api/v1/todo"
      );
      // Reverse to show newest first
      setTasks(response.data.reverse());
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  // Refresh on screen focus
  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );

  const renderTask = ({ item }) => {
    let badgeColor = "#E3F2FD";
    if (item.priority === "High") badgeColor = "#FFCDD2";
    else if (item.priority === "Medium") badgeColor = "#FFF9C4";

    // DELETE FUNCTION
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

    return (
      <View style={styles.taskCard}>
        <View style={[styles.priorityBadge, { backgroundColor: badgeColor }]}>
          <Text style={styles.badgeText}>{item.priority}</Text>
        </View>

        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>

        {/* View Task */}
        <TouchableOpacity
          onPress={() => navigation.navigate("ViewTask", { task: item })}
        >
          <Text style={{ color: "#1976D2", marginTop: 8 }}>View Details</Text>
        </TouchableOpacity>

        <View style={styles.iconRow}>


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

      {loading ? (
        <ActivityIndicator size="large" color="#1976D2" />
      ) : (
        <FlatList
          data={tasks}
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
    marginTop: 60,
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
  priorityBadge: {
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginBottom: 8,
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
  gap: 8, // use `marginLeft` fallback if gap doesn't work
},

iconButton: {
  padding: 4,
}

});

export default HomeScreen;
