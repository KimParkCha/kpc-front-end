<script setup>
const variants = ['뉴스1', '뉴스2', '뉴스3', '뉴스4']
</script>

<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col v-for="(variant, i) in variants" :key="i" cols="auto">
        <!-- <v-card class="mx-auto" max-width="344" :variant="variant">
          <v-card-item>
            <div>
              <div class="text-overline mb-1">
                {{ variant }}
              </div>
              <div class="text-h6 mb-1">
                <a
                  href="https://n.news.naver.com/article/417/0000963239?cds=news_media_pc&type=editn"
                ></a>
              </div>
              <div class="text-caption">Greyhound divisely hello coldly fonwderfully</div>
            </div>
          </v-card-item>

          <v-card-actions>
            <v-btn> Button </v-btn>
          </v-card-actions>
        </v-card> -->
        <v-card
          class="mx-auto my-8"
          max-width="344"
          title="Vuetify on GitHub"
          append-icon="mdi-open-in-new"
          href="https://n.news.naver.com/article/417/0000963239?cds=news_media_pc&type=editn"
          target="_blank"
          rel="noopener"
          :variant="variant"
        >
          {{ variant }}</v-card
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
