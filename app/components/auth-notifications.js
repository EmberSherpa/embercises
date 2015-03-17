import Ember from 'ember';
import layout from '../templates/components/auth-notifications';

export default Ember.Component.extend({
  layout: layout,
  auth: Ember.inject.service()
});
