//Constants

var EARTH_RADIUS = 6371000;

//Variables
var s_model = [];

var l_cities, N;

var tran_matrix, t_sparse;
var SI_self_vec, IR_self_vec;

var S_vec, I_vec, R_vec;

//Model procedures
s_model.initModel = function() {
    //This should be called on server load.
    l_cities = geo_cities.find({ population: {$gt : 50000} });
    
    N = l_cities.length;
    
    SI_self_vec = zeros(N);
    IR_self_vec = zeros(N);
    
    tran_matrix = zeros([N, N]);
    
    S_vec = zeros(N);
    I_vec = zeros(N);
    R_vec = zeros(N);
    
    //Compute distances
    var i, j;
    
    for(i=0; i<N; i++) {
        var lat1 = l_cities[i].location.latitude;
        var lon1 = l_cities[i].location.longitude;
        
        for(j=0; j<i; j++) {
            var lat2 = l_cities[j].location.latitude;
            var lon2 = l_cities[j].location.longitude;
            
            tran_matrix[i][j] = tran_matrix[j][i] = Math.exp(-0.005*latlongdist(lat1, lon1, lat2, lon2));
        }
    }
    
    console.log(numeric.prettyPrint(tran_matrix));
    
//    //Make Sparse
//    t_sparse = numeric.ccsSparse(tran_matrix);
};

s_model.evalModel = function() {
    //Reevaluate model from db when new information is given.
};



// Mathematical models
// I need the cases reported!

s_model.markovUpdate = function() {
    //First part, self-update
    var i;
    for(i=0; i<N; i++) {
        R_vec[i] += IR_self_vec[i]*I_vec[i];
        I_vec[i] = SI_self_vec[i]*S_vec[i] + (1-IR_self_vec[i])*I_vec[i];
        S_vec[i] = (1-SI_self_vec[i])*S_vec[i];
    }
    
    //Second part, Markov model
    R_vec = numeric.dot(tran_matrix, R_vec);
    I_vec = numeric.dot(tran_matrix, I_vec);
    S_vec = numeric.dot(tran_matrix, S_vec);
};


//Internal procedures
function zeros(dimensions) {
    var array = [];

    for (var i = 0; i < dimensions[0]; ++i) {
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
    var a = sd*sd*Math.cos(lat1)*Math.cos(lat2)*sl*sl;
    
    var c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return EARTH_RADIUS*c;
}