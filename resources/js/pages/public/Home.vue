<template>
    <div class="max-w-lg p-5 m-auto">
        <article class="p-5">
            <h1 class="mb-5 text-6xl uppercase font-bold text-transparent bg-gradient-to-r bg-clip-text from-blue-300 to-green-500">
                Laravel Vue Starter SPA </h1>
            <p class="font-bold">
                You can register for an account
                <router-link to="/register" class="base-link">here</router-link>.
            </p>
        </article>
        <article class="p-5 mt-5 text-gray-600">
            <p>
                More details and documentation can be found on
                <a href="https://github.com/gdarko/laravel-vue-starter" class="base-link">GitHub</a>.
            </p>
        </article>
    </div>
</template>

<script>
export default {
    name: "Home",
};
</script>
