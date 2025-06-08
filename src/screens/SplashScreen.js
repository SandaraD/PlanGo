import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Home"); // Replace with your main screen name
    }, 4000); // 2-second splash

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>PlanGo</Text>
      <Text style={styles.tagline}>Plan. Prioritize. Perform.</Text>
      <Image
        source={require("../../assets/image.png")}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F4664",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  logo: {
    fontSize: 70,
    fontWeight: "bold",
    color: "#fff",
    // marginBottom: 0,
  },
  tagline: {
    fontSize: 20,
    fontStyle: "italic",
    color: "#fff",
    marginBottom: 24,
  },
  image: {
    width: "100%",
    height: 400,
  },
});

export default SplashScreen;
