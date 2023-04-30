import React, { useState } from 'react';
import { View, Button, SafeAreaView, Text } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import DocumentPickerHandle from 'react-native-document-picker';
import firebase from '../../config';

export default function Post2() {
    const selectDoc = async () => {
        try {
            const doc = await DocumentPickerHandle.pick()
            console.log(doc)
        } catch (err) {
            if (DocumentPicker.isCancel(err))
                console.log("User cancelled the upload", err);
            else
                console.log(err)
        }
    }

    async function pickDocument() {
        try {
          const result = await DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles],
          });
          console.log(
            result.uri,
            result.type, // mime type
            result.name,
            result.size
          );
        } catch (err) {
          if (DocumentPicker.isCancel(err)) {
            // User cancelled the picker
          } else {
            // Error
            console.log(err);
          }
        }
      }

    return (
        <SafeAreaView>
            <Text
                style={{
                    color: 'black',
                    fontSize: 28,
                    textAlign: 'center',
                    marginVertical: 40,
                }}>
                Document Picker
            </Text>
            <View style={{ marginHorizontal: 40 }}>
                <Button title="Select Document" onPress={pickDocument} />
            </View>
        </SafeAreaView>
    );
}