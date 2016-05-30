/* DO NOT EDIT: This code has been generated by the cf-dotnet-sdk-builder */

(function () {
  'use strict';

  angular
    .module('cloud-foundry.api')
    .run(registerApi);

  registerApi.$inject = [
    '$http',
    'app.api.apiManager'
  ];

  function registerApi($http, apiManager) {
    apiManager.register('cloud-foundry.api.FeatureFlags', new FeatureFlagsApi($http));
  }

  function FeatureFlagsApi($http) {
    this.$http = $http;
  }

  /* eslint-disable camelcase */
  angular.extend(FeatureFlagsApi.prototype, {

   /*
    * Get all feature flags
    * For detailed information, see online documentation at: http://apidocs.cloudfoundry.org/237/feature_flags/get_all_feature_flags.html
    */
    GetAllFeatureFlags: function (params, httpConfigOptions) {
      var config = {};
      config.params = params;
      config.url = '/pp/v2/config/feature_flags';
      config.method = 'GET';

      for (var option in httpConfigOptions) {
        config[option] = httpConfigOptions[option]
      }
      return this.$http(config);
    },

   /*
    * Get the App Bits Upload feature flag
    * When enabled, space developers can upload app bits. When disabled, only admin users can upload app bits
    * For detailed information, see online documentation at: http://apidocs.cloudfoundry.org/237/feature_flags/get_the_app_bits_upload_feature_flag.html
    */
    GetAppBitsUploadFeatureFlag: function (params, httpConfigOptions) {
      var config = {};
      config.params = params;
      config.url = '/pp/v2/config/feature_flags/app_bits_upload';
      config.method = 'GET';

      for (var option in httpConfigOptions) {
        config[option] = httpConfigOptions[option]
      }
      return this.$http(config);
    },

   /*
    * Get the App Scaling feature flag
    * When enabled, space developers can perform scaling operations (i.e. change memory, disk or instances). When disabled, only admins can perform scaling operations.
    * For detailed information, see online documentation at: http://apidocs.cloudfoundry.org/237/feature_flags/get_the_app_scaling_feature_flag.html
    */
    GetAppScalingFeatureFlag: function (params, httpConfigOptions) {
      var config = {};
      config.params = params;
      config.url = '/pp/v2/config/feature_flags/app_scaling';
      config.method = 'GET';

      for (var option in httpConfigOptions) {
        config[option] = httpConfigOptions[option]
      }
      return this.$http(config);
    },

   /*
    * Get the Diego Docker feature flag
    * When enabled, Docker applications are supported by Diego. When disabled, Docker applications will stop running.
    * It will still be possible to stop and delete them and update their configurations.
    * For detailed information, see online documentation at: http://apidocs.cloudfoundry.org/237/feature_flags/get_the_diego_docker_feature_flag.html
    */
    GetDiegoDockerFeatureFlag: function (params, httpConfigOptions) {
      var config = {};
      config.params = params;
      config.url = '/pp/v2/config/feature_flags/diego_docker';
      config.method = 'GET';

      for (var option in httpConfigOptions) {
        config[option] = httpConfigOptions[option]
      }
      return this.$http(config);
    },

   /*
    * Get the Private Domain Creation feature flag
    * When enabled, an organization manager can create private domains for that organization. When disabled, only admin users can create private domains.
    * For detailed information, see online documentation at: http://apidocs.cloudfoundry.org/237/feature_flags/get_the_private_domain_creation_feature_flag.html
    */
    GetPrivateDomainCreationFeatureFlag: function (params, httpConfigOptions) {
      var config = {};
      config.params = params;
      config.url = '/pp/v2/config/feature_flags/private_domain_creation';
      config.method = 'GET';

      for (var option in httpConfigOptions) {
        config[option] = httpConfigOptions[option]
      }
      return this.$http(config);
    },

   /*
    * Get the Route Creation feature flag
    * When enabled, a space developer can create routes in a space. When disabled, only admin users can create routes.
    * For detailed information, see online documentation at: http://apidocs.cloudfoundry.org/237/feature_flags/get_the_route_creation_feature_flag.html
    */
    GetRouteCreationFeatureFlag: function (params, httpConfigOptions) {
      var config = {};
      config.params = params;
      config.url = '/pp/v2/config/feature_flags/route_creation';
      config.method = 'GET';

      for (var option in httpConfigOptions) {
        config[option] = httpConfigOptions[option]
      }
      return this.$http(config);
    },

   /*
    * Get the Service Instance Creation feature flag
    * When enabled, a space developer can create service instances in a space. When disabled, only admin users can create service instances.
    * For detailed information, see online documentation at: http://apidocs.cloudfoundry.org/237/feature_flags/get_the_service_instance_creation_feature_flag.html
    */
    GetServiceInstanceCreationFeatureFlag: function (params, httpConfigOptions) {
      var config = {};
      config.params = params;
      config.url = '/pp/v2/config/feature_flags/service_instance_creation';
      config.method = 'GET';

      for (var option in httpConfigOptions) {
        config[option] = httpConfigOptions[option]
      }
      return this.$http(config);
    },

   /*
    * Get the Set User Roles feature flag
    * When enabled, Org Managers or Space Managers can add access roles by username.
    * In order for this feature to be enabled the CF operator must:
    * 1) Enable the `/ids/users/` endpoint for UAA
    * 2) Create a UAA `cloud_controller_username_lookup` client with the `scim.userids`
    * authority
    * For detailed information, see online documentation at: http://apidocs.cloudfoundry.org/237/feature_flags/get_the_set_user_roles_feature_flag.html
    */
    GetSetUserRolesFeatureFlag: function (params, httpConfigOptions) {
      var config = {};
      config.params = params;
      config.url = '/pp/v2/config/feature_flags/set_roles_by_username';
      config.method = 'GET';

      for (var option in httpConfigOptions) {
        config[option] = httpConfigOptions[option]
      }
      return this.$http(config);
    },

   /*
    * Get the Space Developer Environment Variable Visibility feature flag (experimental)
    * When enabled, space developers can do a get on the /v2/apps/:guid/env and /v3/apps/:guid/env end points.
    * When disabled, space developers can no longer do a get against these end points.
    * For detailed information, see online documentation at: http://apidocs.cloudfoundry.org/237/feature_flags/get_the_space_developer_environment_variable_visibility_feature_flag_(experimental).html
    */
    GetSpaceDeveloperEnvironmentVariableVisibilityFeatureFlagExperimental: function (params, httpConfigOptions) {
      var config = {};
      config.params = params;
      config.url = '/pp/v2/config/feature_flags/space_developer_env_var_visibility';
      config.method = 'GET';

      for (var option in httpConfigOptions) {
        config[option] = httpConfigOptions[option]
      }
      return this.$http(config);
    },

   /*
    * Get the Space Scoped Private Broker Creation feature flag (experimental)
    * When enabled, space developers can create space scoped private brokers.
    * When disabled, only admin users can create create space scoped private brokers.
    * For detailed information, see online documentation at: http://apidocs.cloudfoundry.org/237/feature_flags/get_the_space_scoped_private_broker_creation_feature_flag_(experimental).html
    */
    GetSpaceScopedPrivateBrokerCreationFeatureFlagExperimental: function (params, httpConfigOptions) {
      var config = {};
      config.params = params;
      config.url = '/pp/v2/config/feature_flags/space_scoped_private_broker_creation';
      config.method = 'GET';

      for (var option in httpConfigOptions) {
        config[option] = httpConfigOptions[option]
      }
      return this.$http(config);
    },

   /*
    * Get the Task Creation feature flag (experimental)
    * When enabled, space developers can create tasks. When disabled, only admin users can create tasks.
    * For detailed information, see online documentation at: http://apidocs.cloudfoundry.org/237/feature_flags/get_the_task_creation_feature_flag_(experimental).html
    */
    GetTaskCreationFeatureFlagExperimental: function (params, httpConfigOptions) {
      var config = {};
      config.params = params;
      config.url = '/pp/v2/config/feature_flags/task_creation';
      config.method = 'GET';

      for (var option in httpConfigOptions) {
        config[option] = httpConfigOptions[option]
      }
      return this.$http(config);
    },

   /*
    * Get the Unset User Roles feature flag
    * When enabled, Org Managers or Space Managers can remove access roles by username.
    * In order for this feature to be enabled the CF operator must:
    * 1) Enable the `/ids/users/` endpoint for UAA
    * 2) Create a UAA `cloud_controller_username_lookup` client with the `scim.userids`
    * authority
    * For detailed information, see online documentation at: http://apidocs.cloudfoundry.org/237/feature_flags/get_the_unset_user_roles_feature_flag.html
    */
    GetUnsetUserRolesFeatureFlag: function (params, httpConfigOptions) {
      var config = {};
      config.params = params;
      config.url = '/pp/v2/config/feature_flags/unset_roles_by_username';
      config.method = 'GET';

      for (var option in httpConfigOptions) {
        config[option] = httpConfigOptions[option]
      }
      return this.$http(config);
    },

   /*
    * Get the User Org Creation feature flag
    * When enabled, any user can create an organization via the API. When disabled, only admin users can create organizations via the API.
    * For detailed information, see online documentation at: http://apidocs.cloudfoundry.org/237/feature_flags/get_the_user_org_creation_feature_flag.html
    */
    GetUserOrgCreationFeatureFlag: function (params, httpConfigOptions) {
      var config = {};
      config.params = params;
      config.url = '/pp/v2/config/feature_flags/user_org_creation';
      config.method = 'GET';

      for (var option in httpConfigOptions) {
        config[option] = httpConfigOptions[option]
      }
      return this.$http(config);
    },

   /*
    * Set a feature flag
    * For detailed information, see online documentation at: http://apidocs.cloudfoundry.org/237/feature_flags/set_a_feature_flag.html
    */
    SetFeatureFlag: function (name, value, params, httpConfigOptions) {
      var config = {};
      config.params = params;
      config.url = '/pp/v2/config/feature_flags/' + name + '';
      config.method = 'PUT';
      config.data = value;

      for (var option in httpConfigOptions) {
        config[option] = httpConfigOptions[option]
      }
      return this.$http(config);
    }

  });
  /* eslint-enable camelcase */

})();
