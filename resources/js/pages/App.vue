<template>
  <div id="app">
    <Header />
    <main class="container mx-auto">
      <router-view />
    </main>
  </div>
</template>

<script>
import Header from "@/components/layouts/Header";

export default {
  name: "app",
  components: {
    Header,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,700");

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
</style>
