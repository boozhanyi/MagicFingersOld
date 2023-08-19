import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Video } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db, auth } from "../BackEnd/Firebase";

export default function VideoScreen({ navigation }) {
  const [video, setVideo] = useState([]);
  const [videoName, setVideoName] = useState("");
  const [isPressedButtonHistory, setIsPressedButtonHistory] = useState(false);
  const [isPressedButtonStar, setIsPressedButtonStar] = useState(false);
  const [isPressedButtonAll, setIsPressedButtonAll] = useState(true);
  const [historyVideo, setHistoryVideo] = useState([]);
  const [starVideo, setStarVideo] = useState([]);
  const [allVideo, setAllVideo] = useState([]);

  useEffect(() => {
    fetchVideo();
    fetchHistoryVideo();
    fetchStarVideo();
  }, []);

  useEffect(() => {
    if (isPressedButtonAll) {
      setVideo(allVideo);
    }
  }, [allVideo]);

  useEffect(() => {
    if (isPressedButtonHistory) {
      setVideo(historyVideo);
    }
  }, [historyVideo]);

  useEffect(() => {
    if (isPressedButtonStar) {
      setVideo(starVideo);
    }
  }, [starVideo]);

  const fetchHistoryVideo = () => {
    const user = auth.currentUser;
    const videoRef = collection(db, "Users", user.uid, "VideoHistory");
    const videoQuery = query(videoRef, orderBy("TimeStamp", "desc"));

    const unsubscribe = onSnapshot(videoQuery, (snapshot) => {
      const videos = [];
      snapshot.forEach((video) => {
        videos.push({
          id: video.id,
          VideoName: video.data().VideoName,
          Keyword: video.data().Keyword,
          VideoUrl: video.data().VideoUrl,
        });
      });

      setHistoryVideo(videos);
    });

    return () => {
      unsubscribe(); // Unsubscribe from history video listener
    };
  };

  const fetchStarVideo = () => {
    const user = auth.currentUser;
    const videoRef = collection(db, "Users", user.uid, "StarVideo");
    const videoQuery = query(videoRef, orderBy("TimeStamp", "desc"));

    const unsubscribe = onSnapshot(videoQuery, (snapshot) => {
      const videos = [];
      snapshot.forEach((video) => {
        videos.push({
          id: video.id,
          VideoName: video.data().VideoName,
          Keyword: video.data().Keyword,
          VideoUrl: video.data().VideoUrl,
        });
      });

      setStarVideo(videos);
    });

    return () => {
      unsubscribe(); // Unsubscribe when the cleanup function is called
    };
  };

  const fetchVideo = async () => {
    const videoRef = collection(db, "Video");
    const videoQuery = query(videoRef, orderBy("TimeStamp", "desc"));

    const unsubscribe = onSnapshot(videoRef, (snapshot) => {
      const videos = [];
      snapshot.forEach((video) => {
        videos.push({
          id: video.id,
          VideoName: video.data().VideoName,
          Keyword: video.data().Keyword,
          VideoUrl: video.data().VideoUrl,
        });
      });

      setAllVideo(videos);
    });

    return () => {
      unsubscribe(); // Unsubscribe when the cleanup function is called
    };
  };

  const selectedVideo = (videoSource) => {
    navigation.navigate("WatchVideoScreen", { video: videoSource });
  };

  const pressedButtonHistory = () => {
    setIsPressedButtonHistory(true);
    setIsPressedButtonStar(false);
    setIsPressedButtonAll(false);
    setVideo(historyVideo);
  };

  const pressedButtonStar = () => {
    setIsPressedButtonAll(false);
    setIsPressedButtonHistory(false);
    setIsPressedButtonStar(true);
    setVideo(starVideo);
  };

  const pressedButtonAll = () => {
    setIsPressedButtonAll(true);
    setIsPressedButtonHistory(false);
    setIsPressedButtonStar(false);
    setVideo(allVideo);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Text style={{ fontWeight: "bold", marginTop: 30 }}>
            How To Draw For Kids
          </Text>
          <Text style={{ fontWeight: "100", margin: 10, textAlign: "center" }}>
            Here is where you'll find every single on of our how to draw
            lessons! It's a massive drawing library! You'll find lessons for
            young and old kids. You'll find everything from how to draw cupcakes
            to how to draw sharks. So, what are you waiting for? Grab a marker
            and follow along with us.
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "95%",
              borderWidth: 1,
              borderRadius: 10,
              marginTop: 10,
            }}
          >
            <Ionicons
              style={{ marginLeft: 10 }}
              name="md-search-sharp"
              size={24}
              color="black"
            />
            <TextInput
              style={styles.videoNameInput}
              placeholder="Search your video name here"
              onChangeText={(text) => setVideoName(text)}
              value={videoName}
            ></TextInput>
          </View>
          <View style={styles.filterContainer}>
            <Pressable
              style={[
                styles.filterButton,
                {
                  backgroundColor: isPressedButtonAll
                    ? "rgb(210, 230, 255)"
                    : "#DDFFFF",
                },
              ]}
              onPress={pressedButtonAll}
            >
              <Text style={{ fontSize: 10, fontWeight: "600" }}>All</Text>
            </Pressable>
            <Pressable
              style={[
                styles.filterButton,
                {
                  backgroundColor: isPressedButtonHistory
                    ? "rgb(210, 230, 255)"
                    : "#DDFFFF",
                },
              ]}
              onPress={pressedButtonHistory}
            >
              <Text style={{ fontSize: 10, fontWeight: "600" }}>History</Text>
            </Pressable>
            <Pressable
              style={[
                styles.filterButton,
                {
                  backgroundColor: isPressedButtonStar
                    ? "rgb(210, 230, 255)"
                    : "#DDFFFF",
                },
              ]}
              onPress={pressedButtonStar}
            >
              <Text style={{ fontSize: 10, fontWeight: "600" }}>
                Stared Video
              </Text>
            </Pressable>
          </View>
          <View style={styles.videoContainer}>
            {video.map((item) => (
              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                key={item.id}
              >
                <Pressable
                  style={styles.video}
                  onPress={() => selectedVideo(item)}
                >
                  <Video
                    style={{ width: "100%", height: "100%" }}
                    useNativeControls
                    resizeMode="contain"
                    source={{ uri: item.VideoUrl }}
                    shouldPlay
                    volume={0}
                    isLooping
                  />
                </Pressable>
                <Text
                  style={{
                    fontWeight: "500",
                    fontSize: 15,
                    marginTop: 10,
                    textAlign: "center",
                  }}
                >
                  {item.VideoName}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  videoNameInput: {
    width: "95%",
    padding: 5,
  },
  videoContainer: {
    flex: 1,
    width: "100%",
    marginTop: 10,
    alignItems: "center",
  },
  video: {
    width: "90%",
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    backgroundColor: "black",
  },
  filterContainer: {
    flexDirection: "row",
    marginTop: 5,
    alignSelf: "flex-start",
    marginLeft: 5,
  },
  filterButton: {
    width: "20%",
    height: 40,
    margin: 5,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
});
