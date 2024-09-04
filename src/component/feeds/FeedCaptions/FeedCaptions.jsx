import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

//TODO: branch name suggestion: challenge-hari-ketiga
// TODO: buat agar text more-nya sejajar dengan caption, sebelum di klik more itu caption yang tampil maksimal 2 baris
// TODO: dan setelah di klik more nya, semua caption tampil
const FeedCaption = (props) => {
    const [expanded, setExpanded] = useState(false);
    const charLimit = 92;

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    const getDisplayText = () => {
        if (expanded || props.item.feed.caption.length <= charLimit) {
            return props.item.feed.caption;
        }
        return `${props.item.feed.caption.slice(0, charLimit)}...`;
    };

    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontWeight: "bold" }}>
                {props.item.username}{" "}
                <Text numberOfLines={expanded ? 0 : 2} style={{ fontWeight: "300" }}>
                    {getDisplayText()}
                </Text>
                {!expanded && props.item.feed.caption.length > charLimit && (
                    <TouchableOpacity onPress={toggleExpanded} style={{ marginLeft: 5 }}>
                        <Text style={{ color: "blue" }}>more</Text>
                    </TouchableOpacity>
                )}
            </Text>
        </View>
    );
};

export default FeedCaption;
