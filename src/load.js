import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';
class Load{
    //loadingManager; 
    constructor(){
       
    //const loader = new GLTFLoader();
    }

    loadingManager() {
        var loadingManager = new THREE.LoadingManager();
        const loader = new GLTFLoader(loadingManager);
        loadingManager.onStart = function (url, itemsLoaded, total) {
            console.log('Loading process has started!');
        };
            loadingManager.onProgress = function (url, itemsLoaded, total) {
            console.log(`Started loading: ${url}
                            number of items loaded: ${itemsLoaded}
                            total number of items: ${total}
                        `);
            };
            loadingManager.onLoad = function () {
            console.log('Loading process has been completed!');
            };
        
            const progressBar = document.getElementById('progress-bar');
            const continueButton = document.getElementById('continue-button');
        
            loadingManager.onProgress = function (url, loaded, total) {
                progressBar.value = (loaded / total) * 100;
            };
            const progressBarContainer = document.querySelector('.progress-bar-container');
            const label = document.querySelector('label[for="progress-bar"]');
           
        
            loadingManager.onLoad = function () {
                //progressBarContainer.style.display = 'none';
                label.style.display = 'none';
                progressBar.style.display = 'none';
                continueButton.style.display = 'block';

            };
            return loader;
    }
    

    
};
export default Load;