import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Linking, Image } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import { BarIndicator } from 'react-native-indicators';
import { FontAwesome } from "@expo/vector-icons";

const NewTrendScrapScreen = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchYouTubeVideos = async () => {
      try {
        const apiKey = 'AIzaSyD9qODJUvev4gG8f-IZImYshWehXGJq2-o'; 
        const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=40&q=software%20engineering%20interview&key=${apiKey}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.items) {
          const videoData = data.items.map(item => ({
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            thumbnail: item.snippet.thumbnails.high.url, 
          }));

          setVideos(videoData);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching YouTube videos:", error);
        setLoading(false);
      }
    };

    fetchYouTubeVideos();
  }, []);
  const renderVideoItem = ({ item }) => (
    <Card onPress={() => openVideo(item.link)} style={styles.card}>
      <Card.Cover source={{ uri: item.thumbnail }} />
      <Card.Content>
        <Title>{item.title}</Title>
        <Paragraph>{item.description}</Paragraph>
        <View style={styles.iconContainer}>
          <FontAwesome name="youtube-play" size={24} color="#ff0000" />
        </View>
      </Card.Content>
    </Card>
  );

  const openVideo = (link) => {
    Linking.openURL(link);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>New Software Engineering Tips Videos</Text>
      {loading ? (
        <View style={styles.loadingContainer}>
          <BarIndicator color="#333" />
        </View>
      ) : (
        <FlatList
          data={videos}
          renderItem={renderVideoItem}
          keyExtractor={(item) => item.id}
          style={styles.flatList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
    paddingTop: 50,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    marginBottom: 16,
  },
  flatList: {
    marginTop: 16,
  },
  iconContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default NewTrendScrapScreen;
