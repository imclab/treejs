
loaded = false;

function imgLoad(){
        imgTexture = THREE.ImageUtils.loadTexture( "assets/depthImages/mothOnly.png" );

       imagedata = getImageData( imgTexture.image );

       color = getPixel( imagedata, 10, 10 );
       loaded = true;
}

sc1 = {
    
    setup:function(){

        lineTo = false;

        countUp = 0;

        geo = new THREE.CylinderGeometry( .1,.1,1);
        mat = new THREE.MeshLambertMaterial({color:0x222222});
        ball = sphere(.1);

        // sph = new sphere(1);
        // scene.add(sph);

        // node = new Node();
        // node.makeWalls();

        cells = [];
        blobs = [];

        w = 60;
        h = 60;

        cells[-1]=new Node();
        cells[-1].visited = true;

        var prnt = new THREE.Object3D();
        scene.add(prnt);

        // bob = new Node();
        // scene.add(bob);
        // bob.makeWalls();
        // scl(bob.topParent,100);
        // bob.update([1,1,1,0]);

        for(var i = 0 ; i < h; i++){

            // var row = [];

            for(var j = 0 ; j < w ; j++){

                var node = new Node();
                node.makeWalls(i,j);


                num = j+i*w;
                node.id=num;


                // console.log(num);

                var nb = [];

                nb.push(num+1);
                nb.push(num+w);
                nb.push(num-1);
                nb.push(num-w);

                for(var k = 0 ; k < nb.length ; k++){
                    if(nb[k]<0||nb[k]>(w*h)-1)
                        nb[k]=-1;
                    // if(nb[k]%10==0)
                    //     nb[k]=-1;
                    if(j==0)
                        nb[2]=-1;
                    if(j==h-1)
                        nb[0]=-1;
                }

                node.thisOne = num;
                prnt.add(node.topParent);
                node.neighbors = [nb[0],nb[1],nb[2],nb[3]];

                cells.push(node);

            }
            // cells.push(row);
        }
        // prnt.add(sph);
       

        var stack = [];

        frameRate = 1;
        // imgLoad();

        // if(loaded){

        // colors = [];

        // for(var i = 0 ; i < 1024 ; i++){
        //     var row = [];
        //     for(var j = 0 ; j < 1024 ; j++){
        //         var c = getPixel(imagedata,i,j);
        //         row.push(c.r);
        //     }
        //     colors.push(row);
        // }

        // tree = new TREE();

        // frameRate = 1;

        // for(var i = -5 ; i < 10 ; i++){
        //     ruler = new THREE.Mesh(new THREE.BoxGeometry(.99,1,.1),new THREE.MeshLambertMaterial());
        //     ruler.position.z = -1;
        //     ruler.position.x = i
        //     scene.add(ruler);
        // }

        // camera.fov=10;

        // invertColor();

        sph = new THREE.Line(new THREE.Geometry(),new THREE.LineBasicMaterial({color:0x888888}));
        
        // prnt.add(sph);
         scl(prnt,3);
        prnt.scale.z=10;
        prnt.position.x=-45;
        prnt.position.y=-45;

        for(var i = 0 ; i < cells.length*10 ; i++){
            sph.geometry.vertices.push(new THREE.Vector3(0,0,1));
            sph.geometry.verticesNeedUpdate = true;
        }
        // var deep = 0;
        // for(var k = 0 ; k < 4 ; k++){
        //     sph.geometry.vertices.push(new THREE.Vector3(0,0,.2));
        //     for(var i = 0 ; i < 2000 ; i++){
        //         // sph.geometry.faces.push(new THREE.Face3(0,0,0));
        //         for(var j = 0 ; j < 3 ; j++){
        //             sph.geometry.vertices.push(new THREE.Vector3(
        //                 Math.sin(i*.1)*i*.0015,
        //                 Math.cos(i*.1)*i*.0015,
        //                 -Math.abs(
        //                     noise(Math.sin(i*.1)*i*.001,Math.cos(i*.1)*i*.001,0))
        //                 *(k+1)*.3
        //                 ));
        //             if(sph.geometry.vertices[sph.geometry.vertices.length-1].z<deep){
        //                 deep = sph.geometry.vertices[sph.geometry.vertices.length-1].z;
        //                 // console.log(deep);
        //             }
        //         }
        //     }
        //     var vert = sph.geometry.vertices[sph.geometry.vertices.length-1];
        //     sph.geometry.vertices.push(new THREE.Vector3(vert.x,vert.y,.2));
            
        // }

        // var deep = 0;


        

        up = 0;
        upf = 0;

        // console.log(sph.geometry.vertices.length + " " + sph.geometry.faces.length);

        // }
        },
    
    draw:function(time){

        if(varR){
            pathFind(cells,cells[0],[]);
        }
        if(varW){

            for(var i = 0 ; i < cells.length ; i++){
                var nd = cells[i];
                sph.geometry.vertices[i].x = nd.posX;
                sph.geometry.vertices[i].y = nd.posY;
                sph.geometry.vertices[i].z = .2;

                sph.geometry.verticesNeedUpdate = true;
            }
            varW = false;

        }
        if(varT){
            if(visitCheck(cells).length>0)
                pathFind(cells,visitCheck(cells)[0],[]);
            else
                varT=false;
        }
        if(varE){
            // saveSBP(sph.geometry.vertices,"hot");
            savePS(sph.geometry.vertices,"hot");

            console.log('hi');
            varE=false;
        }
        if(varY){
            // document.write(saveToSBP(sph.geometry.vertices));
            console.log(sph);
            // varY=!varY;
        
        // for(var k = 0 ; k<3 ; k++){
            // console.log(up+"up");
            var end = sph.geometry.vertices.length-1;

            for(var i = 0 ; i < sph.geometry.vertices.length-1 ; i++){
                var vert = sph.geometry.vertices[i];
                vert.x = sph.geometry.vertices[i+1].x;
                vert.y = sph.geometry.vertices[i+1].y;
                vert.z = sph.geometry.vertices[i+1].z;
            }

            sph.geometry.vertices[end].x = omouseX*width/2;
            sph.geometry.vertices[end].y = -omouseY*height/2;
            sph.geometry.vertices[end].z = 0;

            // cntr++;

            // console.log(cntr + " " + up);

            // if(k==2){
            //     var amt = upf;
            //     sph.geometry.faces[upf].a = up-1
            //     sph.geometry.faces[upf].b = up+1
            //     sph.geometry.faces[upf].c = up+2;
            //     upf+=1;
            //     // console.log(upf+"upf");
            //     // if(upf>sph.geometry.faces.length-1)
            //     //     upf=0;
            // }

            // if(cntr>2)
            //     cntr=0;

            // console.log(sph.geometry);
            // sph.geometry.faces.needsUpdate = true;

            sph.geometry.verticesNeedUpdate = true;
            // sph.geometry.elementsNeedUpdate = true;

            
            up++;
            if(up>sph.geometry.vertices.length-1){//} || upf>sph.geometry.faces.length){
                // sph.geometry.faces[upf-1].a = up
                // sph.geometry.faces[upf-1].b = up+1
                // sph.geometry.faces[upf-1].c = up+2;
                up=0;
                upf=0;
            }
           } 
           
        // }

        // console.log(sph);

    }
}

