/*jslint regexp: true, vars: true, white: true, browser: true */
/*jshint nonstandard: true, browser: true, boss: true */
/*global jQuery */

var afficherMenu = function(){
	var $menu = $("#menu")
	if( $menu.attr('class')==='open'){
		$menu.removeAttr('class');
		$('#blocMoved').animate({left: "0px"},700);
		$('#onglets').animate({right: "10px"},700);

	}else{
		$menu.attr('class', 'open');
		$('#blocMoved').animate({left: "145px"},700);
		$('#onglets').animate({right: "-135px"},700);
	}
};

var recupBudget = function($rParams, $jsonBudget){
	var $param, budget;
	$param=$rParams.split('-');
	for( var $i in $jsonBudget){
		if($param[0] == $i){
			$budget = $jsonBudget[$i];
		}
	}
	return $budget;
}




