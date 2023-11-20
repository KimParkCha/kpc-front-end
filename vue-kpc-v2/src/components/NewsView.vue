<script setup>
const variants = ['elevated', 'flat', 'tonal', 'outlined']
</script>

<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col v-for="(variant, i) in variants" :key="i" cols="auto">
        <v-card class="mx-auto" max-width="344" :variant="variant">
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
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
