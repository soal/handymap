import Vue from "vue";

export default Vue.directive("angle-switcher", {
  twoWay: true,
  params: ["showed"],
  bind: function() {
    this.el.classList.add("angle-switcher");
    this.el.innerHTML = "<i></i>";

    const updateButton = (showed) => {
      if (showed) {
          this.el.classList.remove("down");
          this.el.classList.add("up");
        } else {
          this.el.classList.remove("up");
          this.el.classList.add("down");
        }
    };
    updateButton(this.params.showed);

    this.handler = () => {
      this.params.showed = !this.params.showed;

      updateButton(this.params.showed);

      this.set(this.params.showed);
    };
    this.el.addEventListener("click", this.handler);
  },
  unbibd: function() { this.el.removeEventListener("click", this.handler); }
});
