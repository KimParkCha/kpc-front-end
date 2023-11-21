<script setup>
const variants = [
  '급매 아니면 쳐다도 안봐"… 강남 아파트도 한달새 3억 ',
  '고금리 빚내서 내집마련은 불안"…집값 관망세 속 전세수요',
  '집주인 바뀌면 전세금 돌려받기 어려울 수 있어” 사기 주의해야',
  '상승 멈춘 강남구 아파트…“집값 단기 조정” vs “대세 하락',
  '이러다 가격 더 빠지는 거 아냐"…강남 집주인들 초비상',
  '집주인이 집을 팔겠대요" 불안한 세입자, 보증금 승계 거부할 수 있다'
]
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
          :title="variant"
          append-icon="mdi-plus"
          href="https://n.news.naver.com/article/417/0000963239?cds=news_media_pc&type=editn"
          target="_blank"
          rel="noopener"
          :variant="variant"
        >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-card {
  background-color: #fff;
  /* height: 100px;  */
}
</style>
