<template>
  <header>
    <div class="sidebar" v-if="sidebar" @click="sidebar = !sidebar">
      <div class="sidebar-box" @click.stop="">
        <ul @click="sidebar = !sidebar">
          <router-link tag="li" to="/"
            ><span class="mdi mdi-cart-outline"></span>Заказы</router-link
          >
          <router-link tag="li" to="/directories"
            ><span class="mdi mdi-bookmark-outline"></span
            >Справочники</router-link
          >
          <router-link tag="li" to="/archive"
            ><span class="mdi mdi-chart-line"></span>Архив</router-link
          >
          <router-link tag="li" to="/users"
            ><span class="mdi mdi-account-multiple-outline"></span
            >Пользователи</router-link
          >
        </ul>
      </div>
    </div>

    <button class="sidebar-btn" @click="sidebar = !sidebar" v-if="user !== null && user.roles[0] !== 'shop_manager' ">
      <span class="mdi mdi-menu"></span>Меню
    </button>

    <h4 class="hidden-xs">SHELION CRM</h4>

    <div class="log-box" @click="accpuntMenu = !accpuntMenu">
      <div class="text-right" v-if="user !== null">
        <p>{{ mainRole }}</p>
        <p>
          <strong>{{ user.user_display_name }}</strong>
        </p>
        <p>{{ user.user_email }}</p>
      </div>
      <div class="avatar" v-if="user !== null">
        <span>{{ user.user_email[0] }}</span>
      </div>

      <transition v-if="accpuntMenu" name="slide-fade" mode="out-in">
        <div class="login-drop" @mouseleave="accpuntMenu = !accpuntMenu" @click="accpuntMenu = !accpuntMenu">
          <ul>
            <router-link tag="li" to="/logout"
              ><span class="mdi mdi-account-outline"></span
              >Настройки</router-link
            >
            <li  @click="logout"
              ><span class="mdi mdi-arrow-left"></span>Выйти</li>
          </ul>
        </div>
      </transition>
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      accpuntMenu: false,
      sidebar: false,
    };
  },
  computed: {
    ...mapGetters({ user: "auth/getUser" }),
    mainRole(){
      if(this.user.roles[0] === 'administrator'){
        return 'Администратор'
      }else if(this.user.roles[0] === 'shop_manager'){
        return 'Продавец'
      }else{
        return 'Замерщик'
      }
    }
  },

  methods: {
    ...mapActions({
      singOut: "auth/SIGN_OUT",
    }),

    logout() {
      this.singOut().then(() => {
        this.$router.replace("/login");
      });
    },
  },
};
</script>

<style>
header {
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.1);
  margin: 15px;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
}
.sidebar-btn {
  padding: 10px 15px;
  border-radius: 3px;
  color: #fff;
  font-size: 16px;
  background-color: #1976d2;
  border: none;
  transition: all 0.2s ease;
}
.sidebar-btn:hover {
  background-color: #5e54c7;
}
.sidebar-btn span {
  margin-right: 5px;
}
.log-box {
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
}
.avatar {
  margin-left: 10px;
  background-color: #1976d2;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  font-size: 20px;
  border-radius: 50px;
  padding: 20px;
  transition: all 0.2s ease;
}
.log-box:hover .avatar {
  background-color: #5e54c7;
}
p {
  margin: 0 !important;
  padding: 0 !important;
}
.login-drop {
  position: absolute;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.2);
  top: 120%;
  min-width: 140px;
  z-index: 2;
  background-color: #fff;
  right: 0;
  transition: all 0.3s ease;
}
ul {
  margin: 0 !important;
  padding: 0 !important;
}
li {
  list-style: none;
  padding: 5px 8px;
  transition: all 0.3s ease;
  font-size: 16px;
  cursor: pointer;
}
li span {
  margin-right: 3px;
}
li:hover {
  background-color: #1976d2;
  color: #fff;
  border-radius: 3px;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
  transform: translateY(10px);
}
.slide-fade-leave-active {
  transition: all 0.3s;
  transform: translateY(0px);
}
.slide-fade-enter,
.slide-fade-leave-active {
  transform: translateY(10px);
  opacity: 0;
}
.sidebar {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  height: 100%;
  transition: all 0.3s ease;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
}
.sidebar-box {
  position: absolute;
  left: 0;
  top: 0;
  width: 250px;
  height: 100%;
  background-color: #fff;
  padding: 20px 0px;
}
.sidebar-box li {
  font-size: 18px;
  padding: 15px;
  border-radius: 0;
  border-bottom: 1px #e0e0e0 solid;
}
</style>


