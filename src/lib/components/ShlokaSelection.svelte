<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { generatedShlokas, selectedShloka, currentStep } from '$lib/stores/app'
  import { ArrowLeft, BookOpen, Palette, ChevronRight, Sparkles, Lightbulb } from 'lucide-svelte'
  import { fade, fly } from 'svelte/transition'
  
  const dispatch = createEventDispatcher()
  
  function selectShloka(shloka: any) {
    selectedShloka.set(shloka)
    currentStep.set('image-generation')
    dispatch('shloka-selected', shloka)
  }
  
  function goBack() {
    currentStep.set('situation')
    generatedShlokas.set([])
  }
</script>

<div class="w-full max-w-6xl mx-auto" in:fade={{ duration: 300 }}>
  <!-- Header -->
  <div class="text-center mb-8">
    <button 
      on:click={goBack}
      class="inline-flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors mb-4"
    >
      <ArrowLeft size={20} />
      <span>Back to situation</span>
    </button>
    
    <h2 class="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-3">
      🕉️ Choose Your Guiding Shloka
    </h2>
    <p class="text-gray-600 text-lg">Select the verse that resonates most with your situation</p>
  </div>
  
  <!-- Shlokas Grid -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    {#each $generatedShlokas as shloka, index (shloka.id)}
      <div 
        class="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
        in:fly={{ y: 50, duration: 400, delay: index * 100 }}
      >
        <!-- Gradient Border Effect -->
        <div class="absolute inset-0 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl p-[2px]">
          <div class="h-full w-full rounded-2xl bg-white"></div>
        </div>
        
        <!-- Content -->
        <div class="relative p-6 space-y-4">
          <!-- Shloka Header -->
          <div class="flex items-center space-x-3 mb-4">
            <div class="p-2 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full">
              <BookOpen size={20} class="text-orange-600" />
            </div>
            <span class="text-sm font-medium text-gray-500">Bhagavad Gita Verse</span>
          </div>
          
          <!-- Sanskrit Shloka -->
          <div class="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-200">
            <p class="text-gray-800 font-semibold text-lg leading-relaxed text-center">
              {shloka.shloka}
            </p>
          </div>
          
          <!-- Translation -->
          <div class="space-y-3">
            <h4 class="font-semibold text-gray-700 flex items-center space-x-2">
              <Sparkles size={16} class="text-amber-500" />
              <span>Translation</span>
            </h4>
            <p class="text-gray-600 leading-relaxed">
              {shloka.translation}
            </p>
          </div>
          
          <!-- Interpretation (if available) -->
          {#if shloka.interpretation}
            <div class="space-y-3">
              <h4 class="font-semibold text-gray-700 flex items-center space-x-2">
                <Lightbulb size={16} class="text-orange-500" />
                <span>Modern Application</span>
              </h4>
              <p class="text-gray-600 leading-relaxed text-sm">
                {shloka.interpretation}
              </p>
            </div>
          {/if}
          
          <!-- Action Button -->
          <div class="pt-4">
            <button
              on:click={() => selectShloka(shloka)}
              class="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 shadow-lg group"
            >
              <Palette size={20} />
              <span>Create Divine Art</span>
              <ChevronRight size={18} class="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    {/each}
  </div>
  
  <!-- Empty State -->
  {#if $generatedShlokas.length === 0}
    <div class="text-center py-12">
      <div class="text-gray-400 mb-4">
        <BookOpen size={48} class="mx-auto" />
      </div>
      <p class="text-gray-600">No shlokas generated yet. Please describe your situation first.</p>
    </div>
  {/if}
</div>

<style>
  /* Custom scrollbar for better aesthetics */
  :global(.shloka-grid) {
    scrollbar-width: thin;
    scrollbar-color: #f59e0b #fef3c7;
  }
  
  :global(.shloka-grid::-webkit-scrollbar) {
    width: 6px;
  }
  
  :global(.shloka-grid::-webkit-scrollbar-track) {
    background: #fef3c7;
    border-radius: 3px;
  }
  
  :global(.shloka-grid::-webkit-scrollbar-thumb) {
    background: #f59e0b;
    border-radius: 3px;
  }
</style>