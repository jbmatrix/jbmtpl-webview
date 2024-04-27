import {
  BackHandler,
  Linking,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import WebView from 'react-native-webview';

const WebScreen = () => {
  const webVRef = useRef(null);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onAndroidBackPress);
    };
  }, []);

  const onAndroidBackPress = () => {
    if (webVRef.current) {
      webVRef.current.goBack();
      return true;
    }
  };
  
  const loadRequest = request => {
    if (request.url.startsWith('tel:')) {
      console.log('here');
      Linking.openURL(request.url).catch(er => {
        Alert.alert('Failed to open Link: ' + er.message);
      });
      return false;
    }
    return true;
  };

  return (
    <WebView
      ref={webVRef}
      source={{uri: 'https://jbmatrix.com'}}
      style={{marginTop: 20}}
      onShouldStartLoadWithRequest={loadRequest}
      originWhitelist={['https://*', 'http://*', 'tel:*', 'mailto:*']}
    />
  );
};

export default WebScreen;

const styles = StyleSheet.create({});
