
makeMaze = false;
size = 50; //maze size
ruler=true;

spiralDiameter = 2.546;

loaded = false;


sc1 = {
    
    setup:function(){

        imgLoad();

        if(loaded){

            w = size;
            h = size;

            showGeo=false;
            lines = [];
            linesOut = [];
            lineTo = false;
            newLine = true;
            countUp = 0;

            geo = new THREE.CylinderGeometry( .1,.1,1);
            mat = new THREE.MeshLambertMaterial({color:0x222222});
            ball = sphere(.1);

            cells = [];
            blobs = [];

            cells[-1]=new Node();
            cells[-1].visited = true;

            prnt = new THREE.Object3D();
            scene.add(prnt);

            for(var i = 0 ; i < h; i++){

                for(var j = 0 ; j < w ; j++){

                    var node = new Node();
                    node.makeWalls(i,j);

                    num = j+i*w;
                    node.id=num;

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
                    node.neighbors = [nb[0],nb[1],nb[2],nb[3]];

                    cells.push(node);

                }
            }
            // prnt.add(sph);
           
            var stack = [];

            frameRate = 1;
            

            colors = [];

            for(var i = 0 ; i < 1024 ; i++){
                var row = [];
                for(var j = 0 ; j < 1024 ; j++){
                    var c = getPixel(imagedata,i,j);
                    row.push(c.r);
                }
                colors.push(row);
            }

            if(ruler){
                for(var i = -5 ; i < 10 ; i++){
                    ruler = new THREE.Mesh(new THREE.BoxGeometry(.99,1,.1),new THREE.MeshLambertMaterial());
                    ruler.position.z = -1;
                    ruler.position.x = i
                    scene.add(ruler);
                }
              }

            sph = new THREE.Line(new THREE.Geometry(),new THREE.LineBasicMaterial({color:0x888888}));
            
            // scene.add(sph);

            scl(prnt,3);
            prnt.scale.z=10;
            prnt.position.x=-45;
            prnt.position.y=-45;

            if(makeMaze){
                for(var i = 0 ; i < cells.length*10 ; i++){
                    sph.geometry.vertices.push(new THREE.Vector3(0,0,1));
                    sph.geometry.verticesNeedUpdate = true;
                }
                varT=true;
            }

            else{
                spiralize();
            }

            up = 0;
            upf = 0;

            

            }
            rebuildGui({values:{nothing:0,outputScale:1},sliders:15})
            setSliders({"var1":1,"var2":0,"var3":.731,"var4":.1,"var5":.06,"var6":.1,"var7":.1,
                "var8":.6,"var9":.1,"var10":.1,"var11":.75,"var12":.16,"var13":.25,"outputScale":.2513});  
            // varY=true;
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
            if(visitCheck(cells).length>0){
                pathFind(cells,visitCheck(cells)[0],[]);
            }
            else{
                varT=false;
                var2=true;
            }
            newLine=true;
            console.log("working");
        }
        if(var1){
            empty = new THREE.Geometry();
            empty.name = "empty";
            prnt.traverse(function(o){if(o.geometry){THREE.GeometryUtils.merge(empty,o.geometry)}});
            var mesh = new THREE.Mesh(empty,new THREE.MeshLambertMaterial());
            scene.add(mesh);
            var1=false;
        }
        if(var2){

            makeLines();
            scene.remove(sph);

            var2=false;
        }
        if(varE){
            // saveSBP(sph.geometry.vertices,"hot");
            savePS(linesOut,"hot");
            console.log('hi');
            varE=false;
        }
        if(var3){
            spiralDiameter = data.outputScale*10;

            varY=false;
             makeLines();
            scene.remove(sph);

            saveSBP2(linesOut,"hot");
            // savePS(linesOut,"hot");
            console.log('hi');
            var3=false;
        }
        if(var4){
            // spiralDiameter = data.outputScale*10;

            varY=false;
             makeLines();
            scene.remove(sph);

            saveGCode(linesOut,"hot");
            // savePS(linesOut,"hot");
            console.log('hi');
            var4=false;
        }
        if(varY){
            pillar();
        }

    }
}

