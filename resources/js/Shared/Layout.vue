<template>
  <div class="layout-app" :class="current_mode" :dir="$page.props.dir">
      <div id="dropdown" />
    <div class="md:flex md:flex-col">
      <div class="md:h-screen md:flex md:flex-col">
        <div class="md:flex md:shrink-0 ">
          <div class="md:shrink-0 md:py-2 md:w-60 flex items-center justify-between md:justify-center sidebar-left-top">
              <Link class="mt-1" href="/">
                  <logo class="help-desk-logo" />
              </Link>
              <dropdown class=" md:hidden" className="small-menu" placement="bottom-end">
                  <template #default>
                      <svg class="w-6 h-6 mobile-menu-selector" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                  </template>
                  <template #dropdown>
                      <div class="mt-2 px-8 py-4 bg-hd-sidebar rounded shadow-lg">
                          <main-menu :auth="auth" />
                      </div>
                  </template>
              </dropdown>
          </div>
          <div class="bg-white w-full p-4 md:py-2 md:pr-12 md:pl-8 text-sm flex justify-first items-center top_bar">
              <div class="placement-top-left">
                  <div class="mt-1 welcome_text">{{ $t(generateGreetings()) }} <span>{{ $page.props.auth.user.first_name }}!</span></div>
                  <div class="display-time">
                      <span class="time">{{ time }} </span>
                  </div>
              </div>

              <div class="placement-top-right flex items-center gap-4 pr-2">
                  <NotificationBell />
                  <dropdown class="rtl:ml-2 language_menu_wrapper" placement="bottom-end">
                      <template #default>
                          <div
                              class="flex items-center gap-1 rounded transition cursor-pointer"
                              aria-label="Language"
                              title="Change Language"
                          >
                              <icon class="w-7 h-7" :name="selected_language.code" />
                              <icon class="w-5 h-5 drop-down-caret-icon" name="cheveron-down" />
                          </div>
                      </template>
                      <template #dropdown>
                      <div class=" py-0 shadow-xl rounded text-sm language_menu_list">
                          <div v-for="language in languages_except_selected" :key="language.code" class="flex gap-2 cursor-pointer px-3 py-2 hover:bg-indigo-500 hover:text-white" @click="updateLanguage(language.code)">
                              <icon class="w-5 h-5" :name="language.code" /> <span class="lang_name rtl:mr-[6px]">{{ language.name }}</span>
                          </div>
                      </div>
                      </template>
                  </dropdown>
                  <dropdown class="select_user" placement="bottom-end">
                      <template #default>
                          <div class="flex items-center cursor-pointer group">
                              <div class=" mr-1 whitespace-nowrap">
                                  <img v-if="$page.props.auth.user.photo" class="user_photo" :alt="$page.props.auth.user.first_name" :src="$page.props.auth.user.photo" />
                                  <img v-else src="/images/svg/profile.svg" class="w-5 h-5" alt="user profile" />
                              </div>
                              <icon class="w-5 h-5 drop-down-caret-icon" name="cheveron-down" />
                          </div>
                      </template>
                      <template #dropdown>
                          <div class="shadow-xl bg-white rounded text-sm">
                              <div class="flex px-4 flex-col py-3">
                                  <div class="uppercase mb-2 font-bold">Account</div>
                                  <div class="flex gap-1 items-center">
                                      <div class="flex">
                                          <img
                                              v-if="$page.props.auth.user.photo"
                                              class="user_photo w-10 h-10"
                                              :alt="$page.props.auth.user.first_name"
                                              :src="$page.props.auth.user.photo"
                                          />
                                          <img
                                              v-else
                                              src="/images/svg/profile.svg"
                                              class="w-10 h-10"
                                              alt="user profile"
                                          />
                                      </div>
                                      <div class="flex flex-col gap-[1px]">
                                          <span>{{ $page.props.auth.user.first_name + ' ' + $page.props.auth.user.last_name }}</span>
                                          <small>{{ $page.props.auth.user.email }}</small>
                                      </div>
                                  </div>
                              </div>
                              <Link
                                  class="flex px-6 py-2 items-center hover:bg-indigo-500 hover:text-white hover:fill-white"
                                  :href="route('users.edit.profile')"
                              >
                                  <icon class="w-4 h-4 mr-2" name="user_edit" />
                                  {{ $t('Edit Profile') }}
                              </Link>
                              <Link
                                  class="flex items-center px-6 py-2 hover:bg-indigo-500 hover:text-white hover:fill-white w-full"
                                  :href="route('logout')"
                                  method="delete"
                                  as="button"
                              >
                                  <icon class="w-4 h-4 mr-2" name="logout" />
                                  {{ $t('Logout') }}
                              </Link>
                          </div>
                      </template>
                  </dropdown>
              </div>
          </div>
        </div>
        <div class="md:flex md:flex-grow md:overflow-hidden">
          <main-menu class="hidden md:block sidebar shrink-0 md:w-60 overflow-y-auto" />
          <div class="md:flex-1 md:overflow-y-auto" scroll-region>
              <div class="container-head">
                  <div class="ch-left">
                      <h1 class="page-title">{{ $t(title || '') }}</h1>
                      <div class="breadcrumb text-sm">
                          <Link :href="route('dashboard')"><icon class="w-3 h-3" name="home" /></Link>
                          <span class="b-item">/</span>
                          <Link v-if="edit_route" :href="route(edit_route)" class="capitalize">{{ edit_route }}</Link>
                          <span v-if="edit_route" class="b-item">/</span>
                          <span class="b-item">{{ $t(title || '') }}</span>
                      </div>
                      <!-- Browser Navigation Buttons -->
                      <div class="browser-navigation">
                          <button
                              type="button"
                              class="nav-btn back-btn"
                              :disabled="!canGoBack"
                              @click="goBack"
                              title="Go back"
                          >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                              </svg>
                              <span>Back</span>
                          </button>
                          <button
                              type="button"
                              class="nav-btn forward-btn"
                              :disabled="!canGoForward"
                              @click="goForward"
                              title="Go forward"
                          >
                              <span>Forward</span>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                              </svg>
                          </button>
                      </div>
                  </div>
                  <div class="ch-right cursor-pointer">
                      <button class="theme-toggle" id="theme-toggle" title="Toggles light & dark" :aria-label="current_mode" aria-live="polite" @click="switchMode">
                          <svg class="sun-and-moon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
                              <mask class="moon" id="moon-mask">
                                  <rect x="0" y="0" width="100%" height="100%" fill="white" />
                                  <circle cx="24" cy="10" r="6" fill="black" />
                              </mask>
                              <circle class="sun" cx="12" cy="12" r="6" mask="url(#moon-mask)" fill="currentColor" />
                              <g class="sun-beams" stroke="currentColor">
                                  <line x1="12" y1="1" x2="12" y2="3" />
                                  <line x1="12" y1="21" x2="12" y2="23" />
                                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                                  <line x1="1" y1="12" x2="3" y2="12" />
                                  <line x1="21" y1="12" x2="23" y2="12" />
                                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                              </g>
                          </svg>
                      </button>
                  </div>
              </div>
            <flash-messages />
              <div class="sec-cont">
                  <slot />
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/Shared/Icon.vue'
import Logo from '@/Shared/Logo.vue'
import Dropdown from '@/Shared/Dropdown.vue'
import MainMenu from '@/Shared/MainMenu.vue'
import FlashMessages from '@/Shared/FlashMessages.vue'
import {Link, usePage, router} from '@inertiajs/vue3'
import moment from 'moment'
import { loadLanguageAsync, getActiveLanguage } from 'laravel-vue-i18n';
import axios from 'axios'
import {computed} from "vue";
import NotificationBell from '@/Components/NotificationBell.vue';

