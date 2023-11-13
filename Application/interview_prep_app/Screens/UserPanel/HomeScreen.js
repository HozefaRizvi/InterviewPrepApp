import React from 'react';
import { ScrollView, View, StyleSheet, Image } from 'react-native';
import { Card, Title, Text, Button } from 'react-native-paper';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
;

export  function HomeScreen() {
  const renderCard = (title, subtitle, content, imageUrl) => (
    <Card style={styles.card}>
      <Card.Title title={title} subtitle={subtitle} left={(props) => <Card.Title {...props} />} />
      <Card.Content>
        <Text style={styles.cardTitle}>{content.title}</Text>
      </Card.Content>
    
      <Card.Actions >
        <Button >Open </Button>
    
      </Card.Actions>
    </Card>
  );
  return (
    <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.profileContainer}>
            <Image source={require('../../Logos/loginlogo.png')} style={styles.profileImage} />
            <Text style={styles.username}>Welcome John Doe</Text>
          </View>
          <Text style={styles.heading}>Software Engineering Field:</Text>

          {/* Cards */}
          <View style={styles.cardContainer}>
            {renderCard('Software Requirement Engineering', 'Card Subtitle 1', { title: 'Card 1', body: 'Card content 1' }, 'https://picsum.photos/700')}
            {renderCard('Software Requirement Engineering', 'Card Subtitle 2', { title: 'Card 1', body: 'Card content 1' }, 'https://picsum.photos/700')}
            {renderCard('Software Requirement Engineering', 'Card Subtitle 3', { title: 'Card 1', body: 'Card content 1' }, 'https://picsum.photos/700')}
            {renderCard('Software Requirement Engineering', 'Card Subtitle 4', { title: 'Card 1', body: 'Card content 1' }, 'https://picsum.photos/700')}
            {renderCard('Software Requirement Engineering', 'Card Subtitle 5', { title: 'Card 1', body: 'Card content 1' }, 'https://picsum.photos/700')}
            {renderCard('Software Requirement Engineering', 'Card Subtitle 6', { title: 'Card 1', body: 'Card content 1' }, 'https://picsum.photos/700')}
          </View>
        </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F2EDD5',
    padding: wp('5%'),
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
    backgroundColor:'white',
    marginTop:hp('10%'),
    borderRadius:wp('5%'),
    padding:10
  },
  profileImage: {
    width: wp('20%'),
    height: wp('20%'),
    borderRadius: wp('10%'),
  },
  username: {
    marginLeft: wp('3%'),
    fontSize: wp('4%'),
    color: '#575945',
  },
  heading: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#A68A56',
    marginVertical: hp('2%'),
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: wp('90%'),
    marginBottom: hp('2%'),
  },
  cardTitle: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: '#FBEEE0',
  },
  cardContent: {
    fontSize: wp('3.5%'),
    color: '#D9D6D2',
  },

 
});
