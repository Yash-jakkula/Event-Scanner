import React, {useDebugValue, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, Linking} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {View} from 'react-native';
import {Card, Title, Paragraph, Button, TextInput} from 'react-native-paper';

function Scanner() {
  // Define state to track refresh
  const [refresh, setRefresh] = useState(false);
  const [userData, setUserData] = useState();
  const [allowEntry, setAllowEntry] = useState(null);
  // Function to handle QR code scan success
  const onSuccess = async e => {
    if (e.data) {
      const response = await fetch(``);
      const data = await response.json();

      setUserData(data);

      if (data.allowedEntry == 0) {
        setAllowEntry('Manual Entry');
      } else if (data.allowedEntry == -1) {
        setAllowEntry('Ticket Not valid for Entry');
      } else {
        setAllowEntry(data.allowedEntry);
      }
      setRefresh(false);
    }
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
        {refresh ? (
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
        ) : (
          <>
            <View
              style={{
                height: '100%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={styles.container}>
                {userData && (
                  <Card style={{height: '30%', justifyContent: 'center'}}>
                    <Card.Content
                      style={{alignItems: 'center', justifyContent: 'center'}}>
                      {userData.message !== 'error' ? (
                        <>
                          <Paragraph>
                            <Text style={{fontSize: 20}}>
                              {userData.message}
                            </Text>
                          </Paragraph>
                          {allowEntry && (
                            <Paragraph>
                              <Text style={{fontSize: 20}}>
                                Entry:{allowEntry}
                              </Text>
                            </Paragraph>
                          )}
                        </>
                      ) : (
                        <Paragraph>
                          Error:<Text>{userData.error}</Text>
                        </Paragraph>
                      )}
                    </Card.Content>
                  </Card>
                )}
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity
                  style={styles.buttonTouchable}
                  onPress={handleButtonPress} // Call handleButtonPress when button is pressed
                >
                  <View>
                    <TextInput
                      style={{width: '100%'}}
                      placeholder="Enter the ticket id here"
                    />
                  </View>
                  <Text style={styles.buttonText}>Scan Again!</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    width: '90%',
  },
});

export default Scanner;
