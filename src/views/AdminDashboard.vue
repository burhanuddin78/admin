<template>
  <v-app id="inspire">
    <Sidebar :sidebar="sidebar" />
    <v-main>
      <BreadCrumb />
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from "../components/Sidebar/Sidebar";
import BreadCrumb from "../components/utils/BreadCrumb";

export default {
  components: {
    Sidebar,
    BreadCrumb,
  },
  data: () => ({
    drawer: null,
    sidebar: [
      {
        title: "Dashboard",
        icon: "mdi-view-dashboard",
        route: "/admin/dashboard",
        items: [],
      },
      {
        title: "Products",
        icon: "mdi-view-dashboard",
        route: "",
        items: [
          {
            title: "Create",
            link: "/admin/products/create",
          },
          {
            title: "Manage",
            link: "/admin/faqs/manage",
          },
        ],
      },
      {
        title: "Categories",
        icon: "mdi-view-dashboard",
        route: "",
        items: [
          {
            title: "Create",
            link: "/admin/categories/create",
          },
          {
            title: "Manage",
            link: "/admin/faqs/manage",
          },
        ],
      },
      {
        title: "Specifications",
        icon: "mdi-view-dashboard",
        route: "",
        items: [
          {
            title: "Create",
            link: "/admin/specifications/create",
          },
          {
            title: "Manage",
            link: "/admin/faqs/manage",
          },
        ],
      },
    ],
  }),
};
</script>
