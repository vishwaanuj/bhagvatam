<script lang="ts">
  import { currentPage } from '$lib/stores/app'
  import { Home, Archive, Menu, Sparkles } from 'lucide-svelte'
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
              <h1 class="text-lg font-bold">Bhagavad Gita</h1>
              <p class="text-xs text-orange-200">Wisdom & Art</p>
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
          <Menu size={20} />
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
          <Home size={20} class="group-hover:scale-110 transition-transform" />
        </div>
        {#if isOpen}
          <span class="font-medium" transition:fly={{ x: -20, duration: 200 }}>Wisdom Journey</span>
        {/if}
      </button>
      
      <button 
        on:click={() => setPage('vault')}
        class="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-orange-700/50 transition-all duration-200 group"
        class:bg-orange-700={$currentPage === 'vault'}
      >
        <div class="w-8 h-8 flex items-center justify-center">
          <Archive size={20} class="group-hover:scale-110 transition-transform" />
        </div>
        {#if isOpen}
          <span class="font-medium" transition:fly={{ x: -20, duration: 200 }}>Sacred Vault</span>
        {/if}
      </button>
    </nav>
    
    <!-- Bottom Section -->
    <div class="absolute bottom-4 left-4 right-4">
      {#if isOpen}
        <div class="bg-orange-800/50 rounded-xl p-4" transition:fly={{ y: 20, duration: 200 }}>
          <div class="flex items-center space-x-2 mb-2">
            <Sparkles size={16} class="text-orange-200" />
            <p class="text-xs text-orange-200 font-medium">Divine Inspiration</p>
          </div>
          <p class="text-xs text-orange-100 leading-relaxed">
            "Transform ancient wisdom into visual art that speaks to your soul"
          </p>
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