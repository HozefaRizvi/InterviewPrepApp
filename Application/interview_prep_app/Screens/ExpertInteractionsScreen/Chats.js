import React, { useEffect, useState ,useContext} from "react";
import { View, Text, Pressable, SafeAreaView, FlatList } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { styles } from "./ChatsScreens/ChatStyles";
import Modal from "./ChatsScreens/Modal";
import { useNavigation } from "@react-navigation/native";
import { baseurl } from "../../API";
import AuthContext from "../../ReactContext/AuthContext";
const ChatScreen = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useContext(AuthContext);
  const { login } = useContext(AuthContext);
  const [userisExpert,setisUserExpert] = useState(user.Expert)
  // Fetch chat rooms from Flask backend
  const fetchChatRooms = async () => {
    console.log("User is Expert:",user.Expert)
    try {
      setRefreshing(true);
      const response = await fetch(encodeURI(`${baseurl}/chats/GetChatRooms`));
      const data = await response.json();
      setRooms(data.chat_rooms);
    } catch (error) {
      console.error('Error fetching chat rooms:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchChatRooms();
  }, []);

  const handleRoomPress = (roomName) => {
    navigation.navigate("ChatRoom", { roomName });
  };

  const handleNavigation = (item) => {
    navigation.navigate("Messaging", {
      id: item,
      name: item,
    });
  };

  const renderChatRoom = ({ item }) => (
    <Pressable style={styles.cchat} onPress={() => handleNavigation(item)}>
      <Ionicons
        name='people-outline'
        size={45}
        color='black'
        style={styles.cavatar}
      />

      <View style={styles.crightContainer}>
        <View>
          <Text style={styles.cusername}>{item}</Text>
        </View>
      </View>
    </Pressable>
  );

  const handleRefresh = () => {
    fetchChatRooms();
  };

  return (
    <SafeAreaView style={styles.chatscreen}>
      <View style={styles.chattopContainer}>
        <View style={styles.chatheader}>
          <Text style={styles.chatheading}>Chats</Text>
          {user.Expert === "Expert" && (
            <Pressable onPress={() => setVisible(true)}>
              <Feather name='edit' size={24} color='green' />
            </Pressable>
          ) }
          <Pressable onPress={handleRefresh} style={styles.refreshButton}>
            <Ionicons name='refresh' size={24} color='blue' />
          </Pressable>
        </View>
      </View>

      <View style={styles.chatlistContainer}>
        <FlatList
          data={rooms}
          keyExtractor={(item) => item}
          renderItem={renderChatRoom}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </View>

      {visible ? <Modal setVisible={setVisible} /> : null}
    </SafeAreaView>
  );
};

export default ChatScreen;
