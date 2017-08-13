export default {
  mounted() {
    this.$store.commit('showInfoBox')
  },
  beforeDestroy() {
    this.$store.commit('hideInfoBox')
  }
}
