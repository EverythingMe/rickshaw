Rickshaw.namespace('Rickshaw.Graph.RangeSlider');

Rickshaw.Graph.RangeSlider = function(args) {

	var element = this.element = args.element;
	var graph = this.graph = args.graph;
	var defaultOptions = {

		range: true,
		min: graph.dataDomain()[0],
		max: graph.dataDomain()[1],
		values: [ 
			graph.dataDomain()[0],
			graph.dataDomain()[1]
		],
		slide: function( event, ui ) {

			graph.window.xMin = ui.values[0];
			graph.window.xMax = ui.values[1];
			graph.update();

			// if we're at an extreme, stick there
			if (graph.dataDomain()[0] == ui.values[0]) {
				graph.window.xMin = undefined;
			}
			if (graph.dataDomain()[1] == ui.values[1]) {
				graph.window.xMax = undefined;
			}
		}
	};
	
	// override default options with args.sliderOptions
	for (var k in args.sliderOptions) {
		defaultOptions[k] = args.sliderOptions[k];
	}

	$( function() {
		$(element).slider( defaultOptions );
	} );

	element[0].style.width = graph.width + 'px';

	graph.onUpdate( function() {

		var values = $(element).slider('option', 'values');

		$(element).slider('option', 'min', graph.dataDomain()[0]);
		$(element).slider('option', 'max', graph.dataDomain()[1]);

		if (graph.window.xMin == undefined) {
			values[0] = graph.dataDomain()[0];
		}
		if (graph.window.xMax == undefined) {
			values[1] = graph.dataDomain()[1];
		}

		$(element).slider('option', 'values', values);

	} );
};

