angular.module('system').factory('menuService', [
  '$rootScope',
  '$state',
  '$window',
  'routes',
  function($rootScope, $state, $window, routes) {

    var processNodes = function(nodes, parentNode) {
      _.each(nodes, function(node) {
        node.parent = parentNode;
        if (node.childNodes && node.childNodes.length > 0) processNodes(node.childNodes, node);
      });
    };

    var deactivateNodes = function(nodes) {

      _.each(nodes, function(node) {
        node.active = false;
        if (node.childNodes && node.childNodes.length > 0) {
          deactivateNodes(node.childNodes);
        }
      });

    };

    var getActiveNode = function(nodes, state) {
      var activeNode = null;

      _.each(nodes, function(node) {
        if (activeNode) return activateNode;
        if (node.state === state) {
          activeNode = node;
        } else if (node.childNodes && node.childNodes.length > 0) {
          activeNode = getActiveNode(node.childNodes, state);
        }
      });

      return activeNode;
    };

    var getActiveRootNode = function(activeNode) {
      if (activeNode.parent) {
        return getActiveRootNode(activeNode.parent);
      } else return activeNode;
    };

    var activateNode = function(nodes, state) {
      var activeNode = getActiveNode(nodes, state);
      if (activeNode) activeNode.active = true;

      return activeNode;
    };

    var activateParentNodes = function(node) {
      if (node.parent) {
        node.parent.active = true;
        activateParentNodes(node.parent);
      }
    };

    var addGroupMenuNodes = function(menu) {
      var groupMenuNodes = [{
        title: 'Company',
        icon: 'fa fa-building-o',
        state: routes.userCompanyDashboard,
        childNodes: [{
          title: 'Dashboard',
          icon: 'fa fa-dashboard',
          state: routes.userCompanyDashboard
        }, {
          title: 'Foundation',
          icon: 'fa fa-cubes',
          state: 'app.company.foundation'
        }, {
          title: 'People',
          icon: 'fa fa-users',
          state: 'app.company.people',
          childNodes: [{
            title: 'Ownership',
            icon: 'fa fa-dashboard',
            state: 'app.company.people.ownership'
          }, {
            title: 'Management',
            icon: 'fa fa-dashboard',
            state: 'app.company.people.management'
          }]
        }, {
          title: 'Docs',
          icon: 'fa fa-file-word-o',
          state: 'app.company.docs'
        }, {
          title: 'Users',
          icon: 'fa fa-paw',
          state: 'app.company.users'
        }]
      }];

      processNodes(groupMenuNodes);

      menu.nodes.push(groupMenuNodes[0]);
    };

    var removeGroupMenuNodes = function(menu) {
      var companyNode = _.find(menu.nodes, function(node) {
        return node.state === 'app.company';
      });

      var indexOfcompanyNode = _.indexOf(menu.nodes, companyNode);

      menu.nodes.splice(indexOfcompanyNode, 1);
    };

    return {
      init: function() {

        var baseTitle = 'Through Company';

        var menuNodes = [{
          title: 'Dashboard',
          icon: 'fa fa-user',
          state: routes.userDashboard,
          childNodes: [{
            title: 'Dashboard',
            icon: 'fa fa-dashboard',
            state: routes.userDashboard
          }, {
            title: 'Settings',
            icon: 'fa fa-gear',
            state: routes.userSettings
          }]
        }];

        processNodes(menuNodes);

        var activeNode = activateNode(menuNodes, $state.current.name);
        var activeRootNode = null;

        if (activeNode) {
          $window.document.title = baseTitle + ' | ' + activeNode.title;
          activeRootNode = getActiveRootNode(activeNode);
        }

        var menu = {
          nodes: menuNodes,
          activeNode: activeNode,
          activeRootNode: activeRootNode
        };

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

          // if (toState.name.indexOf('app.company') === 0 && fromState.name.indexOf('app.company') !== 0) { //add company nodes if navigating to a company page
          //   addGroupMenuNodes(menu);
          // }
          // if (fromState.name.indexOf('app.company') === 0 && toState.name.indexOf('app.company') !== 0) {
          //   removeGroupMenuNodes(menu);
          // }

          deactivateNodes(menu.nodes);

          var activeNode = activateNode(menu.nodes, toState.name);

          if (activeNode) {
            activateParentNodes(activeNode);
            menu.activeNode = activeNode;
            menu.activeRootNode = getActiveRootNode(activeNode);
            $window.document.title = baseTitle + ' | ' + activeNode.title;
          } else {
            menu.activeNode = null;
            menu.activeRootNode = null;
          }
        });

        return menu;

      }
    };

  }
]);
