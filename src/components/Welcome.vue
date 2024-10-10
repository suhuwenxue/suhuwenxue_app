<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { storeToRefs } from "pinia";
import { useCounterStore } from "@/store";
const counterStore = useCounterStore();
const { count } = storeToRefs(counterStore);
</script>

<template>
  <header>
    <img
      alt="naiveUI logo"
      class="logo"
      src="@/assets/naiveUI.svg"
      width="250"
      height="150"
    />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">
          <n-button type="primary">Home</n-button>
        </RouterLink>
        <RouterLink to="/about">
          <n-button type="primary">About</n-button>
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
