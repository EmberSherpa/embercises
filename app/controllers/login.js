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

      this.get('auth').login(this.get('email'), this.get('password')).then((authData)=>{

        this.set('email', '');
        this.set('password', '');
        this.transitionToRoute('/');
      });
    }
  }
});

