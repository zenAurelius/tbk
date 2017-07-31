/// <reference path="../../../typings/index.d.ts" />
declare var require: any
var $ = require('jquery');
export class TbkMap implements ng.IDirective {
	restrict = 'A';
         
    link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
        	element = $(element);
			element.height(500);
        	element.vectorMap({
                map: 'world_mill_en',
                backgroundColor: '#D0E4F7',
                zoomButtons: true,
                zoomOnScroll: false,
                regionStyle: {
                    initial: {
                        fill: '#000',
                        "fill-opacity": 1,
                        stroke: 'none',
                        "stroke-width": 1,
                        "stroke-opacity": 1
                    },
                    selected: {
                    	stroke: 'red',   
                        "stroke-width": 1,
                        "stroke-opacity": 1
                    }
                },
                series: {
					regions: [{
						values: [],
						scale: ['#F58484', '#FB0000'],
						normalizeFunction: 'linear',
						min:1, max:5
						}]
				},
                regionsSelectable:false,
                onRegionTipShow: function(e, el, code){
                	var nb = $('#map').vectorMap('get', 'mapObject').series.regions[0].values[code];
        			if(nb) {
        				el.html(el.html() + ' - ' +  $('#map').vectorMap('get', 'mapObject').series.regions[0].values[code]);
        			} else {
        				el.html(el.html());
        			}
        			},
				regionsSelectableOne:false
            });
        	scope.$watch('travelsCtrl.mapData', function(data){
        		var mapObject = $('#map').vectorMap('get', 'mapObject');
        		mapObject.clearSelectedRegions();
        		mapObject.series.regions[0].clear();
        		mapObject.series.regions[0].setValues(data);       		
        	});
        }
	static factory(): ng.IDirectiveFactory {
		const directive = () => new TbkMap();
		return directive;
	}
}