function pillar(){

    var deep = 0;

    if(sph){
        sph.geometry.vertices = null;
        sph.geometry.faces = null;
        sph.geometry.dispose();
        sph.material.dispose();
        scene.remove(sph);
        sph = null;
        sph = new THREE.Line(new THREE.Geometry(),new THREE.LineBasicMaterial({color:0x888888}));
        scene.add(sph);
        // console.log(scene.children);
    }

    lines = [];

    
    var ln = [];
    var zed = .3;
    for(var i = 0 ; i < data.var12*10000 ; i++){
            // var zed = data.var13*i*.001;
            var ex =  Math.sin(( i * data.var8 * 3 ) + ( Math.sin(i*data.var9*.01) )) * data.var7+Math.sin(data.var10 * 3 + i* (data.var2*.01+.1))* (100*(1+Math.sin(i*data.var3*( ( i*data.var4*.00001 ) ) )*(data.var5)))*(data.var6*.1)+Math.sin(i*.1)*30;//*(i*.0023+Math.sin(Math.sin(i*1.05))*(i*.001)),
            var why = Math.cos(( i * data.var8 * 3 ) + ( Math.sin(i*data.var9*.01) )) * data.var7+Math.cos(data.var10 * 3 + i*(data.var2*.01+.1)) * (100*(1+Math.sin(i*data.var3*( ( i*data.var4*.00001 ) ) )*(data.var5)))*(data.var6*.1)+Math.cos(i*.1)*30;//*(i*.0023+Math.cos(Math.sin(i*1.05))*(i*.001)),
            if(i>64)
            zed += .27/64;
            // console.log(ex);
            sph.geometry.vertices.push(new THREE.Vector3(
                ex,why,zed
                ));
            ln.push(sph.geometry.vertices[sph.geometry.vertices.length-1]);
            
            }
        

     lines.push(ln);
        
    

    var deep = 0;
    // var2=true;

}

function spiralize(){

    var deep = 0;

    if(sph){
        sph.geometry.vertices = null;
        sph.geometry.faces = null;
        sph.geometry.dispose();
        sph.material.dispose();
        scene.remove(sph);
        sph = null;
        sph = new THREE.Line(new THREE.Geometry(),new THREE.LineBasicMaterial({color:0x888888}));
        scene.add(sph);
        // console.log(scene.children);
    }

    lines = [];

    for(var k = 0 ; k < 3 ; k++){

        var ln = [];
        for(var i = 0 ; i < data.var12*10000 ; i++){
            for(var j = 0 ; j < 1 ; j++){
                var zed = (1+Math.sin(i*data.var8+(i*(data.var9*.053))))*(k+1)*-(.75/12)*(i*(data.var10*.006));
                var ex = Math.sin(i* (data.var2*.01+.1))*(i*(1+Math.sin(i*data.var3+(i*(data.var4*.1)))*(data.var5)))*(data.var6*.01)+Math.sin(i*.1)*i*i*.0000005;//*(i*.0023+Math.sin(Math.sin(i*1.05))*(i*.001)),
                var why = Math.cos(i*(data.var2*.01+.1))*(i*(1+Math.cos(i*data.var3+(i*(data.var4*.1)))*(data.var5)))*(data.var6*.01)+Math.cos(i*.1)*i*i*.0000005;//*(i*.0023+Math.cos(Math.sin(i*1.05))*(i*.001)),
                // console.log(ex);
                if(i>data.var12*10000-Math.PI*21){
                    zed=(k+1)*-(data.var11/3);
                    // ex =  Math.sin(i*.1)*(data.var7*28);
                    // why = Math.cos(i*.1)*(data.var7*28);
                }
                sph.geometry.vertices.push(new THREE.Vector3(
// ex,why,                                Math.cos(i*.1)*(i*(1+Math.sin(i*.731+(i*.0001))*.06))*.001+Math.cos(i*.1)*i*i*.0000005,//*(i*.0023+Math.cos(Math.sin(i*1.05))*(i*.001)),
                    // Math.sin(i*.3)*i*.005+((i*.001)*(1+Math.sin(i*1.043))),
                    // Math.cos(i*.3)*i*.005+((i*.001)*(1+Math.cos(i*1.043))),
                    ex,why,zed
                    ));
                ln.push(sph.geometry.vertices[sph.geometry.vertices.length-1]);
                if(sph.geometry.vertices[sph.geometry.vertices.length-1].z<deep){
                    deep = sph.geometry.vertices[sph.geometry.vertices.length-1].z;
                    // console.log(deep);
                }
            }

        }
         lines.push(ln);
        
    }

    var deep = 0;
    // var2=true;
}

