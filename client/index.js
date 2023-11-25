let btnPaint = document.querySelector('#paintSel');
let btnPaintSecond = document.querySelector('#paintSelSecond');
let btnTexture = document.querySelector('#textureSel');
let btnTextureSecond = document.querySelector('#textureSelSecond');
let btnVallejoBrand = document.querySelector('#vallejoBtn');
let btnVallejoTexureBrand = document.querySelector('#vallejoTextBtn');
let btnAk = document.querySelector('#AkBtn');
let btnCitadelBrand = document.querySelector('#citadelBtn');
let firstFilterBox = document.querySelector('#firstSearchBox');
let filterBox = document.querySelector('#ColorFilterBox');
let paintFilter = document.querySelector('#paintFilterBox');
let textureFilterBox = document.querySelector('#textureFilterBox');
let TextureTypeBox = document.querySelector('#TypeFilterBox');
let searchContainer = document.querySelector('#searchContainer');
let btnRed = document.querySelector('#btnRed');
let btnPurple = document.querySelector('#btnPurple');
let btnPink = document.querySelector('#btnPink');
let btnBlue = document.querySelector('#btnBlue');
let btnTurq = document.querySelector('#btnTurq');
let btnGreen = document.querySelector('#btnGreen');
let btnYellow = document.querySelector('#btnYellow');
let btnOrange = document.querySelector('#btnOrange');
let btnFlesh = document.querySelector('#btnFlesh');
let btnBrown = document.querySelector('#btnBrown');
let btnBlack = document.querySelector('#btnBlack');
let btnGrey = document.querySelector('#btnGrey');
let btnWhite = document.querySelector('#btnWhite');
let btnMetal = document.querySelector('#btnMetal');
let btnWater = document.querySelector('#btnWater');
let btnGround = document.querySelector('#btnGround');
let btnSnow = document.querySelector('#btnSnow');
let btnPaintForm = document.querySelector('#btnAddPaint');
let paintFormBox = document.querySelector('#formContainer');

document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');
  const message = document.getElementById('message');

  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.access_token;

      localStorage.setItem('token', token);

      const authEvent = new Event('userAuthenticated');
      document.dispatchEvent(authEvent);
      message.textContent = `${username}`;
      loginBox.classList.add('hide');
      firstFilterBox.classList.remove('hide');
    } else {
      const data = await response.json();
      message.textContent = data.message;
    }
  });
});

