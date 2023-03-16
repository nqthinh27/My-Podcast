import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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

    return (
        <SafeAreaView style={GlobalStyles.customSafeArea}>
            <Text>{JSON.stringify(response)}</Text>
        </SafeAreaView>
    )
}

export default Home