function saveToSBP(arr){

    var output = "";
    for(var i = 0 ; i < arr.length ; i++){
        output+="M3,"+arr[i].x+","+arr[i].y,+","+arr[i].z+"\n";
    }
    return output;
}

function saveToPS(arr){

    var output = "";
    for(var i = 0 ; i < arr.length ; i++){
        if(arr[i].lineTo)
            output+=arr[i].x+" "+arr[i].y,+" lineto"+"\n";
        else
            output+=arr[i].x+" "+arr[i].y,+" moveto"+"\n";

    }
    return output;
}

function findMin(arr){

    var minX = 0;
    var minY = 0;
    var minZ = 0;

    for(var i = 0 ; i < arr.length ; i++){
        if(minX>arr[i].x)
            minX = arr[i].x;
        if(minY>arr[i].y)
            minY = arr[i].y;
        if(minZ>arr[i].z)
            minZ = arr[i].z;
    }

    var ra = [minX,minY,minZ];
    return ra;
}

function saveSBP(arr,name) {

    // var scaleOut = outputScale || 1;

    // var name = name || "tree.obj";

    var minX = 0;
    var minY = 0;
    var minZ = 0;

    for(var i = 0 ; i < arr.length ; i++){
        if(minX>arr[i].x)
            minX = arr[i].x;
        if(minY>arr[i].y)
            minY = arr[i].y;
        if(minZ>arr[i].z)
            minZ = arr[i].z;
    }

    MinX = minX;
    MinY = minY;

    var output = "";

    console.log(MinX);
    console.log(MinY);
    console.log(minZ);

    for(var i = 0 ; i < arr.length ; i++){

        var offX = arr[i].x-MinX;
        var offY = arr[i].y-MinY;
        output+="M3,"+offX.toFixed(4);
        output+=","  +offY.toFixed(4);
        output+=","  +arr[i].z.toFixed(4);
        output+='\n';
    }
    // return output;
    // document.write(output);
    console.log("hio");
    // alert("saved!");
    var blob = new Blob([output], {type: "text/plain;charset=ANSI"});
    saveAs(blob, name);
}


