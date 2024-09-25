import React, { useDebugValue, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { View } from 'react-native';
import { Card,Title,Paragraph,Button } from 'react-native-paper';

function GetTicket() {
  // Define state to track refresh
  const [refresh, setRefresh] = useState(false);
  const [userData,setUserData] = useState([])
  // Function to handle QR code scan success
  const onSuccess = async(e) => {
    const response = await fetch(`https://api.knowvationlearnings.in/api/v1/forms/getticketdata/${e.data}`);
    const data = await response.json();
    setUserData([data]);
    setRefresh(false)
  };

  // Function to handle "OK. Got it!" button press
  const handleButtonPress = () => {
    // Toggle refresh state
    setRefresh(!refresh);
  };

  

  // Return JSX
  return (
<View>   
<>     
{refresh ? 
    <QRCodeScanner
      key={refresh ? 'refreshed' : 'not-refreshed'} // This key will force re-mounting of the QRCodeScanner component when refresh state changes
      onRead={onSuccess}
      topContent={
        <Text style={styles.centerText}>
          <Text style={styles.textBold}>Place your qr</Text>
        </Text>
      }
      bottomContent={
        <TouchableOpacity
          style={styles.buttonTouchable}
          onPress={handleButtonPress} // Call handleButtonPress when button is pressed
        >
          <Text style={styles.buttonText}>Scan Now!</Text>
        </TouchableOpacity>
      }
    />
:
<>
<View style={styles.container}>
  {userData &&
      <Card>
        <Card.Content>
          { 
          userData.map((item) => (
            <>
              <Title>Event Name: {item.eventName}</Title>
              <Paragraph>Team size:{item.teamSize} </Paragraph>
              <Paragraph>Email:{item.email} </Paragraph>
              <Paragraph>College:{item.college} </Paragraph>
              <Paragraph>Phone:{item.Phone} </Paragraph>
              <Paragraph>Ticket Id:{item.ticketId} </Paragraph>
              <Paragraph>Team size:{item.teamSize} </Paragraph>
              <Paragraph>transactionId:{item.transactionId} </Paragraph>
              </>
          ))}
          
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => console.log('Edit pressed')}>Edit</Button>
          <Button onPress={() => console.log('Delete pressed')}>Delete</Button>
        </Card.Actions>
      </Card>
}
    </View>
    <View style={{justifyContent:'center',alignItems:'center'}}>
        <TouchableOpacity
          style={styles.buttonTouchable}
          onPress={handleButtonPress} // Call handleButtonPress when button is pressed
        >
          <Text style={styles.buttonText}>Scan Again!</Text>
        </TouchableOpacity>
        </View> 
</>
        }
</>
</View>
  );
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});

export default GetTicket;
