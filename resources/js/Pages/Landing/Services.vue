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
                            class="mb-8 rounded-[20px] bg-white p-10 shadow-md hover:shadow-lg md:px-7 xl:px-10"
                        >
                            <div
                                class="bg-primary mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl"
                            >
                                <icon class="fill-white w-8 h-8" :name="service.icon" />
                            </div>
                            <h4 class="text-dark mb-3 text-xl font-semibold">
                                {{ service.name }}
                            </h4>
                            <p class="text-body-color">
                                {{ service.details }}
                            </p>
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
