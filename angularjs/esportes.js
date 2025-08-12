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
            
            const response = await $http.get('https://api.ckjoga.com.br/sports'); 

            const apiSports = response.data.data || [];

	        $scope.sports = apiSports.map(sport => ({
	          
	            nome: sport.name,	            
	            cor: sport.color
	        }));     
            
            console.log($scope.sports);            
            
        } 
        catch (err)
        {            
            // Carrega dados mockados em caso de erro
            $scope.carregarMock();   
            
        } 
        finally
        {        	
            $scope.loading = false;
            
        }
    }

    // Função para carregar dados mockados (fallback)
    $scope.carregarMock = function() {
        $scope.sports = [
            {
                nome: 'Futebol',
                cor: 'green-700',  
            },
            {
                name: 'Basquete',
                cor: 'green-900',                
            }
        ];
        
        console.log($scope.sports);
    };

    $scope.carregarSports();

}]);

