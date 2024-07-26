import React, { useLayoutEffect, useState, useEffect, useContext } from "react";
import { View, TextInput, Text, FlatList, Pressable,ActivityIndicator } from "react-native";
import { WaveIndicator } from 'react-native-indicators';
import MessageComponent from "./MessageCcomponent";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "./ChatStyles";
import AuthContext from "../../../ReactContext/AuthContext";
import { baseurl } from "../../../API";
import { db } from "../../../Firebase/FirebaseConfig";
import { collection, addDoc, serverTimestamp ,setDoc,onSnapshot} from "firebase/firestore";

const Messaging = ({ route, navigation }) => {
    const [chatMessages, setChatMessages] = useState([]);
    const [loadingMessages, setLoadingMessages] = useState(true);
    const { user } = useContext(AuthContext);
    const [message, setMessage] = useState("");
    const [ChatUser, setChatUser] = useState(user.username);
    const [userProfilePic, setUserProfilePic] = useState(user.ProfilePic);
    const [sendingMessage, setSendingMessage] = useState(false);
    
    const { name, id } = route.params;

    useLayoutEffect(() => {
        navigation.setOptions({ title: name });
    }, [navigation, name]);

    useEffect(() => {
        // Fetch messages on component mount
        fetchMessages();

        // Poll for new messages every 5 seconds
        const intervalId = setInterval(fetchMessages, 5000);

        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
    }, [name]);
    const fetchMessages = async () => {
    try {
        const response = await fetch(`${baseurl}/chats/GetMessages/${name}`);
        
        if (response.ok) {
            const result = await response.json();
            const sortedMessages = result.messages.sort((a, b) => {
                const timeA = parseInt(a.time.split(':').join(''), 10);
                const timeB = parseInt(b.time.split(':').join(''), 10);
                return timeA - timeB;
            });
            setChatMessages(sortedMessages);
            setLoadingMessages(false);
        } else {
            console.error('Failed to fetch messages');
        }
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
};

    const handleNewMessage = async () => {
        setSendingMessage(true);
    
        const hour = new Date().getHours().toString().padStart(2, '0');
        const mins = new Date().getMinutes().toString().padStart(2, '0');
    
        const newMessage = {
            text: message,
            user: ChatUser,
            time: `${hour}:${mins}`,
        };
    
        try {
            const response = await fetch(encodeURI(`${baseurl}/chats/SendMessage/${name}`), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newMessage),
            });
    
            if (response.ok) {
                // Message sent successfully, reset the message state
                setMessage('');
    
                // Fetch messages again
                const response = await fetch(`${baseurl}/chats/GetMessages/${name}`);
    
                if (response.ok) {
                    const result = await response.json();
                    setChatMessages(result.messages);
                } else {
                    console.error('Failed to fetch messages');
                }
            } else {
                // Handle error
                console.error('Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setSendingMessage(false);
        }
    };
    


    return (
        <View style={styles.messagingscreen}>
            {loadingMessages ? (
                <WaveIndicator color="#000" />
            ) : (
                <View
                    style={[
                        styles.messagingscreen,
                        { paddingVertical: 15, paddingHorizontal: 10 },
                    ]}
                >
                    {chatMessages[0] ? (
                        <FlatList
                            data={chatMessages}
                            renderItem={({ item }) => (
                                <MessageComponent
                                    item={item}
                                    currentUser={ChatUser}
                                    userProfilePic={userProfilePic}
                                />
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    ) : (
                        ""
                    )}
                </View>
            )}

            <View style={styles.messaginginputContainer}>
                <TextInput
                    style={styles.messaginginput}
                    onChangeText={(value) => setMessage(value)}
                    value={message}
                />
                <Pressable
                    style={styles.messagingbuttonContainer}
                    onPress={handleNewMessage}
                >
                     <View>                    
                     <Text style={{ color: "#f2f0f1", fontSize: 20 }}>
                        {sendingMessage ? (
                            <ActivityIndicator size="small" color="#ffffff" />
                        ) : (
                            "SEND"
                        )}
                        </Text>                    
                    </View>
                </Pressable>
            </View>
        </View>
    );
};

export default Messaging;
