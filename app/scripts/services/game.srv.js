(function(){
    'use strict'
    /**
     * Created by EtaySchur on 08/04/2016.
     */


    angular
        .module('crossriderDemoApp')
        .service('GameService', GameService);

    function GameService(appConstants , $cookies) {

        var gameData = {
            moves : 0,
            numOfGames : 0,
            currentPlayer : 'X',
            board : [],
            users : {}
        };


        var wins = [7, 56, 448, 73, 146, 292, 273, 84],
            gameService = {
                initBoard           :   initBoard,
                setCell             :   setCell,
                getNumberOfMoves    :   getNumberOfMoves,
                checkForWin         :   checkForWin,
                setWinner           :   setWinner,
                initNewMatch        :   initNewMatch,
                initNewTournament   :   initNewTournament,
                isCellEmpty         :   isCellEmpty,
                setGameData         :   setGameData,
                togglePlayer        :   togglePlayer,
                endTournament       :   endTournament,
                clearData           :   clearData
            };
        ////////////////////////////////////////////////////////////////////////////////////////////////
        return gameService;

        function initBoard(){
            gameData.board = [];
            var indicator = 1;
            for (var i = 0; i < appConstants.BOARD_SIZE; i++) {
                var boardCell = {
                    value: null,
                    indicator: indicator
                };
                indicator += indicator;
                gameData.board.push(boardCell);
            }

            return gameData.board;
        }

        function togglePlayer( currentPlayer ){
            gameData.currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            setCookie('gameData' , gameData);
            return gameData.currentPlayer;
        }


        function isCellEmpty( cell ){
            return cell.value === null ? true : false;
        }


        function setCell(cell , currentPlayer) {
            console.log(" Setting Cell ",gameData);
            gameData.users[currentPlayer].score += cell.indicator;
            cell.value = currentPlayer;
            gameData.moves++;
            setCookie( 'gameData' , gameData);
            return true;
        }

        function setGameData(gameDataObject){
            gameData = gameDataObject;
        }

        function clearData(){
            gameData = {
                moves : 0,
                numOfGames : 0,
                currentPlayer : 'X',
                board : [],
                users : {}
            };

            return gameData;
        }



        function getNumberOfMoves() {
            return gameData.moves;
        }

        function checkForWin(currentPlayer) {
            if ( gameData.moves <= 4) {
                return false;
            }
            for (var i = 0; i < wins.length; i++) {
                if ((wins[i] & gameData.users[currentPlayer].score) === wins[i]) {
                    this.setWinner(currentPlayer);
                    return true;
                }
            }
            return false;
        }

        function setWinner(currentPlayer) {
            gameData.users[currentPlayer].wins++;
        }

        function initNewMatch(){
            gameData.board = initBoard();
            gameData.moves = 0;
            gameData.users['X'].score = 0;
            gameData.users['O'].score = 0;
            gameData.currentPlayer = 'X';
            gameData.numOfGames++;

            setCookie('gameData' , gameData);
            return {
                board : gameData.board ,
                currentPlayer : gameData.currentPlayer ,
                users : gameData.users
            };
        }

        function initNewTournament( usersInfo ){
            var users = {
                'X' : {
                    score : 0 ,
                    wins : 0 ,
                    name : usersInfo['X'].name
                } ,
                'O' : {
                    score : 0 ,
                    wins : 0 ,
                    name : usersInfo['O'].name
                }
            };
            gameData.numOfGames = 0;
            gameData.users = users;
        }

        function endTournament(){
            clearCookie('gameData')
        }

        function setCookie ( key , gameDataObject ){
            $cookies.putObject( key , gameDataObject );
        }

        function clearCookie ( key ){
            $cookies.remove(key);
        }
    }

})();