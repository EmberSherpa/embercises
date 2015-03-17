import Ember from 'ember';

export default Ember.Controller.extend({

  auth: Ember.inject.service(),

  beforeModel: function(){
    if(this.get('auth').currentUser !== null){
      this.transitionToRoute('/');
    }
  },

  authError: false,
  alertTitle: null,
  alertDetail: null,

  actions: {
    login: function(){
      var _this = this;

      this.get('auth').login(this.get('email'), this.get('password')).then(function(authData){

        _this.set('email', '');
        _this.set('password', '');
        _this.transitionToRoute('/');
      });
    }
  }
});

