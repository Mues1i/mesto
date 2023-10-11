class Section {
  constructor ({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  addItem(itemHtml) {
    this._containerSelector.prepend(itemHtml);
  }

  renderItems() {
    this._items.forEach((item) => this._renderer(item))
  }
}

export default Section;
