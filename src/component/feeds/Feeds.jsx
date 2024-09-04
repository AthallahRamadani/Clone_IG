import React, { useState } from "react";
import { FlatList, Image, TouchableOpacity, Text, View } from "react-native";
import Modal from "react-native-modal";
import FeedHeader from "./FeedHeader/FeedHeader";
import FeedActions from "./FeedAction/FeedActions";
import FeedLikes from "./FeedLikes/FeedLikes";
import FeedCaption from "./FeedCaptions/FeedCaptions";
import BottomSheet from "./FeedBotSheet/BottomSheet";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const getPostDateText = (dateUnix) => {
    const currentDate = dayjs(Date.now());
    const weeksCount = currentDate.diff(dateUnix, "week");
    if (weeksCount < 1) {
        return dayjs(dateUnix).fromNow();
    }
    const yearsCount = currentDate.diff(dateUnix, "year");
    if (yearsCount < 1) {
        return dayjs(dateUnix).format("MMMM YY");
    } else {
        return dayjs(dateUnix).format("MMMM D, YYYY");
    }
};

const Feeds = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedComments, setSelectedComments] = useState([]);

    const toggleModal = (comments) => {
        setSelectedComments(comments);
        setModalVisible(!isModalVisible);
    };

    const Feed = (props) => {
        const postDateText = getPostDateText(props.item.feed.postDate);
        return (
            <>
                <FeedHeader {...props} />
                <Image
                    source={{
                        uri: props.item.feed.imageUrl,
                    }}
                    style={{
                        width: "100%",
                        aspectRatio: 1,
                        marginTop: 7,
                    }}
                />
                <FeedActions />
                <FeedLikes {...props} />
                <FeedCaption {...props} />
                <TouchableOpacity onPress={() => toggleModal(props.item.feed.comments)}>
                    <Text style={{ color: "gray" }}>
                        View All {props.item.feed.totalComments} Comments
                    </Text>
                </TouchableOpacity>
                <Text style={{ color: "gray" }}>{postDateText}</Text>
            </>
        );
    };

    return (
        <View>
            <FlatList
                data={FEED_DATA}
                style={{
                    paddingHorizontal: 10,
                    backgroundColor: "cyan",
                }}
                renderItem={Feed}
            />
            <BottomSheet
                isVisible={isModalVisible}
                onClose={() => setModalVisible(false)}
                comments={selectedComments}
            />
        </View>
    );
};


