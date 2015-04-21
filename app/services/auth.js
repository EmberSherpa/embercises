import Ember from 'ember';

export default Ember.Service.extend({

  ref: null,
  currentUser: null,

  authError: false,
  alertTitle: null,
  alertDetail: null,

  setupAuth: function(){

    this.set('ref', new window.Firebase('https://embercises.firebaseio.com/'));

    this.ref.onAuth((authData)=>{

      this.set('currentUser', authData);

      // this.ref.child('users').child(authData.uid).once('value', function(snapshot){
      //   var exists = (snapshot.val() !== null);

      //   if(exists){
      //     this.ref.child('users').child(authData.uid).set(authData);
      //   } else {
      //     console.log('User already exists!');
      //   }
      // });


      if (authData) {
        console.log('User `${authData.uid}` is logged in with `${authData.provider}`');
      } else {
        console.log("User is logged out");
      }


    });

  }.on('init'),

  createUser: function(email, password){

    return new Ember.RSVP.Promise((resolve, reject)=>{
      this.ref.createUser({
        email: email,
        password: password
      }, (err)=>{
        if(!err){
          this.set('authError', false);
          this.set('alertTitle', null);
          this.set('alertDetail', null);
          resolve();
        } else {
          this.set('authError', true);
          this.set('alertTitle', err.code);
          this.set('alertDetail', err.message);
          reject(err);
        }
      });
    });

  },

  login: function(email, password){

    return new Ember.RSVP.Promise((resolve, reject)=>{
      this.ref.authWithPassword({
        email: email,
        password: password
      }, (err, authData)=>{
        if(!err){
          this.set('authError', false);
          this.set('alertTitle', null);
          this.set('alertDetail', null);
          resolve(authData);
        } else {
          this.set('authError', true);
          this.set('alertTitle', err.code);
          this.set('alertDetail', err.message);
          reject(err);
        }
      }, {remember: 'sessionOnly'});

    });

  },

  logout: function(){
    this.ref.unauth();
    this.set('currentUser', null);
  },

  changeEmail: function(oldEmail, newEmail, password){

    return new Ember.RSVP.Promise((resolve, reject)=>{
      this.ref.changeEmail({
        oldEmail: oldEmail,
        newEmail: newEmail,
        password: password
      }, (err)=>{
        if(!err){
          this.set('authError', false);
          this.set('alertTitle', null);
          this.set('alertDetail', null);
          resolve();
        } else {
          this.set('authError', true);
          this.set('alertTitle', err.code);
          this.set('alertDetail', err.message);
          reject(err);
        }
      });
    });

  },

  changePassword: function(email, oldPassword, newPassword){

    return new Ember.RSVP.Promise((resolve, reject)=>{
      this.ref.changePassword({
        email: email,
        oldPassword: oldPassword,
        newPassword: newPassword
      }, (err)=>{
        if(!err){
          this.set('authError', false);
          this.set('alertTitle', null);
          this.set('alertDetail', null);
          resolve();
        } else {
          this.set('authError', true);
          this.set('alertTitle', err.code);
          this.set('alertDetail', err.message);
          reject(err);
        }
      });
    });

  },

  resetPassword: function(email){

    return new Ember.RSVP.Promise((resolve, reject)=>{
      this.ref.resetPassword({
        email: email
      }, (err)=>{
        if(!err){
          this.set('authError', false);
          this.set('alertTitle', null);
          this.set('alertDetail', null);
          resolve();
        } else {
          this.set('authError', true);
          this.set('alertTitle', err.code);
          this.set('alertDetail', err.message);
          reject(err);
        }
      });
    });

  },

  removeUser: function(email, password){

    return new Ember.RSVP.Promise((resolve, reject)=>{
      this.ref.removeUser({
        email: email,
        password: password
      }, (err)=>{
        if(!err){
          this.set('authError', false);
          this.set('alertTitle', null);
          this.set('alertDetail', null);
          resolve();
        } else {
          this.set('authError', true);
          this.set('alertTitle', err.code);
          this.set('alertDetail', err.message);
          reject(err);
        }
      });
    });

  }
});
