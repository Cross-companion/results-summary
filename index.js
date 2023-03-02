// DEFINING AN ARRAY FOR RESPECTIVE COLORS ACCORDING TO THIER INDEX. This is used to insert colors and background colors of result items that come from data.json file.
// I also implemented JS / CSS functionalities to accormodate results data with greater than four items
const colorNumbering = [
  { color: "hsl(0, 100%, 67%)", bkgColor: "hsla(0, 100%, 67%, 0.1)" },
  { color: "hsl(39, 100%, 56%)", bkgColor: "hsla(39, 100%, 56%, 0.1)" },
  { color: "hsl(166, 100%, 37%)", bkgColor: "hsla(166, 100%, 37%, 0.1)" },
  { color: "hsl(234, 85%, 45%)", bkgColor: "hsla(234, 85%, 45%, 0.1)" },
];

// JUST USING UNNECESSARY CLASSES 😅
class App {
  // I included some fun loaders, but they most likely can only be seen white the browser consoles network set to 'slow 3g
  spinner = `<div class="spinner">
                <div class="spinner--1">
                  <div class="spinner--2">
                    <div class="spinner--3"></div>
                  </div>
                </div>
               </div>`;

  /**
   * Founction to add loader
   * @param {DOM element where the spinner should be placed within} container
   */
  _renderSpinner(container = this.parentElement) {
    this._emptyMarkup(container);
    container.insertAdjacentHTML("afterbegin", this.spinner);
  }

  /**
   *
   * @param { api which should be queried} url
   * @returns plane data from url
   */
  async _fetchData(url) {
    const data = await fetch(url)
      .then((res) => res.json())
      .then((data) => data);
    return data;
  }

  //generic function for inserting a dom Element
  _insertMarkup(container, html, order = "beforeend") {
    container.insertAdjacentHTML(order, html);
  }

  _emptyMarkup(container) {
    container.innerHTML = "";
  }
}

// A class for possible actions on the summary
class Summary extends App {
  testContainer = document.querySelector(".test");
  constructor() {
    super();
    this._generateMarkup();
  }

  async _generateMarkup() {
    this._renderSpinner(this.testContainer);

    const data = await this._fetchData("data.json");

    this._emptyMarkup(this.testContainer);
    // INSERTING TEST RESULTS FROM DATA.JSON
    data.forEach((el, i) => {
      const html = `<div class="test__subject" style="background-color:${
        colorNumbering[i < 4 ? i : i % 4].bkgColor
      }">
      <span class="test__subject--topic" style="color:${
        colorNumbering[i < 4 ? i : i % 4].color
      };"
       ><img
         class="icons"
         src="${el.icon}"
         alt=""
         />
        ${el.category}</span
      ><span class="test__subject--num"> <span>${el.score}</span> / 100</span>
    </div>`;

      // PLACING THEM IN THE DOM
      this._insertMarkup(this.testContainer, html);
    });
  }
}

// INIT
new App();
new Summary();
