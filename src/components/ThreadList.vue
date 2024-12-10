<template>
  <div class="container py-5">
    <div class="text-start mb-4 col-sm">
      <button @click="goBack" class="btn btn-secondary mb-4">Back to Topics</button>
    </div>
    <h4 class="text-start mb-4">Threads for Topic: {{ topicName }}</h4>
    <hr>
    <transition-group name="fade" tag="div" class="row">
      <div
        v-for="(thread, index) in threads"
        :key="thread.threadID"
        class="col-12 mb-4 thread-card"
        :style="{
          animationDelay: `${index * 0.2}s`
        }"
      >
        <div class="card shadow-lg border-light" style="max-width: 100%; background-color: #f8f9fa;">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <div>
              <h5 class="card-title text-start">{{ thread.title }}</h5>
              <p class="card-text text-start">Last active: {{ thread.createdAt }}</p>
              </div>
              <a :href="'/threads/' + thread.threadID + '/posts'" class="btn btn-primary">View Thread</a>
            </div>
          </div>
        </div>
      </div>
    </transition-group>
    <div v-if="threads.length === 0" class="text-center mt-4">
      <p>This topic seems to have no threads. Go ahead and make one!</p>
    </div>
  </div>
</template>

<script>
import { getData } from '@/services/api';

export default {
  props: {
    topicId: {
      type: String,
      required: true
    },
    topicName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      threads: [],
      thisTopic: {}
    };
  },
  async created() {
    await this.fetchThreads();
  },
  watch: {
    topicId: {
      immediate: true,
      handler: 'fetchThreads'
    }
  },
  methods: {
    async fetchThreads() {
      try {
        this.threads = await getData(`/topics/${this.topicId}/threads`);
        this.thisTopic = await getData(`/topics/${this.topicId}`);
        this.$emit('update:topicName', this.thisTopic.title);
      } catch (error) {
        console.error('Error fetching threads:', error);
      }
    },
    goBack() {
      this.$router.push('/topics');
    },
    goHome() {
      this.$router.push('/');
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

.thread-card {
  opacity: 0;
  transform: translateY(20px);
  animation: floatIn 0.5s ease-out forwards;
}

@keyframes floatIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
