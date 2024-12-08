<!-- src/components/HomePage.vue -->
<template>
  <div class="container py-5">
    <h4 class="text-start mb-4">Freshly cooked topics:</h4>
    <div class="text-end mb-4">
      <RouterLink to="/topics/new" class="btn btn-primary">Create New Topic</RouterLink>
    </div>
    <hr>
    <div class="row">
      <div v-for="topic in topics" :key="topic.id" class="col-12 mb-4">
        <div class="card shadow-lg border-light" style="max-width: 100%; background-color: #f8f9fa;">
          <div class="card-body">
            <h5 class="card-title text-start">{{ topic.title }}</h5>
            <p class="card-text text-start">{{ topic.description }}</p>
            <p class="card-text text-start">Last active: {{ topic.createdAt }}</p>
            <div>            
                <div class="text-end">
                <RouterLink :to="'/topics/' + topic.topicID + '/threads'" class="btn btn-primary">View Topic</RouterLink>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getData } from '@/services/api';

export default {
  data() {
    return {
      topics: [],
    };
  },
  async created() {
    try {
      this.topics = await getData('/topics/latest');
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  }
}
</script>

<style scoped>
.card {
  height: 100%;
  transition: transform 0.2s;
}

.card:hover {
  transform: scale(1.05);
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.card-text {
  font-size: 1rem;
  color: #6c757d;
}
</style>