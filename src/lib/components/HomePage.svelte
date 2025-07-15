<script lang="ts">
  import SituationInput from './SituationInput.svelte'
  import ShlokaSelection from './ShlokaSelection.svelte'
  import ImageGeneration from './ImageGeneration.svelte'
  import { currentStep, generatedShlokas, posts } from '$lib/stores/app'
  import type { Shloka } from '$lib/stores/app'
  import { fade } from 'svelte/transition'
  
  function handleShlokasGenerated(event: CustomEvent<Shloka[]>) {
    generatedShlokas.set(event.detail)
  }
  
  function handleShlokaSelected(event: CustomEvent<Shloka>) {
    // Shloka is already set in the component, just handle any additional logic here
    console.log('Shloka selected:', event.detail)
  }
  
  function handleImageGenerated(event: CustomEvent<any>) {
    const { image, prompt, shloka } = event.detail
    
    // Add to posts store
    const newPost = {
      id: crypto.randomUUID(),
      prompt,
      shloka,
      image_b64: image,
      status: 'completed' as const,
      created_at: new Date().toISOString()
    }
    
    posts.update(currentPosts => [newPost, ...currentPosts])
    
    // Show success notification
    showNotification('✨ Divine art manifested successfully!', 'success')
  }
  
  function handleError(event: CustomEvent<string>) {
    showNotification(`❌ ${event.detail}`, 'error')
  }
  
  function showNotification(message: string, type: 'success' | 'error') {
    const notification = document.createElement('div')
    notification.className = `fixed top-4 right-4 p-4 rounded-lg text-white z-50 animate-fade-in ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`
    notification.textContent = message
    document.body.appendChild(notification)
    
    setTimeout(() => {
      notification.remove()
    }, 5000)
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
  <div class="max-w-7xl mx-auto p-8">
    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent mb-6">
        🕉️ Bhagavad Gita Wisdom
      </h1>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        Discover timeless wisdom from the Bhagavad Gita for your life's challenges, then transform that guidance into divine artwork
      </p>
      
      <!-- Step Indicator -->
      <div class="mt-8 flex justify-center">
        <div class="flex items-center space-x-4">
          <!-- Step 1 -->
          <div class="flex items-center space-x-2">
            <div 
              class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
              class:bg-orange-500={$currentStep === 'situation'}
              class:text-white={$currentStep === 'situation'}
              class:bg-orange-200={$currentStep !== 'situation'}
              class:text-orange-700={$currentStep !== 'situation'}
            >
              1
            </div>
            <span class="text-sm font-medium text-gray-600">Share Situation</span>
          </div>
          
          <div class="w-8 h-0.5 bg-gray-300"></div>
          
          <!-- Step 2 -->
          <div class="flex items-center space-x-2">
            <div 
              class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
              class:bg-orange-500={$currentStep === 'shloka-selection'}
              class:text-white={$currentStep === 'shloka-selection'}
              class:bg-orange-200={$currentStep !== 'shloka-selection'}
              class:text-orange-700={$currentStep !== 'shloka-selection'}
            >
              2
            </div>
            <span class="text-sm font-medium text-gray-600">Choose Shloka</span>
          </div>
          
          <div class="w-8 h-0.5 bg-gray-300"></div>
          
          <!-- Step 3 -->
          <div class="flex items-center space-x-2">
            <div 
              class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
              class:bg-orange-500={$currentStep === 'image-generation'}
              class:text-white={$currentStep === 'image-generation'}
              class:bg-orange-200={$currentStep !== 'image-generation'}
              class:text-orange-700={$currentStep !== 'image-generation'}
            >
              3
            </div>
            <span class="text-sm font-medium text-gray-600">Create Art</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Main Content Area -->
    <div class="mb-16">
      {#if $currentStep === 'situation'}
        <div in:fade={{ duration: 300 }}>
          <SituationInput 
            on:shlokas-generated={handleShlokasGenerated}
            on:error={handleError}
          />
        </div>
      {:else if $currentStep === 'shloka-selection'}
        <div in:fade={{ duration: 300 }}>
          <ShlokaSelection 
            on:shloka-selected={handleShlokaSelected}
          />
        </div>
      {:else if $currentStep === 'image-generation'}
        <div in:fade={{ duration: 300 }}>
          <ImageGeneration 
            on:image-generated={handleImageGenerated}
            on:error={handleError}
          />
        </div>
      {/if}
    </div>
    
    <!-- Recent Generations Preview (only show on home step) -->
    {#if $currentStep === 'situation' && $posts.length > 0}
      <div class="mt-16" in:fade={{ duration: 400 }}>
        <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center">
          <span class="mr-3">🎨</span>
          Recent Divine Manifestations
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {#each $posts.slice(0, 8) as post (post.id)}
            <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group">
              {#if post.image_b64}
                <div class="aspect-square bg-gradient-to-br from-orange-100 to-amber-100 overflow-hidden">
                  <img 
                    src="data:image/jpeg;base64,{post.image_b64}" 
                    alt="Generated divine art"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              {:else}
                <div class="aspect-square bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                  <div class="text-center">
                    <div class="animate-spin rounded-full h-8 w-8 border-4 border-orange-500 border-t-transparent mx-auto mb-2"></div>
                    <p class="text-gray-600 text-sm">Creating...</p>
                  </div>
                </div>
              {/if}
              
              <div class="p-4">
                {#if post.shloka}
                  <p class="text-gray-700 text-sm line-clamp-2 mb-2">{post.shloka.shloka}</p>
                  <p class="text-gray-500 text-xs line-clamp-2 mb-2">{post.shloka.translation}</p>
                {/if}
                <p class="text-gray-400 text-xs">
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          {/each}
        </div>
        
        <div class="text-center mt-8">
          <button 
            class="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-2xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            View All in Vault →
          </button>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fade-in {
    animation: fade-in 0.3s ease-out;
  }
</style>