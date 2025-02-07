import {
  ScrollView,
  StyleSheet,
  View,
  Platform,
  RefreshControl,
} from "react-native";
import React, { useEffect } from "react";
import { Card, FAB } from "react-native-paper";
import { router } from "expo-router";
import { getAllMerch } from "@/api/merch.api";
import { IMerch } from "@/interface/type";

const Home = () => {
  const [merch, setMerch] = React.useState<IMerch[]>([]);
  const [withMerch, setWithMerch] = React.useState("48%") as any;
  const [refreshing, setRefreshing] = React.useState(false);
  useEffect(() => {
    fetchMerch();
    if (Platform.OS === "web") {
      setWithMerch("24%");
    }
  }, []);

  const fetchMerch = async () => {
    try {
      const response = await getAllMerch();
      setMerch(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handAddPress = () => {
    router.push("/add");
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchMerch();
    setRefreshing(false);
  };

  const handEditPress = (merch: IMerch) => {
    router.push({
      pathname: "/edit",
      params: {
        _id: merch._id,
      },
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.merchContainer}>
          {merch.map((merch) => (
            <Card
              style={[styles.card, { width: withMerch }]}
              key={merch._id}
              onPress={() => handEditPress(merch)}
            >
              <Card.Cover source={{ uri: merch.image }} />
              <Card.Title title={merch.name} subtitle={merch.price + "$"} />
            </Card>
          ))}
        </View>
      </ScrollView>
      <FAB
        icon="plus"
        style={{ position: "absolute", margin: 16, right: 0, bottom: 0 }}
        onPress={handAddPress}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
    margin: 5,
  },
  merchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    gap: 10,
  },
  card: {
    // width: withMerch,
    borderWidth: 1,
  },
});
