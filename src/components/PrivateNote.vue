<template>
<b-card class="text-center mt-2" style="width: 25rem; margin-left:33%" :title="private_note.note">
    <b-link @click="$emit('remove', private_note.id)" class="btn ml-2"><svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-x-square-fill" fill="#D74A4A" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
        </svg>
    </b-link>
</b-card>
</template>

<script>
export default {
    props: ['private_note']
}
</script>
