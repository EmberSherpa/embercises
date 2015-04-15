import Ember from 'ember';

export default Ember.Controller.extend({

  auth: Ember.inject.service(),

  actions: {
    register: function(){

      this.get('auth').createUser(this.get('email'), this.get('password')).then(()=>{

        this.set('email', '');
        this.set('password', '');
        this.set('confirmPassword', '');
        this.transitionToRoute('login');
      });
    }
  }
});
