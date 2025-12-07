<template>
  <div class="app">
    <header class="app-header">
      <h1>Welcome to {{projectName}}</h1>
      <p>Built with Vue 3</p>
    </header>
    <main class="app-main">
      <div class="counter">
        <p class="counter-label">Count: {{ count }}</p>
        <div class="counter-buttons">
          <button @click="decrement">-</button>
          <button @click="reset">Reset</button>
          <button @click="increment">+</button>
        </div>
      </div>
      <div class="features">
        <h2>Features</h2>
        <ul>
          <li>✅ Vue 3 with Composition API</li>
          <li>✅ Hot Module Replacement (HMR)</li>
          <li>✅ Production optimizations</li>
          <li>✅ Source maps</li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'App',
  setup() {
    const count = ref(0);

    const increment = () => {
      count.value++;
    };

    const decrement = () => {
      count.value--;
    };

    const reset = () => {
      count.value = 0;
    };

    return {
      count,
      increment,
      decrement,
      reset,
    };
  },
};
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: white;
}

.app-header {
  text-align: center;
  margin-bottom: 3rem;
}

.app-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.app-header p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.app-main {
  max-width: 600px;
  width: 100%;
}

.counter {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.counter-label {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.counter-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.counter-buttons button {
  padding: 0.75rem 1.5rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
}

.counter-buttons button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.counter-buttons button:active {
  transform: translateY(0);
}

.features {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.features h2 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.features ul {
  list-style: none;
  padding: 0;
}

.features li {
  padding: 0.5rem 0;
  font-size: 1.1rem;
  opacity: 0.95;
}
</style>