function savePS(arr,name) {

    // var scaleOut = outputScale || 1;

    // var name = name || "tree.obj";

    var minX = 0;
    var minY = 0;
    var minZ = 0;

    for(var i = 0 ; i < arr.length ; i++){
        if(minX>arr[i].x)
            minX = arr[i].x;
        if(minY>arr[i].y)
            minY = arr[i].y;
        if(minZ>arr[i].z)
            minZ = arr[i].z;
    }

    MinX = minX;
    MinY = minY;

    var output = "";

    console.log(MinX);
    console.log(MinY);
    console.log(minZ);

    for(var i = 0 ; i < arr.length ; i++){

        var offX = (arr[i].x-MinX)*10;
        var offY = (arr[i].y-MinY)*10;

        if(arr[i].lineTo)
            output+=offX.toFixed(4)+" "+offY.toFixed(4)+" lineto"+"\n";
        else
            output+=offX.toFixed(4)+" "+offY.toFixed(4)+" moveto"+"\n";

    }
    // return output;
    // document.write(output);
    console.log("hio");
    // alert("saved!");
    var blob = new Blob([output], {type: "text/plain;charset=ANSI"});
    saveAs(blob, name);
}


function getImageData( image ) {

    var canvas = document.createElement( 'canvas' );
    canvas.width = image.width;
    canvas.height = image.height;

    var context = canvas.getContext( '2d' );
    context.drawImage( image, 0, 0 );

    return context.getImageData( 0, 0, image.width, image.height );

}

function getPixel( imagedata, x, y ) {

    var position = ( x + imagedata.width * y ) * 4, data = imagedata.data;
    return { r: data[ position ], g: data[ position + 1 ], b: data[ position + 2 ], a: data[ position + 3 ] };

}

function Node(){

    this.id = Math.floor(Math.random()*1e6);
    blobs[this.id] = this;

    this.visited = false;
    this.walls = [0,0,0,0];

    // this.geo = new THREE.CylinderGeometry( .1,.1,1);
    // this.mat = new THREE.MeshLambertMaterial({color:0x222222});

    this.posX = this.posY = 0;
    this.topParent = new THREE.Object3D();

    // this.ball = sphere(.1);
    // this.topParent.add(this.ball);


    this.makeWalls = function(x,y){

        var X = x || 0;
        var Y = y || 0;

        this.posX = X;
        this.posY = Y;


        for(var i = 0 ; i < 4 ; i++){
            this.parent = new THREE.Object3D();
            var wall = new THREE.Mesh(geo,mat);
            this.walls[i] = wall; 
            this.parent.add(wall);
            wall.position.x = .5;
            this.parent.rotation.z = ((i-1)*pi);
            this.topParent.add(this.parent);
            this.walls[i].visible = true;
        }

        scene.add(this.topParent);
        // console.log(this.topParent);

        this.topParent.position.x = X;
        this.topParent.position.y = Y;

    }

    this.update = function(arr){
        for(var i = 0 ; i < arr.length ; i++){
            if(!arr[i] && this.walls[i].scale.x>=.01){
                this.walls[i].scale = new THREE.Vector3(.00001,.00001,.00001);
            }
        }
        // if(this.visited){
        //     scl(this.ball,.1);
        // }
        // else
        //     scl(this.ball,.0001);
    }
}

