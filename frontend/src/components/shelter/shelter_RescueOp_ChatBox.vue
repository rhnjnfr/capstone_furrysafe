<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import { MagnifyingGlassIcon, PaperAirplaneIcon, PaperClipIcon } from "@heroicons/vue/20/solid";
import axios from 'axios';
import { io } from 'socket.io-client';

// Reactive user ID
const user_id = ref(localStorage.getItem('u_id'));
// Other reactive references
const selectedChat_id = ref(null);
const conversations = ref([]);
const createConversation = ref(false); //flagging for ui
const searchValue = ref('');
const searchResults = ref([]);

const newMessage = ref(''); // New message input
const messagesContainer = ref(null); // Reference to the messages container
const lastMessage = ref(null); // For alternative scrolling

let receiverId = ref(null);
let receiverName = ref('');
let userFullName; //user fullname

// Selected conversation
const selectedConversation = ref({
    NameFrom: '',
    messages: [],
    timestamp: '',
    lastMessageDate: null
});

//socket conncections, and routese
const socket = io('http://localhost:5000');
socket.on('connect', () => {
    console.log("Connected to socket with id", socket.id);
});
socket.on('receive-message', (messageData) => {
    if (messageData.chat_id == selectedChat_id.value) {
        // Append to current conversation
        selectedConversation.value.messages.push(messageData);
        selectedConversation.value.lastMessageDate = new Date(messageData.date);
        scrollToBottom();
    }
    updateConversationsList(messageData);
});


// Fetch all conversations
const fetchInbox = async () => {
    try {
        const response = await axios.post("http://localhost:5000/loadinbox", {
            id: user_id.value,
            // Optionally, include other parameters if needed
        });

        response.data.forEach(chat => {
            let room = chat.chat_id;
            socket.emit('join-chat', room); // Ensure both users emit this to join the room
        });
        if (response.data) {
            // Map conversations to include lastMessageDate
            conversations.value = response.data.map(conversation => ({
                ...conversation,
                lastMessageDate: new Date(conversation.date)
            }));

            if (conversations.value.length > 0) {
                selectConversation(conversations.value[0]);
            }

            // No need to manually sort since we're using a computed property
        } else {
            console.log("No data received.");
        }
    } catch (err) {
        console.log("Error fetching inbox:", err);
    }
};
const updateConversationsList = (messageData) => {
    const conversationIndex = conversations.value.findIndex(conv => conv.chat_id === messageData.chat_id);

    // Determine who is the sender and who is the receiver
    let otherParticipantName;
    if (messageData.p1_name === userFullName) {
        otherParticipantName = messageData.p2_name; // Current user is p1, so p2 is the other participant
    } else {
        otherParticipantName = messageData.p1_name; // Current user is p2, so p1 is the other participant
    }

    if (conversationIndex !== -1) {
        // Update existing conversation's lastMessageDate and last message
        conversations.value[conversationIndex].lastMessageDate = new Date(messageData.date);
        conversations.value[conversationIndex].message = messageData.message; // Update last message snippet
        conversations.value[conversationIndex].other_participant_name = otherParticipantName;

        // Move the updated conversation to the top
        const updatedConversation = conversations.value.splice(conversationIndex, 1)[0];
        conversations.value.unshift(updatedConversation);
    } else {
        // Add a new conversation if it doesn't exist
        conversations.value.unshift({
            chat_id: messageData.chat_id,
            other_participant_name: otherParticipantName, // Set receiver's name
            message: messageData.message,
            date: messageData.date,
            lastMessageDate: new Date(messageData.date)
        });
    }
};
// Select a conversation
const selectConversation = async (conversation) => {
    receiverName.value = conversation.other_participant_name || conversation.p2_name
    receiverId.value = null; // Corrected spelling
    if (!conversation || !conversation.chat_id) {
        console.log("Invalid conversation selected.");
        return;
    }
    selectedChat_id.value = conversation.chat_id;

    let room = selectedChat_id.value;
    socket.emit('join-chat', room); // Ensure both users emit this to join the room

    try {
        // Fetch messages for the selected chat
        const response = await axios.post("http://localhost:5000/loadinbox", {
            id: user_id.value,
            chat_id: selectedChat_id.value
        });
        if (response.data) {
            console.log("response", response.data)
            console.log("response 2", conversation.other_participant_name, conversation.p2_name)

            selectedConversation.value = {
                NameFrom: receiverName.value,
                messages: response.data, // Array of messages
                timestamp: conversation.date,
                lastMessageDate: new Date(conversation.date)
            };
            await nextTick(); // Ensure DOM is updated
            scrollToBottom(); // Scroll after messages are loaded
        } else {
            selectedConversation.value = {
                NameFrom: receiverName.value,
                messages: [],
                timestamp: conversation.date,
                lastMessageDate: new Date(conversation.date)
            };
            await nextTick(); // Ensure DOM is updated
            scrollToBottom();
        }
    } catch (err) {
        console.log("Error fetching messages:", err);
    }
};

