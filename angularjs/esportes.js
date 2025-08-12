var app = angular.module('sportsApp', []);

app.controller("SportsController", ['$scope', '$http', '$timeout', 
	function($scope, $http, $timeout){

	
    $scope.loading = true;
    $scope.error = null;
    $scope.sports = [];
    $scope.categories = [];
    
   
    $scope.carregarSports = async function() 
    {
        try 
        {
            $scope.loading = true;
            $scope.error = null;            
            
            const response = await $http.get('https://api.cjoga.com.br/sports');            
            
            console.log(response);            
            
        } 
        catch (err)
        {
            console.error('Erro ao carregar esportes:', err);
            
            // Tratamento diferente para diferentes tipos de erro
            if (err.status === 404) {
                $scope.error = 'Endpoint da API não encontrado.';
            } else if (err.status === 0) {
                $scope.error = 'Não foi possível conectar ao servidor. Verifique sua conexão.';
            } else if (err.data && err.data.message) {
                $scope.error = `Erro na API: ${err.data.message}`;
            } else {
                $scope.error = 'Ocorreu um erro ao carregar os esportes. Tente novamente mais tarde.';
            }     
            
        } 
        finally
        {
            $scope.loading = false;
            
        }
    }

    $scope.carregarSports();

}]);

