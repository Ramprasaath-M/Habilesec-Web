'use client';

import {useEffect,useRef} from 'react';
import styles from './gear-capabilities.module.css';

export function GearAssembly() {
  const host=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    let disposed=false;
    let cleanup=()=>{};
    import('three').then(THREE=>{
      if(disposed||!host.current)return;
      const container=host.current;
      let renderer:InstanceType<typeof THREE.WebGLRenderer>;
      try {renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});} catch {return;}
      renderer.setPixelRatio(Math.min(devicePixelRatio,2));
      renderer.setClearColor(0,0);
      container.appendChild(renderer.domElement);
      const scene=new THREE.Scene();
      const camera=new THREE.OrthographicCamera(-360,360,280,-280,1,2500);
      camera.up.set(0,0,1);camera.position.set(500,650,500);camera.lookAt(0,0,0);
      scene.add(new THREE.AmbientLight(0xffffff,1.8));
      const light=new THREE.DirectionalLight(0xe3f3ff,3);light.position.set(-250,-400,650);scene.add(light);
      const fill=new THREE.DirectionalLight(0x2265d8,1);fill.position.set(300,150,100);scene.add(fill);
      const palette=getComputedStyle(container);
      const blue=palette.getPropertyValue('--lavender').trim()||'#174d9a';
      const medium=palette.getPropertyValue('--violet').trim()||'#2265d8';
      const line=palette.getPropertyValue('--line').trim()||'#89b6d8';
      const materials=[new THREE.MeshStandardMaterial({color:medium,roughness:.7,metalness:.08}),new THREE.MeshStandardMaterial({color:blue,roughness:.8,metalness:.05})];
      const smallMaterials=[new THREE.MeshStandardMaterial({color:0x60a5fa,roughness:.7,metalness:.05}),materials[1]];

      // Standard 20-degree involute spur gears, common module 8. Pitch radii
      // are 96 (24 teeth) and 48 (12 teeth), so mating centers are 144 apart.
      function geometry(teeth:number) {
        const toothModule=8,pitch=toothModule*teeth/2,base=pitch*Math.cos(Math.PI/9),root=pitch-1.25*toothModule,outer=pitch+toothModule;
        const inv=(r:number)=>{const a=Math.acos(Math.min(1,base/r));return Math.tan(a)-a;};
        const half=(r:number)=>Math.PI/(2*teeth)+inv(pitch)-inv(Math.max(base,r));
        const shape=new THREE.Shape();let first=true;
        const point=(r:number,a:number)=>{const x=r*Math.cos(a),y=r*Math.sin(a);if(first){shape.moveTo(x,y);first=false;}else shape.lineTo(x,y);};
        for(let t=0;t<teeth;t++) {
          const a=t*2*Math.PI/teeth;
          point(root,a-Math.PI/teeth);point(root,a-half(base));
          for(let k=0;k<=4;k++){const r=base+(outer-base)*k/4;point(r,a-half(r));}
          for(let k=1;k<=3;k++)point(outer,a-half(outer)+2*half(outer)*k/3);
          for(let k=4;k>=0;k--){const r=base+(outer-base)*k/4;point(r,a+half(r));}
          point(root,a+half(base));point(root,a+Math.PI/teeth);
        }
        shape.closePath();
        const hole=new THREE.Path();hole.absarc(0,0,pitch*.35,0,Math.PI*2,true);shape.holes.push(hole);
        return new THREE.ExtrudeGeometry(shape,{depth:24,bevelEnabled:true,bevelThickness:.7,bevelSize:.6,bevelSegments:1,curveSegments:40,steps:1});
      }
      const large=geometry(24),small=geometry(12);
      // Each entry: center, shaft height, teeth, angular ratio, phase.
      // Two central wheels share a shaft; the final small wheel is an idler.
      const settings=[
        {x:0,y:0,z:70,n:24,ratio:1,phase:0},
        {x:-144,y:0,z:70,n:12,ratio:-2,phase:Math.PI/12},
        {x:0,y:-144,z:70,n:12,ratio:-2,phase:Math.PI/12},
        {x:96,y:-144,z:70,n:12,ratio:2,phase:0},
        {x:0,y:0,z:-85,n:24,ratio:1,phase:0},
        {x:144,y:0,z:-85,n:12,ratio:-2,phase:Math.PI/12},
        {x:0,y:144,z:-85,n:12,ratio:-2,phase:Math.PI/12},
      ];
      const wheels=settings.map(s=>{
        const mesh=new THREE.Mesh(s.n===24?large:small,s.n===24?materials:smallMaterials);
        mesh.position.set(s.x,s.y,s.z);mesh.rotation.z=s.phase;scene.add(mesh);
        const size=s.n===24?226:126;
        const edges=new THREE.EdgesGeometry(new THREE.BoxGeometry(size,size,s.n===24?110:100));
        const cube=new THREE.LineSegments(edges,new THREE.LineBasicMaterial({color:line,transparent:true,opacity:.72}));
        cube.position.set(s.x,s.y,s.z+9);scene.add(cube);
        return mesh;
      });
      const shaft=new THREE.Mesh(new THREE.CylinderGeometry(68,68,155,48,1,true),new THREE.MeshStandardMaterial({color:medium,transparent:true,opacity:.13,depthWrite:false,side:THREE.DoubleSide}));
      shaft.rotation.x=Math.PI/2;shaft.position.z=5;scene.add(shaft);
      const groundPoints=Array.from({length:129},(_,i)=>{const a=i/128*Math.PI*2;return new THREE.Vector3(285*Math.cos(a),230*Math.sin(a),-125);});
      const ground=new THREE.Line(new THREE.BufferGeometry().setFromPoints(groundPoints),new THREE.LineBasicMaterial({color:line,transparent:true,opacity:.8}));scene.add(ground);
      const media=matchMedia('(prefers-reduced-motion: reduce)');
      let visible=false,frame=0,last=0,elapsed=0;
      const render=()=>renderer.render(scene,camera);
      const resize=()=>{const {width,height}=container.getBoundingClientRect();if(!width||!height)return;const aspect=width/height;camera.left=-285*aspect;camera.right=285*aspect;camera.top=285;camera.bottom=-285;camera.updateProjectionMatrix();renderer.setSize(width,height,false);render();};
      const tick=(now:number)=>{const delta=last?Math.min(now-last,70):0;last=now;elapsed+=delta;const angle=elapsed/60000*Math.PI*2;wheels.forEach((wheel,i)=>{wheel.rotation.z=settings[i].phase+angle*settings[i].ratio;});render();frame=requestAnimationFrame(tick);};
      const update=()=>{cancelAnimationFrame(frame);last=0;if(visible&&!media.matches&&!document.hidden)frame=requestAnimationFrame(tick);else render();};
      const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;update();},{threshold:.05});observer.observe(container);
      const sizeObserver=new ResizeObserver(resize);sizeObserver.observe(container);
      media.addEventListener('change',update);document.addEventListener('visibilitychange',update);
      resize();container.dataset.ready='true';
      cleanup=()=>{cancelAnimationFrame(frame);observer.disconnect();sizeObserver.disconnect();media.removeEventListener('change',update);document.removeEventListener('visibilitychange',update);const usedMaterials=new Set<InstanceType<typeof THREE.Material>>();scene.traverse(object=>{if('geometry' in object)(object.geometry as InstanceType<typeof THREE.BufferGeometry>).dispose();if('material' in object){const material=object.material as InstanceType<typeof THREE.Material>|InstanceType<typeof THREE.Material>[];(Array.isArray(material)?material:[material]).forEach(m=>usedMaterials.add(m));}});usedMaterials.forEach(m=>m.dispose());renderer.dispose();renderer.domElement.remove();};
    });
    return ()=>{disposed=true;cleanup();};
  },[]);
  return <div ref={host} className={styles.artwork} role="img" aria-label="Seven extruded blue mechanical gears rotating in coordinated directions inside stationary isometric wireframe cubes." data-gear-assembly/>;
}
