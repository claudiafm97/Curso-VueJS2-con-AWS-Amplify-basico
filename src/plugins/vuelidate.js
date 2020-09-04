import Vue from "vue";
import Vuelidate from "vuelidate";
import VuelidateErrorExtractor, { templates } from "vuelidate-error-extractor";

Vue.use(Vuelidate);
Vue.use(VuelidateErrorExtractor, {
  template: templates.singleErrorExtractor.bootstrap4,
  messages: {
    required: "El campo {attribute} es requerido",
    minLength: "El campo {attribute} debe tener al menos {min} caracteres",
    maxLength: "El campo {attribute} debe tener un máximo de {max} caracteres",
  },
  attributes: {
    todo: "Todo",
    note: "Nota",
  },
});
