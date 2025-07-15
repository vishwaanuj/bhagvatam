<script lang="ts">
  import { currentPage } from '$lib/stores/app'
  import { fly } from 'svelte/transition'
  
  let isOpen = true
  
  function toggleSidebar() {
    isOpen = !isOpen
  }
  
  function setPage(page: 'home' | 'vault') {
    currentPage.set(page)
  }
</script>

<div class="flex">
  <!-- Sidebar -->
  <aside 
    class="fixed left-0 top-0 h-full bg-gradient-to-b from-orange-900 via-orange-800 to-amber-900 text-white shadow-2xl z-40 transition-all duration-300 ease-in-out"
    class:w-64={isOpen}
    class:w-16={!isOpen}
  >
    <!-- Header -->
    <div class="p-4 border-b border-orange-700">
      <div class="flex items-center justify-between">
        {#if isOpen}
          <div class="flex items-center space-x-3" transition:fly={{ x: -20, duration: 200 }}>
            <div class="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center animate-pulse">
              <span class="text-xl">🕉️</span>
            </div>
            <div>
              <h1 class="text-lg font-bold">Bhagvatam</h1>
              <p class="text-xs text-orange-200">Divine Art Generator</p>
            </div>
          </div>
        {:else}
          <div class="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center animate-pulse">
            <span class="text-xl">🕉️</span>
          </div>
        {/if}
        
        <button 
          on:click={toggleSidebar}
          class="p-2 rounded-lg hover:bg-orange-700 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Navigation -->
    <nav class="p-4 space-y-2">
      <button 
        on:click={() => setPage('home')}
        class="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-orange-700/50 transition-all duration-200 group"
        class:bg-orange-700={$currentPage === 'home'}
      >
        <div class="w-8 h-8 flex items-center justify-center">
          <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>
        {#if isOpen}
          <span class="font-medium" transition:fly={{ x: -20, duration: 200 }}>Home</span>
        {/if}
      </button>
      
      <button 
        on:click={() => setPage('vault')}
        class="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-orange-700/50 transition-all duration-200 group"
        class:bg-orange-700={$currentPage === 'vault'}
      >
        <div class="w-8 h-8 flex items-center justify-center">
          <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        {#if isOpen}
          <span class="font-medium" transition:fly={{ x: -20, duration: 200 }}>Vault</span>
        {/if}
      </button>
    </nav>
    
    <!-- Bottom Section -->
    <div class="absolute bottom-4 left-4 right-4">
      {#if isOpen}
        <div class="bg-orange-800/50 rounded-xl p-3" transition:fly={{ y: 20, duration: 200 }}>
          <p class="text-xs text-orange-200 mb-2">✨ Divine Inspiration</p>
          <p class="text-xs text-orange-100">"Manifest your spiritual visions through sacred art"</p>
        </div>
      {/if}
    </div>
  </aside>
  
  <!-- Main Content Area -->
  <main 
    class="flex-1 transition-all duration-300 ease-in-out"
    class:ml-64={isOpen}
    class:ml-16={!isOpen}
  >
    <slot />
  </main>
</div>

<style>
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 20px rgba(255, 153, 0, 0.3); }
    50% { box-shadow: 0 0 30px rgba(255, 153, 0, 0.6); }
  }
  
  .animate-glow {
    animation: glow 2s ease-in-out infinite;
  }
</style>