const FEED_DATA = [
    {
        username: "Juan Dwiky",
        imageUrl:
            "https://i.pinimg.com/736x/e8/02/e7/e802e799104b921a6b6520b01032abd4.jpg",
        hasActiveStory: false,
        feed: {
            imageUrl:
                "https://images.unsplash.com/photo-1533621834623-d0b25d0b14e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmFjYXRpb24lMjBtYW58ZW58MHx8MHx8fDA%3D",
            totalLikes: 10,
            friendLikes: [
                {
                    name: "Dhandi",
                    imageUrl:
                        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/64d92a54-b206-481d-814e-de021ac31156/dfi2aq6-7d83ac2a-3da8-40da-87fa-ff3cb91c812d.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzY0ZDkyYTU0LWIyMDYtNDgxZC04MTRlLWRlMDIxYWMzMTE1NlwvZGZpMmFxNi03ZDgzYWMyYS0zZGE4LTQwZGEtODdmYS1mZjNjYjkxYzgxMmQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.sUgsOyBGsFYDbc1QEV6aU-gG8h03TA5tJXOX5crnydw",
                },
            ],
            caption:
                "KENAPA KAMU KETAWA HAH⁉️  💥MANA SPREI GRATIS 🛏️ YANG KAU JANJIKAN ITU HA⁉️ DISAAT PENDUKUNGMU OKE GAS 🗣️🔥 OKE GAS 🗣️🔥 KAMU MALAH KETAWA 😂 ITU GAK RIZZ PECT BANGET WO 😡 DAN JANGAN LUPA MAKANAN GRATISNYA 🍱 WO 💥",
            totalComments: 5,
            postDate: Date.now() - 60 * 60 * 24 * 1000 * 199,
            comments: [
                { user: "Alice", text: "Nice picture!", timestamp: "1h ago", avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg" },
                { user: "Bob", text: "Awesome post!", timestamp: "2h ago", avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg" },
                { user: "Charlie", text: "Great view!", timestamp: "4h ago", avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg" },
                { user: "Dave", text: "Love this!", timestamp: "1h ago", avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg" },
                { user: "Eve", text: "Amazing!", timestamp: "1h ago", avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg" },
            ],
        },
    },
    {
        username: "Juan Dwiky",
        imageUrl:
            "https://i.pinimg.com/736x/e8/02/e7/e802e799104b921a6b6520b01032abd4.jpg",
        hasActiveStory: false,
        feed: {
            imageUrl:
                "https://images.unsplash.com/photo-1533621834623-d0b25d0b14e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmFjYXRpb24lMjBtYW58ZW58MHx8MHx8fDA%3D",
            totalLikes: 10,
            friendLikes: [
                {
                    name: "Dhandi",
                    imageUrl:
                        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/64d92a54-b206-481d-814e-de021ac31156/dfi2aq6-7d83ac2a-3da8-40da-87fa-ff3cb91c812d.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzY0ZDkyYTU0LWIyMDYtNDgxZC04MTRlLWRlMDIxYWMzMTE1NlwvZGZpMmFxNi03ZDgzYWMyYS0zZGE4LTQwZGEtODdmYS1mZjNjYjkxYzgxMmQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.sUgsOyBGsFYDbc1QEV6aU-gG8h03TA5tJXOX5crnydw",
                },
            ],
            caption:
                "KENAPA KAMU KETAWA HAH⁉️  💥MANA SPREI GRATIS 🛏️ YANG KAU JANJIKAN ITU HA⁉️ DISAAT PENDUKUNGMU OKE GAS 🗣️🔥 OKE GAS 🗣️🔥 KAMU MALAH KETAWA 😂 ITU GAK RIZZ PECT BANGET WO 😡 DAN JANGAN LUPA MAKANAN GRATISNYA 🍱 WO 💥",
            totalComments: 5,
            postDate: Date.now() - 60 * 60 * 24 * 1000 * 199,
            comments: [
                { user: "Alice", text: "Nice picture!", timestamp: "1h ago", avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg" },
                { user: "Bob", text: "Awesome post!", timestamp: "2h ago", avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg" },
                { user: "Charlie", text: "Great view!", timestamp: "4h ago", avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg" },
                { user: "Dave", text: "Love this!", timestamp: "1h ago", avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg" },
                { user: "Eve", text: "Amazing!", timestamp: "1h ago", avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg" },
            ],
        },
    },
    {
        username: "Juan Dwiky",
        imageUrl:
            "https://i.pinimg.com/736x/e8/02/e7/e802e799104b921a6b6520b01032abd4.jpg",
        hasActiveStory: false,
        feed: {
            imageUrl:
                "https://images.unsplash.com/photo-1533621834623-d0b25d0b14e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmFjYXRpb24lMjBtYW58ZW58MHx8MHx8fDA%3D",
            totalLikes: 10,
            friendLikes: [
                {
                    name: "Dhandi",
                    imageUrl:
                        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/64d92a54-b206-481d-814e-de021ac31156/dfi2aq6-7d83ac2a-3da8-40da-87fa-ff3cb91c812d.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzY0ZDkyYTU0LWIyMDYtNDgxZC04MTRlLWRlMDIxYWMzMTE1NlwvZGZpMmFxNi03ZDgzYWMyYS0zZGE4LTQwZGEtODdmYS1mZjNjYjkxYzgxMmQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.sUgsOyBGsFYDbc1QEV6aU-gG8h03TA5tJXOX5crnydw",
                },
            ],
            caption:
                "KENAPA KAMU KETAWA HAH⁉️  💥MANA SPREI GRATIS 🛏️ YANG KAU JANJIKAN ITU HA⁉️ DISAAT PENDUKUNGMU OKE GAS 🗣️🔥 OKE GAS 🗣️🔥 KAMU MALAH KETAWA 😂 ITU GAK RIZZ PECT BANGET WO 😡 DAN JANGAN LUPA MAKANAN GRATISNYA 🍱 WO 💥",
            totalComments: 5,
            postDate: Date.now() - 60 * 60 * 24 * 1000 * 199,
            comments: [
                { user: "Alice", text: "Nice picture!", timestamp: "1h ago", avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg" },
                { user: "Bob", text: "Awesome post!", timestamp: "2h ago", avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg" },
                { user: "Charlie", text: "Great view!", timestamp: "4h ago", avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg" },
                { user: "Dave", text: "Love this!", timestamp: "1h ago", avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg" },
                { user: "Eve", text: "Amazing!", timestamp: "1h ago", avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg" },
            ],
        },
    },
    {
        username: "Juan Dwiky",
        imageUrl:
            "https://i.pinimg.com/736x/e8/02/e7/e802e799104b921a6b6520b01032abd4.jpg",
        hasActiveStory: false,
        feed: {
            imageUrl:
                "https://images.unsplash.com/photo-1533621834623-d0b25d0b14e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmFjYXRpb24lMjBtYW58ZW58MHx8MHx8fDA%3D",
            totalLikes: 10,
            friendLikes: [
                {
                    name: "Dhandi",
                    imageUrl:
                        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/64d92a54-b206-481d-814e-de021ac31156/dfi2aq6-7d83ac2a-3da8-40da-87fa-ff3cb91c812d.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzY0ZDkyYTU0LWIyMDYtNDgxZC04MTRlLWRlMDIxYWMzMTE1NlwvZGZpMmFxNi03ZDgzYWMyYS0zZGE4LTQwZGEtODdmYS1mZjNjYjkxYzgxMmQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.sUgsOyBGsFYDbc1QEV6aU-gG8h03TA5tJXOX5crnydw",
                },
            ],
            caption:
                "KENAPA KAMU KETAWA HAH⁉️  💥MANA SPREI GRATIS 🛏️ YANG KAU JANJIKAN ITU HA⁉️ DISAAT PENDUKUNGMU OKE GAS 🗣️🔥 OKE GAS 🗣️🔥 KAMU MALAH KETAWA 😂 ITU GAK RIZZ PECT BANGET WO 😡 DAN JANGAN LUPA MAKANAN GRATISNYA 🍱 WO 💥",
            totalComments: 5,
            postDate: Date.now() - 60 * 60 * 24 * 1000 * 199,
            comments: [
                { user: "Alice", text: "Nice picture!", timestamp: "1h ago", avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg" },
                { user: "Bob", text: "Awesome post!", timestamp: "2h ago", avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg" },
                { user: "Charlie", text: "Great view!", timestamp: "4h ago", avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg" },
                { user: "Dave", text: "Love this!", timestamp: "1h ago", avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg" },
                { user: "Eve", text: "Amazing!", timestamp: "1h ago", avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg" },
            ],
        },
    },
];

export default Feeds;
