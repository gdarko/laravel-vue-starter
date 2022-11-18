<template>
    <div v-if="alertStore.hasAlert()">
        <div v-if="alertStore" :class="wrapperClass" role="alert">
            <template v-if="alertStore.isError()">
                <template v-if="alertStore.hasMultiple()">
                    <strong class="font-bold mr-2">{{ trans('global.phrases.argh') }}</strong>
                    <span class="block sm:inline">{{ trans('global.phrases.fix_errors') }}</span>
                    <ul class="mt-2 list-disc pl-5" key="error-list">
                        <li v-for="key in errorKeys" :key="key">
                            {{ getMessageError(key) }}
                        </li>
                    </ul>
                    <span class="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer" @click="removeMessage">
                    <Icon name="times"/>
                </span>
                </template>
                <template v-else>
                    <strong class="font-bold mr-2">{{ trans('global.phrases.argh') }}</strong>
                    <span class="block sm:inline">{{ Array.isArray(alertStore.messages[0]) ? alertStore.messages[0][0] : alertStore.messages[0] }}</span>
                    <span class="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer" @click="removeMessage">
                        <Icon name="times"/>
                    </span>
                </template>
            </template>
            <template v-else>
                <strong class="font-bold mr-2">{{ trans('global.phrases.success') }}</strong>
                <span class="block sm:inline">{{ Array.isArray(alertStore.messages[0]) ? alertStore.messages[0][0] : alertStore.messages[0] }}</span>
                <span class="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer" @click="removeMessage">
                <Icon name="times"/>
            </span>
            </template>
        </div>
    </div>
</template>

<script>

import {computed, defineComponent, ref} from "vue";
import {trans} from "@/helpers/i18n";
import Icon from "@/views/components/icons/Icon";
import {useAlertStore} from "@/stores";

export default defineComponent({
    components: {Icon},
    inheritAttrs: true,
    setup(props, {emit}) {

        const alertStore = useAlertStore();
        const wrapperClass = computed(() => {
            if (alertStore.isSuccess()) {
                return "border px-4 py-4 rounded relative text-sm text-green-700 bg-green-100 border-green-400";
            } else {
                return "border px-4 py-3 rounded relative text-sm text-red-700 bg-red-100 border-red-400";
            }
        })

        const errorKeys = computed(() => {
            if (!alertStore.messages || getType(alertStore.messages) === "string") {
                return null;
            }
            return Object.keys(alertStore.messages);
        })

        function getType(obj) {
            return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
        }

        function getMessageError(key) {
            return alertStore.messages[key][0];
        }

        function removeMessage() {
            alertStore.clear();
        }

        return {
            alertStore,
            wrapperClass,
            errorKeys,
            getType,
            getMessageError,
            removeMessage,
            trans
        }
    }
});
</script>
