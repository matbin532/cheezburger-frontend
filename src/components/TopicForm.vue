<template>
    <div class="container">
        <button @click="goBack" class="btn btn-secondary mb-4">Back to Topics</button>
        <h4 class="text-start mb-4">Create a new topic:</h4>
        <form @submit.prevent="createTopic" class="text-start">
            <div class="form-group mb-3">
            <label for="title" class="form-label">Title</label>
            <input type="text" class="form-control" id="title" v-model="title" placeholder="Pick a concise title that won't make users read too much." required>
            </div>
            <div class="form-group mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea class="form-control" id="description" v-model="description" placeholder="Elaborate a little on what the topic is about!" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Create!</button>
        </form>
    </div>
</template>

<script>
import { postData } from '@/services/api';
import axios from 'axios';

axios.withCredentials = true;

export default {
    data() {
        return {
            title: '',
            description: ''
        };
    },
    methods: {
        async createTopic() {
            try {
                await postData('/topics', {
                    title: this.title,
                    description: this.description
                });
                this.$router.push('/topics');
            } catch (error) {
                console.error('Error creating topic:', error);
            }
        },
        goBack() {
            this.$router.push('/topics');
        }
    }
}
</script>

<style scoped>
</style>
@keyframes floatIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.form-group {
    animation: floatIn 0.5s ease-in-out;
}