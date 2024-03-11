import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Linking } from "react-native";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import { baseurl } from "../../../API";
import { BarIndicator } from 'react-native-indicators';
const NewTrendsScreen = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await fetch(encodeURI(`${baseurl}/news`));
        const data = await response.json();
        if (data.status === "ok") {
          setNewsData(data.articles);
        } else {
          console.error("Error fetching news data");
        }
      } catch (error) {
        console.error("Error fetching news data:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchNewsData();
  }, []);

  const handleViewFullNews = (url) => {
    Linking.openURL(url);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <BarIndicator color="#ffffff" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.newsTitle}>New Trends:</Text>
      <FlatList
        data={newsData}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <Card style={styles.newsCard}>
            <Card.Cover source={{ uri: item.urlToImage || 'file:///E:/7th Semester/Final Year Project/InterviewPrepApp/Application/interview_prep_app/Logos/news.jpg' }} />
            <Card.Content>
              <Title>{item.title}</Title>
              <Paragraph>{item.description}</Paragraph>
              <Text style={styles.publishedByText}>Published by: {item.author}</Text>
              <Text style={styles.publishedAtText}>Published at: {item.publishedAt}</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.sourceText}>Source: {item.source.name}</Text>
                <Button onPress={() => handleViewFullNews(item.url)}>View Full News</Button>
              </View>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: "#f0f0f0",
      paddingTop:50
    },
    loadingContainer: {
        justifyContent: "center",
        alignItems: "center",
      },
    newsTitle: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 16,
      color: "#333",
    },
    newsCard: {
      marginBottom: 16,
      borderRadius: 10,
      overflow: "hidden",
      elevation: 3,
    },
    cardImage: {
      height: 200,
    },
    cardContent: {
      padding: 16,
    },
    cardTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 8,
      color: "#333",
    },
    cardDescription: {
      fontSize: 16,
      marginBottom: 12,
      color: "#555",
    },
    infoContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    publishedByText: {
      fontSize: 14,
      fontStyle: "italic",
      color: "#777",
    },
    publishedAtText: {
      fontSize: 14,
      fontStyle: "italic",
      color: "#777",
    },
    cardFooter: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 8,
    },
    sourceText: {
      fontStyle: "italic",
      color: "#777",
    },
  });

export default NewTrendsScreen;
