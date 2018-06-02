/*
  Copyright 2016 Thomas Rosenau

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
limitations under the License.
*/
/*
This is a modiefied version of the minislide code from  Thomas Rosenau

 */


var slides, currentPageNumber, activeSlide, incremental, keyCodeNormalized, setPage, processHash,
    revealedCls = 'revealed', incrementalSelector = '.incremental',
    querySelector = 'querySelector', loc = location, doc = document, document_body;

document_body = doc.body;
slides = Array.from(doc[querySelector + 'All']('section'));

/**
 * Jump to the given page (1-based) and update location hash
 * @param {number} newPageNumber Should be an integer, some falsy value or Infinity
 */
setPage = function (newPageNumber) {
    currentPageNumber = Math.min(slides.length, newPageNumber || 1);
    activeSlide = slides[currentPageNumber - 1];
    // for (let el of activeSlide[querySelector + 'All'](incrementalSelector)) { // not supported by compressors, see GH-6
    slides.map.call(activeSlide[querySelector + 'All'](incrementalSelector), function (el) {
        el.classList.remove(revealedCls);
    });
    loc.hash = currentPageNumber;
    document_body.style.background = activeSlide.dataset.bg || '';
    document_body.dataset.slideId = activeSlide.dataset.id || currentPageNumber;
};

// Init keyboard navigation
/*window.*/
addEventListener('keydown', function (e, preventDefault) {

    keyCodeNormalized = e.which - 32; // - 32 for better compression
    if (!keyCodeNormalized /*keyCodeNormalized == 32 - 32*/ // space
        || !(keyCodeNormalized - (34 - 32)) // pgDn
        || !(keyCodeNormalized - (39 - 32)) // right arrow
        || !(keyCodeNormalized - (40 - 32)) // down arrow
    //|| !(keyCodeNormalized - (90 - 32)) // z abuse (Incutex Mini Wireless Presenter)
    ) {
        incremental = activeSlide[querySelector](incrementalSelector + ':not(.' + revealedCls + ')');
        if (incremental) {
            incremental.classList.add(revealedCls);
        } else {
            setPage(currentPageNumber + 1);
        }
        preventDefault = 1;
    }
    if (!(keyCodeNormalized - (33 - 32)) // pgUp
        || !(keyCodeNormalized - (37 - 32)) // left
        || !(keyCodeNormalized - (38 - 32)) // up
    //|| !(keyCodeNormalized - (116 - 32)) // F5 abuse (Incutex Mini Wireless Presenter)
    ) {
        setPage(currentPageNumber - 1);
        preventDefault = 1;
    }
    /*
    if (!(keyCodeNormalized + (-(27 - 32)))) { // esc
      document_body.classList.toggle('muted');
      preventDefault = 1;
    }
    */
    if (!(keyCodeNormalized - (36 - 32))) { // home
        setPage(1);
        preventDefault = 1;
    }
    if (!(keyCodeNormalized - (35 - 32))) { // end
        setPage(Infinity); // shorter than slides.length, since it gets compressed to 1/0
        preventDefault = 1;
    }
    if (preventDefault) {
        e.preventDefault();
    }

});


(function () { // Laserpointer

    const laserPointerParent = document.createElement('div');
    laserPointerParent.classList.add('laserPointerParent');
    document.body.appendChild(laserPointerParent);

    const laserPointer = document.createElement('div');
    laserPointer.classList.add('laserPointer');
    laserPointerParent.appendChild(laserPointer);

    const overlay = document.createElement('div');
    overlay.classList.add('laserPointerOverlay');
    laserPointerParent.appendChild(overlay);

    let pointerShow = false;

    const particles = [];
    let currentParticle = 0;

    const mousePos = {x: 0, y: 0};

    for (let i = 0; i < 100; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        laserPointerParent.appendChild(particle);
        particles.push(particle);
    }

    const updatePointer = function () {
        if (pointerShow) {
            laserPointer.style.left = `${mousePos.x}px`;
            laserPointer.style.top = `${mousePos.y}px`;
            for (let i = 0; i < 10; i++) {
                currentParticle = (currentParticle + 1) % particles.length;
                const particle = particles[currentParticle];
                particle.style.left = `${mousePos.x + (Math.random() - 0.5) * 10}px`;
                particle.style.top = `${mousePos.y + (Math.random() - 0.5) * 10}px`;
            }
        }
        requestAnimationFrame(updatePointer);
    };
    updatePointer();

    laserPointerParent.addEventListener('mousemove', function (e) {
        mousePos.x = e.pageX;
        mousePos.y = e.pageY;
    });

    addEventListener('keydown', function (e) {
        if (e.keyCode == 17) { //ctrl key himself
            document.body.classList.add('hideCursor');
            laserPointerParent.classList.add('enabled');
            pointerShow = true;
        }
    });

    addEventListener('keyup', function (e) {
        if (e.keyCode == 17) { //ctrl key himself
            document.body.classList.remove('hideCursor');
            laserPointerParent.classList.remove('enabled');
            pointerShow = false;
        }
    });
})();


// set slide ids
slides.map(function (slide, i) {
    slide.id = i + 1;
});

// poll location hash
setInterval(processHash = function (newPageNumber) {
    newPageNumber = loc.hash.substr(1);
    if (newPageNumber != currentPageNumber) {
        setPage(newPageNumber);
    }
}, 99);
processHash();

// fade-in presentation
document_body.classList.add('loaded');

