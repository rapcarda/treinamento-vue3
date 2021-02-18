<template>
  <div class="bg-brand-gray">
    <content-loader
      class="flex flex-col items-center rounded"
      width="100%"
    >
    </content-loader>
    <content-loader
        class="mt-3 rounded"
        width="90%"
        animation-duration="2s"
    />
    <content-loader
      class="mt-3 rounded"
      width="80%"
      animation-duration="2.3s"
    />

    <content-loader
      class="mt-3 rounded"
      width="70%"
      animation-duration="2.7s"
    />

    <content-loader
      class="mt-3 rounded"
      width="90%"
      animation-duration="2.9s"
    />
  </div>
</template>

<script>
import ContentLoader from '../../components/ContentLoader'

export default {
  components: {
    ContentLoader
  }
}
</script>
