<?php

//Name of product used by the socle
define('PRODUCT', 'diamonds-mines');

$gameOptions = array(
	'duration' => 80,
	'pointEarned' => 2,
    'pointLost' => 2,
	'pointToLevel1' => 300,
    'winningLevel' =>1,
    'timingTemps'=> false,
    'percentToNextLevel' => 1.5,
    'life' => 1,  // baskets number too
    'pointBonus' => 10,      

    //Here You can add new specific parameters
    //initial basket velocity
    'vx0' 					=> 60,
    // gravity of diamonds (balls)
    'gravityY'				=> 1200,
    // number of diamonds in basket to score a bonus
    'n_diamonds_for_bonus' 	=> 5

);

//REGIEREPLACE
