/* em-device.js — live floating frequency generator (ES module).
   Ported from generator/index.html (closed-lid device; coil visible through the
   lid window). Imports 'three' via the page importmap (assets/three.module.min.js).
   Usage: import {mount} from ...; mount(canvas,{zoom}) -> renders while on screen. */
import * as THREE from 'three';

function build(canvas){
  var isMobile=matchMedia('(pointer:coarse)').matches||Math.min(screen.width,innerWidth)<700;
  var renderer=new THREE.WebGLRenderer({canvas:canvas,antialias:true,alpha:true,powerPreference:'high-performance'});
  renderer.setPixelRatio(Math.min(devicePixelRatio,isMobile?1.5:2));
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.18;
  renderer.shadowMap.enabled=!isMobile;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  var scene=new THREE.Scene();
  var camera=new THREE.PerspectiveCamera(32,1,0.1,100);

  (function makeEnv(){
    var cv=document.createElement('canvas');cv.width=64;cv.height=256;var x=cv.getContext('2d');
    var base=x.createLinearGradient(0,0,0,256);
    base.addColorStop(0,'#4a5262');base.addColorStop(.5,'#262c37');base.addColorStop(1,'#0e1219');
    x.fillStyle=base;x.fillRect(0,0,64,256);
    function strip(cy,h,a){var s=x.createLinearGradient(0,cy-h,0,cy+h);s.addColorStop(0,'rgba(255,251,243,0)');s.addColorStop(.5,'rgba(255,251,243,'+a+')');s.addColorStop(1,'rgba(255,251,243,0)');x.fillStyle=s;x.fillRect(0,cy-h,64,h*2);}
    strip(48,28,0.95);strip(150,22,0.5);
    var t=new THREE.CanvasTexture(cv);t.mapping=THREE.EquirectangularReflectionMapping;t.colorSpace=THREE.SRGBColorSpace;
    var p=new THREE.PMREMGenerator(renderer);scene.environment=p.fromEquirectangular(t).texture;t.dispose();p.dispose();
  })();
  scene.add(new THREE.HemisphereLight(0xdfe6f0,0x2a2f38,0.5));
  var key=new THREE.DirectionalLight(0xfff2e0,1.7);key.position.set(2.2,3.6,2.4);scene.add(key);
  key.castShadow=!isMobile;
  key.shadow.mapSize.set(1024,1024);
  key.shadow.camera.left=-1.8;key.shadow.camera.right=1.8;key.shadow.camera.top=1.8;key.shadow.camera.bottom=-1.8;
  key.shadow.camera.near=0.5;key.shadow.camera.far=10;
  var fill=new THREE.DirectionalLight(0xbcd0f0,0.55);fill.position.set(-2.8,1.4,2.2);scene.add(fill);
  var rim=new THREE.DirectionalLight(0xffffff,1.0);rim.position.set(-1.2,2.4,-2.6);scene.add(rim);

  var device=new THREE.Group();scene.add(device);
  var SLAB=2.0;
  var matGlass=new THREE.MeshPhysicalMaterial({color:0xaebdcc,metalness:0,roughness:0.05,transparent:true,opacity:0.13,clearcoat:1,clearcoatRoughness:0.04,envMapIntensity:1.25,depthWrite:false});
  var matBlackGloss=new THREE.MeshPhysicalMaterial({color:0x0b0d11,metalness:0.22,roughness:0.12,clearcoat:1,clearcoatRoughness:0.05,envMapIntensity:1.5});
  var matBlack=new THREE.MeshPhysicalMaterial({color:0x0d0f13,metalness:0.3,roughness:0.2,clearcoat:0.8,clearcoatRoughness:0.15,envMapIntensity:1.2});
  var matDisc=new THREE.MeshStandardMaterial({color:0x0b0e13,metalness:0.3,roughness:0.45});
  var matGold=new THREE.MeshStandardMaterial({color:0xE3B45E,metalness:1.0,roughness:0.24,envMapIntensity:2.2,emissive:0x35270c,emissiveIntensity:0.5});
  var matRing=new THREE.MeshStandardMaterial({color:0xe6eaee,metalness:0.95,roughness:0.2,envMapIntensity:1.6});
  var matChrome=new THREE.MeshStandardMaterial({color:0xdfe3e6,metalness:1.0,roughness:0.14,envMapIntensity:1.8});
  var matSteel=new THREE.MeshStandardMaterial({color:0xb8bdc2,metalness:1.0,roughness:0.28,envMapIntensity:1.4});
  function part(geo,mat,x,y,z,parent){var m=new THREE.Mesh(geo,mat);m.position.set(x||0,y||0,z||0);m.castShadow=true;m.receiveShadow=true;(parent||device).add(m);return m;}

  var base=new THREE.Group();device.add(base);
  part(new THREE.BoxGeometry(SLAB,0.09,SLAB),matBlack,0,0,0,base);
  part(new THREE.BoxGeometry(SLAB*1.004,0.014,SLAB*1.004),matSteel,0,0.052,0,base);
  part(new THREE.BoxGeometry(SLAB,0.035,SLAB),matBlack,0,0.077,0,base);
  part(new THREE.CylinderGeometry(0.73,0.73,0.04,120),matBlack,0,0.077,0,base);
  part(new THREE.CylinderGeometry(0.71,0.71,0.024,120),matDisc,0,0.096,0,base);
  var ring=new THREE.Mesh(new THREE.TorusGeometry(0.70,0.008,16,160),matRing);ring.rotation.x=Math.PI/2;ring.position.y=0.112;ring.castShadow=true;base.add(ring);
  (function(){ // the gold spiral coil
    var turns=36,N=isMobile?1800:3200,r0=0.012,rMax=0.665,A=turns*Math.PI*2;var pts=[];
    for(var i=0;i<=N;i++){
      var a=i/N*A,u=a/A;
      var f=0.9*u+0.1*(1-Math.pow(1-u,6));
      var r=r0+(rMax-r0)*f;
      pts.push(new THREE.Vector3(Math.cos(a)*r,0,Math.sin(a)*r));
    }
    var g=new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),isMobile?1700:3000,0.0046,isMobile?6:8,false);
    var m=new THREE.Mesh(g,matGold);m.position.y=0.115;m.castShadow=true;m.receiveShadow=true;base.add(m);
  })();
  function radialTex(rgb){var cv=document.createElement('canvas');cv.width=cv.height=256;var x=cv.getContext('2d');
    var g=x.createRadialGradient(128,128,10,128,128,128);
    g.addColorStop(0,'rgba('+rgb+',1)');g.addColorStop(1,'rgba('+rgb+',0)');
    x.fillStyle=g;x.fillRect(0,0,256,256);
    var t=new THREE.CanvasTexture(cv);t.colorSpace=THREE.SRGBColorSpace;return t;}
  var coilGlow=new THREE.Sprite(new THREE.SpriteMaterial({map:radialTex('232,188,102'),transparent:true,opacity:0.15,blending:THREE.AdditiveBlending,depthWrite:false}));
  coilGlow.scale.set(2.1,2.1,1);coilGlow.position.y=0.2;device.add(coilGlow);
  var underGlow=new THREE.Sprite(new THREE.SpriteMaterial({map:radialTex('169,104,62'),transparent:true,opacity:0.12,blending:THREE.AdditiveBlending,depthWrite:false}));
  underGlow.scale.set(3.4,1.6,1);underGlow.position.y=-0.5;device.add(underGlow);
  function bolt(x,z){var g=new THREE.Group();
    var sh=new THREE.Mesh(new THREE.CylinderGeometry(0.028,0.028,0.34,20),matChrome);sh.position.y=0.06;g.add(sh);
    var wa=new THREE.Mesh(new THREE.CylinderGeometry(0.094,0.094,0.012,32),matSteel);wa.position.y=0.212;g.add(wa);
    var hT=new THREE.Mesh(new THREE.CylinderGeometry(0.080,0.086,0.046,6),matChrome);hT.position.y=0.242;hT.rotation.y=0.3;g.add(hT);
    var dome=new THREE.Mesh(new THREE.SphereGeometry(0.072,24,14,0,Math.PI*2,0,Math.PI/2),matChrome);
    dome.scale.set(1,0.5,1);dome.position.y=0.265;g.add(dome);
    var hB=new THREE.Mesh(new THREE.CylinderGeometry(0.066,0.070,0.042,6),matChrome);hB.position.y=-0.066;hB.rotation.y=0.3;g.add(hB);
    var domeB=new THREE.Mesh(new THREE.SphereGeometry(0.060,24,14,0,Math.PI*2,0,Math.PI/2),matChrome);
    domeB.scale.set(1,-0.4,1);domeB.position.y=-0.087;g.add(domeB);
    g.traverse(function(o){if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});
    g.position.set(x,0,z);base.add(g);}
  var bo=0.85;bolt(bo,bo);bolt(-bo,bo);bolt(bo,-bo);bolt(-bo,-bo);

  // closed lid: glossy plate with circular window + glass + branding
  (function(){
    var H=1.0,R=0.06;
    var s=new THREE.Shape();
    s.moveTo(-H+R,-H);s.lineTo(H-R,-H);s.quadraticCurveTo(H,-H,H,-H+R);s.lineTo(H,H-R);
    s.quadraticCurveTo(H,H,H-R,H);s.lineTo(-H+R,H);s.quadraticCurveTo(-H,H,-H,H-R);
    s.lineTo(-H,-H+R);s.quadraticCurveTo(-H,-H,-H+R,-H);
    var hole=new THREE.Path();hole.absarc(0,0,0.72,0,Math.PI*2,true);s.holes.push(hole);
    var geo=new THREE.ExtrudeGeometry(s,{depth:0.05,bevelEnabled:true,bevelThickness:0.008,bevelSize:0.008,bevelSegments:2,curveSegments:72});
    geo.rotateX(-Math.PI/2);geo.translate(0,-0.025,0);
    var top=new THREE.Group();
    var plate=new THREE.Mesh(geo,matBlackGloss);plate.castShadow=true;plate.receiveShadow=true;top.add(plate);
    var sheet=new THREE.Mesh(new THREE.BoxGeometry(SLAB*0.995,0.016,SLAB*0.995),matGlass);
    sheet.position.y=0.042;top.add(sheet);
    var cv=document.createElement('canvas');cv.width=640;cv.height=140;var x=cv.getContext('2d');
    x.fillStyle='#9aabae';x.font='italic 600 64px Georgia';x.textBaseline='middle';x.textAlign='center';x.fillText('energy muse',320,78);
    var t=new THREE.CanvasTexture(cv);t.colorSpace=THREE.SRGBColorSpace;
    var pl=new THREE.Mesh(new THREE.PlaneGeometry(0.56,0.123),new THREE.MeshBasicMaterial({map:t,transparent:true,opacity:0.92}));
    pl.position.set(0,0.054,0.865);pl.rotation.x=-Math.PI/2;top.add(pl);
    top.position.y=0.16;device.add(top);
  })();

  return {renderer:renderer,scene:scene,camera:camera,device:device,isMobile:isMobile};
}