export default {
    components: {
        NotificationBell,
        Dropdown,
        FlashMessages,
        Icon,
        Logo,
        Link,
        MainMenu,
    },
    props: {
        title: String,
    },
    data() {
        return{
            time: '',
            current_mode: 'light',
            modes: ['dark', 'light'],
            edit_route: '',
            locale: this.$page.props.auth.user.locale || this.$page.props.settings.default_language,
            navigationHistory: [],
            currentIndex: 0,
        }
    },
    computed: {
        selected_language() {
            return this.$page.props.languages.find(language => language.code === this.$page.props.locale)
        },
        languages_except_selected(){
            return this.$page.props.languages.filter(language => language.code !== this.$page.props.locale)
        },
        canGoBack() {
            return this.currentIndex > 0;
        },
        canGoForward() {
            return this.currentIndex < this.navigationHistory.length - 1;
        }
    },
    setup() {
        const page = usePage();
        const license_invalid = computed(() => page.props.license_invalid);

        return {
            license_invalid
        };
    },
    methods:{
        updateLanguage(code){
            axios.post(this.route('language', code), {}).then((response) => {
                if(response.data){
                    window.location.reload();
                }
            })
        },
        generateGreetings(){
            const currentHour = this.moment().format('HH')
            if (currentHour >= 3 && currentHour < 12){
                return 'Good Morning'
            } else if (currentHour >= 12 && currentHour < 15){
                return 'Good Noon'
            }else if (currentHour >= 15 && currentHour < 18){
                return 'Good Afternoon'
            }   else if (currentHour >= 18 && currentHour < 20){
                return 'Good Evening'
            } else {
                return 'Hello'
            }
        },
        switchMode(){
            this.current_mode = this.current_mode === 'light' ? 'dark' : 'light'
            localStorage.setItem('current_mode', this.current_mode)
        },
        detectCurrentUrl(){
            const url = this.$page.url;
            const splitUrl = url.split('/');
            let editString = ['edit', 'create'].includes(url.substring(url.lastIndexOf("/") + 1));
            if(!editString){
                editString = splitUrl[splitUrl.length - 2] === 'tickets';
            }
            let editRoute = url.split('/')[2]
            if(['settings','front_pages'].includes(editRoute)){
                editRoute = url.split('/')[3];
            }
            this.edit_route = editString? editRoute : '';
        },
        // Browser Navigation Methods
        initNavigationHistory() {
            try {
                const history = sessionStorage.getItem('inertia_nav_history');
                const index = sessionStorage.getItem('inertia_nav_index');

                this.navigationHistory = history ? JSON.parse(history) : [];
                this.currentIndex = index ? parseInt(index, 10) : 0;

                // Ensure valid array
                if (!Array.isArray(this.navigationHistory)) {
                    this.navigationHistory = [];
                }

                // Add current URL if history is empty or different
                const currentUrl = window.location.href;
                const expectedUrl = this.navigationHistory[this.currentIndex];

                if (expectedUrl !== currentUrl) {
                    this.addToHistory(currentUrl);
                }
            } catch (e) {
                this.navigationHistory = [window.location.href];
                this.currentIndex = 0;
            }
        },
        addToHistory(url) {
            // Remove any forward history when navigating to a new page
            this.navigationHistory = this.navigationHistory.slice(0, this.currentIndex + 1);

            // Add new URL, but avoid consecutive duplicates
            if (this.navigationHistory[this.navigationHistory.length - 1] !== url) {
                this.navigationHistory.push(url);
            }

            this.currentIndex = this.navigationHistory.length - 1;

            // Limit history size
            if (this.navigationHistory.length > 100) {
                this.navigationHistory.shift();
                this.currentIndex--;
            }

            this.saveNavigationState();
        },
        saveNavigationState() {
            try {
                sessionStorage.setItem('inertia_nav_history', JSON.stringify(this.navigationHistory));
                sessionStorage.setItem('inertia_nav_index', this.currentIndex.toString());
            } catch (e) {
                console.warn('Could not save navigation state');
            }
        },
        goBack() {
            if (this.canGoBack) {
                this.currentIndex--;
                const previousUrl = this.navigationHistory[this.currentIndex];
                this.saveNavigationState();
                window.location.href = previousUrl;
            }
        },
        goForward() {
            if (this.canGoForward) {
                this.currentIndex++;
                const nextUrl = this.navigationHistory[this.currentIndex];
                this.saveNavigationState();
                window.location.href = nextUrl;
            }
        },
    },
    watch: {
        '$page.url': {
            handler(newUrl) {
                const fullUrl = window.location.href;
                const expectedUrl = this.navigationHistory[this.currentIndex];

                // Only add to history if it's a new navigation (not back/forward)
                if (expectedUrl !== fullUrl) {
                    this.addToHistory(fullUrl);
                }
            },
            immediate: false
        }
    },
    updated() {
        this.detectCurrentUrl()
    },
    created() {
        this.moment = moment;
        let vm = this
        if(localStorage.getItem('current_mode')){
            this.current_mode = localStorage.getItem('current_mode')
        }
        vm.time = vm.moment().format('MMMM Do YYYY, h:mm A')
        window.setInterval(function () {
            vm.time = vm.moment().format('MMMM Do YYYY, h:mm A')
        }, 1000)
        this.detectCurrentUrl()

        if(getActiveLanguage() !== this.locale){
            loadLanguageAsync(this.locale)
        }

        if (this.$page.props.auth.user) {
            this.sessionTimeout = setTimeout(() => {
                this.$inertia.reload();
            }, (this.$page.props.settings.session_lifetime * 60 * 1000));
        }

        // Initialize browser navigation
        this.initNavigationHistory();
    },
    beforeUnmount() {
        clearTimeout(this.sessionTimeout);
    },
}
</script>

