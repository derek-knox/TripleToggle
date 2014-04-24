$(function()
 {
   	var $tripleToggle = $("#tripleToggle"),
		$toggleSwitch = $("#toggleSwitch"),
		toggleRange = $tripleToggle.width(),
		switchRange = $toggleSwitch.width(),
		quadrants = [ { id: "1", state: "Earth", normX: 1, normY: .5 }, 
					  { id: "2", state: "Fire", normX: 0, normY: 0 },
	   				  { id: "3", state: "Water", normX: 0, normY: 1 },
	   				  { id: "4", state: "Earth", normX: 1, normY: .5 } ],
	   	quadrant = 2;
   
   	function updateState($quadrant){     
		quadrant = $quadrant.data("id");
	 	var targetPos = quadrants[quadrant - 1],
			targetX = targetPos.normX * toggleRange,
		 	targetY = targetPos.normY * toggleRange;
	 
	 	if(quadrant === 1 || quadrant === 4)
	   	{
			targetX -= switchRange;
			targetY -= switchRange - switchRange / 2;
	   	}
	 	else if(quadrant === 3)
	   		targetY -= switchRange;
	 
	 	$toggleSwitch.stop().animate({ 
	   		"left": targetX,
	   		"top": targetY}, 300, onUpdateStateComplete);
   	}

   	function onQuadrantClick(e){
		updateState($(e.target));
	}

   	function onUpdateStateComplete(){
   		$tripleToggle.trigger("statechanged", quadrants[quadrant - 1]);
   	}

   	//...

   	var $exampleLabel = $("#exampleLabel");
   	$tripleToggle.on("click", ".quadrant", onQuadrantClick);
   	$toggleSwitch.css( { "left": quadrants[quadrant - 1].normX, "top": quadrants[quadrant - 1].normY } );
   	$tripleToggle.on("statechanged", function(e, quadrantDatum){ $exampleLabel.text(quadrantDatum.state)});
   	$tripleToggle.trigger("statechanged", quadrants[quadrant - 1]);
 });