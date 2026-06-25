<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import { seedMockData } from '@/composables/useItems'

seedMockData()
</script>

<template>
  <div class="min-h-screen">
    <router-view />
    <NavBar />
  </div>
</template>