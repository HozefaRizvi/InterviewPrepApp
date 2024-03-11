import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, ScrollView, FlatList ,TouchableOpacity,Image} from 'react-native';
import { Card, Avatar, IconButton, Button } from 'react-native-paper';

import Carousel from 'react-native-snap-carousel';
import { FontAwesome } from '@expo/vector-icons';
import { BarIndicator } from 'react-native-indicators';
import { FieldCard } from '../../CustomComponents/FieldCard';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { baseurl } from '../../API';
import ReportModal from '../../CustomComponents/ReportModal';
const PostScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState([]);
  const [reportmodalVisible, setreportModalVisible] = useState(false);
  const [reportpostid,setreportpostid] = useState(null)
  useEffect(() => {
    // Fetch posts when the component mounts
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      // Replace with your actual backend URL
      const response = await fetch(encodeURI(`${baseurl}/get_expert_posts`));

      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts || []);
      } else {
        console.error("Failed to fetch posts:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const renderCard = ({ item }) => {
    const isLiked = likedPosts.includes(item.post_id);

    const handleLike = async () => {
      try {
        const response = await fetch(`${baseurl}/like_post/${item.post_id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // You can include additional data in the body if needed
          }),
        });

        if (response.ok) {
          // Update likedPosts state and fetch updated posts
          setLikedPosts([...likedPosts, item.post_id]);
          fetchPosts();
        } else {
          console.error('Failed to like post:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    return(
    <Card style={{  marginBottom: 10 }}>
      <Card.Cover source={{ uri: item.image_url }} />
      <Card.Title
        title={item.publisher_name}
        subtitle={`Published at ${item.post_date}`}
        left={(props) => (
          <Avatar.Image
            {...props}
            source={{ uri: item.user_pic }}
          />
        )}
        right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => handleReportModal(item.post_id)} />}
      />
      <Card.Content>
      <Text>{item.post_content.length > 15 ? item.post_content.substring(0, 80) + '...' : item.post_content}</Text>
      </Card.Content>
      <Card.Actions>
      <Button
          icon={() => <FontAwesome name="thumbs-up" size={20} color="blue" />}
          onPress={() => handleLike(item.post_id)}
        >
          {item.post_likes} Likes
        </Button>
       
        <Button onPress={() => handleViewFullPost(item)}>View Full Post</Button>
      </Card.Actions>
    </Card>
  );
};
  const handleViewFullPost = (post) => {

    setSelectedPost(post);
    setModalVisible(true);
  };

  const handleReportModal = (postid) => {
    setreportModalVisible(true);
    setreportpostid(postid)
  };
  const handleModalDismiss = () => {
    setreportModalVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      {loading && (
        <View style={[styles.container, styles.loadingContainer]}>
          <BarIndicator color="#ffffff" />
        </View>
      )}
      {!loading && (
        <ScrollView>
         <View style={styles.header}>
            <Text style={styles.title}> Expert Posts:</Text>
            <View style={styles.reloadContainer}>
              <TouchableOpacity onPress={fetchPosts}>
                <FontAwesome name="refresh" size={24} color="blue" />
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={posts}
            renderItem={renderCard}
            keyExtractor={(item) => item.post_id.toString()}
            style={{ marginTop: 20 }}
          />
          <Modal visible={modalVisible} animationType="slide">
            <ScrollView style={styles.modalContainer}>
              {selectedPost ? (
                <>
                  <Image
                    source={{ uri: selectedPost.image_url }}
                    style={styles.modalImage}
                    resizeMode="cover"
                  />
                  <Text style={styles.modalHeading}>Publisher: {selectedPost.publisher_name}</Text>
                  <Text style={styles.modalText}>Published at: {selectedPost.post_date}</Text>
                  <ScrollView style = {{width:wp("100%"), height: hp("50%")}}>
                  <Text style={styles.modalHeading}>Content: </Text>
                  <Text style={styles.modalText}>{selectedPost.post_content}</Text>
                  </ScrollView>
                </>
              ) : (
                <Text>No selected post</Text>
              )}
              <Button onPress={() => setModalVisible(false)}>Close Modal</Button>
            </ScrollView>
          </Modal>
          <ReportModal postId={reportpostid} visible={reportmodalVisible} onDismiss={handleModalDismiss} />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loadingContainer: {
    opacity: 0.7,
  },
  title: {
    color: "black",
    fontSize: wp("5%"),
    fontWeight: "700",
    marginTop: hp("2%"),
    marginBottom: hp('1%')
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  reloadContainer: {
   marginTop:10 
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  modalHeading: {
    fontSize: wp("5%"),
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: wp("4%"),
    marginBottom: 10,
  },
  modalImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
});

export default PostScreen;
