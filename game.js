var turn = 1;
var gridMatrix = Array(3);

gridMatrix['A'] = Array(3);
gridMatrix['B'] = Array(3);
gridMatrix['C'] = Array(3);

gridMatrix['A'][0] = 0;
gridMatrix['A'][1] = 0;
gridMatrix['A'][2] = 0;

gridMatrix['B'][0] = 0;
gridMatrix['B'][1] = 0;
gridMatrix['B'][2] = 0;

gridMatrix['C'][0] = 0;
gridMatrix['C'][1] = 0;
gridMatrix['C'][2] = 0;

$(document).ready(function(){
	$("#btn_init_game").click(function(){

		//validar digitação dos nomes
		if($("#player1_name_input").val() == ''){
			alert('apelido do jogador 1 não foi preenchido');
			return false;
		}

		if($("#player2_name_input").val() == ''){
			alert('apelido do jogador 2 não foi preenchido');
			return false;
		}

		//exibir nomes
		$("#player1_name").html($("#player1_name_input").val());
		$("#player2_name").html($("#player2_name_input").val());

		//controla visualização das divs
		$("#initial_page").hide();
		$("#game").show();


	});

	$(".grid").click(function(){
		var id_clicked_field = this.id;
		$('#'+id_clicked_field).off();
		move(id_clicked_field);
	});

	function move(id){
		var icon = "";
		var point = 0;

		//controlar vez de cada jogador
		if((turn%2) == 1){
			//vez do jogador 1
			icon = 'url("img/marcacao_1.png")';
			point = 1;
		}else{
			//vez do jogador 2
			icon = 'url("img/marcacao_2.png")';
			point = -1;
		}

		turn++;
		$('#'+id).css('background-image', icon);

		var split = id.split('-');
		var row = split[0];
		var column = split[1];

		gridMatrix[row][column] = point;

		verify();	
	}

	function verify(){
		//verifica na horizontal
		var points = 0;
		for(var i = 0; i<3; i++){
			points = points + gridMatrix['A'][i];
		}

		winner(points);

		var points = 0;
		for(var i = 0; i<3; i++){
			points = points + gridMatrix['B'][i];
		}

		winner(points);

		var points = 0;
		for(var i = 0; i<3; i++){
			points = points + gridMatrix['C'][i];
		}

		winner(points);

		//verifica na vertical
		for(var j = 0; j<3; j++){
			points = 0;
			points += gridMatrix['A'][j];
			points += gridMatrix['B'][j];
			points += gridMatrix['C'][j];

			winner(points);
		}

		//verifica na diagonal 1
		points = 0;
		points = gridMatrix['A'][0] + gridMatrix['B'][1] + gridMatrix['C'][2];
		winner(points);

		//verifica na diagonal 2
		points = 0;
		points = gridMatrix['A'][2] + gridMatrix['B'][1] + gridMatrix['C'][0];
		winner(points);
	}

	function winner(points){
		if(points == 3){
			var jogador1 = $("#player1_name_input").val();
			alert(jogador1 + " venceu");
			$(".grid").off();

		}else if(points == -3){
			var jogador2 = $("#player2_name_input").val();
			alert(jogador2 + " venceu");
			$(".grid").off();
		}
	}
})