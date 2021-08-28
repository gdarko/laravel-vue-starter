<template>
    <div class="max-w-lg p-5 m-auto">
        <h2 class="mb-4 text-xl font-bold text-center">Register</h2>
        <RegisterForm class="p-5 bg-white border rounded shadow"/>
    </div>
</template>

<script>
import RegisterForm from "@/components/auth/RegisterForm";

export default {
    name: "RegisterView",
    components: {
        RegisterForm,
    },
};
</script>
