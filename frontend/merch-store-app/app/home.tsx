import {
  ScrollView,
  StyleSheet,
  View,
  Platform,
  RefreshControl,
} from "react-native";
import React, { useEffect } from "react";
import { Card, FAB, Searchbar, Text } from "react-native-paper";
import { router } from "expo-router";
import { getAllMerch } from "@/api/merch.api";
import { IMerch } from "@/interface/type";

const Home = () => {
  const [merch, setMerch] = React.useState<IMerch[]>([]);
  const [merchCopy, setMerchCopy] = React.useState<IMerch[]>([]);
  const [withMerch, setWithMerch] = React.useState("48%") as any;
  const [refreshing, setRefreshing] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  useEffect(() => {
    fetchMerch();
    if (Platform.OS === "web") {
      setWithMerch("24%");
    }
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  const fetchMerch = async () => {
    try {
      const response = await getAllMerch();
      setMerch(response.data);
      setMerchCopy(response.data);
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

  const handleSearch = () => {
    const filteredMerch = merch.filter((merch) =>
      merch.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setMerchCopy(filteredMerch);
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
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchbar}
          rippleColor={"#0091ff"}
        />
      </View>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.merchContainer}>
          {merchCopy.map((merch) => (
            <Card
              style={[styles.card, { width: withMerch }]}
              key={merch._id}
              onPress={() => handEditPress(merch)}
            >
              <Card.Cover source={{ uri: merch.image }} />
              <Card.Title title={merch.name} subtitle={merch.price + "$"} />
            </Card>
          ))}
          {merchCopy.length === 0 && (
            <View style={styles.noDataContainer}>
              <Text>No Merch</Text>
            </View>
          )}
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
    gap: 10,
    flexDirection: "column",
  },
  merchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    gap: 10,
  },
  card: {
    borderWidth: 1,
    borderColor: "#0091ff",
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  searchbar: {
    margin: 4,
    borderWidth: 1,
    borderColor: "#0091ff",
  },
});