const sendMessage = async () => {
    if (!newMessage.value.trim()) return;

    // Ensure a chat ID is selected
    if (!selectedChat_id.value) {
        createNewMessage();
        return;
    }

    const tempurl = null;

    let messageData = {
        chat_id: selectedChat_id.value,
        user_id: parseInt(user_id.value),
        message: newMessage.value,
        url: tempurl,
        date: new Date().toISOString(),
        sender_name: userFullName,
        p1_name: userFullName,
        p2_name: receiverName.value // Ensure receiverName is set
    };

    console.log("send message, message data", messageData)
    try {
        const response = await axios.post("http://localhost:5000/sendmessage", messageData);

        if (response.data.success) { //true
            createConversation.value = false;

            const date = new Date(messageData.date);
            const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}-` +
                `${date.getDate().toString().padStart(2, '0')}-` +
                `${date.getFullYear()} ` +
                `${date.getHours().toString().padStart(2, '0')}:` +
                `${date.getMinutes().toString().padStart(2, '0')}`;

            const formattedMessageData = {
                ...messageData,
                date: formattedDate
            };

            // Update local messages for the sender
            selectedConversation.value.messages.push({
                ...formattedMessageData,
                date: new Date(formattedMessageData.date)
            });

            selectedConversation.value.lastMessageDate = new Date(formattedMessageData.date);

            // Update the conversations list for the sender
            updateConversationsList(formattedMessageData);

            // **Removed the incorrect selectConversation call**
            // selectConversation(messageData)

            // Emit the message to the receiver
            socket.emit('send-message', formattedMessageData);

            newMessage.value = ''; // Clear the input field
            scrollToBottom(); // Scroll after sending a new message
        } else {
            console.error("Failed to send message:", response.data.message);
        }
    } catch (error) {
        console.error("Error sending message:", error);
    }
};

// Create a new message (conversation)
const createNewMessage = async () => {
    try {
        const response = await axios.post("http://localhost:5000/newchat", {
            senderid: user_id.value,
            receiverid: receiverId.value
        });

        if (response.data) {
            //        console.log("response data", response.data[0].chat_id)
            selectedChat_id.value = response.data[0].chat_id
            // receiverName.value =  response.data[0].chat_id

            console.log("tite", response.data)
            sendMessage()
        }
    }
    catch (err) {
        console.log("D:", err)
    }
};

// Fetch data for search
const fetchData = async (query) => {
    if (!query.trim()) {
        searchResults.value = [];
        return;
    }
    try {
        const response = await axios.post("http://localhost:5000/search", {
            value: searchValue.value
        });
        searchResults.value = response.data;
        console.log('Fetched results:', response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
        searchResults.value = [];
    }
};
// Function to scroll to the bottom of the messages container
const scrollToBottom = async () => {
    await nextTick(); // Wait for DOM updates
    await nextTick(); // Additional wait
    if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
    // Alternative approach:
    // if (lastMessage.value) {
    //     lastMessage.value.scrollIntoView({ behavior: 'smooth' });
    // }
}
const getUserFullName = async () => {
    try {
        const response = await axios.post("http://localhost:5000/getfullname", {
            id: user_id.value,
        });

        if (response.data) {
            userFullName = response.data;
        } else {
            console.log("No data received.");
        }
    } catch (err) {
        console.log("Error fetching inbox:", err);
    }
}

// SEARCH SUB FUNCTIONS
let timeout;
const handleInput = (value) => { //if mag input si user, mag req siya sa backend every 500s 
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        fetchData(value);
    }, 500); // 500ms debounce
};
const handleItemClick = (itemId, name) => { // Handle item selection from search
    searchValue.value = '';
    receiverId.value = itemId;
    receiverName.value = name;
    selectedChat_id.value = null

    conversations.value.forEach(chat => {
        if (receiverName.value == chat.other_participant_name) {
            selectConversation({ chat_id: chat.chat_id })
            createConversation.value = false
        }
        else {
            console.log("else")
        }
    });

};

// Computed property for sorted messages
const sortedMessages = computed(() => {
    if (!selectedConversation.value || !selectedConversation.value.messages) {
        return [];
    }
    return [...selectedConversation.value.messages].sort((a, b) => new Date(a.date) - new Date(b.date));
});

// Function to format time
function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// events
const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
};
function closeNewMessage() {
    receiverName.value = null
    receiverId.value = null
}

// Watchers
watch(sortedMessages, () => {
    scrollToBottom();
});
watch(searchValue, (newValue) => {
    handleInput(newValue);
});

onMounted(() => {
    fetchInbox();
    getUserFullName();
});
</script>

<template>
    <!-- Gi change nko height kay samok T-T -->
    <div class="flex h-[50rem] overflow-y-hidden">
        <!-- Conversations Sidebar -->
        <div class="w-[30%] border-r-2 text-gray-600 pr-6">
            <div class="py-4">
                <span class="text-xl font-bold">Chats</span>
            </div>
            <div class="relative">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input id="search" name="search" v-model="searchValue"
                    class="block w-full rounded-lg bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                    placeholder="Search" type="search" />
                <!-- Search Results Dropdown -->
                <!-- <ul v-if="searchResults.length > 0"  @input="handleInput(searchValue)"
                    class="absolute bg-white border mt-1 w-full max-h-60 overflow-y-auto">
                    <li v-for="item in searchResults" :key="item.id" class="px-4 py-2 hover:bg-gray-100">
                        <button @click="handleItemClick(item.id, item.name)" class="w-full text-left">
                            {{ item.name }}
                        </button>
                    </li>
                </ul> -->
            </div>
            <div class="py-4">
                <div class="mb-2 flex justify-between items-center">
                    <span class="text-md font-semibold">Inbox</span>
                    <button> <img width="20" height="20"
                            src="https://img.icons8.com/fluency-systems-filled/50/create-new.png" alt="create-new"
                            @click="createConversation = true" /></button>
                    <!-- <button @click="createConversation = true" class="text-teal-600 hover:underline">New</button> -->
                </div>

                <div class="overflow-y-auto h-[calc(100vh-200px)]">
                    <!-- Create New Conversation Section -->
                    <div v-if="createConversation">
                        <div class="bg-orange-100 border-t p-3 mt-1 mb-2 rounded px-4 cursor-pointer hover:bg-blue-100">
                            <div class="flex justify-between">
                                <span v-if="!receiverId" class="font-medium truncate">New Message</span>
                                <span v-else class="font-medium truncate">New Message to {{ receiverName }}</span>
                                <img width="25" height="20" src="https://img.icons8.com/pastel-glyph/128/cancel--v1.png"
                                    alt="cancel--v1" @click="closeNewMessage(); createConversation = false" />
                            </div>
                        </div>
                    </div>

                    <!-- Conversations List -->
                    <!-- <div v-for="(conversation, index) in conversations" :key="conversation.chat_id"
                        @click="createConversation = false; selectConversation(conversation)"
                        class="border-t p-2 px-4 cursor-pointer hover:bg-gray-50"
                        :class="{ 'bg-gray-100': conversation.chat_id === selectedChat_id }"> -->
                    <!-- Changed from selectedConversation?.chat_id to selectedChat_id -->
                    <!-- <div class="flex justify-between">
                            <span class="font-medium truncate">{{ conversation.other_participant_name }}</span>
                            <span class="text-[12px] sm:hidden xl:flex">{{ formatTime(conversation.date) }}</span>
                        </div>
                        <p class="text-sm truncate">{{ conversation.message }}</p>
                    </div> -->
                    <div v-for="(conversation, index) in conversations" :key="conversation.chat_id"
                        @click="createConversation = false; selectConversation(conversation)"
                        class="border-t p-2 px-4 cursor-pointer hover:bg-gray-50"
                        :class="{ 'bg-gray-100': conversation.chat_id === selectedChat_id }">
                        <div class="flex justify-between">
                            <span class="font-medium truncate">{{ conversation.other_participant_name }}</span>
                            <span class="text-[12px] sm:hidden xl:flex">{{ formatTime(conversation.date) }}</span>
                        </div>
                        <p class="text-sm truncate">{{ conversation.message }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Chat Area -->
        <div v-if="!createConversation" class="w-[70%] flex flex-col border-r-2">
            <!-- Chat Header -->
            <div class="text-gray-600 bg-white p-4 flex gap-x-2 items-center">
                <span class="text-md font-semibold">{{ selectedConversation?.NameFrom }}</span>
                <!-- <span class="text-sm font-medium border rounded-xl px-2">badge</span> -->
            </div>

            <!-- Messages Display -->
            <div ref="messagesContainer" class="messages-container flex-1 overflow-y-auto px-4 bg-gray-50">
                <div v-for="(message, messageIndex) in sortedMessages" :key="messageIndex" class="message">
                    <!-- Outgoing Messages (Sent by Current User) -->
                    <div v-if="message.user_id == user_id" class="flex text-sm text-gray-600 p-3 justify-end">
                        <div class="text-sm text-gray-600 p-3">
                            <div class="text-right">
                                <span class="font-medium">You</span>
                                <span class="text-[10px] ml-2">{{ formatTime(message.date) }}</span>
                            </div>
                            <div class="mt-1 bg-teal-200 px-4 py-2 rounded-lg">
                                <p>{{ message.message }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Incoming Messages (Sent by Other Participant) -->
                    <div v-else class="flex justify-start mb-2">
                        <div class="text-sm text-gray-600 p-3">
                            <div class="text-left">
                                <span class="font-medium">{{ message.sender_name }}</span>
                                <span class="text-[10px] ml-2">{{ formatTime(message.date) }}</span>
                            </div>
                            <div class="mt-1 bg-amber-200 px-4 py-2 rounded-lg">
                                <p>{{ message.message }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Optional: Add a ref to the last message for alternative scrolling -->
                    <div v-if="messageIndex === sortedMessages.length - 1" ref="lastMessage"></div>
                </div>
            </div>

            <!-- Message Input Form -->
            <form @submit.prevent="sendMessage">
                <div class="mt-auto flex border items-center">
                    <div class="flex justify-start w-full">
                        <textarea v-model="newMessage" placeholder="Write a message..." @keydown="handleKeyDown"
                            class="w-full px-6 py-6 outline-none resize-none" />
                    </div>
                    <div class="flex px-6 gap-x-3 justify-end">
                        <PaperClipIcon class="h-7 w-7 text-gray-400" aria-hidden="true" />
                        <PaperAirplaneIcon @click.prevent="sendMessage" class="h-7 w-7 text-gray-400"
                            aria-hidden="true" />
                    </div>
                </div>
            </form>
        </div>

        <!-- New Conversation Area -->
        <div v-if="createConversation" class="w-[70%] flex flex-col border-r-2">
            <!-- New Conversation Header -->
            <div class="text-gray-600 bg-white p-4 gap-x-2 items-center flex">
                <span class="text-md font-semibold">
                    <div v-if="!receiverId" class="relative w-full">
                        <span>To: </span>
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input id="search" name="search" @input="handleInput(searchValue)" v-model="searchValue"
                            class="block w-full rounded-lg bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                            placeholder="Search" type="search" />
                        <!-- Search Results Dropdown -->
                        <ul v-if="searchResults.length > 0"
                            class="absolute bg-white border mt-1 w-full max-h-60 overflow-y-auto">
                            <li v-for="item in searchResults" :key="item.id" class="px-4 py-2 hover:bg-gray-100">
                                <button @click="handleItemClick(item.id, item.name)" class="w-full text-left">
                                    {{ item.name }}
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div v-else class="relative">
                        <span>To: {{ receiverName }}</span>
                    </div>
                </span>
            </div>

            <!-- New Conversation Messages (if any) -->
            <div class="flex-1 overflow-y-auto px-4 bg-gray-50">
                <!-- Implement if needed -->
            </div>

            <!-- New Conversation Message Input Form -->
            <form @submit.prevent="sendMessage">
                <div class="mt-auto flex border items-center">
                    <div class="flex justify-start w-full">
                        <textarea v-model="newMessage" placeholder="Write a message..." @keydown="handleKeyDown"
                            class="w-full px-6 py-6 outline-none resize-none" />
                    </div>
                    <div class="flex px-6 gap-x-3 justify-end">
                        <PaperClipIcon class="h-7 w-7 text-gray-400" aria-hidden="true" />
                        <PaperAirplaneIcon @click.prevent="sendMessage" class="h-7 w-7 text-gray-400"
                            aria-hidden="true" />
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