function mount(canvas,opts){
  opts=opts||{};var zoom=opts.zoom||1;
  var ctx;
  try{ctx=build(canvas);}catch(e){return null;}
  var renderer=ctx.renderer,scene=ctx.scene,camera=ctx.camera,device=ctx.device;
  var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  var visible=false,mx=0,my=0,tmx=0,tmy=0;
  if(!ctx.isMobile)addEventListener('pointermove',function(e){
    tmx=e.clientX/innerWidth-0.5;tmy=e.clientY/innerHeight-0.5;});

  /* The camera used to sit at a hand-tuned distance, which meant the device's
     corners were clipped at some frame shapes — the slab is widest corner-on,
     and it turns as it sways, so no single number fits every aspect. Instead
     measure the silhouette across the whole range of poses it actually reaches
     and pull the camera back until the widest one clears the frame. */
  var DIR=new THREE.Vector3(0,1.62,3.9).normalize();
  var TARGET=new THREE.Vector3(0,-0.06,0);
  var _v=new THREE.Vector3(), _box=new THREE.Box3();
  var POSE_Y=[-1.28,-1.03,-0.78,-0.53,-0.28];   /* -0.78 +- sway +- pointer */
  var POSE_X=[0.38,0.5,0.62];

  function silhouette(){
    /* widest projected extent over every pose, solid meshes only — the glow
       sprites are far larger than the object and must not drive the framing */
    var ry=device.rotation.y, rx=device.rotation.x, py=device.position.y, worst=0;
    for(var a=0;a<POSE_Y.length;a++){
      for(var b=0;b<POSE_X.length;b++){
        device.rotation.y=POSE_Y[a];device.rotation.x=POSE_X[b];device.position.y=0.05;
        device.updateMatrixWorld(true);
        device.traverse(function(o){
          if(!o.isMesh||!o.castShadow||!o.material||o.material.transparent)return;
          _box.setFromObject(o);
          for(var i=0;i<8;i++){
            _v.set(i&1?_box.max.x:_box.min.x,i&2?_box.max.y:_box.min.y,i&4?_box.max.z:_box.min.z);
            _v.project(camera);
            var m=Math.max(Math.abs(_v.x),Math.abs(_v.y));
            if(m>worst)worst=m;
          }
        });
      }
    }
    device.rotation.y=ry;device.rotation.x=rx;device.position.y=py;
    device.updateMatrixWorld(true);
    return worst;
  }

  var dist=4.2;
  function place(d){
    camera.position.copy(DIR).multiplyScalar(d).add(TARGET);
    camera.lookAt(TARGET);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld(true);
  }

  function resize(){
    var r=canvas.parentElement.getBoundingClientRect();if(!r.width)return;
    renderer.setSize(r.width,r.height,false);
    camera.aspect=r.width/r.height;
    /* zoom now means how much of the frame to fill: 1 is edge to edge */
    var target=0.94*Math.min(1,zoom);
    for(var i=0;i<6;i++){
      place(dist);
      var e=silhouette();
      if(e<1e-4)break;
      var k=e/target;
      if(Math.abs(k-1)<0.004)break;
      dist*=k;
    }
    place(dist);
  }
  addEventListener('resize',resize);resize();

  var clock=new THREE.Clock();
  function frame(){
    requestAnimationFrame(frame);
    if(!visible)return;
    var t=clock.getElapsedTime();
    mx+=(tmx-mx)*0.05;my+=(tmy-my)*0.05;
    var bob=reduce?0:Math.sin(t*0.9)*0.05;
    var sway=reduce?0:Math.sin(t*0.22)*0.30;
    device.position.y=bob;
    device.rotation.y=-0.78+sway+mx*0.4;
    device.rotation.x=0.5+my*0.12;
    renderer.render(scene,camera);
  }
  frame();
  if(reduce){ // render one settled frame even when idle
    device.rotation.y=-0.78;device.rotation.x=0.5;
    renderer.render(scene,camera);
  }
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){visible=e.isIntersecting;});
  },{rootMargin:'120px'});
  io.observe(canvas);
  return ctx;
}

export {mount};
