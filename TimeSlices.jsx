{
    var numOfSlices = 240; //the number of slices in the 1080 or 720 crop

	var zoomedWindowHight = 1440 // 960 for 720 and 1440 for 1080

    var activeItem = app.project.activeItem;
    app.beginUndoGroup("Timeslice");

    if (activeItem == null || !(activeItem instanceof CompItem)){
		alert("Select one layer before running this script");
    } else {
        if (activeItem.selectedLayers.length != 1) {
            alert("Select one layer before running this script");
        } else {
            activeItem.duration = (activeItem.selectedLayers[0].outPoint - activeItem.selectedLayers[0].inPoint )* 3;

			var actualslicenum = activeItem.height/zoomedWindowHight * numOfSlices ;
            for (var i = 0; i <= actualslicenum -1 ; i++){
                var theLayer = activeItem.selectedLayers[0];
                var theNewLayer = theLayer.duplicate();
                theNewLayer.startTime = theNewLayer.startTime + (theNewLayer.outPoint -(theNewLayer.outPoint / actualslicenum * i * activeItem.height/zoomedWindowHight ));

                var shapeHeight = activeItem.height;
                var compWidth = activeItem.width;
                var shapeTop =0;
                var sliceWidth = compWidth / actualslicenum ;
                var shapeLeft =   (sliceWidth * i) ;  //remove the "compWidth -" for right to left movement
                var shapeRight = (sliceWidth * (i+1) +1 ); //remove the "compWidth -" for right to left movement
                newMask = theNewLayer.Masks.addProperty("Mask");
                myMaskShape = newMask.property("maskShape");
                myShape = myMaskShape.value;
                myShape.vertices = [[shapeLeft,0],[shapeLeft,shapeHeight],[shapeRight,shapeHeight],[shapeRight,0]];
                myShape.closed = true;
                myMaskShape.setValue(myShape);
            }
           // var theLayer = activeItem.selectedLayers[0];
           // var theNewLayer = theLayer.duplicate();
           // theNewLayer.startTime = theLayer.outPoint;
		   activeItem.selectedLayers[0].delete;
		}
	}
	writeLn("All Done");
    app.endUndoGroup();
}
