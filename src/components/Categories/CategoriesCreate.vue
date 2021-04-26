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
                  v-model="category"
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
                    <v-card-text v-if="categoryArr && categoryArr.length">
                      <template v-if="!selected.length">
                        <div
                          class=" subheading font-weight-bold"
                          color="primary"
                        >
                          Please select item to add category
                        </div>
                      </template>
                      <template v-else>
                        <div
                          v-if="selected.length && selected[0].level < 3"
                          class=" subheading font-weight-bold"
                          color="primary"
                        >
                          Add sub category for {{ selected[0].name }}
                        </div>
                        <div
                          v-else
                          class=" subheading font-weight-bold"
                          color="primary"
                        >
                          You can not add more category to this item
                        </div>
                      </template>
                    </v-card-text>
                    <v-card-text v-else>
                      <div class=" subheading font-weight-bold" color="primary">
                        Add Category
                      </div>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-form v-model="valid" ref="form">
                      <v-row class="pa-4" ref="form">
                        <v-col cols="12">
                          <v-text-field
                            v-model="category"
                            label="Category Name"
                            outlined
                            dense
                            required
                            :rules="nameRule"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-file-input
                            required
                            outlined
                            dense
                            v-model="categoryImage"
                            label="Upload Category Image"
                            prepend-icon="mdi-camera"
                            :rules="fileSizeRules"
                            accept="image/png, image/jpeg, image/bmp"
                          ></v-file-input>
                        </v-col>
                        <v-col cols="12">
                          <v-btn
                            tile
                            v-if="!categoryArr.length > 0"
                            depressed
                            block
                            color="primary"
                            @click="addCategory"
                            >Add</v-btn
                          >
                          <template v-else>
                            <v-btn
                              tile
                              :disabled="disabledBtn"
                              depressed
                              block
                              color="primary"
                              @click="addSubCategory"
                              >Add Sub</v-btn
                            >
                          </template>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card>
                </v-scroll-y-transition>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col cols="5">
                <v-treeview
                  style="cursor: pointer"
                  v-if="categoryArr.length > 0"
                  :active.sync="active"
                  :items="categoryArr"
                  activatable
                  open-all
                  return-object
                  transition
                >
                  <template v-slot:append="{ item }">
                    <v-icon
                      v-if="!item.children.length"
                      color="error"
                      small
                      @click="deleteCategory(item)"
                    >
                      mdi-delete
                    </v-icon>
                  </template>
                </v-treeview>
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
            <v-snackbar v-model="snackbar">
              {{ text }}
              <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
            </v-snackbar>
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
    valid: false,
    category: null,
    categoryImage: null,
    categoryArr: [],
    active: [],
    disabledBtn: true,
  }),
  created() {
    console.log(this.message);
  },
  computed: {
    selected() {
      if (!this.active && !this.active.length) return undefined;

      return this.active;
    },
  },
  watch: {
    selected: function() {
      if (this.selected.length && this.selected[0].level < 3) {
        this.disabledBtn = false;
      } else {
        this.disabledBtn = true;
      }
    },
  },
  methods: {
    numberTextField(e) {
      console.log("dd");
      console.log(e);
    },
    reset() {
      this.category = null;
      this.categoryImage = null;
      this.resetValidation();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    deleteCategory(item) {
      if (this.categoryArr[0].id == item.id) {
        this.categoryArr = [];
      } else {
        this.del(this.categoryArr[0], item.id);
      }
    },
    // use this to find object in categories by id
    findById(o, id) {
      //Early return
      if (o.id === id) {
        return o;
      }
      var result, p;
      for (p in o) {
        if (typeof o[p] === "object") {
          result = this.findById(o[p], id);
          if (result) {
            return result;
          }
        }
      }
      return result;
    },
    del(obj, id) {
      return (obj.children = obj.children.filter((el) => {
        if (el.children) this.del(el, id); //delete subnodes
        return el.id !== id; //delete this
      }));
    },
    addSubCategory() {
      if (this.$refs.form.validate()) {
        if (this.selected.length) {
          let child = {
            id: uuidv4(),
            name: this.category,
            image: this.categoryImage,
            level: this.selected[0].level + 1,
            children: [],
          };
          this.selected[0].children.push(child);
        }
        this.reset();
      } else {
        alert("validation error");
      }
    },
    addCategory() {
      if (this.$refs.form.validate()) {
        this.categoryArr.push({
          id: uuidv4(),
          name: this.category,
          image: this.categoryImage,
          level: 1,
          children: [],
        });
        this.reset();
      } else {
        alert("validation error");
      }
    },
    saveImage(formData, type, id) {
      this.$http({
        url: `category/seticon?type=${type}&id=${id}`,
        method: "POST",
        config: {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
        data: formData,
      }).then(
        (res) => {
          console.log(res);
        },
        (err) => {
          this.snackbar = true;
          this.text = "Error adding Image " + err;
        }
      );
    },
    save() {
      console.log("saved");
    },
  },
};
</script>
