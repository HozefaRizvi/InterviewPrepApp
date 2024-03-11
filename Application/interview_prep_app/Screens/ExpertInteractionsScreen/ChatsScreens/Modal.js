import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { styles } from "./ChatStyles";
import { baseurl } from "../../../API";
const Modal = ({ setVisible }) => {
    const [groupName, setGroupName] = useState("");
    const closeModal = () => setVisible(false);
    
    const handleCreateRoom = async () => {
        try {
            const response = await fetch(`${baseurl}/chats/AddChatRoom`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ group_name: groupName }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                console.log('Group created successfully');
                // Perform any additional actions if needed
            } else {
                console.error('Error creating group:', data.error);
            }
    
            closeModal();
        } catch (error) {
            console.error('Error creating group:', error);
        }
    };
    
    return (
        <View style={styles.modalContainer}>
            <Text style={styles.modalsubheading}>Enter your Group name</Text>
            <TextInput
                style={styles.modalinput}
                placeholder='Group name'
                onChangeText={(value) => setGroupName(value)}
            />

            <View style={styles.modalbuttonContainer}>
                <Pressable style={styles.modalbutton} onPress={handleCreateRoom}>
                    <Text style={styles.modaltext}>CREATE</Text>
                </Pressable>
                <Pressable
                    style={[styles.modalbutton, { backgroundColor: "#E14D2A" }]}
                    onPress={closeModal}
                >
                    <Text style={styles.modaltext}>CANCEL</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default Modal;