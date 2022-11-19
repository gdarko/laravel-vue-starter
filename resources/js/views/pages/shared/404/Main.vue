<template>
    <div class="max-w-lg p-5 m-auto">
        <article class="p-5">
            <h1 class="mb-2 text-6xl font-bold text-transparent bg-gradient-to-r bg-clip-text from-blue-500 to-green-500">
                {{ trans('global.phrases.not_found_title') }} </h1>
            <p class="font-bold">
                {{ trans('global.phrases.not_found_text') }}
                <router-link to="/panel" class="base-link">{{ trans('global.phrases.not_found_back') }}</router-link>.
            </p>
        </article>
    </div>
</template>

<script>


import {defineComponent} from "vue";
import {trans} from "@/helpers/i18n";

export default defineComponent( {
    name: "NotFound",
    setup() {
        return {
            trans
        }
    }
});
</script>
