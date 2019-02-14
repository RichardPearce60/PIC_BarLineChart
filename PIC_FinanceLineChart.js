line = function(scale, ref, stroke, dash) {
  return {
    type: 'line',
    data: {
      collection: 'lines'
    },
    settings: {
      coordinates: {
        major: { scale: 't' },
        minor: { scale, ref }
      },
      layers: {
        curve: 'monotone',
        line: {
          stroke,
          strokeWidth: 4,
          strokeDasharray: dash
        }
      }
    }
  };}

function myLabel(p1, p2) {
    if(p2=='Dec'){LabelValue=p1} else {LabelValue=''};
  return LabelValue   ;
}



  
const colors = {
    Actual: '#000046',
    Plan: '#000046',
    Budget: '#969696'
};






define([
        './js/picasso',
        './js/picasso-q'
    ],
    function (picasso, picassoQ) {
        picasso.use(picassoQ);
        return {
            definition: {
                type: "items",
                component: "accordion",
                items: {
                    dimensions: {
                        uses: "dimensions",
                        min: 1,
                        max: 1,
                    },
                    measure: {
                        uses: "measures",
                        min: 3,
                        max: 3,
                    },
                },
            },
            initialProperties: {
                qHyperCubeDef: {
                    qDimensions: [],
                    qMeasures: [],
                    qInitialDataFetch: [
                        {qWidth: 4, qHeight: 1000},
                    ],
                    qSuppressZero: false,
                    qSuppressMissing: true,
                }
            },
            support: {
                snapshot: true,
                export: true,
                exportData: false
            },
            paint: function ($element, layout) {
                if (!this.chart) {
                    this.chart = picasso.chart({
                        element: $element[0],
                        data: [],
                    });
                }
                
				console.log('Version 18');
				console.log("HyperCube", layout.qHyperCube);

                this.chart.update({
                    data: [{
                        type: "q",
                        key: "qHyperCube",
                        data: layout.qHyperCube,
                    }],
                    
					
					settings: {
						
						scales: {
							y: {
							  data: {fields: ['qMeasureInfo/0','qMeasureInfo/1','qMeasureInfo/2']},
							  invert: true,
							  include: [0],
							  min:0,
							  expand: 0.2
							},
							t: {
								data: {extract: {field: 'qDimensionInfo/0'}} ,
								expand: 0.2
							}
						},
					
					//data: {field: 'qDimensionInfo/0'}, Dim
					//data: {field: 'qMeasureInfo/1'}, Expression
					
				
               components: [
					{
						type: 'axis',
						dock: 'left',
						scale: 'y',
						settings: {
						  labels: {
							  fill: colors.Sales
						  }
						},
					},{
						type: 'axis',
						dock: 'bottom',
						scale: 't'
					},
					
					{ type: 'box', key: 'boxA',
						   
						data: {
							extract: {
							field: 'qDimensionInfo/0',
								props: {
									start: 0,
									end: {field: 'qMeasureInfo/1'} 
								}
							}
						},
							settings: {
								major: {scale: 't'},
								minor: {scale: 'y' },
							box:{
								fill: '#fff', // Optional
							}
						}
					},	

					{ type: 'box', key: 'boxB',
						   
						data: {
							extract: {
							field: 'qDimensionInfo/0',
								props: {
									start: 0,
									end: {field: 'qMeasureInfo/2'} 
								}
							}
						},
							settings: {
								major: {scale: 't'},
								minor: {scale: 'y' },
							box:{
								fill: '#fff', // Optional
							}
						}
					},
					
					{
						type: 'line',
							data: {
								extract: {
									field: 'qDimensionInfo/0',
									props: {
										minor: {field: 'qMeasureInfo/0'}
									}
								}
							},
						settings: {
	
							  coordinates: {
								major: { scale: 't' },
								minor: { scale: 'y'  }
							  },
							  layers: {
								curve: 'monotone',
								
								line: {
									stroke: '#000046',
									strokeWidth: 2
								}
							  }
						}
					 },
					 
					 {
						type: 'line',
							data: {
								extract: {
									field: 'qDimensionInfo/0',
									props: {
										minor: {field: 'qMeasureInfo/1'}
									}
								}
							},
						settings: {
	
							  coordinates: {
								major: { scale: 't' },
								minor: { scale: 'y'  }
							  },
							  layers: {
								curve: 'monotone',
								
								line: {
									stroke: '#000046',
									strokeWidth: 2,
									strokeDasharray: '10 10'
								}
							  }
						}
					 },
					 
					 {
						type: 'line',
							data: {
								extract: {
									field: 'qDimensionInfo/0',
									props: {
										minor: {field: 'qMeasureInfo/2'}
									}
								}
							},
						settings: {
	
							  coordinates: {
								major: { scale: 't' },
								minor: { scale: 'y'  }
							  },
							  layers: {
								curve: 'monotone',
								
								line: {
									stroke: '#969696',
									strokeWidth: 2
								}
							  }
						}
					 },
					 
					 
					 { type: 'labels',
						displayOrder: 4,
						settings: {
						  sources: [{
							component: 'boxA',
							selector: 'rect',
							strategy: {
							  type: 'bar',
							  settings: {
								fontSize: 16,
								fill: '#000',
								//align: 1,
								//justify:-0.01,
								//padding: 4,
								direction: 'top',
								labels: [{
								  placements: [{
									position: 'outside'
								  }],
								  
								  label:  node => myLabel(Math.round(node.data.end.value),node.data.label)
								  //label:  node => Math.round(node.data.end.value)
								  
								}]
							  }
							}
						  }]
						}
					},

					 { type: 'labels',
						displayOrder: 4,
						settings: {
						  sources: [{
							component: 'boxB',
							selector: 'rect',
							strategy: {
							  type: 'bar',
							  settings: {
								fontSize: 16,
								fill: '#000',
								//align: 1,
								//justify:0.1,
								//padding: 4,
								direction: 'top',
								labels: [{
								  placements: [{
									position: 'outside'
								  }],
								  
								  label:  node => myLabel(Math.round(node.data.end.value),node.data.label)
								  //label:  node => Math.round(node.data.end.value)
								  
								}]
							  }
							}
						  }]
						}
					}					
					
			
					 
				]
					
					
                }
            })
            }
        };

    });

