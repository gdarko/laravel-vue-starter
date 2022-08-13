<template>
    <div id="app">
        <Header/>
        <main class="container mx-auto">
            <router-view/>
        </main>
    </div>
</template>

<script>
import Header from "@/views/layouts/Header";

export default {
    name: "app",
    components: {
        Header,
    }
};
</script>
