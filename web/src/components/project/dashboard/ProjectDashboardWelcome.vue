<template>
  <div class="max-w-lg mx-auto bg-gray-200 p-5 space-y-5">
    <h2 class="text-lg font-semibold">Welcome! A few things to start...</h2>
    <p>
      Copy or bookmark this page! We’ve auto-generated a secret for you that’s
      included in the URL, instead of using a traditional email + password
      login. Simply visit this URL whenever you want to access your project.
    </p>
    <p>
      Now, you’re ready to begin adding 🏴‍☠️px to your project!
      <a
        href="https://www.piratepx.com/readme"
        target="_blank"
        class="underline"
        >Head over to the README</a
      >
      for everything you need to know.
    </p>
    <div>
      <h3 class="font-semibold mb-1">Project ID</h3>
      <div class="bg-gray-300 p-2 select-all whitespace-no-wrap overflow-x-auto">
        {{ currentProject.id }}
      </div>
    </div>
    <div>
      <h3 class="font-semibold mb-1">Project Secret</h3>
      <div class="bg-gray-300 p-2 select-all whitespace-no-wrap overflow-x-auto">
        {{ currentProject.secret }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentProject: {
      type: Object,
      required: true,
    },
  },
}
</script>
