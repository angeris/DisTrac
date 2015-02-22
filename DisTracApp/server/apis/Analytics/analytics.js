/* API: Model backend for disease analytics. Can be called with specific information which is then
 * parsed using a stochastic model / the SIRE model.
 */

//Constants 

var EARTH_RADIUS = 6371000;

//Variables

var s_model = [];

var l_cities = [], N;

var tran_matrix, t_sparse;
var SI_self_vec, IR_self_vec;

var S_vec, I_vec, R_vec;

var l_reps = [];

//Methods

Meteor.methods({
    reevaluateModel: function() {
        evalModel();
    },
    initializeModel: function() {
        initModel();
        evalModel();
    }
});


//Model procedures
function initModel() {
    //This should be called on server load.
    var l_cities_ = Cities.find({}, {
        sort: {population: -1},
        limit: 10
    });
    
    
    l_cities_.forEach( function(l_city) {
        l_cities.push(l_city);
    });
    
    N = l_cities.length;
    
    SI_self_vec = zeros(N);
    IR_self_vec = zeros(N);
    
    tran_matrix = zeros([N, N]);
    
    S_vec = zeros([N]);
    I_vec = zeros([N]);
    R_vec = zeros([N]);
    
    for(i=0; i<N; i++) {
        S_vec[i] = 1;
        SI_self_vec[i] = .5;
        IR_self_vec[i] = .5;
    }
    
    console.log('S: ' + numeric.prettyPrint(S_vec));
    console.log('I: ' + numeric.prettyPrint(I_vec));
    console.log('R: ' + numeric.prettyPrint(R_vec));
    
    //Compute distances
    var i, j;
    
    for(i=0; i<N; i++) {
        var lat1 = l_cities[i].location.coordinates[0];
        var lon1 = l_cities[i].location.coordinates[1];
        
        for(j=0; j<i; j++) {
            var lat2 = l_cities[j].location.coordinates[0];
            var lon2 = l_cities[j].location.coordinates[1];
            
            tran_matrix[i][j] = tran_matrix[j][i] = Math.exp(-0.000005*latlongdist(lat1, lon1, lat2, lon2));
        }
    }
    
    //Normalize the matrix columns.
    var total;
    
    for(i=0; i<N; i++) {
        total = 0;
        for(j=0; j<N; j++) {
            total += tran_matrix[i][j];
        }
        for(j=0; j<N; j++) {
            tran_matrix[i][j] /= total;
        }
    }
    
//    //Make Sparse
//    t_sparse = numeric.ccsSparse(tran_matrix);
}

function evalModel() {
    //Reevaluate model from db when new information is given.

    var i;
    
    //Build the Infected matrix.
    for(i=0; i<N; i++) {
        var name = l_cities[i].asciiname;
        var rep = Reports.find({ asciiname: name}).fetch();
        
        if(_.isEmpty(rep)) continue;
        
        I_vec[i] = rep[0].disCount/l_cities[i].population;
        S_vec[i] = 1- I_vec[i];
    }
    
    
    for(i=0; i<40; i++) {
        markovUpdate();
    }
    
}

function markovUpdate() {
    //First part, self-update
    var i;
    for(i=0; i<N; i++) {
        R_vec[i] += IR_self_vec[i]*I_vec[i];
        I_vec[i] = I_vec[i]*SI_self_vec[i]*S_vec[i] + (1-IR_self_vec[i])*I_vec[i];
        S_vec[i] = S_vec[i] - SI_self_vec[i]*I_vec[i]*S_vec[i];
    }
    
    //Second part, Linear discrete model
    R_vec = numeric.dot(tran_matrix, R_vec);
    I_vec = numeric.dot(tran_matrix, I_vec);
    S_vec = numeric.dot(tran_matrix, S_vec);
    
        
    console.log('S: ' + numeric.prettyPrint(S_vec));
    console.log('I: ' + numeric.prettyPrint(I_vec));
    console.log('R: ' + numeric.prettyPrint(R_vec));
    
}

//Internal procedures
function zeros(dimensions) {
    var array = [];

    for (var i = 0; i < dimensions[0]; i++) {
        array.push(dimensions.length == 1 ? 0 : zeros(dimensions.slice(1)));
    }

    return array;
}

function latlongdist(lat1, long1, lat2, long2) {
    lat1 *= Math.PI/180;
    lat2 *= Math.PI/180;
    long1 *= Math.PI/180;
    long2 *= Math.PI/180;
    
    var sd = Math.sin((lat2-lat1)/2);
    var sl = Math.sin((long2-long1)/2);
    var a = sd*sd + Math.cos(lat1)*Math.cos(lat2)*sl*sl;
    
//    if(a<0) console.log('a is negative with value '+ a);
    
    var c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return EARTH_RADIUS*c;
}