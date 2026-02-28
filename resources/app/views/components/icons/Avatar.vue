<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" aria-hidden="true">
        <defs>
            <linearGradient id="avatar-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#0d9488"/>
                <stop offset="100%" style="stop-color:#2dd4bf"/>
            </linearGradient>
        </defs>
        <circle cx="64" cy="64" r="64" fill="url(#avatar-grad)"/>
        <circle cx="64" cy="50" r="22" fill="white" opacity="0.9"/>
        <ellipse cx="64" cy="106" rx="36" ry="30" fill="white" opacity="0.9"/>
    </svg>
</template>

<script>
export default {
    name: "Avatar",
};
</script>
