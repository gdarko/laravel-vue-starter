<template>
    <div class="max-w-lg p-5 m-auto">
        <h2 class="mb-4 text-xl font-bold text-center">Forgot Password</h2>
        <ForgotPasswordForm class="p-5 bg-white border rounded shadow"/>
    </div>
</template>

<script>
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default {
    name: "ForgotPassword",
    components: {
        ForgotPasswordForm
    }
};
</script>
