import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver
});

App.reopen({
  init() {
    this._super(...arguments);
    this.register('service:router', {
      create(attrs) {
        return attrs.container.lookup('router:main');
      }
    });
  }
});

loadInitializers(App, config.modulePrefix);

export default App;
