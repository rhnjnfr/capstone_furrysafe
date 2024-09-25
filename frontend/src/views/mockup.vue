<script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';

    const role = ref([])
    const selectedRole = ref('');

    // Reactive variables
    const logo = require('@/assets/images/frrysfLOGO.png');
    const formDataInstance = new FormData(); // Renamed variable
    const userdetails = ref({
        username: 'username',
    });

    // Function to fetch admin data
    async function getAdmin() {
        try {
            // console.log("function")
            const response = await axios.get("http://localhost:5000/get-position");
            // console.log("response", response)
            role.value = response.data
            console.log("Role data:", role.value); 
            console.log(role.value)
        } catch (err) {
            console.log("error", err);
        }
    }

    async function registerAdmin() {
        try {
            const lname = document.getElementById("lastname").value
            const fname = document.getElementById("firstname").value
            const uname = document.getElementById("username").value
            const email = document.getElementById("email").value
            const pass  = document.getElementById("password").value
            
            console.log("selected role", selectedRole.value)
        } catch (err) {
            console.log("error", err);
        }
    }

    onMounted(() => {
        getAdmin()
    });
</script>

<template>
    <div class="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="mx-auto h-10 w-auto" :src="logo" alt="Your Company" />
            <h2 class="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-700">
                Admin
            </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" action="#" method="POST">
                <div>
                    <label for="firstname" class="block text-sm font-medium leading-6 text-gray-900">First Name</label>
                    <div class="mt-2">
                        <input id="firstname" name="firstname" type="text" autocomplete="firstname" placeholder="First Name"
                            class="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <label for="lastname" class="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
                    <div class="mt-2">
                        <input id="lastname" name="lastname" type="text" autocomplete="lastname" placeholder="Last Name"
                            class="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6" />
                    </div>
                <div>
                    <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
                    <div class="mt-2">
                        <input id="username" name="username" type="text" autocomplete="username" placeholder="Username"
                            class="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div class="mt-2">
                        <input id="email" name="email" type="email" autocomplete="email" placeholder="Email Address"
                            class="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
                

                <div>
                    <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <div class="mt-2">
                        <input id="password" name="password" type="password" autocomplete="current-password"  placeholder="Password"
                            class="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div>
                    <label for="position" class="block text-sm font-medium leading-6 text-gray-900">Role</label>
                    <select v-model="selectedRole" class="mt-2 block w-full px-[1rem] text-sm py-2 border border-gray-300 rounded-md text-gray-700">
                        <option value="" selected disabled hidden>Please Select a Position</option>
                        <option v-for="(item, index) in role" :key="index" :value="item.id">{{ item.position }}</option>
                    </select>
                </div>


                <div>
                    <button type="submit" v-on:click.prevent="registerAdmin()"
                        class="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white 
                        shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600">
                        Register</button>
                </div>
            </form>
        </div>
    </div>
</template>


<!-- <script setup>
    import { ref } from 'vue';
    import axios from 'axios';

    // Reactive variables
    const logo = require('@/assets/images/frrysfLOGO.png');
    const FormData = new FormData();
    const userdetails = ref({
        username: 'username',
    });

    // Function to fetch admin data
    async function getAdmin() {
        try {
            const response = await axios.get("http://localhost:5000/get-position");
            category.value = response.data; // Ensure `category` is defined
        } catch (err) {
            console.log("error", err);
        }
    }

    // Call the function if needed
    // getAdmin();
</script>

<template>
    <div class="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="mx-auto h-10 w-auto" :src="logo" alt="Your Company" />
            <h2 class="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-700">
                Admin
            </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" action="#" method="POST">
                <div>
                    <label for="usernname" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
                    <div class="mt-2">
                        <input id="usernname" name="usernname" type="eusernnamemail" autocomplete="usernname"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div class="mt-2">
                        <input id="email" name="email" type="email" autocomplete="email"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div>
                    <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <div class="mt-2">
                        <input id="password" name="password" type="password" autocomplete="current-password"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div>
                    <label for="position" class="block text-sm font-medium leading-6 text-gray-900">Role</label>
                    <select id="position" class="mt-2 block w-full px-[1rem] text-sm py-2 border rounded-md text-gray-700">
                        <option value="" disabled selected hidden>Please Select a position</option>
                        <option value="buddy">Buddy</option>
                        <option value="shelter">Shelter</option>
                    </select>
                </div>

                <div>
                    <button type="submit"
                        class="flex w-full justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white 
                        shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600">
                        Register</button>
                </div>
            </form>
        </div>
    </div>
</template> -->
