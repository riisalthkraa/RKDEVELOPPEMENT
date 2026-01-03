/**
 * RK Développement - Globe 3D Interactif
 * Module Three.js pour un globe terrestre professionnel avec connexions
 */

class GlobeScene {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.globe = null;
        this.atmosphere = null;
        this.particles = null;
        this.connections = [];
        this.points = [];
        this.mouse = { x: 0, y: 0 };
        this.targetRotation = { x: 0, y: 0 };
        this.isDragging = false;
        this.previousMousePosition = { x: 0, y: 0 };
        this.clock = new THREE.Clock();

        // Locations des points de connexion (lat, lon)
        this.locations = [
            { name: 'Paris', lat: 48.8566, lon: 2.3522, isMain: true },
            { name: 'New York', lat: 40.7128, lon: -74.0060 },
            { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
            { name: 'Sydney', lat: -33.8688, lon: 151.2093 },
            { name: 'Dubai', lat: 25.2048, lon: 55.2708 },
            { name: 'São Paulo', lat: -23.5505, lon: -46.6333 },
            { name: 'London', lat: 51.5074, lon: -0.1278 },
            { name: 'Singapore', lat: 1.3521, lon: 103.8198 }
        ];

        this.init();
        this.animate();
        this.addEventListeners();
    }

    init() {
        // Scene
        this.scene = new THREE.Scene();

        // Camera
        const aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
        this.camera.position.z = 4;

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x000000, 0);
        this.container.appendChild(this.renderer.domElement);