function imgLoad(){

   imgTexture = THREE.ImageUtils.loadTexture( "assets/depthImages/moth2.jpg" );
   imagedata = getImageData( imgTexture.image );
   color = getPixel( imagedata, 10, 10 );
   loaded = true;
}

function makeLines(){
    var up = 0;
    var lines2=[];
    for(var i = 0 ; i < lines.length ; i++){
            if(lines[i].length>1){
                lines2.push(lines[i]);
                up++;
        }
    }

    var maze = new THREE.Object3D();

    for(var i = 0 ; i < lines2.length ; i++){

        var geo = new THREE.Geometry();
        var line = new THREE.SplineCurve3(lines2[i]);

        var nLine = [];

        var segs = 4;

        for(var j = 0 ; j < lines2[i].length*segs ; j++){
            geo.vertices.push(line.getPointAt(j/(lines2[i].length*segs)));
            nLine.push(line.getPointAt(j/(lines2[i].length*segs)));
        }

        //straight lines
        //  for(var j = 0 ; j < lines2[i].length*segs ; j++){
        //     geo.vertices.push(lines2[i][j]);//line.getPointAt(j/(lines2[i].length*segs)));
        //     // nLine.push(line.getPointAt(j/(lines2[i].length*segs)));
        //     nLine.push(lines2[i][j]);
        //     // console.log(j/lines2[i].length);
        // }

        linesOut.push(nLine);

        thisLine = new THREE.Line(geo,new THREE.LineBasicMaterial({color:0x888888}));
        maze.add(thisLine);
    }

    // maze.position.x=-size/20;
    // maze.position.y=-size/20;
    scene.add(maze);
}

