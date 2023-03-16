import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import GlobalStyles from "../components/GlobalStyles";

function Home(props) {
    let [isLoading, setIsLoading] = useState(true);
    let [error, setError] = useState();
    let [response, setResponse] = useState([]);

    useEffect(() => {
        fetch("http://192.168.0.3:3001/user/")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoading(false);
                    setResponse(result);
                }
            )
            .catch(err => {
                console.log(err);
            })
    }, []);

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.currentUser);

    return (
        <SafeAreaView style={GlobalStyles.customSafeArea}>
            <StatusBar></StatusBar>
            <Text>{JSON.stringify(response)}</Text>
        </SafeAreaView>
    )
}

export default Home