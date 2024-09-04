import React from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import Modal from "react-native-modal";

const BottomSheet = ({ isVisible, onClose, comments }) => {
    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            style={styles.modal}
        >
            <View style={styles.sheetContainer}>
                <ScrollView style={styles.scrollView}>
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <View key={index} style={styles.commentContainer}>
                                <Image
                                    source={{ uri: comment.avatarUrl }}
                                    style={styles.avatar}
                                />
                                <View style={styles.commentContent}>
                                    <Text style={styles.username}>{comment.user}</Text>
                                    <Text style={styles.commentText}>{comment.text}</Text>
                                    <Text style={styles.timestamp}>{comment.timestamp}</Text>
                                </View>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noComments}>No comments available.</Text>
                    )}
                </ScrollView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: "flex-end",
        margin: 0,
    },
    sheetContainer: {
        backgroundColor: "white",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: "50%",
    },
    scrollView: {
        flex: 1,
    },
    commentContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: "#ddd",
        paddingBottom: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    commentContent: {
        flex: 1,
    },
    username: {
        fontWeight: "bold",
        marginBottom: 2,
    },
    commentText: {
        marginBottom: 2,
    },
    timestamp: {
        fontSize: 12,
        color: "#888",
    },
    noComments: {
        textAlign: "center",
        color: "#888",
    },
});

export default BottomSheet;
