const THREE = window.MINDAR.IMAGE.THREE;
import {loadGLTF} from "./libs/loader.js";	

document.addEventListener('DOMContentLoaded', () => {
	const start = async() => {
		const mindarThree = new window.MINDAR.IMAGE.MindARThree({
			container: document.body,
			imageTargetSrc: './tbh.mind',
			maxTrack:3,
		});
		
		const {renderer, scene, camera} = mindarThree;
		
		const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
		scene.add(light);
		
		const train = await loadGLTF("./train/scene.gltf");
		train.scene.scale.set(0.3, 0.3, 0.3);
		
		const bread = await loadGLTF("./bread/scene.gltf");
		bread.scene.scale.set(0.5, 0.5, 0.5);
		
		const hen = await loadGLTF("./hen/scene.gltf");
		hen.scene.scale.set(10, 10, 10);
		
		const trainAnchor = mindarThree.addAnchor(0);
		trainAnchor.group.add(train.scene);
		
		const breadAnchor = mindarThree.addAnchor(1);
		breadAnchor.group.add(bread.scene);
		
		const henAnchor = mindarThree.addAnchor(2);
		henAnchor.group.add(hen.scene);
		
		const clock = new THREE.Clock();
		
		await mindarThree.start();		
		
		renderer.setAnimationLoop(() => {
			const delta = clock.getDelta();
			renderer.render(scene, camera);
		});
	}
	start();
});	