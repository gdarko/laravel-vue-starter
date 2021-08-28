<template>
    <div class="max-w-lg p-5 m-auto">
        <h2 class="mb-4 text-xl font-bold text-center">Reset Password</h2>
        <ResetPasswordForm  class="p-5 bg-white border rounded shadow"/>
    </div>
</template>

<script>
import ResetPasswordForm from "../../components/auth/ResetPasswordForm";

export default {
    name: "ResetPassword",
    components: {ResetPasswordForm}
};
</script>
