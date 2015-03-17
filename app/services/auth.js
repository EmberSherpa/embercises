import Ember from 'ember';

export default Ember.Service.extend({

  ref: null,
  currentUser: null,

  authError: false,
  alertTitle: null,
  alertDetail: null,

  setupAuth: function(){
    var _this = this;

    this.set('ref', new window.Firebase('https://embercises.firebaseio.com/'));

    this.ref.onAuth(function(authData){

      _this.set('currentUser', authData);

      // _this.ref.child('users').child(authData.uid).once('value', function(snapshot){
      //   var exists = (snapshot.val() !== null);

      //   if(exists){
      //     _this.ref.child('users').child(authData.uid).set(authData);
      //   } else {
      //     console.log('User already exists!');
      //   }
      // });

      if (authData) {
        console.log("User " + authData.uid + " is logged in with " + authData.provider);
      } else {
        console.log("User is logged out");
      }


    });

  }.on('init'),

  createUser: function(email, password){
    var _this = this;

    return new Ember.RSVP.Promise(function(resolve, reject){
      _this.ref.createUser({
        email: email,
        password: password
      }, function(err){
        if(!err){
          _this.set('authError', false);
          _this.set('alertTitle', null);
          _this.set('alertDetail', null);
          resolve();
        } else {
          _this.set('authError', true);
          _this.set('alertTitle', err.code);
          _this.set('alertDetail', err.message);
          reject(err);
        }
      })
    });

  },

  login: function(email, password){
    var _this = this;

    return new Ember.RSVP.Promise(function(resolve, reject){
      _this.ref.authWithPassword({
        email: email,
        password: password
      }, function(err, authData){
        if(!err){
          _this.set('authError', false);
          _this.set('alertTitle', null);
          _this.set('alertDetail', null);
          resolve(authData);
        } else {
          _this.set('authError', true);
          _this.set('alertTitle', err.code);
          _this.set('alertDetail', err.message);
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
    var _this = this;

    return new Ember.RSVP.Promise(function(resolve, reject){
      _this.ref.changeEmail({
        oldEmail: oldEmail,
        newEmail: newEmail,
        password: password
      }, function(err){
        if(!err){
          _this.set('authError', false);
          _this.set('alertTitle', null);
          _this.set('alertDetail', null);
          resolve();
        } else {
          _this.set('authError', true);
          _this.set('alertTitle', err.code);
          _this.set('alertDetail', err.message);
          reject(err);
        }
      })
    });

  },

  changePassword: function(email, oldPassword, newPassword){
    var _this = this;

    return new Ember.RSVP.Promise(function(resolve, reject){
      _this.ref.changePassword({
        email: email,
        oldPassword: oldPassword,
        newPassword: newPassword
      }, function(err){
        if(!err){
          _this.set('authError', false);
          _this.set('alertTitle', null);
          _this.set('alertDetail', null);
          resolve();
        } else {
          _this.set('authError', true);
          _this.set('alertTitle', err.code);
          _this.set('alertDetail', err.message);
          reject(err);
        }
      })
    });

  },

  resetPassword: function(email){
    var _this = this;

    return new Ember.RSVP.Promise(function(resolve, reject){
      _this.ref.resetPassword({
        email: email
      }, function(err){
        if(!err){
          _this.set('authError', false);
          _this.set('alertTitle', null);
          _this.set('alertDetail', null);
          resolve();
        } else {
          _this.set('authError', true);
          _this.set('alertTitle', err.code);
          _this.set('alertDetail', err.message);
          reject(err);
        }
      })
    });

  },

  removeUser: function(email, password){
    var _this = this;

    return new Ember.RSVP.Promise(function(resolve, reject){
      _this.ref.removeUser({
        email: email,
        password: password
      }, function(err){
        if(!err){
          _this.set('authError', false);
          _this.set('alertTitle', null);
          _this.set('alertDetail', null);
          resolve();
        } else {
          _this.set('authError', true);
          _this.set('alertTitle', err.code);
          _this.set('alertDetail', err.message);
          reject(err);
        }
      })
    });

  }
});
