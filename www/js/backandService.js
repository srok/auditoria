angular.module('starter')

// Backand data framework config
.config(function(BackandProvider) {
    BackandProvider.setAppName('pluginsApp');
    BackandProvider.setAnonymousToken('df106d7f-192c-48e6-96f2-36983fe221f3');
})

.service('backandService', function($http, Backand) {

    var baseUrl = '/1/objects/';
    var objectName = 'mapObjects/';

    function getUrl() {
        return Backand.getApiUrl() + baseUrl + objectName;
    }


    //console.log()

    function getUrlForId(id) {
        return getUrl() + id;
    }

    getTodos = function() {
        var serviceURL = getUrl();
        return $http({
            method: 'GET',
            url: getUrl(),
            params: {
                sort: {
                    fieldName: 'id',
                    order: 'desc'
                }
            }

        });
    };

    addTodo = function(todo) {
        return $http.post(getUrl(), todo);
    }

    deleteTodo = function(id) {
        return $http.delete(getUrlForId(id));
    };

    return {
        getTodos: getTodos,
        addTodo: addTodo,
        deleteTodo: deleteTodo
    }

});