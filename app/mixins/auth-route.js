import Ember from 'ember';

export default Ember.Mixin.create({

  auth: Ember.inject.service(),

  beforeModel: function(){
    if(this.get('auth').currentUser === null){
      // for some reason transitionToRoute throws this error: "Error while processing route: index undefined is not a function TypeError: undefined is not a function"
      this.transitionTo('login');
    }
  }

});
