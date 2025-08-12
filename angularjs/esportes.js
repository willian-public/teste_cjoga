var app = angular.module('sportsApp', []);

app.controller("SportsController", ['$scope', '$http', '$timeout', 
	function($scope, $http, $timeout){

	
    $scope.loading = true;
    $scope.error = null;
    $scope.sports = [];
      
   
    $scope.carregarSports = async function() 
    {
        try 
        {
            $scope.loading = true;
            $scope.error = null;            
            
            const response = await $http.get('https://api.cjoga.com.br/sports'); 

            const apiSports = response.data.data || [];

	        $scope.sports = apiSports.map(sport => ({
	          
	            nome: sport.name,	            
	            cor: sport.color
	        }));     
            
            console.log($scope.sports);            
            
        } 
        catch (err)
        {
            console.error('Erro ao carregar esportes:', err);            
            
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

