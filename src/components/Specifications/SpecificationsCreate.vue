<template>
  <div>
    <v-card
      style="height: 100%; min-height: 100vh"
      :loading="isUpdating"
      flat
      tile
      :disabled="isUpdating"
    >
      <v-card-text>
        <v-form>
          <v-container>
            <!-- <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="specification"
                  label="Category Name"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-file-input
                  required
                  outlined
                  dense
                  accept="image/*"
                  v-model="categoryImage"
                  label="Upload Category Image"
                ></v-file-input>
              </v-col>
              <v-col cols="12" md="4">
                <v-btn
                  class="px-8 mx-4"
                  depressed
                  color="success"
                  @click="addCategory"
                  >Add</v-btn
                >
              </v-col>
            </v-row> -->
            <v-row class="pa-4" justify="space-between">
              <v-col class="d-flex text-center">
                <v-scroll-y-transition mode="out-in">
                  <v-card class="pt-6 mx-auto" flat max-width="400">
                    <v-card-text>
                      <template v-if="!specificationName">
                        <div
                          class=" subheading font-weight-bold"
                          color="primary"
                        >
                          Add specification
                        </div>
                      </template>
                      <template v-else>
                        <div
                          class=" subheading font-weight-bold"
                          color="primary"
                        >
                          Add specification Items for {{ specificationName }}
                        </div>
                      </template>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-form ref="form">
                      <v-row class="pa-4" ref="form">
                        <v-col cols="12">
                          <v-text-field
                            v-model="specificationName"
                            label="Name"
                            outlined
                            dense
                            :rules="nameRule"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="specificationItem"
                            label="Item"
                            outlined
                            dense
                            :rules="nameRule"
                            append-icon="mdi-plus-box"
                            @click:append="addSpecificationItem"
                          >
                          </v-text-field>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card>
                </v-scroll-y-transition>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col cols="5">
                {{ specificationArr }}
                <v-list dense>
                  <v-subheader>Items</v-subheader>
                  <v-list-item-group color="primary">
                    <v-list-item
                      v-for="item in specificationArr"
                      :key="item.id"
                    >
                      <v-list-item-content>
                        <v-list-item-title
                          v-text="item.name"
                        ></v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-icon
                          color="error"
                          small
                          @click="deleteSpecification(item)"
                        >
                          mdi-delete
                        </v-icon>
                      </v-list-item-action>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-col>
            </v-row>

            <v-row justify="end">
              <v-btn
                class="px-8 mx-4"
                tile
                depressed
                color="primary"
                @click="save"
                >Save</v-btn
              >
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
    <v-snackbar v-model="snackbar">
      {{ text }}
      <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import validationMixin from "../Mixins/validation";
export default {
  mixins: [validationMixin],
  data: () => ({
    snackbar: false,
    isUpdating: false,
    text: "",
    specification: null,
    specificationArr: [],
    active: [],
    disabledBtn: true,
    specificationName: "",
    specificationItem: "",
  }),
  methods: {
    reset() {
      this.$refs.form.resetValidation();
      this.specificationItem = "";
      // this.resetValidation();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    deleteSpecification(specItem) {
      this.specificationArr = this.specificationArr.filter(
        (item) => item.id != specItem.id
      );
    },
    addSpecificationItem() {
      if (this.$refs.form.validate()) {
        let obj = {
          id: uuidv4(),
          name: this.specificationItem,
        };
        this.specificationArr.push(obj);
        this.reset();
      } else {
        alert("validation error");
      }
    },
    save() {
      let obj = {
        id: uuidv4(),
        name: this.specificationName,
        children: this.specificationArr,
      };

      console.log(obj);
    },
  },
};
</script>

<style scoped>
.v-input__append-outer {
  margin-top: 0px !important;
}
</style>