document.addEventListener('userAuthenticated', function () {
  const token = localStorage.getItem('token');

  if (token) {
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    const paintForm = document.getElementById('paintForm');
    paintForm.addEventListener('submit', function (e) {
      e.preventDefault();
      console.log('addPaint function is running');
      const paintData = {
        name: document.getElementById('paintNameInput').value,
        color: document.getElementById('paintColorInput').value,
        brand: document.getElementById('paintBrandInput').value,
        paintType: document.getElementById('paintTypeInput').value,
        img: document.getElementById('paintImgUrlInput').value,
        price: document.getElementById('paintPriceInput').value,
        colorImg: document.getElementById('paintColorImgInput').value,
      };
      console.log('Paint data:', paintData);

      fetch('http://localhost:3000/api/pinturas/new', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(paintData),
      })
        .then((res) => {
          res.json();
        })
        .then((res) => {
          console.log('Response from server:', res);
          paintFormBox.classList.add('hide');
          container.innerHTML = 'Pintura añadida';
        })
        .catch((error) => {
          console.error('Fetch error:', error);
        });
    });
    function paintGenerator(paintData) {
      if (paintData && Array.isArray(paintData)) {
        container.innerHTML = '';
        paintData.forEach((pintura) => {
          let card = document.createElement('div');
          card.className = 'card';

          let separator = document.createElement('div');
          separator.className = 'separtorCard';

          let paintImg = document.createElement('img');
          paintImg.className = 'paintImg';
          paintImg.src = pintura.img;

          let colorPrev = document.createElement('div');
          colorPrev.className = 'colorImg';
          colorPrev.style.background = pintura.colorDisplay;

          let infoBox = document.createElement('div');
          infoBox.className = 'infoBox';

          let paintName = document.createElement('h3');
          paintName.className = 'paintName';
          paintName.textContent = pintura.name;

          let paintBrand = document.createElement('h4');
          paintBrand.className = 'paintBrand';
          paintBrand.textContent = pintura.brand;

          let paintRange = document.createElement('h4');
          paintRange.className = 'paintRange';
          paintRange.textContent = pintura.paintType;

          let paintPrice = document.createElement('h4');
          paintPrice.className = 'paintPrice';
          paintPrice.textContent = pintura.price + ' €';

          card.appendChild(separator);
          card.appendChild(paintImg);
          card.appendChild(colorPrev);
          card.appendChild(infoBox);

          infoBox.appendChild(paintName);
          infoBox.appendChild(paintBrand);
          infoBox.appendChild(paintRange);
          infoBox.appendChild(paintPrice);

          container.appendChild(card);
        });
      }
    }
    function textureGenerator(textureData) {
      container.innerHTML = '';
      textureData.forEach((textura) => {
        let card = document.createElement('div');
        card.className = 'card';
        let separator = document.createElement('div');
        separator.className = 'separtorCard';
        let paintImg = document.createElement('img');
        paintImg.className = 'textureImg';
        paintImg.src = textura.img;
        let infoBox = document.createElement('div');
        infoBox.className = `infoBox`;
        let paintName = document.createElement('h3');
        paintName.className = 'textureName';
        paintName.textContent = `${textura.name}`;
        let paintBrand = document.createElement('h4');
        paintBrand.className = 'textureBrand';
        paintBrand.textContent = `${textura.brand}`;
        let paintRange = document.createElement('h4');
        paintRange.className = 'textureRange';
        paintRange.textContent = `${textura.textureType}`;
        let paintSize = document.createElement('h4');
        paintSize.className = 'textureSize';
        paintSize.textContent = `${textura.size} ml`;
        let paintPrice = document.createElement('h4');
        paintPrice.className = 'texturePrice';
        paintPrice.textContent = `${textura.price} €`;

        card.appendChild(separator);
        card.appendChild(paintImg);
        card.appendChild(infoBox);

        infoBox.appendChild(paintName);
        infoBox.appendChild(paintBrand);
        infoBox.appendChild(paintRange);
        infoBox.appendChild(paintSize);
        infoBox.appendChild(paintPrice);

        container.appendChild(card);
      });
    }
    btnPaint.addEventListener('click', function () {
      btnTexture.classList.remove('selected');
      btnTextureSecond.classList.remove('selectedTwo');
      btnTextureSecond.classList.add('btnMain');
      btnPaintSecond.classList.remove('btnMain');
      btnPaintSecond.classList.add('selectedTwo');
      btnPaint.className = 'selected';
      btnPaintSecond.className = 'selectedTwo';
      searchContainer.classList.remove('hide');
      paintFilter.classList.remove('hide');
      textureFilterBox.classList.add('hide');
      TextureTypeBox.classList.add('hide');
      btnVallejoTexureBrand.classList.remove('selectedTexture');
      btnVallejoTexureBrand.classList.add('btnMain');
      btnAk.classList.remove('selectedTexture');
      btnAk.classList.add('btnMain');
      paintFormBox.classList.add('hide');
      fetch('http://localhost:3000/api/pinturas', {
        method: 'GET',
        headers: headers,
      })
        .then((res) => res.json())
        .then((res) => {
          paintGenerator(res);
        });
    });
    btnPaintSecond.addEventListener('click', function () {
      btnTexture.classList.remove('selected');
      btnPaint.classList.add('selected');
      btnTextureSecond.classList.remove('selectedTwo');
      btnTextureSecond.classList.add('btnMain');
      btnPaintSecond.classList.remove('btnMain');
      btnPaintSecond.classList.add('selectedTwo');
      searchContainer.classList.remove('hide');
      paintFilter.classList.remove('hide');
      textureFilterBox.classList.add('hide');
      TextureTypeBox.classList.add('hide');
      btnVallejoTexureBrand.classList.remove('selectedTexture');
      btnVallejoTexureBrand.classList.add('btnMain');
      btnAk.classList.remove('selectedTexture');
      btnAk.classList.add('btnMain');
      paintFormBox.classList.add('hide');
      fetch('http://localhost:3000/api/pinturas', {
        method: 'GET',
        headers: headers,
      })
        .then((res) => res.json())
        .then((res) => {
          paintGenerator(res);
        });
    });
    btnTexture.addEventListener('click', function () {
      btnPaint.classList.remove('selected');
      btnPaintSecond.classList.remove('selectedTwo');
      btnPaintSecond.classList.add('btnMain');
      btnTextureSecond.classList.remove('btnMain');
      btnTextureSecond.classList.add('selectedTwo');
      btnTexture.className = 'selected';
      btnTextureSecond.className = 'selectedTwo';
      btnVallejoBrand.classList.remove('selectedTwo');
      btnVallejoBrand.classList.add('btnMain');
      btnCitadelBrand.classList.remove('selectedTwo');
      btnCitadelBrand.classList.add('btnMain');
      paintFilter.classList.add('hide');
      textureFilterBox.classList.remove('hide');
      searchContainer.classList.remove('hide');
      filterBox.classList.add('hide');
      paintFormBox.classList.add('hide');
      fetch('http://localhost:3000/api/texturas', {
        method: 'GET',
        headers: headers,
      })
        .then((res) => res.json())
        .then((res) => {
          textureGenerator(res);
        });
    });
    btnTextureSecond.addEventListener('click', function () {
      btnPaint.classList.remove('selected');
      btnTexture.classList.add('selected');
      btnPaintSecond.classList.remove('selectedTwo');
      btnPaintSecond.classList.add('btnMain');
      btnTextureSecond.classList.remove('btnMain');
      btnTextureSecond.classList.add('selectedTwo');
      paintFilter.classList.add('hide');
      btnVallejoBrand.classList.remove('selectedTwo');
      btnVallejoBrand.classList.add('btnMain');
      btnCitadelBrand.classList.remove('selectedTwo');
      btnCitadelBrand.classList.add('btnMain');
      textureFilterBox.classList.remove('hide');
      searchContainer.classList.remove('hide');
      filterBox.classList.add('hide');
      paintFormBox.classList.add('hide');

      fetch('http://localhost:3000/api/texturas', {
        method: 'GET',
        headers: headers,
      })
        .then((res) => res.json())
        .then((res) => {
          textureGenerator(res);
        });
    });

    function brandFilter(brand) {
      fetch(`http://localhost:3000/api/pinturas/marca/${brand}`, {
        method: 'GET',
        headers: headers,
      })
        .then((res) => res.json())
        .then((res) => {
          paintGenerator(res);
        });
    }
    function texturebrandFilter(brand) {
      fetch(`http://localhost:3000/api/texturas/marca/${brand}`, {
        method: 'GET',
        headers: headers,
      })
        .then((res) => res.json())
        .then((res) => {
          textureGenerator(res);
        });
    }

    function colorFilter(brand, color) {
      return function () {
        fetch(
          `http://localhost:3000/api/pinturas/marcaycolor/${brand}/${color}`,
          {
            method: 'GET',
            headers: headers,
          },
        )
          .then((res) => res.json())
          .then((res) => {
            container.innerHTML = '';
            if (res.length === 0) {
              let errorBox = document.createElement('div');
              errorBox.className = 'errorContainer';
              let colorError = document.createElement('h4');
              colorError.className = 'colorError';
              colorError.textContent = `${color} not found`;

              errorBox.appendChild(colorError);
              container.appendChild(errorBox);
              paintFormBox.classList.remove('hide');
            } else {
              paintGenerator(res);
              paintFormBox.classList.add('hide');
            }
          });
      };
    }
    function textureFilter(brand, textureType) {
      return function () {
        fetch(
          `http://localhost:3000/api/texturas/marcatextura/${brand}/${textureType}`,
          {
            method: 'GET',
            headers: headers,
          },
        )
          .then((res) => res.json())
          .then((res) => {
            container.innerHTML = '';
            if (res.length === 0) {
              let errorBox = document.createElement('div');
              errorBox.className = 'errorContainer';
              let colorError = document.createElement('h4');
              colorError.className = 'colorError';
              colorError.textContent = `${textureType} not found`;
              let addTexture = document.createElement('button');
              addTexture.id = 'btnAddTexture';
              addTexture.textContent = 'Add Texture';

              errorBox.appendChild(colorError);
              errorBox.appendChild(addTexture);
              container.appendChild(errorBox);
            } else {
              textureGenerator(res);
            }
          });
      };
    }

    let selectedBrand = '';

    function handlePaintBrand(clickedButton, otherButton, brand) {
      clickedButton.classList.remove('btnMain');
      clickedButton.classList.add('selectedTwo');
      otherButton.classList.remove('selectedTwo');
      otherButton.classList.add('btnMain');
      filterBox.classList.remove('hide');
      selectedBrand = brand;
      brandFilter(selectedBrand);
      paintFormBox.classList.add('hide');
    }

    btnVallejoBrand.addEventListener('click', () =>
      handlePaintBrand(btnVallejoBrand, btnCitadelBrand, 'Vallejo'),
    );

    btnCitadelBrand.addEventListener('click', () =>
      handlePaintBrand(btnCitadelBrand, btnVallejoBrand, 'Citadel'),
    );

    function handleTextureBrand(clickedButton, otherButton, brand) {
      clickedButton.classList.remove('btnMain');
      clickedButton.classList.add('selectedTwo');
      otherButton.classList.add('btnMain');
      otherButton.classList.remove('selectedTwo');
      TextureTypeBox.classList.remove('hide');
      selectedBrand = brand;
      texturebrandFilter(selectedBrand);
      paintFormBox.classList.add('hide');

      const buttons = [btnGround, btnSnow, btnWater];

      buttons.forEach((button) => {
        if (button === this) {
          button.classList.remove('btnTexture');
          button.classList.add('selectedTexture');
        } else {
          button.classList.remove('selectedTexture');
          button.classList.add('btnTexture');
        }
      });
    }

    btnVallejoTexureBrand.addEventListener('click', () =>
      handleTextureBrand(btnVallejoTexureBrand, btnAk, 'Vallejo'),
    );
    btnAk.addEventListener('click', () =>
      handleTextureBrand(btnAk, btnVallejoTexureBrand, 'AK Interactive'),
    );

    function handleTexture(textureType) {
      const buttons = [btnGround, btnSnow, btnWater];

      buttons.forEach((button) => {
        if (button === this) {
          button.classList.remove('btnTexture');
          button.classList.add('selectedTexture');
          paintFormBox.classList.add('hide');
        } else {
          button.classList.remove('selectedTexture');
          button.classList.add('btnTexture');
          paintFormBox.classList.add('hide');
        }
      });

      if (selectedBrand) {
        textureFilter(selectedBrand, textureType)();
        paintFormBox.classList.add('hide');
      }
    }

    btnWater.addEventListener('click', () =>
      handleTexture.call(btnWater, 'Water Texture'),
    );
    btnGround.addEventListener('click', () =>
      handleTexture.call(btnGround, 'Ground Texture'),
    );
    btnSnow.addEventListener('click', () =>
      handleTexture.call(btnSnow, 'Snow Texture'),
    );
    btnRed.addEventListener('click', function () {
      if (selectedBrand) {
        colorFilter(selectedBrand, 'Red')();
      }
    });
    btnPurple.addEventListener('click', function () {
      if (selectedBrand) {
        colorFilter(selectedBrand, 'Purple')();
      }
    });
    btnPink.addEventListener('click', function () {
      if (selectedBrand) {
        colorFilter(selectedBrand, 'Pink')();
      }
    });
    btnBlue.addEventListener('click', function () {
      if (selectedBrand) {
        colorFilter(selectedBrand, 'Blue')();
      }
    });
    btnTurq.addEventListener('click', function () {
      if (selectedBrand) {
        colorFilter(selectedBrand, 'Turquoise')();
      }
    });
    btnGreen.addEventListener('click', function () {
      if (selectedBrand) {
        colorFilter(selectedBrand, 'Green')();
      }
    });
    btnYellow.addEventListener('click', function () {
      if (selectedBrand) {
        colorFilter(selectedBrand, 'Yellow')();
      }
    });
    btnOrange.addEventListener('click', function () {
      if (selectedBrand) {
        colorFilter(selectedBrand, 'Orange')();
      }
    });
    btnFlesh.addEventListener('click', function () {
      if (selectedBrand) {
        colorFilter(selectedBrand, 'Flesh')();
      }
    });
    btnBrown.addEventListener('click', function () {
      if (selectedBrand) {
        colorFilter(selectedBrand, 'Brown')();
      }
    });
    btnBlack.addEventListener('click', function () {
      if (selectedBrand) {
        colorFilter(selectedBrand, 'Black')();
      }
    });
    btnGrey.addEventListener('click', function () {
      if (selectedBrand) {
        colorFilter(selectedBrand, 'Grey')();
      }
    });
    btnWhite.addEventListener('click', function () {
      if (selectedBrand) {
        colorFilter(selectedBrand, 'White')();
      }
    });
    btnMetal.addEventListener('click', function () {
      if (selectedBrand) {
        colorFilter(selectedBrand, 'Metallic')();
      }
    });
  }
});
