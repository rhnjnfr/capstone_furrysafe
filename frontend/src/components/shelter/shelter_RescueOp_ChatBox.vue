<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import { MagnifyingGlassIcon, PaperAirplaneIcon, PaperClipIcon } from "@heroicons/vue/20/solid";
import axios from 'axios';

// Reactive user_id
const user_id = ref(localStorage.getItem('u_id'));

// Other reactive references
const selectedChat_id = ref(null);
const inboxs = ref([]);
const conversations = ref([]);
const createConversation = ref(false);
const searchValue = ref('');
const searchResults = ref([]);
const recieverId = ref(null);
const recieverName = ref('');

// Selected conversation
const selectedConversation = ref(null);

// New message input
const newMessage = ref('');

// Reference to the messages container
const messagesContainer = ref(null);

// Function to scroll to the bottom of the messages container
const scrollToBottom = async () => {
    await nextTick(); // Wait for DOM updates
    if (messagesContainer.value) {
        // Scroll the container itself, not the whole page
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
}

// Fetch all conversations
const fetchInbox = async () => {
    try {
        const response = await axios.post("http://localhost:5000/loadinbox", {
            id: user_id.value,
            // Optionally, include other parameters if needed
        });

        if (response.data) {
            conversations.value = response.data; // Assuming an array
            if (conversations.value.length > 0) {
                selectConversation(conversations.value[0]);
            }
        } else {
            console.log("No data received.");
        }
    } catch (err) {
        console.log("Err", err);
    }
};

// Select a conversation
const selectConversation = async (conversation) => {
    if (!conversation || !conversation.chat_id) {
        console.log("Invalid conversation selected.");
        return;
    }

    selectedChat_id.value = conversation.chat_id;
    console.log("Selected Chat ID:", selectedChat_id.value);

    try {
        // Fetch messages for the selected chat
        const response = await axios.post("http://localhost:5000/loadinbox", {
            id: user_id.value,
            chat_id: selectedChat_id.value
        });

        if (response.data) {
            selectedConversation.value = {
                NameFrom: conversation.other_participant_name,
                messages: response.data, // Array of messages
                timestamp: conversation.date
            };
            console.log("Selected Conversation:", selectedConversation.value);
            scrollToBottom(); // Scroll after messages are loaded
        } else {
            console.log("No messages found for this conversation.");
            selectedConversation.value = {
                NameFrom: conversation.other_participant_name,
                messages: [],
                timestamp: conversation.date
            };
        }
    } catch (err) {
        console.log("Error fetching messages:", err);
    }
};

// Send a message
const sendMessage = async () => {
    if (!newMessage.value.trim()) return;

    console.log(selectedChat_id.value, user_id.value, newMessage.value)
    // Ensure a chat ID is selected
    if (!selectedChat_id.value) {
        console.error("No chat selected.");
        return;
    }

    const tempurl = null

    const messageData = {
        chat_id: selectedChat_id.value,
        user_id: parseInt(user_id.value), // Ensure it's a number if needed
        message: newMessage.value,
        url: tempurl
    };

    try {
        // Send the message to your backend
        const response = await axios.post("http://localhost:5000/sendmessage", messageData);

        if (response.data.success) {
            // Update the local state with the new message
            selectedConversation.value.messages.push({
                ...messageData,

            });
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
const createNewMessage = () => {
    console.log("Creating a new conversation...");
    // Implement conversation creation logic here
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

// Debounce input
let timeout;
const handleInput = (value) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        fetchData(value);
    }, 500); // 500ms debounce
};

// Handle item selection from search
const handleItemClick = (itemId, name) => {
    recieverId.value = itemId;
    recieverName.value = name;
    console.log("Selected Receiver ID:", recieverId.value);
    // Optionally, close the search or navigate to the conversation
};

// Computed property for sorted messages
const sortedMessages = computed(() => {
    if (!selectedConversation.value || !selectedConversation.value.messages) {
        return [];
    }
    return [...selectedConversation.value.messages].sort((a, b) => new Date(a.date) - new Date(b.date));
});
function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
};

// Watch sortedMessages to scroll when new messages arrive
watch(sortedMessages, () => {
    scrollToBottom();
});

// Watchers
watch(searchValue, (newValue) => {
    handleInput(newValue);
});

// On mounted
onMounted(() => {
    fetchInbox();
});
</script>

<template>
    <div class="flex h-[76%] overflow-y-hidden">
        <!-- Conversations Sidebar -->
        <div class="w-[30%] border-r-2 text-gray-600 pr-6">
            <div class="py-4">
                <span class="text-xl font-bold">Chats</span>
            </div>
            <div class="relative">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input id="search" name="search" v-model="searchValue" @input="handleInput(searchValue)"
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
            <div class="py-4">
                <div class="mb-2 flex justify-between items-center">
                    <span class="text-md font-semibold">Inbox</span>
                    <button @click="createConversation = true" class="text-teal-600 hover:underline">New</button>
                </div>

                <div class="overflow-y-auto h-[calc(100vh-200px)]">
                    <!-- Create New Conversation Section -->
                    <div v-if="createConversation" @click.prevent="createNewMessage()">
                        <div class="bg-orange-100 border-t p-3 mt-1 mb-2 rounded px-4 cursor-pointer hover:bg-blue-100">
                            <div class="flex justify-between">
                                <span v-if="!recieverId" class="font-medium truncate">New Message :D</span>
                                <span v-else class="font-medium truncate">New Message to {{ recieverName }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Conversations List -->
                    <div v-for="(conversation, index) in conversations" :key="conversation.chat_id"
                        @click="createConversation = false; selectConversation(conversation)"
                        class="border-t p-2 px-4 cursor-pointer hover:bg-gray-50"
                        :class="{ 'bg-gray-100': conversation.chat_id === selectedConversation?.chat_id }">
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
                <span class="text-sm font-medium border rounded-xl px-2">badge</span>
            </div>


            <!-- Messages Display -->
            <div ref="messagesContainer" class="messages-container flex-1 overflow-y-auto px-4 bg-gray-50">
                <div v-for="(message, messageIndex) in sortedMessages" :key="messageIndex" class="message">
                    <!-- Outgoing Messages (Sent by Current User) -->
                    <div v-if="message.user_id == user_id" class="flex text-sm text-gray-600 p-3 justify-end">
                        <div class="text-sm text-gray-600 p-3">
                            <div class="text-right">
                                <span class="font-medium">You</span>
                                <span class="text-[10px] ml-2">{{ message.date }}</span>
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
                                <span class="text-[10px] ml-2">{{ message.date }}</span>
                            </div>
                            <div class="mt-1 bg-amber-200 px-4 py-2 rounded-lg">
                                <p>{{ message.message }}</p>
                            </div>
                        </div>
                    </div>
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
                    <div v-if="!recieverId" class="relative w-full">
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
                        <span>To: {{ recieverName }}</span>
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
                        <textarea v-model="newMessage" placeholder="Write a message..."
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
