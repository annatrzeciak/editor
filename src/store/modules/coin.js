import * as Coin from "../api/coin";
let timeouts = [];
export const constans = {
  SET_ALL_COINS: "SET_ALL_COINS",
  SET_CURRENT_EXCHANGE_RATES: "SET_CURRENT_EXCHANGE_RATES",
  SET_ERROR_DURING_GET_DATA: "SET_ERROR_DURING_GET_DATA"
};

export default {
  namespaced: true,
  state: {
    allCoins: [],
    usedCoinsExchange: [],
    currentExchangeRates: {},
    errorWithGetData: false
  },
  getters: {
    allCoins: state => state.allCoins,
    usedCoinsExchange: state => state.usedCoinsExchange,
    currentExchangeRates: state => state.currentExchangeRates,
    errorWithGetData: state => state.errorWithGetData
  },
  mutations: {
    [constans.SET_ALL_COINS](state, data) {
      state.allCoins = data;
    },
    [constans.SET_CURRENT_EXCHANGE_RATES](state, data) {
      const exchangeRates = { ...state.currentExchangeRates };
      exchangeRates[data.id] = data.value;
      state.currentExchangeRates = exchangeRates;
    },
    [constans.SET_ERROR_DURING_GET_DATA](state, value) {
      state.errorWithGetData = value;
    }
  },
  actions: {
    async fetchAllCoins({ commit }) {
      return Coin.getCoins()
        .then(success => {
          commit(constans.SET_ERROR_DURING_GET_DATA, false);
          commit(constans.SET_ALL_COINS, success.body);
          return Promise.resolve(success.body);
        })
        .catch(err => {
          commit(constans.SET_ERROR_DURING_GET_DATA, true);
          return Promise.reject(err);
        });
    },

    async fetchExchangeRates({ dispatch, commit, state }, coins) {
      timeouts.forEach(timeout => clearTimeout(timeout));
      timeouts = [];

      return coins.forEach(coin => {
        dispatch("getExchangeRateForCoin", ({ dispatch, commit, state }, coin));
      });
    },
    getExchangeRateForCoin({ dispatch, commit, state }, coin) {
      Coin.getCurrentExchange(coin)
        .then(success => {
          const data = success.body[0] ? success.body[0] : null;
          commit(constans.SET_CURRENT_EXCHANGE_RATES, {
            id: coin,
            value: {
              date: data && data.time_close ? data.time_close : "",
              close: data && data.close ? data.close : ""
            }
          });
          return Promise.resolve(data);
        })
        .catch(err => Promise.reject(err))
        .finally(() => {
          timeouts.push(
            setTimeout(
              () =>
                dispatch(
                  "getExchangeRateForCoin",
                  ({ dispatch, commit, state }, coin)
                ),

              1000 *
                Math.ceil(Object.keys(state.currentExchangeRates).length / 10)
            )
          );
        });
    }
  }
};
