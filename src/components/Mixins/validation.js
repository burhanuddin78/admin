const mixin = {
  data: function() {
    return {
      fileSizeRules: [
        (value) => !!value || "Field is required",
        (value) =>
          !value ||
          value.size < 2000000 ||
          "Avatar size should be less than 2 MB!",
      ],
      nameRule: [
        (v) => !!v || "Field is required",
        (v) => (v && v.length <= 30) || "Field must be less than 30 characters",
        (v) =>
          /(?=.*[A-Z])/.test(v) ||
          /(?=.*[a-z])/.test(v) ||
          "Only characters allowed",
      ],
      selectRule: [(v) => !!v || "Field is required"],
      descriptionRule: [
        (v) => !!v || "Description is required",
        (v) =>
          (v && v.length <= 1000) ||
          "Descriptipn must be less than 1000 characters",
      ],
      numberRule: [
        (v) => !!v || "Field is required",
        (v) => {
          if (!isNaN(parseFloat(v)) && v >= 0 && v <= 9999999) return true;
          return "Only numbers allowed";
        },
      ],
    };
  },
  methods: {
    numberText(e) {
      console.log(e);
    },
  },
};

export default mixin;
