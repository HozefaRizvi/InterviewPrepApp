import React, { useState } from 'react';
import { Modal, Portal, RadioButton, Text, Button, Provider } from 'react-native-paper';
import { baseurl } from '../API';
const ReportModal = ({ postId, visible, onDismiss }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleReport = async () => {
    try {
        // Send a report request to the server
        const response = await fetch(encodeURI(`${baseurl}/report_post/${postId}`), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        });
  
        const result = await response.json();
  
        if (result.success) {
          console.log(`Post ${postId} reported successfully for: ${selectedOption}`);
        } else {
          console.error(`Failed to report post: ${result.message}`);
        }
      } catch (error) {
        console.error(`Error reporting post: ${error}`);
      }
  
      // Close the modal
      onDismiss();
    };

  return (
        <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modalContainer}>
          <Text style={styles.heading}>Report the Post</Text>

          <RadioButton.Group onValueChange={(value) => setSelectedOption(value)} value={selectedOption}>
            <RadioButton.Item label="Inappropriate Content" value="inappropriate" />
            <RadioButton.Item label="Violate the Community Guidelines" value="communityGuidelines" />
            <RadioButton.Item label="Violence and Abusive Content" value="violenceAbuse" />
            <RadioButton.Item label="Not Related to Software Engineering" value="notSoftwareEng" />
            <RadioButton.Item label="Not Related to Interview" value="notInterview" />
          </RadioButton.Group>

          <Button mode="contained" onPress={handleReport} style={styles.button}>
            Report the Post
          </Button>

          <Button onPress={onDismiss} style={styles.button}>
            Close
          </Button>
        </Modal>   
  );
};

const styles = {
  modalContainer: {
    backgroundColor: 'white',
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
};

export default ReportModal;
