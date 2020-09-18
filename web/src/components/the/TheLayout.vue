<template>
  <div class="p-5 sm:p-10 min-h-screen">
    <header class="relative mb-5 sm:mb-10">
      <img
        src="/@/assets/logo.svg"
        width="80"
        height="60"
        class="mx-auto"
        alt="piratepx"
      />
      <nav
        v-if="$slots.nav"
        class="absolute inset-y-0 right-0 flex items-center"
      >
        <ul>
          <slot name="nav" />
        </ul>
      </nav>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>
