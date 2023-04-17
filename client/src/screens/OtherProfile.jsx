import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import React , { useState }from "react";
import colors from "../constants/colors";
import Icon from "react-native-vector-icons/Feather";
import ProfileInfo from "../components/ProfileInfo";
import { MyPopularData } from "../../dummyData";
import ProfilePodcast from "../components/ProfilePodcast";
import { MyNewReLeaseData } from "../../dummyData";
import GlobalStyles from "../components/GlobalStyles";
// import Icon from "react-native-vector-icons/Entypo";

export default function OtherProfile(props) {
    //navigation
    // const { navigation, route } = props;
    // //function of navigate
    // const { navigate, goback } = navigation;

    const [isFollowed, setIsFollowed] = useState(false);
    const handlePress = () => {
        setIsFollowed(!isFollowed);
      };

    return (
        <SafeAreaView style={[styles.otherprofile, GlobalStyles.droidSafeArea]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.otherprofileHeader}>
                    <Icon
                        style={styles.back}
                        name={"chevron-left"}
                        size={26}
                        onPress={() => {
                            navigate("UIScreen");
                        }}
                    />
                    {/* <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 21,
                        }}
                    >
                        Trang cá nhân
                    </Text> */}
                    <Text> </Text>
                </View>

                <View style={styles.otherprofileContainer}>
                    <ProfileInfo
                        styles={{
                            width: "100%",
                            backgroundColor: "red",
                        }}
                        avt="https://firebasestorage.googleapis.com/v0/b/mypodcast-88135.appspot.com/o/avatar.jpg?alt=media&token=fc074eb8-e67f-4235-8230-160cae1557b5"
                        name="Nguyễn Quang Thịnh"
                        followers={2002}
                        following={2002}
                        posts={20}
                    />

                    <View style={styles.otherprofileFollowButton}>
                        <TouchableOpacity style={styles.otherprofileFollow} onPress={handlePress}>
                            <View style={{ flexDirection: "row", 
                        justifyContent: 'center',
                        alignContent: 'center' }}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontWeight: "500",
                                    }}
                                >
                                     {isFollowed ?  'Đang theo dõi   ' :'Theo dõi  '}
                                </Text>
                                <Icon
                                    name={isFollowed ? "user-check" : 'user'}
                                    size={16}
                                    color="#000"
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.otherprofileMore}>
                            <Icon
                                name="more-horizontal"
                                size={25}
                                color="#000"
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                        <Text
                            style={{
                                marginLeft: 16,
                                fontSize: 18,
                                fontWeight: "bold",
                                marginBottom: 10,
                            }}
                        >
                            Nổi bật
                        </Text>

                        <Icon
                            name={"chevron-right"}
                            size={18}
                            style={{ paddingTop: 1 }}
                            onPress={() => {
                                navigate("UIScreen");
                            }}
                        />
                    </View>
                    <View
                        style={{
                            // marginHorizontal: 9,
                            flexDirection: "row",
                            justifyContent: "space-around",
                        }}
                        // horizontal={true}
                    >
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            style={{ marginHorizontal: 16 }}
                        >
                            {MyPopularData.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={{ marginRight: 16 }}
                                    >
                                        <ProfilePodcast item={item} />
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text
                            style={{
                                marginLeft: 16,
                                fontSize: 18,
                                fontWeight: "bold",
                                marginBottom: 10,
                            }}
                        >
                            Mới phát hành
                        </Text>

                        <Icon
                            name={"chevron-right"}
                            size={18}
                            style={{ paddingTop: 1 }}
                            onPress={() => {
                                navigate("UIScreen");
                            }}
                        />
                    </View>

                    <View
                        style={{
                            marginHorizontal: 9,
                            flexDirection: "row",
                            justifyContent: "space-around",
                            flexWrap: "wrap",
                        }}
                        horizontal={true}
                    >
                        {MyNewReLeaseData.map((item, index) => {
                            return (
                                <TouchableOpacity key={index}>
                                    <ProfilePodcast item={item} />
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    otherprofile: {
        flex: 1,
        backgroundColor: "#fff",
    },

    otherprofileHeader: {
        flex: 1,
        marginHorizontal: 20,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    otherprofileContent: {
        marginLeft: 16,
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },

    otherprofileContainer: {
        flex: 20,
        // alignItems: 'center',
        marginTop: 5,
    },

    otherprofileFollowButton: {
        flexDirection: "row",
        marginHorizontal: 16,
        justifyContent: "space-between",
    },

    otherprofileMore: {
        width: "18%",
        height: 35,
        borderRadius: 6,
        borderWidth: 1,
        backgroundColor: "#D6D6D6",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 16,
        borderColor: "white",
        alignSelf: "center",
        // paddingHorizontal: 40
        flexDirection: "row",
    },
    otherprofileFollow: {
        width: "80%",
        height: 35,
        borderRadius: 6,
        borderWidth: 1,
        backgroundColor: "#D6D6D6",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 16,
        borderColor: "white",
        alignSelf: "center",
        // paddingHorizontal: 40
        flexDirection: 'row'
    },
});
