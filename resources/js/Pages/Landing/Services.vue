<template>
    <div>
        <Head title="Services" />
        <!-- Start Hero -->


        <!-- ====== Services Section Start -->
        <section class="pt-20 pb-12 lg:pt-[120px] lg:pb-[90px]">
            <div class="container mx-auto">
                <div class="-mx-4 flex flex-wrap">

                    <!-- New Code -->
                    <div v-for="service in page.services" class="w-full px-4 md:w-1/2 lg:w-1/3">
                        <div
                            class="mb-8 rounded-[20px] bg-white p-10 shadow-md hover:shadow-lg md:px-7 xl:px-10 min-h-[270px]"
                        >
                            <div
                                class="bg-primary mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl"
                            >
                                <icon class="fill-white w-8 h-8" :name="service.icon" />
                            </div>
                            <h4 class="text-dark mb-3 text-xl font-semibold">
                                {{ service.name }}
                            </h4>
                            <a
                                v-if="service.details"
                                :href="service.details"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-medium text-white hover:bg-opacity-90 transition duration-300"
                            >
                                View Details
                                <svg
                                    class="ml-2 w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                    <!-- New Code -->
                </div>
            </div>
        </section>
        <!-- ====== Services Section End -->

    </div>
</template>
<script>
import Layout from '@/Shared/Layout.vue'
import Icon from '@/Shared/Icon.vue'
import { Head } from '@inertiajs/vue3'
import sanitizeHtml from "sanitize-html";
export default {
    layout: Layout,
    components: {
        Icon,
        Head,
    },
    props: {
        data: Object,
    },
    data() {
        return {
            page: JSON.parse(this.data.html),
            form: this.$inertia.form({
                name: '',
                email: '',
                phone: '',
                message: '',
            }),
        }
    },
    methods:{
        sanitizeHtml : sanitizeHtml,
        store() {
            this.form.post(this.route('contact.send'),{
                onSuccess: () => {
                    this.form.reset()
                },
            })
        },
    },
}
</script>
