/* em-crystal.js — floating scanned crystal (ES module).
   Streams a real Energy Muse 3D scan (assets/gems/<slug>.glb) into a transparent
   canvas: slow turn, gentle float, warm key light. Lighting/env matches the shop
   viewer so the stone reads the same everywhere.
   Usage: import {mount} from ...; mount(canvas,{src, yaw, pitch}) -> Promise
   (resolves once the stone is visible; rejects if the GLB fails to load). */
import * as THREE from 'three';
import {GLTFLoader} from './jsm/loaders/GLTFLoader.js';

function mount(canvas, opts){
  opts = opts || {};
  var isMobile = matchMedia('(pointer:coarse)').matches || Math.min(screen.width, innerWidth) < 700;
  var renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true, alpha: true});
  renderer.setPixelRatio(Math.min(devicePixelRatio, isMobile ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(34, 1, 0.05, 50);
  camera.position.set(0, 0.35, 3.0);
  camera.lookAt(0, 0, 0);

  (function env(){ // same studio strip-light env as the shop viewer
    var cv = document.createElement('canvas'); cv.width = 64; cv.height = 256;
    var x = cv.getContext('2d');
    var base = x.createLinearGradient(0, 0, 0, 256);
    base.addColorStop(0, '#4a5262'); base.addColorStop(.5, '#262c37'); base.addColorStop(1, '#0e1219');
    x.fillStyle = base; x.fillRect(0, 0, 64, 256);
    function strip(cy, h, a){
      var s = x.createLinearGradient(0, cy - h, 0, cy + h);
      s.addColorStop(0, 'rgba(255,251,243,0)'); s.addColorStop(.5, 'rgba(255,251,243,' + a + ')');
      s.addColorStop(1, 'rgba(255,251,243,0)');
      x.fillStyle = s; x.fillRect(0, cy - h, 64, h * 2);
    }
    strip(48, 28, 0.95); strip(150, 22, 0.5);
    var t = new THREE.CanvasTexture(cv);
    t.mapping = THREE.EquirectangularReflectionMapping; t.colorSpace = THREE.SRGBColorSpace;
    var p = new THREE.PMREMGenerator(renderer);
    scene.environment = p.fromEquirectangular(t).texture;
    t.dispose(); p.dispose();
  })();
  scene.add(new THREE.HemisphereLight(0xdfe6f0, 0x22262e, 0.65));
  var key = new THREE.DirectionalLight(0xfff2e0, 1.6); key.position.set(2.2, 3.2, 2.4); scene.add(key);
  var rim = new THREE.DirectionalLight(0xcfe0ff, 0.7); rim.position.set(-2.2, 1.4, -2.2); scene.add(rim);

  var holder = new THREE.Group(); scene.add(holder);

  function fit(obj){ // center + scale, same as the shop viewer
    var box = new THREE.Box3().setFromObject(obj);
    var size = box.getSize(new THREE.Vector3()), center = box.getCenter(new THREE.Vector3());
    var s = 1.7 / Math.max(size.x, size.y, size.z);
    obj.position.sub(center).multiplyScalar(s); obj.scale.setScalar(s);
    var wrap = new THREE.Group(); wrap.add(obj); return wrap;
  }

  function resize(){
    var r = canvas.parentElement.getBoundingClientRect(); if (!r.width) return;
    renderer.setSize(r.width, r.height, false);
    camera.aspect = r.width / r.height; camera.updateProjectionMatrix();
  }
  addEventListener('resize', resize); resize();

  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  var visible = false;
  var baseYaw = opts.yaw !== undefined ? opts.yaw : 0.6;
  var basePitch = opts.pitch !== undefined ? opts.pitch : -0.1;
  var clock = new THREE.Clock();

  return new Promise(function(resolve, reject){
    new GLTFLoader().load(opts.src, function(gltf){
      holder.add(fit(gltf.scene));
      function frame(){
        requestAnimationFrame(frame);
        if (!visible) return;
        var t = clock.getElapsedTime();
        holder.rotation.y = baseYaw + (reduce ? 0 : t * 0.22);
        holder.rotation.x = basePitch + (reduce ? 0 : Math.sin(t * 0.5) * 0.05);
        holder.position.y = reduce ? 0 : Math.sin(t * 0.8) * 0.05;
        renderer.render(scene, camera);
      }
      frame();
      // first frame even before the observer fires (and the only frame under reduced motion)
      holder.rotation.y = baseYaw; holder.rotation.x = basePitch;
      renderer.render(scene, camera);
      var io = new IntersectionObserver(function(es){
        es.forEach(function(e){ visible = e.isIntersecting; });
      }, {rootMargin: '120px'});
      io.observe(canvas);
      resolve();
    }, undefined, reject);
  });
}

export {mount};