        // Create elements
        this.createGlobe();
        this.createAtmosphere();
        this.createStars();
        this.createLocationPoints();
        this.createConnections();
        this.addLights();
    }

    createGlobe() {
        const geometry = new THREE.SphereGeometry(1, 64, 64);

        // Create gradient texture for the globe
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        // Dark base with grid pattern
        ctx.fillStyle = '#0a0a1a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add grid lines
        ctx.strokeStyle = 'rgba(102, 126, 234, 0.15)';
        ctx.lineWidth = 1;

        // Latitude lines
        for (let i = 0; i <= 18; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * (canvas.height / 18));
            ctx.lineTo(canvas.width, i * (canvas.height / 18));
            ctx.stroke();
        }

        // Longitude lines
        for (let i = 0; i <= 36; i++) {
            ctx.beginPath();
            ctx.moveTo(i * (canvas.width / 36), 0);
            ctx.lineTo(i * (canvas.width / 36), canvas.height);
            ctx.stroke();
        }

        // Add continents outline (simplified)
        ctx.strokeStyle = 'rgba(102, 126, 234, 0.4)';
        ctx.lineWidth = 2;

        // Add glow spots for major cities
        const cities = [
            { x: 512, y: 180 }, // Europe
            { x: 280, y: 200 }, // North America
            { x: 820, y: 200 }, // Asia
            { x: 550, y: 350 }, // Africa
            { x: 350, y: 380 }, // South America
            { x: 880, y: 380 }  // Australia
        ];

        cities.forEach(city => {
            const gradient = ctx.createRadialGradient(city.x, city.y, 0, city.x, city.y, 40);
            gradient.addColorStop(0, 'rgba(102, 126, 234, 0.6)');
            gradient.addColorStop(0.5, 'rgba(118, 75, 162, 0.3)');
            gradient.addColorStop(1, 'rgba(102, 126, 234, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(city.x - 40, city.y - 40, 80, 80);
        });

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;

        const material = new THREE.MeshPhongMaterial({
            map: texture,
            transparent: true,
            opacity: 0.95,
            shininess: 5
        });

        this.globe = new THREE.Mesh(geometry, material);
        this.scene.add(this.globe);
    }

    createAtmosphere() {
        const geometry = new THREE.SphereGeometry(1.15, 64, 64);

        // Custom shader for atmosphere glow
        const material = new THREE.ShaderMaterial({
            vertexShader: `
                varying vec3 vNormal;
                void main() {
                    vNormal = normalize(normalMatrix * normal);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                varying vec3 vNormal;
                void main() {
                    float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
                    vec3 color1 = vec3(0.4, 0.5, 0.92); // #667eea
                    vec3 color2 = vec3(0.46, 0.29, 0.64); // #764ba2
                    vec3 atmosphereColor = mix(color1, color2, intensity);
                    gl_FragColor = vec4(atmosphereColor, intensity * 0.6);
                }
            `,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide,
            transparent: true
        });

        this.atmosphere = new THREE.Mesh(geometry, material);
        this.scene.add(this.atmosphere);
    }

    createStars() {
        const starsGeometry = new THREE.BufferGeometry();
        const starCount = 2000;
        const positions = new Float32Array(starCount * 3);
        const colors = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);

        for (let i = 0; i < starCount; i++) {
            const i3 = i * 3;

            // Random position on a sphere
            const radius = 5 + Math.random() * 15;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = radius * Math.cos(phi);

            // Colors (purple to blue gradient)
            const colorChoice = Math.random();
            if (colorChoice > 0.7) {
                colors[i3] = 0.4;     // R
                colors[i3 + 1] = 0.5; // G
                colors[i3 + 2] = 0.92; // B - Blue
            } else if (colorChoice > 0.4) {
                colors[i3] = 0.46;
                colors[i3 + 1] = 0.29;
                colors[i3 + 2] = 0.64; // Purple
            } else {
                colors[i3] = 1;
                colors[i3 + 1] = 1;
                colors[i3 + 2] = 1; // White
            }

            sizes[i] = Math.random() * 2 + 0.5;
        }

        starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        starsGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const starsMaterial = new THREE.PointsMaterial({
            size: 0.02,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true
        });

        this.particles = new THREE.Points(starsGeometry, starsMaterial);
        this.scene.add(this.particles);
    }

    latLonToVector3(lat, lon, radius = 1) {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lon + 180) * (Math.PI / 180);

        return new THREE.Vector3(
            -radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.cos(phi),
            radius * Math.sin(phi) * Math.sin(theta)
        );
    }

    createLocationPoints() {
        this.locations.forEach(location => {
            const position = this.latLonToVector3(location.lat, location.lon, 1.02);

            // Point geometry
            const pointGeometry = new THREE.SphereGeometry(location.isMain ? 0.03 : 0.02, 16, 16);
            const pointMaterial = new THREE.MeshBasicMaterial({
                color: location.isMain ? 0x667eea : 0x764ba2,
                transparent: true,
                opacity: 0.9
            });

            const point = new THREE.Mesh(pointGeometry, pointMaterial);
            point.position.copy(position);
            this.globe.add(point);
            this.points.push({ mesh: point, location: location });

            // Glow effect
            const glowGeometry = new THREE.SphereGeometry(location.isMain ? 0.06 : 0.04, 16, 16);
            const glowMaterial = new THREE.MeshBasicMaterial({
                color: location.isMain ? 0x667eea : 0x764ba2,
                transparent: true,
                opacity: 0.3
            });

            const glow = new THREE.Mesh(glowGeometry, glowMaterial);
            glow.position.copy(position);
            this.globe.add(glow);

            // Pulse ring for main location
            if (location.isMain) {
                const ringGeometry = new THREE.RingGeometry(0.04, 0.06, 32);
                const ringMaterial = new THREE.MeshBasicMaterial({
                    color: 0x667eea,
                    transparent: true,
                    opacity: 0.5,
                    side: THREE.DoubleSide
                });
                const ring = new THREE.Mesh(ringGeometry, ringMaterial);
                ring.position.copy(position);
                ring.lookAt(new THREE.Vector3(0, 0, 0));
                this.globe.add(ring);
                this.pulseRing = ring;
            }
        });
    }

    createConnections() {
        const paris = this.locations.find(l => l.isMain);
        const otherCities = this.locations.filter(l => !l.isMain);

        otherCities.forEach(city => {
            const startPos = this.latLonToVector3(paris.lat, paris.lon, 1.02);
            const endPos = this.latLonToVector3(city.lat, city.lon, 1.02);

            // Calculate midpoint with height
            const midPoint = new THREE.Vector3()
                .addVectors(startPos, endPos)
                .multiplyScalar(0.5);

            const distance = startPos.distanceTo(endPos);
            midPoint.normalize().multiplyScalar(1 + distance * 0.3);

            // Create curve
            const curve = new THREE.QuadraticBezierCurve3(startPos, midPoint, endPos);
            const points = curve.getPoints(50);
            const geometry = new THREE.BufferGeometry().setFromPoints(points);

            const material = new THREE.LineBasicMaterial({
                color: 0x667eea,
                transparent: true,
                opacity: 0.4,
                linewidth: 1
            });

            const line = new THREE.Line(geometry, material);
            this.globe.add(line);
            this.connections.push({ line, curve, progress: Math.random() });

            // Animated dot along the curve
            const dotGeometry = new THREE.SphereGeometry(0.015, 8, 8);
            const dotMaterial = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.9
            });
            const dot = new THREE.Mesh(dotGeometry, dotMaterial);
            this.globe.add(dot);
            this.connections[this.connections.length - 1].dot = dot;
        });
    }

    addLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        this.scene.add(ambientLight);

        // Main directional light
        const directionalLight = new THREE.DirectionalLight(0x667eea, 1);
        directionalLight.position.set(5, 3, 5);
        this.scene.add(directionalLight);

        // Secondary light from opposite side
        const directionalLight2 = new THREE.DirectionalLight(0x764ba2, 0.5);
        directionalLight2.position.set(-5, -3, -5);
        this.scene.add(directionalLight2);

        // Point light for glow effect
        const pointLight = new THREE.PointLight(0x667eea, 0.5, 10);
        pointLight.position.set(2, 2, 2);
        this.scene.add(pointLight);
    }

    addEventListeners() {
        // Resize
        window.addEventListener('resize', () => this.onResize());

        // Mouse move for parallax
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));

        // Mouse drag for rotation
        this.container.addEventListener('mousedown', (e) => this.onMouseDown(e));
        document.addEventListener('mouseup', () => this.onMouseUp());
        document.addEventListener('mousemove', (e) => this.onDrag(e));

        // Touch events
        this.container.addEventListener('touchstart', (e) => this.onTouchStart(e));
        document.addEventListener('touchend', () => this.onMouseUp());
        document.addEventListener('touchmove', (e) => this.onTouchMove(e));

        // Scroll for zoom effect
        window.addEventListener('scroll', () => this.onScroll());
    }

    onResize() {
        if (!this.container) return;

        const width = this.container.clientWidth;
        const height = this.container.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    onMouseMove(e) {
        this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    }

    onMouseDown(e) {
        this.isDragging = true;
        this.previousMousePosition = {
            x: e.clientX,
            y: e.clientY
        };
    }

    onMouseUp() {
        this.isDragging = false;
    }

    onDrag(e) {
        if (!this.isDragging) return;

        const deltaX = e.clientX - this.previousMousePosition.x;
        const deltaY = e.clientY - this.previousMousePosition.y;

        this.targetRotation.y += deltaX * 0.005;
        this.targetRotation.x += deltaY * 0.005;

        this.previousMousePosition = {
            x: e.clientX,
            y: e.clientY
        };
    }

    onTouchStart(e) {
        if (e.touches.length === 1) {
            this.isDragging = true;
            this.previousMousePosition = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            };
        }
    }

    onTouchMove(e) {
        if (!this.isDragging || e.touches.length !== 1) return;

        const deltaX = e.touches[0].clientX - this.previousMousePosition.x;
        const deltaY = e.touches[0].clientY - this.previousMousePosition.y;

        this.targetRotation.y += deltaX * 0.005;
        this.targetRotation.x += deltaY * 0.005;

        this.previousMousePosition = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        };
    }

    onScroll() {
        const scrollY = window.scrollY;
        const maxScroll = window.innerHeight;
        const scrollProgress = Math.min(scrollY / maxScroll, 1);

        // Zoom out effect
        this.camera.position.z = 4 + scrollProgress * 2;

        // Fade effect
        if (this.globe) {
            this.globe.material.opacity = Math.max(0.3, 0.95 - scrollProgress * 0.5);
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const delta = this.clock.getDelta();
        const elapsedTime = this.clock.getElapsedTime();

        if (this.globe) {
            // Auto rotation
            this.globe.rotation.y += 0.001;

            // Apply drag rotation
            this.globe.rotation.y += (this.targetRotation.y - this.globe.rotation.y * 0.1) * 0.05;
            this.targetRotation.y *= 0.95;

            // Parallax effect from mouse
            if (!this.isDragging) {
                this.globe.rotation.x += (this.mouse.y * 0.1 - this.globe.rotation.x) * 0.02;
                this.globe.rotation.y += (this.mouse.x * 0.1) * 0.01;
            }
        }

        // Animate stars
        if (this.particles) {
            this.particles.rotation.y += 0.0002;
            this.particles.rotation.x += 0.0001;
        }

        // Animate connection dots
        this.connections.forEach(conn => {
            conn.progress += delta * 0.3;
            if (conn.progress > 1) conn.progress = 0;

            const point = conn.curve.getPoint(conn.progress);
            conn.dot.position.copy(point);

            // Fade dot based on position
            conn.dot.material.opacity = Math.sin(conn.progress * Math.PI) * 0.9;
        });

        // Pulse ring animation
        if (this.pulseRing) {
            const scale = 1 + Math.sin(elapsedTime * 2) * 0.3;
            this.pulseRing.scale.set(scale, scale, 1);
            this.pulseRing.material.opacity = 0.5 - Math.sin(elapsedTime * 2) * 0.3;
        }

        // Atmosphere subtle animation
        if (this.atmosphere) {
            this.atmosphere.rotation.y = this.globe.rotation.y;
            this.atmosphere.rotation.x = this.globe.rotation.x;
        }

        this.renderer.render(this.scene, this.camera);
    }

    dispose() {
        // Clean up
        this.renderer.dispose();
        this.scene.traverse((object) => {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
                if (Array.isArray(object.material)) {
                    object.material.forEach(m => m.dispose());
                } else {
                    object.material.dispose();
                }
            }
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Check for WebGL support
    if (!window.WebGLRenderingContext) {
        console.log('WebGL not supported');
        return;
    }

    // Wait for Three.js to load
    if (typeof THREE === 'undefined') {
        console.log('Three.js not loaded');
        return;
    }

    // Initialize globe
    const globeContainer = document.getElementById('globe-container');
    if (globeContainer) {
        window.globeScene = new GlobeScene('globe-container');
    }
});
