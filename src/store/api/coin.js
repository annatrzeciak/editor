import Vue from "vue";

// ENDPOINTS
export async function getCoins() {
  return await Vue.http.get(`/coins`);
}

export async function getCurrentExchange(coinID) {
  return await Vue.http.get(`coins/${coinID}/ohlcv/today`);
}

