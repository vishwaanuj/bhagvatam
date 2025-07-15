<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { generateShlokas, isGenerating, currentStep } from '$lib/stores/app'
  import { Search, Lightbulb, Heart, Briefcase, Users, Home, Target, Zap, BookOpen } from 'lucide-svelte'
  import WisdomLoading from './WisdomLoading.svelte'
  
  const dispatch = createEventDispatcher()
  
  let situation = ''
  let isFocused = false
  let isHovered = false
  let shlokaCount = 3
  
  const suggestionTags = [
    { text: 'Career decision', icon: Briefcase, color: 'from-blue-500 to-cyan-500' },
    { text: 'Relationship conflict', icon: Heart, color: 'from-pink-500 to-rose-500' },
    { text: 'Family duty', icon: Home, color: 'from-purple-500 to-indigo-500' },
    { text: 'Moral dilemma', icon: Lightbulb, color: 'from-amber-500 to-orange-500' },
    { text: 'Leadership challenge', icon: Users, color: 'from-green-500 to-emerald-500' },
    { text: 'Life purpose', icon: Target, color: 'from-teal-500 to-blue-500' },
    { text: 'Personal growth', icon: Zap, color: 'from-violet-500 to-purple-500' }
  ]
  
  async function handleSubmit() {
    if (!situation.trim() || $isGenerating) return
    
    isGenerating.set(true)
    
    try {
      const result = await generateShlokas({
        situation: situation.trim(),
        count: shlokaCount
      })
      
      if (result.success && result.shlokas) {
        dispatch('shlokas-generated', result.shlokas)
        currentStep.set('shloka-selection')
      } else {
        dispatch('error', result.error || 'Failed to generate shlokas')
      }
    } catch (error) {
      console.error('Generation failed:', error)
      dispatch('error', 'Failed to generate shlokas')
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
  
  function selectTag(tag: string) {
    situation = tag
  }
</script>

<div class="w-full max-w-4xl mx-auto">
  {#if $isGenerating}
    <!-- Show only the loading animation when generating -->
    <WisdomLoading {shlokaCount} />
  {:else}
    <!-- Show input form when not generating -->
    <!-- Main Input Container -->
    <div 
      class="relative group"
      class:scale-105={isFocused}
    >
      <!-- Animated Border Background -->
      <div 
        class="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 p-[3px] transition-all duration-500"
        class:opacity-100={isFocused || isHovered}
        class:opacity-70={!isFocused && !isHovered}
      >
        <div class="h-full w-full rounded-3xl bg-white"></div>
      </div>
      
      <!-- Input Container -->
      <div class="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
        <!-- Glow Effect -->
        <div 
          class="absolute inset-0 bg-gradient-to-r from-orange-400/20 via-amber-400/20 to-orange-500/20 opacity-0 transition-opacity duration-500"
          class:opacity-100={isFocused}
        ></div>
        
        <!-- Input Area -->
        <div class="relative p-8 space-y-6">
          <!-- Header -->
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-3">
              🕉️ Share Your Situation
            </h2>
            <p class="text-gray-600 text-lg">Describe your dilemma and discover relevant wisdom from the Bhagavad Gita</p>
          </div>
          
          <!-- Textarea -->
          <div class="relative">
            <div class="absolute top-4 left-4 text-gray-400">
              <Search size={20} />
            </div>
            <textarea
              bind:value={situation}
              on:focus={() => isFocused = true}
              on:blur={() => isFocused = false}
              on:mouseenter={() => isHovered = true}
              on:mouseleave={() => isHovered = false}
              on:keydown={handleKeydown}
              placeholder="Describe your situation... (e.g., 'I'm facing a difficult decision at work where I must choose between loyalty to my team and following company policy')"
              class="w-full h-40 pl-12 pr-4 py-4 text-gray-800 placeholder-gray-400 bg-transparent border-none outline-none resize-none text-lg leading-relaxed"
            ></textarea>
            
            <!-- Character Counter -->
            <div class="absolute bottom-3 right-4 text-xs text-gray-400">
              {situation.length}/1000
            </div>
          </div>
          
          <!-- Shloka Count Selector -->
          <div class="flex items-center justify-between pt-6 border-t border-gray-100">
            <div class="flex items-center space-x-4">
              <label class="text-sm font-medium text-gray-700 flex items-center space-x-2">
                <BookOpen size={16} class="text-orange-600" />
                <span>Number of Shlokas:</span>
              </label>
              <div class="flex space-x-2">
                {#each [2, 3, 4, 5] as count}
                  <button
                    on:click={() => shlokaCount = count}
                    class="w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-all duration-200 relative group"
                    class:border-orange-500={shlokaCount === count}
                    class:bg-orange-500={shlokaCount === count}
                    class:text-white={shlokaCount === count}
                    class:border-gray-300={shlokaCount !== count}
                    class:text-gray-600={shlokaCount !== count}
                    class:hover:border-orange-400={shlokaCount !== count}
                  >
                    {count}
                    {#if shlokaCount === count}
                      <div class="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
                    {/if}
                  </button>
                {/each}
              </div>
              <span class="text-xs text-gray-500">wisdom verses</span>
            </div>
          </div>
          
          <!-- Generate Button -->
          <div class="flex justify-center pt-6">
            <button
              on:click={handleSubmit}
              disabled={!situation.trim()}
              class="px-10 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-2xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
            >
              <div class="flex items-center space-x-3">
                <Lightbulb size={24} />
                <span class="text-lg">Get Spiritual Guidance</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Suggestion Tags -->
    {#if !situation}
      <div class="mt-12">
        <h3 class="text-xl font-semibold text-gray-700 mb-6 text-center">
          Or explore these common situations:
        </h3>
        
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {#each suggestionTags as tag}
            <button
              on:click={() => selectTag(tag.text)}
              class="group relative p-4 bg-gradient-to-br {tag.color} rounded-xl text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <div class="flex flex-col items-center space-y-2">
                <div class="p-2 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                  <svelte:component this={tag.icon} size={24} />
                </div>
                <span class="text-sm font-medium text-center">{tag.text}</span>
              </div>
            </button>
          {/each}
        </div>
      </div>
    {/if}
  {/if}
</div>

<style>
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .animate-spin-slow {
    animation: spin-slow 4s linear infinite;
  }
  
  textarea::placeholder {
    opacity: 0.7;
  }
  
  textarea:focus::placeholder {
    opacity: 0.4;
  }
</style>