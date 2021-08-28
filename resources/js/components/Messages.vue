<template>
    <div>
        <TransitionGroup>
            <Transition name="fade" mode="out-in">
                <div>
                    <SpinnerBar text="Loading..." class="flex flex-col justify-center items-center" v-if="loading && !messages.length"/>
                    <ul>
                        <li v-for="(message, index) in messages" :key="message.id" :class="['flex', 'py-3', 'space-x-2', index < messages.length - 1 ? 'border-b' : 'border-none']">
                            <div>
                                <img v-if="message.user.avatar" :src="message.user.avatar" class="w-10 h-10 rounded-full" alt=""/>
                                <AvatarIcon class="w-10 h-10 text-gray-400 rounded-full" v-else/>
                            </div>
                            <div>
                                <div class="flex space-x-2">
                                    <span class="font-bold">{{ message.user.name }}</span>
                                    <span class="text-gray-400">{{ message.createdAt }}</span>
                                </div>
                                <div class="text-gray-600">{{ message.body }}</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </Transition>
            <Transition name="fade">
                <FlashMessage :error="error" v-if="error" key="error" @closed="error = null;"/>
            </Transition>
            <Transition name="fade">
                <BasePagination :meta="meta" :links="links" action="message/paginateMessages" v-if="meta && meta.last_page > 1"/>
            </Transition>
        </TransitionGroup>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import FlashMessage from "@/components/utils/FlashMessage";
import BasePagination from "@/components/utils/BasePagination";
import AvatarIcon from "@/components/icons/AvatarIcon";
import SpinnerBar from "@/components/utils/SpinnerBar";

export default {
    name: "Messages",
    components: {SpinnerBar, FlashMessage, BasePagination, AvatarIcon},
    computed: {
        ...mapGetters("message", ["loading", "error", "messages", "meta", "links"]),
    },
    created() {
        const currentPage = 1;
        this.$store.dispatch("message/getMessages", currentPage);
    },
};
</script>
