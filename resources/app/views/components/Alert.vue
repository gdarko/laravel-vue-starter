<template>
    <div v-if="alertStore.hasAlert()">
        <div :class="wrapperClass" role="alert">
            <template v-if="alertStore.isError()">
                <template v-if="alertStore.hasMultiple()">
                    <div>
                        <strong class="font-bold mr-2">{{ trans('global.phrases.argh') }}</strong>
                        <span>{{ trans('global.phrases.fix_errors') }}</span>
                        <ul class="mt-2 list-disc pl-5" key="error-list">
                            <li v-for="key in errorKeys" :key="key">
                                {{ getMessageError(key) }}
                            </li>
                        </ul>
                    </div>
                </template>
                <template v-else>
                    <div>
                        <strong class="font-bold mr-2">{{ trans('global.phrases.argh') }}</strong>
                        <span>{{ Array.isArray(alertStore.messages[0]) ? alertStore.messages[0][0] : alertStore.messages[0] }}</span>
                    </div>
                </template>
            </template>
            <template v-else>
                <div>
                    <strong class="font-bold mr-2">{{ trans('global.phrases.success') }}</strong>
                    <span>{{ Array.isArray(alertStore.messages[0]) ? alertStore.messages[0][0] : alertStore.messages[0] }}</span>
                </div>
            </template>
            <button class="btn btn-sm btn-ghost btn-circle" @click="removeMessage">
                <Icon name="times"/>
            </button>
        </div>
    </div>
</template>

<script>

import {computed, defineComponent} from "vue";
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
                return "alert alert-success";
            } else {
                return "alert alert-error";
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
