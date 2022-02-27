<template>
  <Carousel :itemsToShow="3.95" :wrapAround="true" :autoplay="2000">
    <Slide v-for="slide in 10" :key="slide">
      <div class="carousel_item">{{ slide }}</div>
    </Slide>
  </Carousel>
</template>
<script setup lang="ts">
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
</script>
<style lang="scss" scoped>
.carousel_item {
  min-height: 150px;
  width: 75%;
  background-color: var(--vc-clr-primary);
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px 20px;
}

.carousel__slide > .carousel_item {
  transform: scale(1);
  opacity: 0.5;
  transition: 0.5s;
}
.carousel__slide--visible > .carousel_item {
  opacity: 1;
  transform: rotateY(0);
}
.carousel__slide--next > .carousel_item {
  transform: scale(0.9) translate(-10px);
}
.carousel__slide--prev > .carousel_item {
  transform: scale(0.9) translate(10px);
}
.carousel__slide--active > .carousel_item {
  transform: scale(1.1);
}
@media screen and (max-width: 768px) {
  .carousel_item {
    margin: 5px 5px;
  }
}
</style>