function saveToSBP(arr){

    var output = "";
    for(var i = 0 ; i < arr.length ; i++){
        output+="M3,"+arr[i].x+","+arr[i].y,+","+arr[i].z+"\n";
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

        var offX = ((arr[i].x-MinX)/MinX*2)*(2.546/2);
        var offY = ((arr[i].y-MinY)/MinY*2)*(2.546/2);
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

function saveSBP2(arr,name) {

    // var scaleOut = outputScale || 1;

    // var name = name || "tree.obj";

    var minX = 0;
    var minY = 0;
    var minZ = 0;

    for(var i = 0 ; i < arr.length ; i++){
        for(j = 0 ; j < arr[i].length ; j++){
            if(minX>arr[i][j].x)
                minX = arr[i][j].x;
            if(minY>arr[i][j].y)
                minY = arr[i][j].y;
            if(minZ>arr[i][j].z)
                minZ = arr[i][j].z;
        }
    }

    MinX = minX;
    MinY = minY;

    var output = "";

    console.log(MinX);
    console.log(MinY);
    console.log(minZ);

    if(spiralDiameter<0)
        spiralDiameter = minX*-2;

    for(var i = 0 ; i < arr.length ; i++){

            // var offX = arr[i][0].x-MinX;
            // var offY = arr[i][0].y-MinY;
             var offX = (( arr[i][0].x-MinX ) / ( MinX*-2 )) * ( spiralDiameter );
             var offY = (( arr[i][0].y-MinY ) / ( MinY*-2 )) * ( spiralDiameter );

            output+="J3,"+offX.toFixed(4);
            output+=","  +offY.toFixed(4);
            output+=",.2";
            output+='\n';

        for(j = 0 ; j < arr[i].length ; j++){

            var offX = (( arr[i][j].x-MinX ) / ( MinX*-2 )) * ( spiralDiameter );
            var offY = (( arr[i][j].y-MinY ) / ( MinY*-2 )) * ( spiralDiameter );

            output+="M3,"+offX.toFixed(4);
            output+=","  +offY.toFixed(4);
            output+=","  +arr[i][j].z.toFixed(4);
            output+='\n';
        }
            var end = arr[i].length-1;

            var offX = (( arr[i][end].x-MinX ) / ( MinX*-2 )) * ( spiralDiameter );
            var offY = (( arr[i][end].y-MinY ) / ( MinY*-2 )) * ( spiralDiameter );

            output+="J3,"+offX.toFixed(4);
            output+=","  +offY.toFixed(4);
            output+=",.2" ;
            output+='\n';
    }
    // return output;
    // document.write(output);
    console.log("hio");
    // alert("saved!");
    var blob = new Blob([output], {type: "text/plain;charset=ANSI"});
    saveAs(blob, name);
}


function saveGCode(arr,name) {

    // var scaleOut = outputScale || 1;

    // var name = name || "tree.obj";

    var minX = 0;
    var minY = 0;
    var minZ = 0;

    for(var i = 0 ; i < arr.length ; i++){
        for(j = 0 ; j < arr[i].length ; j++){
            if(minX>arr[i][j].x)
                minX = arr[i][j].x;
            if(minY>arr[i][j].y)
                minY = arr[i][j].y;
            if(minZ>arr[i][j].z)
                minZ = arr[i][j].z;
        }
    }

    MinX = 0;//minX;
    MinY = 0;//minY;

    var output = " \nM73 P0 (enable build progress)\nG21 (set units to mm)\nG90 (set positioning to absolute)\nG10 P1 X-16.5 Y0 Z0 (Designate T0 Offset)\nG55 (Recall offset cooridinate system)\n(**** begin homing ****)\nG162 X Y F2500 (home XY axes maximum)\nG161 Z F1100 (home Z axis minimum)\nG92 Z-5 (set Z to -5)\nG1 Z0.0 (move Z to ÔøΩ0?)\nG161 Z F100 (home Z axis minimum)\nM132 X Y Z A B (Recall stored home offsets for XYZAB axis)\n(**** end homing ****)\nG1 X112 Y-73 Z155 F3300.0 (move to waiting position)\nG130 X0 Y0 A0 B0 (Lower stepper Vrefs while heating)\nM6 T0 (wait for toolhead, and HBP to reach temperature)\nM104 S230 T0 (set extruder temperature)\nM6 T0 (wait for toolhead, and HBP to reach temperature)\nG130 X127 Y127 A127 B127 (Set Stepper motor Vref to defaults)\nM108 R3.0 T0\nG0 X112 Y-73 (Position Nozzle)\nG0 Z0.2 (Position Height)\nM108 R4.0 (Set Extruder Speed)\nM101 (Start Extruder)\nG4 P1500 (Create Anchor)\n";

    console.log(MinX);
    console.log(MinY);
    console.log(minZ);

    if(spiralDiameter<0)
        spiralDiameter = minX*-2;

    for(var i = 0 ; i < arr.length ; i++){

            // // var offX = arr[i][0].x-MinX;
            // // var offY = arr[i][0].y-MinY;
            //  var offX = (( arr[i][0].x-MinX ) / ( MinX*-2 )) * ( spiralDiameter );
            //  var offY = (( arr[i][0].y-MinY ) / ( MinY*-2 )) * ( spiralDiameter );

            // output+="G1 X"+arr[i][j].x;
            // output+=" Y"  +arr[i][j].y;
            // output+=" Z" + arr[i][j].z;
            // output+=" F5400";
            // output+='\n';

        for(j = 0 ; j < arr[i].length ; j++){

            // var offX = (( arr[i][j].x-MinX ) / ( MinX*-2 )) * ( spiralDiameter );
            // var offY = (( arr[i][j].y-MinY ) / ( MinY*-2 )) * ( spiralDiameter );

           output+="G1 X"+arr[i][j].x;
            output+=" Y"  +arr[i][j].y;
            output+=" Z" + arr[i][j].z;
            output+=" F5400";
            output+='\n';
        }
            // var end = arr[i].length-1;

            // var offX = (( arr[i][end].x-MinX ) / ( MinX*-2 )) * ( spiralDiameter );
            // var offY = (( arr[i][end].y-MinY ) / ( MinY*-2 )) * ( spiralDiameter );

            // output+="J3,"+offX.toFixed(4);
            // output+=","  +offY.toFixed(4);
            // output+=",.2" ;
            // output+='\n';
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

    // console.log(MinX);
    // console.log(MinY);
    // console.log(minZ);

    for(var i = 0 ; i < arr.length ; i++){

        var offX = (arr[i][0].x-MinX);
        var offY = (arr[i][0].y-MinY);
        output+=offX.toFixed(4)+" "+offY.toFixed(4)+" moveto"+"\n";

        for(var j = 0 ; j < arr[i].length ; j++){
            var offX = (arr[i][j].x-MinX);
            var offY = (arr[i][j].y-MinY);

            output+=offX.toFixed(4)+" "+offY.toFixed(4)+" lineto"+"\n";
                
        }

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
    this.topParent = {};//new THREE.Object3D();

    // this.ball = sphere(.1);
    // this.topParent.add(this.ball);


    this.makeWalls = function(x,y){

        var X = x || 0;
        var Y = y || 0;

        this.posX = X;
        this.posY = Y;


        // for(var i = 0 ; i < 4 ; i++){
        //     this.parent = new THREE.Object3D();
        //     var wall = new THREE.Mesh(geo,mat);
        //     this.walls[i] = wall; 
        //     this.parent.add(wall);
        //     wall.position.x = .5;
        //     this.parent.rotation.z = ((i-1)*pi);
        //     this.topParent.add(this.parent);
        //     this.walls[i].visible = true;
        // }

        // scene.add(this.topParent);
        // console.log(this.topParent);

        // this.topParent.position.x = X;
        // this.topParent.position.y = Y;

    }

    this.update = function(arr){
        for(var i = 0 ; i < arr.length ; i++){
            // if(!arr[i] && this.walls[i].scale.x>=.01){
            //     // this.walls[i].scale = new THREE.Vector3(.00001,.00001,.00001);
            // }
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

    // sph.position.x = nd.posX;
    // sph.position.y = nd.posY;

    if(newLine){
        line = [];
        lines.push(line);
        newLine = false;
    }

    var mult = 1024/size;

    var down = -.12;//-.03+(colors[Math.floor(nd.posX*mult)][Math.floor(nd.posY*mult)]/256)*-.03;
    lines[lines.length-1].push(new THREE.Vector3(nd.posX*.25,nd.posY*.25,down));


    sph.geometry.vertices[countUp].x = nd.posX*.05;
    sph.geometry.vertices[countUp].y = nd.posY*.05;
    sph.geometry.vertices[countUp].z = down;
    sph.geometry.verticesNeedUpdate = true;

    // console.log(colors[Math.floor(nd.posX*30.41333)][Math.floor(nd.posY*30.41333)]*.1);

    if(lineTo)
        sph.geometry.vertices[countUp].lineTo = true;
    else
        sph.geometry.vertices[countUp].lineTo = false;

    // console.log(arr[wNeighbor]);
    stack.push(tNode);

    if(stack.depth==undefined)
        stack.depth = 0;

    // console.log(nd.id);

    amount = 1000;//w*h;

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

        //if the check didn't work
        // if(arr[wNeighbor].visited == true){

        //     // var visit = true;

        //     for(var q = 0 ; q < nd.neighbors.length ; q++){
        //         if( arr[nd.neighbors[q]].visited ){
        //             // visit = false;
        //             wNeighbor = nd.neighbors[q];
        //         }
        //     }
        // }

        if( arr[wNeighbor].visited == false ){

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
            
            if(stack.length==0){
                // console.log("done");
                var tn = findMissing(cells);
                varR=false;
            }

            // if(lineTo){
                sph.geometry.vertices[countUp].x = tn.posX*.05;
                sph.geometry.vertices[countUp].y = tn.posY*.05;
                sph.geometry.vertices[countUp].z = .2;
            // }

            lineTo = false;
            newLine = true;

            // lines[lines.length-1].pop();
            // lines[lines.length-1].shift();

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
                    visit = i;//arr[i];//.neighbors[q];
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