function pathFind(arr,tNode,stack){

    countUp ++ ;

    var nd = tNode;
    nd.visited = true;
    var wNeighbor = -1;

    sph.position.x = nd.posX;
    sph.position.y = nd.posY;


    sph.geometry.vertices[countUp].x = nd.posX*.2;
    sph.geometry.vertices[countUp].y = nd.posY*.2;
    sph.geometry.vertices[countUp].z = 0;

    if(lineTo)
        sph.geometry.vertices[countUp].lineTo = true;
    else
        sph.geometry.vertices[countUp].lineTo = false;

    sph.geometry.verticesNeedUpdate = true;

    // console.log(arr[wNeighbor]);
    stack.push(tNode);

    if(stack.depth==undefined)
        stack.depth = 0;

    // console.log(nd.id);

    amount = w*h;

    if(stack.depth>amount)
        varR=false;

    if( stack.length < cells.length && visitCheck(arr).length>0 && stack.depth < amount ){

        stack.depth++;

        var options = [0,1,2,3];
        // var cnt = 0 ;

        while( arr[wNeighbor].visited == true && options.length > 0 ){

            rndm = Math.floor(Math.random()*options.length);
            var nmbr = options.splice(rndm,1);
            wNeighbor = nd.neighbors[nmbr[0]];
            // console.log(arr[wNeighbor].visited + options.length);
            // cnt++;
            // console.log("nope");
            // console.log(arr[wNeighbor].neighbors);

        }

        if(arr[wNeighbor].visited == true){

            var visit = true;

            for(var q = 0 ; q < nd.neighbors.length ; q++){
                if(arr[nd.neighbors[q]].visited){
                    visit = false;
                    wNeighbor = nd.neighbors[q];
                }
            }
        }

        if( arr[wNeighbor].visited == false ){

            lineTo = true;

            // console.log(wNeighbor);
            // console.log(nd.thisOne);
            if(wNeighbor == nd.thisOne + 1){
                // console.log("up");
                nd.update([1,1,0,1]);
                arr[wNeighbor].update([0,1,1,1]);
                pathFind(arr,arr[wNeighbor],stack);
            }
            else if(wNeighbor == nd.thisOne - 1){
                // console.log("down");
                nd.update([0,1,1,1]);
                arr[wNeighbor].update([1,1,0,1]);
                pathFind(arr,arr[wNeighbor],stack);
            }
            else if(wNeighbor == nd.thisOne + w){
                // console.log("right");
                nd.update([1,0,1,1]);
                arr[wNeighbor].update([1,1,1,0]);
                pathFind(arr,arr[wNeighbor],stack);
            }
            else if(wNeighbor == nd.thisOne - w){
                // console.log("left");
                nd.update([1,1,1,0]);
                arr[wNeighbor].update([1,0,1,1]);
                pathFind(arr,arr[wNeighbor],stack);
            }
            else{
                console.log("blah");
                console.log(wNeighbor);
            }
        }
        else{
            // console.log(stack.length);
            // var tn = nd;
            // // stack.depth--;
                        // console.log(stack.length);

            if(stack.length>0)
                var tn = stack.pop();
            if(stack.length>0)
                var tn = stack.pop();

            // sph.geometry.vertices[countUp].x = nd.posX;
            // sph.geometry.vertices[countUp].y = nd.posY;
            // sph.geometry.vertices[countUp].z = 1;

            // countUp-=1;

            lineTo = false;
            
            if(stack.length==0){
                // console.log("done");
                var tn = findMissing(cells);
                varR=false;
            }

            // sph.geometry.vertices[countUp].x = tn.posX*.2;
            // sph.geometry.vertices[countUp].y = tn.posY*.2;
            // sph.geometry.vertices[countUp].z = .2;
            
            // console.log(pn);
            // console.log(tn.neighbors);

            pathFind(arr,tn,stack);
        }

    }
}

function visitCheck2(arr){

    var returner = false;

    for(var i = 0 ; i < arr.length ; i++){
        if(arr[i].visited==false)
            returner = true;
    }

    return returner;
}

function visitCheck(arr){

    var returner = [];

    for(var i = 0 ; i < arr.length ; i++){
        if(arr[i].visited==false)
            returner.push(arr[i]);
    }

    return returner;
}

function findMissing(arr){

    var returner = arr[0];

    var ok = false;
    var visit = -1;

    while(!ok){

        for(var i = 0 ; i < arr.length ; i++){

            for(var q = 0 ; q < arr[i].neighbors.length ; q++){

                if(arr[i].visited && !arr[arr[i].neighbors[q]].visited){
                    ok=true;
                    visit = arr[i].neighbors[q];
                }
            }
        }
    }

    return arr[visit];

}

function scl(obj,size){
    obj.scale.x = size;
    obj.scale.y = size;
    obj.scale.z = size;
}

// var imagedata = getImageData( imgTexture.image );
// var color = getPixel( imagedata, 10, 10 );