<style scoped>
/* Browser Navigation Styles */
.browser-navigation {
    display: flex;
    gap: 8px;
    margin-top: 12px;
}

.nav-btn {
    min-width: 32px;
    height: 32px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    background: white;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 14px;
    color: #495057;
    padding: 0 12px;
    gap: 6px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.nav-btn:hover:not(:disabled) {
    background-color: rgba(0, 123, 255, 0.1);
    color: #007bff;
    border-color: #007bff;
}

.nav-btn:active:not(:disabled) {
    background-color: rgba(0, 123, 255, 0.2);
    transform: scale(0.95);
}

.nav-btn:disabled {
    color: #adb5bd;
    cursor: not-allowed;
    opacity: 0.5;
    background-color: #f8f9fa;
}

.nav-btn:disabled:hover {
    background-color: #f8f9fa;
    border-color: rgba(0, 0, 0, 0.1);
}

.nav-btn svg {
    width: 16px;
    height: 16px;
}

.back-btn {
    color: #dc3545;
    border-color: #dc3545;
}

.back-btn:hover:not(:disabled) {
    background-color: rgba(220, 53, 69, 0.1);
    color: #dc3545;
    border-color: #dc3545;
}

.forward-btn {
    color: #28a745;
    border-color: #28a745;
}

.forward-btn:hover:not(:disabled) {
    background-color: rgba(40, 167, 69, 0.1);
    color: #28a745;
    border-color: #28a745;
}

/* Dark mode support */
.dark .nav-btn {
    background: #2d3748;
    color: #e2e8f0;
    border-color: #4a5568;
}

.dark .nav-btn:hover:not(:disabled) {
    background-color: #4a5568;
}

.dark .nav-btn:disabled {
    background-color: #1a202c;
    color: #718096;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .browser-navigation {
        gap: 6px;
    }

    .nav-btn {
        padding: 0 8px;
        font-size: 13px;
        min-width: 28px;
        height: 28px;
    }

    .nav-btn svg {
        width: 14px;
        height: 14px;
    }
}
</style>
