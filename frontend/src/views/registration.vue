<template>
    <div class="w-full h-screen flex items-center justify-center">
        <div class="border w-screen md:flex md:items-center">
            <div class="w-screen sm:p-[2rem] md:p-[3rem] lg:p-[4rem] xl:p-[7rem]">
                <form action="">
                    <div class="mb-20 sm:text-[10.9px] md:text-[13px] lg:text-[15px]">
                      <router-link to="/" class="flex items-center">
                            <img :src="back" alt="back icon" class="lg:w-[1rem] sm:w-[10px] md:w-[12px]">
                            <span class="text-gray-700 sm:pl-[10px]">Back</span>
                      </router-link>
                      <!-- TESTING NI GAIS :DDDDDDDDDDDDDDDDD-->
                       <router-link to="/shelter-registration">
                            register as shelter
                       </router-link>
                    </div>
                    <div class="grid xl:grid-flow-col xl:space-x-4">
                        <div class="field grid sm:text-[10px] sm:pt-5 sm:space-y-2 md:text-[12px] md:space-y-3 lg:text-[15px]">
                            <label for="fname">First Name </label>
                            <input type="text" id="fname" placeholder="Firstname"
                              class="border rounded-lg py-2 px-5">
                        </div>
                        <!-- <div class="field grid sm:text-[10px] sm:pt-5 sm:space-y-2 md:text-[12px] md:space-y-3 lg:text-[15px]">
                            <label for="mname">Middle Name </label>
                            <input type="text" id="mname" placeholder="Middlename"
                              class="border rounded-lg py-2 px-5">
                        </div> -->
                        <div class="field grid sm:text-[10px] sm:pt-5 sm:space-y-2 md:text-[12px] md:space-y-3 lg:text-[15px]">
                            <label for="lname">Last Name </label>
                            <input type="text" id="lname" placeholder="Lastname"
                              class="border rounded-lg py-2 px-5">
                        </div>
                    </div>
                    <div class="field grid sm:text-[10px] sm:pt-5 sm:space-y-2 md:text-[12px] md:space-y-3 lg:text-[15px]">
                        <label for="username">Username </label>
                        <input type="text" id="username" placeholder="Username"
                          class="border rounded-lg py-2 px-5">
                    </div>
                    <div class="field grid sm:text-[10px] sm:pt-5 sm:space-y-2 md:text-[12px] md:space-y-3 lg:text-[15px]">
                        <label for="email">Email </label>
                        <input type="text" id="email" placeholder="Email"
                          class="border rounded-lg py-2 px-5">
                    </div>
                    <div class="field grid sm:text-[10px] sm:pt-5 sm:space-y-2 md:text-[12px] md:space-y-3 lg:text-[15px]">
                        <passwordunhide />
                    </div>
                    <div class="grid mt-[1rem] grid-cols-2">
                        <div class="field w-fit grid sm:grid-flow-row xl:grid-flow-col items-center">
                            <label for="bdate" class="pr-[1rem] sm:text-[12px] md:text-[12px] lg:text-[15px]">Birthdate</label>
                            <input type="date" id="bdate" class="border rounded-lg p-2 sm:text-[12px] md:text-[12px] lg:text-[15px]">
                        </div>
                        <div class="field flex items-center justify-end sm:grid sm:grid-flow-row xl:grid-flow-col">
                            <label for="gender" class="pr-3 sm:text-[12px] md:text-[12px] lg:text-[15px]">Gender</label>
                            <Dropdown v-model="gender" />
                        </div>
                    </div>
                    <div class="flex justify-center mt-[3rem]">
                        <button @click.prevent="handleSignup()"
                          class="px-6 bg-slate-900 rounded-lg p-2 text-white w-full sm:text-[10px] md:text-[12px] lg:text-[15px]">
                          Signup
                        </button>
                    </div>
                </form>
            </div>
            <div class="flex bg-sky-50 pt-[3rem] px-[3rem] sm:hidden md:hidden lg:pl-[3rem] md:pt-[5rem] lg:block lg:pt-[8rem] xl:pl-[7rem]">
                <img :src="dog" alt="animalshelterdog" class="lg:w-[1950px] xl:w-[1550px]">
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Dropdown from "../components/dropdown.vue";
import passwordunhide from "../components/password.vue";

export default {
    components: { 
        Dropdown,
        passwordunhide 
    },
    data() {
        return {
        //icons or images
        dog: require('@/assets/images/animalshelterdog.png'),
        back: require('@/assets/images/Back.png'),
        gender: "",
        //registration 
        userdetails: {
            firstname: '', 
            lastname: '', 
            username: '', 
            dob: '',
            gender: '',
            email: '',
            password: '',
        },
        reg_type: 'buddy',
        items: [],
        }  
    },
    methods: {
        navigateTo(path) {
            this.$router.push(path);
        },
        //sign up
        async handleSignup(){   
            try{
                //retrieves user input
                this.userdetails = {
                    email: document.getElementById('email').value,
                    password:  document.getElementById('password').value,
                    firstname: document.getElementById('fname').value,
                    lastname: document.getElementById('lname').value,
                    username: document.getElementById('username').value,
                    gender: document.getElementById('gender').value,
                    dob: document.getElementById('bdate').value
                }

                //checks if some fields are empty 
                if (!this.userdetails.firstname || !this.userdetails.lastname || !this.userdetails.email || !this.userdetails.password) {
                    console.log("Some required fields are empty."); //should have a user interface feedback 
                    return; 
                }
                if(!this.userdetails.gender){
                    this.userdetails.gender = 'unspecified'
                }

                console.log(this.userdetails.gender)

                //console.log(this.userdetails)
                await this.setUser();
            }
            catch(err){
                console.log("error", err)
            }
        },
        //create user
        async setUser(){
            try{
                const response = await axios.post("http://localhost:5000/buddy-registration", 
                {
                    // email: this.email,
                    // password: this.password,
                    regtype: this.reg_type,
                    //details 
                    user: this.userdetails
                })
                this.items = response.data
                console.log("response: ", response.data); 
                if (response.data.success) {
                    this.navigateTo('/');
                } else {
                    // Handle login failure
                    //dapat naa ni ui change pag invalid ang credentials 
                    console.log("ERRORRRRRRRRRRRRRRRRRRRRRR");
                }
            }
            catch(err){
                console.log("An ERROR occured: " + err);
            }
        }
    },
}
</script>