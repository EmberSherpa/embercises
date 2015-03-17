import Ember from 'ember';
import AuthRouteMixin from '../../../mixins/auth-route';
import { module, test } from 'qunit';

module('AuthRouteMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var AuthRouteObject = Ember.Object.extend(AuthRouteMixin);
  var subject = AuthRouteObject.create();
  assert.ok(subject);
});
