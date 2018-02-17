export default {
  mounted() {
    this.$store.commit('UI_INFOBOX_SET', true)
  },
  beforeDestroy() {
    this.$store.commit('UI_INFOBOX_SET', false)
  }
}
