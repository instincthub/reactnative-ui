import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { LoadingSpinner } from "../LoadingSpinner";
import { SkeletonLoader } from "../SkeletonLoader";
import { FadeIn } from "../FadeIn";
import { ProgressBar } from "../ProgressBar";
import { LoadingOverlay } from "../LoadingOverlay";

const ExampleScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [overlayVisible, setOverlayVisible] = useState(false);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Simulate progress incrementing
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 0.1;
        return next > 1 ? 0 : next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const showOverlay = () => {
    setOverlayVisible(true);
    setTimeout(() => {
      setOverlayVisible(false);
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Loading Components Demo</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>LoadingSpinner</Text>
        <LoadingSpinner size={40} color="#8A2BE2" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SkeletonLoader</Text>
        {loading ? (
          <View>
            <SkeletonLoader width="80%" height={20} style={styles.skeleton} />
            <SkeletonLoader width="60%" height={20} style={styles.skeleton} />
            <SkeletonLoader width="70%" height={20} style={styles.skeleton} />
          </View>
        ) : (
          <FadeIn>
            <Text>Content has loaded successfully!</Text>
          </FadeIn>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ProgressBar</Text>
        <ProgressBar
          progress={progress}
          width="90%"
          height={15}
          color="#8A2BE2"
          showPercentage
        />
      </View>

      <Button title="Show Loading Overlay" onPress={showOverlay} />

      <LoadingOverlay
        visible={overlayVisible}
        message="Processing your request..."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    width: "100%",
    marginBottom: 30,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  skeleton: {
    marginBottom: 10,
  },
});

export default ExampleScreen;
