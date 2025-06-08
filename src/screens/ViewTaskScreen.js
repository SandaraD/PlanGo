import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const ViewTaskScreen = ({ route, navigation }) => {
  const { task } = route.params;

  let badgeColor = "#E3F2FD";
  if (task.priority === "High") badgeColor = "#FFCDD2";
  else if (task.priority === "Medium") badgeColor = "#FFF9C4";

  return (
    <View style={styles.container}>
      <Text style={styles.header}>View Task</Text>

      <View style={[styles.priorityBadge, { backgroundColor: badgeColor }]}>
        <Text style={styles.badgeText}>{task.priority}</Text>
      </View>

      <Text style={styles.label}>Task Title</Text>
      <Text style={styles.value}>{task.title}</Text>

      <Text style={styles.label}>Notes</Text>
      <Text style={styles.value}>{task.description}</Text>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#F4F6F9",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  label: {
    marginTop: 16,
    fontWeight: "bold",
    color: "#444",
  },
  value: {
    fontSize: 16,
    marginTop: 4,
    color: "#333",
  },
  priorityBadge: {
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginBottom: 16,
  },
  badgeText: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#333",
  },
  backButton: {
    marginTop: 40,
    backgroundColor: "#1976D2",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ViewTaskScreen;
