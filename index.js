window.Vue.component('dropdown', {
  template: "<div class=\"dropdown-wrapper\" v-bind:class=\"{ 'dropdown-open': dropdownOpen, 'dropdown-more': dropdownMore }\"><div class=\"dropdown-button\" v-on:click=\"toggleDropdown\">{{ label }}</div><div class=\"dropdown-list\"><div class=\"dropdown-option\" v-for=\"(option, title) in options\"><input type=\"checkbox\" v-bind:name=\"name\" v-bind:value=\"option\" v-model=\"internalResults\"><div class=\"dropdown-label\" v-bind:title=\"title\"><span>{{ title }}</span></div></div><div class=\"dropdown-more\" v-on:click=\"loadMore\" v-show=\"!dropdownMore\" v-text=\"more\"></div></div></div>",
  props: {
    label: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    more: {
      type: String,
      required: false,
      default: 'SHOW MORE'
    },
    options: {
      type: [Array, Object],
      required: true
    }
  },
  data: function() {
    return {
      internalResults: [],
      dropdownOpen: false,
      dropdownMore: false
    };
  },
  created: function() {
    // closes the other open dropdowns if they are open
    this.$parent.$on('dropdown-toggle', (data) => {
      if (data[0] != this.name) {
        this.dropdownOpen = false;
      }
    });
  },
  watch: {
    internalResults: function() {
      // watch for changes, emit the model results
      this.$emit('change', this.internalResults);
    }
  },
  methods: {
    toggleDropdown: function() {
      this.dropdownOpen = !this.dropdownOpen;
      // emit the state of the dropdown
      this.$parent.$emit('dropdown-toggle', [this.name, Boolean(this.dropdownOpen)]);
    },
    loadMore: function() {
      // emit the URL for the AJAX request
      this.$emit('more', [this.name, this.url]);
      this.dropdownMore = true;
    }
  }
});