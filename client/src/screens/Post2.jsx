import React, { useState } from 'react';
import { View, Button, SafeAreaView } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import firebase from '../../config';
import Loading from '../components/Loading';

export default function Post2() {
    const [audio, setAudio] = useState(null);
    const [uploading, setUploading] = useState(false);

    const pickAudio = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'audio/*',
            });
            setAudio(result);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker
            } else {
                // Error
                console.log(err);
            }
        }
    };

    const uploadAudio = async () => {
        if (!audio) return;
        setUploading(true);
        const response = await fetch(audio.uri);
        const blob = await response.blob();
        const filename = audio.name;
        const ref = firebase.storage().ref().child(filename);
        try {
            await ref.put(blob);
            setUploading(false);
            alert('Audio uploaded!');
            setAudio(null);
        } catch (error) {
            console.log(error);
            setUploading(false);
            alert('Error uploading audio');
        }
    };

    return (
        <SafeAreaView style={{flex:1}}>
            <Button title="Pick Audio" onPress={pickAudio} />
            {audio && (
                <Button title="Upload Audio" onPress={uploadAudio} disabled={uploading} />
            )}
            <Loading></Loading>
        </SafeAreaView>
    );
}
