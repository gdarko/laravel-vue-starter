<template>
    <div class="min-h-screen flex items-center justify-center bg-base-200 px-4">
        <div class="text-center">
            <p class="text-8xl font-black text-primary/20 mb-2">404</p>
            <h1 class="text-2xl font-bold text-base-content mb-2">{{ trans('global.phrases.not_found_text') }}</h1>
            <p class="text-base-content/50 mb-6">The page you're looking for doesn't exist or has been moved.</p>
            <router-link to="/panel/dashboard" class="btn btn-primary btn-sm">
                <Icon name="angle-left" class="h-4 w-4"/>
                {{ trans('global.phrases.not_found_back') }}
            </router-link>
        </div>
    </div>
</template>

<script>
import {defineComponent} from "vue";
import {trans} from "@/helpers/i18n";
import Icon from "@/views/components/icons/Icon";

export default defineComponent({
    name: "NotFound",
    components: {Icon},
    setup() {
        return { trans }
    }
});
</script>
