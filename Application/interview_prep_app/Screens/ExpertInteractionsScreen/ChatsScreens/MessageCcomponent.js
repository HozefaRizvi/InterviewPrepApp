import React, { useContext, useState } from "react";
import { View, Text } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { styles } from "./ChatStyles";
import AuthContext from "../../../ReactContext/AuthContext";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
export default function MessageComponent({ item, currentUser, userProfilePic }) {
    const isCurrentUser = item.user === currentUser;
    const { user } = useContext(AuthContext);
    const [isUserExpert, SetisUserExpert] = useState(user.Expert);

    return (
        <View>
            <View
                style={[
                    styles.mmessageWrapper,
                    isCurrentUser ? { alignItems: "flex-end" } : null
                ]}
            >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View
                        style={[
                            styles.mmessage,
                            isCurrentUser
                                ? { backgroundColor: "#e6f7ff", marginLeft: 30 }
                                : { backgroundColor: "rgb(194, 243, 194)" }
                        ]}
                    >
                        <Text>{item.text}</Text>
                    </View>
                    {isUserExpert === "Expert" && (
                        <FontAwesome
                            name="check-square"
                            size={wp("8%")}
                            color="#81A649"
                            style={{ marginLeft: 20 }}
                        />
                    )}
                </View>
                <Text style={{ marginLeft: 40 }}>{item.user}</Text>
                <Text style={{ marginLeft: 40 }}>{item.time}</Text>
            </View>
        </View>
    );
}
