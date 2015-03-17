import Ember from 'ember';

export default Ember.Controller.extend({

  auth: Ember.inject.service(),

  actions: {
    register: function(){
      var _this = this;

      this.get('auth').createUser(this.get('email'), this.get('password')).then(function(){

        _this.set('email', '');
        _this.set('password', '');
        _this.set('confirmPassword', '');
        _this.transitionToRoute('login');
      });
    }
  }
});
