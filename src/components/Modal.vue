<template>
  <div>
    <div class="md-modal modal-msg md-modal-transition" :class="[modalFlag? 'md-show' : '']">
      <!--v-bind:class="{'md-show':loginModalFlag}"-->
      <div class="md-modal-inner">
        <div class="md-top">
          <!--<div class="md-title">Login in</div>-->
          <slot name="title"></slot>
          <button class="md-close" @click="hideModal">Close</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <slot name="content"></slot>
            <!--<div class="error-wrap">-->
              <!--<span class="error error-show" v-show="errTip">{{errTipText}}</span>-->
            <!--</div>-->
            <!--<ul>-->
              <!--<li class="regi_form_input">-->
                <!--<i class="icon IconPeople"></i>-->
                <!--<input type="text" tabindex="1" name="loginname" v-model="userName"-->
                       <!--class="regi_login_input regi_login_input_left" placeholder="User Name" data-type="loginname">-->
              <!--</li>-->
              <!--<li class="regi_form_input noMargin">-->
                <!--<i class="icon IconPwd"></i>-->
                <!--<input type="password" tabindex="2" name="password" v-model="password"-->
                       <!--class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="Password">-->
              <!--</li>-->
            <!--</ul>-->
          </div>
          <div class="btn-wrap">
            <slot name="button"></slot>
            <!--<a href="javascript:;" class="btn-login" @click="login">登 录</a>-->
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="modalFlag" @click="hideModal"></div>
  </div>
</template>

<script>
  export default {
    name: "Modal",
    model: {
      prop: 'modalFlag',
      event: 'changeModalFlag'
    },
    props: {
      modalFlag: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {

      }
    },
    methods: {
      hideModal() {
        this.$emit('changeModalFlag', false);
      }
    }
  }
</script>

<style scoped>

</style>
