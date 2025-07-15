<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { generateImage, isGenerating } from '$lib/stores/app'

  
  const dispatch = createEventDispatcher()
  
  let prompt = ''
  let imageCount = 1
  let isFocused = false
  let isHovered = false
  
  async function handleSubmit() {
    if (!prompt.trim() || $isGenerating) return
    
    isGenerating.set(true)
    
    try {
      const result = await generateImage({
        prompt: prompt.trim(),
        imageCount
      })
      
      dispatch('generated', result)
      
      if (result.success) {
        prompt = '' // Clear input on success
      }
    } catch (error) {
      console.error('Generation failed:', error)
    } finally {
      isGenerating.set(false)
    }
  }
  
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSubmit()
    }
  }
</script>

<div class="w-full max-w-4xl mx-auto">
  <!-- Main Input Container -->
  <div 
    class="relative group"
    class:scale-105={isFocused}
    class:animate-pulse={$isGenerating}
  >
    <!-- Animated Border Background -->
    <div 
      class="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 p-[2px] transition-all duration-300"
      class:opacity-100={isFocused || isHovered}
      class:opacity-70={!isFocused && !isHovered}
      class:animate-spin-slow={$isGenerating}
    >
      <div class="h-full w-full rounded-2xl bg-white"></div>
    </div>
    
    <!-- Input Container -->
    <div class="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
      <!-- Glow Effect -->
      <div 
        class="absolute inset-0 bg-gradient-to-r from-orange-400/20 via-amber-400/20 to-orange-500/20 opacity-0 transition-opacity duration-300"
        class:opacity-100={isFocused}
      ></div>
      
      <!-- Input Area -->
      <div class="relative p-6 space-y-4">
        <!-- Header -->
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            ✨ Manifest Your Divine Vision
          </h2>
          <p class="text-gray-600 mt-2">Describe your spiritual inspiration and watch it come to life</p>
        </div>
        
        <!-- Textarea -->
        <div class="relative">
          <textarea
            bind:value={prompt}
            on:focus={() => isFocused = true}
            on:blur={() => isFocused = false}
            on:mouseenter={() => isHovered = true}
            on:mouseleave={() => isHovered = false}
            on:keydown={handleKeydown}
            placeholder="Describe your divine vision... (e.g., 'Krishna playing flute in a serene garden with golden light')"
            class="w-full h-32 px-4 py-3 text-gray-800 placeholder-gray-400 bg-transparent border-none outline-none resize-none text-lg leading-relaxed"
            disabled={$isGenerating}
          ></textarea>
          
          <!-- Character Counter -->
          <div class="absolute bottom-2 right-3 text-xs text-gray-400">
            {prompt.length}/500
          </div>
        </div>
        
        <!-- Controls Row -->
        <div class="flex items-center justify-between pt-4 border-t border-gray-100">
          <!-- Image Count Selector -->
          <div class="flex items-center space-x-3">
            <label class="text-sm font-medium text-gray-700">Images:</label>
            <div class="flex space-x-2">
              {#each [1, 2, 3, 4] as count}
                <button
                  on:click={() => imageCount = count}
                  class="w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-all duration-200"
                  class:border-orange-500={imageCount === count}
                  class:bg-orange-500={imageCount === count}
                  class:text-white={imageCount === count}
                  class:border-gray-300={imageCount !== count}
                  class:text-gray-600={imageCount !== count}
                  class:hover:border-orange-400={imageCount !== count}
                  disabled={$isGenerating}
                >
                  {count}
                </button>
              {/each}
            </div>
          </div>
          
          <!-- Generate Button -->
          <button
            on:click={handleSubmit}
            disabled={!prompt.trim() || $isGenerating}
            class="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
          >
            {#if $isGenerating}
              <div class="flex items-center space-x-2">
                <div class="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>Manifesting...</span>
              </div>
            {:else}
              <div class="flex items-center space-x-2">
                <span>🎨</span>
                <span>Generate Art</span>
              </div>
            {/if}
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Inspiration Cards -->
  {#if !$isGenerating && !prompt}
    <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      {#each ['A serene meditation scene with golden divine light', 'Krishna playing flute in a peaceful garden', 'Arjuna contemplating on the battlefield'] as suggestion, i}
        <button
          on:click={() => prompt = suggestion}
          class="p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200 hover:border-orange-300 transition-all duration-200 text-left group hover:shadow-lg"
        >
          <div class="flex items-start space-x-3">
            <span class="text-2xl group-hover:scale-110 transition-transform">
              {['🧘', '🎵', '⚔️'][i]}
            </span>
            <div>
              <p class="text-sm text-gray-700 font-medium">Try this:</p>
              <p class="text-xs text-gray-600 mt-1">"{suggestion}"</p>
            </div>
          </div>
        </button>
      {/each}
    </div>
  {/if}
</div>

<style>
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .animate-spin-slow {
    animation: spin-slow 3s linear infinite;
  }
  
  textarea::placeholder {
    opacity: 0.7;
  }
  
  textarea:focus::placeholder {
    opacity: 0.4;
  }
</style>