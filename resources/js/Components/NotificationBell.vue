<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { usePage, router, Link } from '@inertiajs/vue3';
import { BellIcon, CheckCircleIcon, EllipsisVerticalIcon } from '@heroicons/vue/24/outline';
import Icon from "@/Shared/Icon.vue";
import axios from 'axios';

// Reactive state for local component
const showDropdown = ref(false);
const showOptionsMenu = ref(false);
const isBellShaking = ref(false); // For animation

const page = usePage();
const dropdownRef = ref(null);
const bellButtonRef = ref(null);

// Get initial data from Inertia
const notifications = ref(page.props.notifications || []);
const notificationCount = ref(page.props.notification_count || 0);

const handleCommentNotificationClick = (notification) => {
    const visitUrl = route('tickets.edit', notification.data.ticket_uid);
    const markAsReadUrl = route('notifications.ticket.read', notification.data.ticket_id);

    axios.post(markAsReadUrl).then(() => {
        // Manually update UI for all notifications of this ticket
        notifications.value.forEach(n => {
            if (n.data.ticket_id === notification.data.ticket_id) {
                if (!n.read_at) {
                    n.read_at = new Date().toISOString();
                    if (notificationCount.value > 0) {
                        notificationCount.value--;
                    }
                }
            }
        });
        router.visit(visitUrl);
    }).catch(error => {
        console.error('Failed to mark notification as read', error);
        router.visit(visitUrl); // Navigate even if it fails
    });
};

const markAsReadAndVisit = (notification) => {
    const markAsReadUrl = route('notifications.read', notification.id);
    const visitUrl = notification.data.url;

    axios.post(markAsReadUrl).then(() => {
        // Manually update UI
        const notificationIndex = notifications.value.findIndex(n => n.id === notification.id);
        if (notificationIndex !== -1 && !notifications.value[notificationIndex].read_at) {
            notifications.value[notificationIndex].read_at = new Date().toISOString();
            if (notificationCount.value > 0) {
                notificationCount.value--;
            }
        }
        if (visitUrl) {
            router.visit(visitUrl);
        }
    }).catch(error => {
        console.error('Failed to mark notification as read', error);
        if (visitUrl) {
            router.visit(visitUrl); // Navigate even if it fails
        }
    });
};

const markAllAsRead = () => {
    router.post(route('notifications.markAllAsRead'), {}, {
        preserveScroll: true,
        onSuccess: () => {
            // Manually update frontend state to reflect change immediately
            notifications.value.forEach(n => n.read_at = new Date().toISOString());
            notificationCount.value = 0;
            showOptionsMenu.value = false;
            showDropdown.value = false;
        }
    })
}

onMounted(() => {
    document.addEventListener('click', onClickOutside);
    if (window.Echo && page.props.auth.user) {
        window.Echo.private(`App.Models.User.${page.props.auth.user.id}`)
            .notification((notification) => {
                // Manually add id and data wrapper to match structure of database notifications
                const newNotification = {
                    id: notification.id,
                    data: { ...notification },
                    read_at: null,
                    type: notification.type,
                };
                notifications.value.unshift(newNotification);
                notificationCount.value++;

                // Trigger bell animation
                isBellShaking.value = true;
                setTimeout(() => {
                    isBellShaking.value = false;
                }, 700); // Duration should match animation duration
            });
    }
});

onUnmounted(() => {
    document.removeEventListener('click', onClickOutside);
});

const onClickOutside = (event) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target) && bellButtonRef.value && !bellButtonRef.value.contains(event.target)) {
        showDropdown.value = false;
        showOptionsMenu.value = false;
    }
};
</script>

<template>
    <div class="relative flex">
        <button @click="showDropdown = !showDropdown" type="button" ref="bellButtonRef" class="relative rounded-full text-gray-600 hover:text-black focus:outline-none">
            <span class="sr-only">View notifications</span>
            <Icon name="notification" class="h-7 w-7" :class="{ 'animate-bell-shake': isBellShaking }" aria-hidden="true" />
            <span v-if="notificationCount > 0" class="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">{{ notificationCount }}</span>
        </button>

        <!-- Dropdown -->
        <div v-if="showDropdown" ref="dropdownRef" class="absolute right-0 z-10 top-7 w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div class="flex justify-between items-center px-4 py-2 text-sm text-gray-700 font-bold border-b">
                <span>Notifications</span>
                <!-- 3-Dot Options Menu -->
                <div class="relative">
                    <button @click.stop="showOptionsMenu = !showOptionsMenu" class="p-1 rounded-full hover:bg-gray-200">
                        <EllipsisVerticalIcon class="h-5 w-5" />
                    </button>
                    <div v-if="showOptionsMenu" @click.away="showOptionsMenu = false" class="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                        <a @click.prevent="markAllAsRead" href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Mark all as read</a>
                        <Link :href="route('notifications.index')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">All Notifications</Link>
                    </div>
                </div>
            </div>
            <div v-if="notifications.length > 0" class="max-h-96 overflow-y-auto">
                <div v-for="notification in notifications" :key="notification.id">
                    <div v-if="notification.type && notification.type.includes('NewCommentNotification')">
                        <a @click.prevent="handleCommentNotificationClick(notification)" :href="route('tickets.edit', notification.data.ticket_uid)" class="block px-4 py-3 text-sm text-gray-600 border-b" :class="{'font-semibold': !notification.read_at, 'bg-gray-200': !notification.read_at, 'hover:bg-gray-200': !notification.read_at, 'hover:bg-gray-50': notification.read_at}">
                            <p class="text-gray-800">New comment on: "{{ notification.data.ticket_subject }}"</p>
                            <p class="text-xs text-gray-400 mt-1">#{{ notification.data.ticket_uid }} by {{ notification.data.commenter_name }}</p>
                        </a>
                    </div>
                    <div v-else>
                         <a @click.prevent="markAsReadAndVisit(notification)" href="#" class="block px-4 py-3 text-sm text-gray-600 border-b" :class="{'font-semibold': !notification.read_at, 'bg-gray-200': !notification.read_at, 'hover:bg-gray-200': !notification.read_at, 'hover:bg-gray-50': notification.read_at}">
                            <p class="text-gray-800">{{ notification.data.message || 'You have a new notification.' }}</p>
                            <p v-if="notification.data.ticket_subject" class="text-xs text-gray-400 mt-1">{{ $t('Ticket') }}: {{ notification.data.ticket_subject }}</p>
                        </a>
                    </div>
                </div>
            </div>
            <div v-else class="px-4 py-5 text-center">
                <CheckCircleIcon class="h-8 w-8 text-green-400 mx-auto mb-2" />
                <p class="text-sm text-gray-500">You're all caught up!</p>
            </div>
        </div>
    </div>
</template>