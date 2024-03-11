import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button, DataTable, IconButton, TextInput as PaperTextInput } from 'react-native-paper';
import AuthContext from '../../ReactContext/AuthContext';
import { baseurl } from '../../API';
import { FontAwesome } from '@expo/vector-icons';

export default function CustomerSupport() {
  const [query, setQuery] = useState('');
  const [userReplies, setUserReplies] = useState([]);
  const { user } = useContext(AuthContext);
  const [showAddQuery, setShowAddQuery] = useState(true);

  const addQuery = () => {
    fetch(encodeURI(`${baseurl}/sendquery`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userQuery: query }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setQuery('');
        // Optionally, you can fetch updated user replies after sending a query
        fetchUserReplies();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const deleteQuery = (index, queryId) => {
    fetch(encodeURI(`${baseurl}/deletequery`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ queryId: queryId }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const updatedReplies = userReplies.filter((_, i) => i !== index);
        setUserReplies(updatedReplies);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const toggleDetails = (index) => {
    setUserReplies((prevReplies) => {
      const updatedReplies = [...prevReplies];
      updatedReplies[index].expanded = !updatedReplies[index].expanded;
      return updatedReplies;
    });
  };

  const fetchUserReplies = () => {
    fetch(encodeURI(`${baseurl}/fetchcustomerqueries`))
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setUserReplies(data.userReplies || []);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    // Fetch user replies when component mounts
    fetchUserReplies();
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  //Navigations
  const handleAddQueryClick = () => {
    setShowAddQuery(true);
  };

  const handleAdminResponseClick = () => {
    setShowAddQuery(false);
  };
  return (
   <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <Text style={styles.headline}>Customer Support</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin:20 }}>
            <Button
            icon={() => <FontAwesome name="commenting" size={16} color="purple" />}
            mode="outlined"
            onPress={handleAddQueryClick} // Add this line
          >
            Add Query
          </Button>

          <Button
            icon={() => <FontAwesome name="bars" size={16} color="purple" />}
            mode="contained-tonal"
            onPress={handleAdminResponseClick} // Add this line
          >
            Admin Response
          </Button>
        </View>
        {showAddQuery ? (
        <View style={styles.queryContainer}>
          <Text style={styles.headline}>Add Query</Text>
          <PaperTextInput
            label="Add your query"
            value={query}
            onChangeText={(text) => setQuery(text)}
            style={styles.input}
            multiline
          />
          <Button mode="contained" onPress={addQuery} style={styles.addButton}>
            Send Query
          </Button>
        </View>
        ):(
        <ScrollView style={styles.repliesContainer}>
          <Text style={styles.headline}>Admin Responses</Text>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>User Query</DataTable.Title>
              <DataTable.Title>Admin Response</DataTable.Title>
              <DataTable.Title>Actions</DataTable.Title>
            </DataTable.Header>
            {userReplies.map((reply, index) => (
              <React.Fragment key={reply.id}>
                <DataTable.Row>
                  <DataTable.Cell>{reply.userQuery}</DataTable.Cell>
                  <DataTable.Cell>{reply.adminResponse}</DataTable.Cell>
                  <DataTable.Cell>
                    <IconButton
                      icon={reply.expanded ? 'chevron-up' : 'chevron-down'}
                      onPress={() => toggleDetails(index)}
                    />
                    <IconButton
                      icon="delete"
                      onPress={() => deleteQuery(index, reply.id)}
                    />
                  </DataTable.Cell>
                </DataTable.Row>

                {reply.expanded && (
                  <DataTable.Row>
                    <DataTable.Cell colSpan={3}>
                      <View style={styles.detailsContainer}>
                        <Text style={styles.detailsText}>
                          {user.username} Query: {reply.userQuery}
                        </Text>
                        <Text style={styles.detailsText}>
                          Admin Response: {reply.adminResponse || 'No response yet'}
                        </Text>
                      </View>
                    </DataTable.Cell>
                  </DataTable.Row>
                )}
              </React.Fragment>
            ))}
          </DataTable>
        </ScrollView>
         )}
      </View>
       
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A68477',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: hp('5%'),
  },
  imageContainer: {
    borderBottomColor: '#cccccc',
    
    padding: 10,
  },
  image: {
    width: wp('50%'),
    height: hp('20%'),
  },
  sectionContainer: {
    width: '100%',
    flex:2,
    marginTop: hp('3%'),
    backgroundColor: '#FFF8F2',
    borderTopStartRadius: 25, 
    borderTopEndRadius:25,
    padding: 20,
  },
  headline: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: hp('3%'),
  },
  queryContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginTop:hp('10%')

  },
  input: {
    marginBottom: 8,
    backgroundColor: 'white',
  },
  addButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  repliesContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    flex: 1,
    marginTop:hp('5%')
  },
  detailsContainer: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  detailsText: {
    marginBottom: 4,
  },
});
