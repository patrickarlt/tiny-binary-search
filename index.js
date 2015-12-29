export default class BinarySearchIndex {
  constructor (values = []) {
    this.values = [].concat(values);
  }

  query (value) {
    var index = this.getIndex(value);
    return this.values[index];
  }

  getIndex (value) {
    var minIndex = 0;
    var maxIndex = this.values.length - 1;
    var currentIndex;
    var currentElement;

    while (minIndex <= maxIndex) {
      currentIndex = (minIndex + maxIndex) / 2 | 0;
      currentElement = this.values[Math.round(currentIndex)];
      if (+currentElement.value < +value) {
        minIndex = currentIndex + 1;
      } else if (+currentElement.value > +value) {
        maxIndex = currentIndex - 1;
      } else {
        return currentIndex;
      }
    }

    return Math.abs(~maxIndex);
  }

  between (start, end) {
    if (this.dirty) {
      this.sort();
    }

    var startIndex = this.getIndex(start);
    var endIndex = this.getIndex(end);

    if (startIndex === 0 && endIndex === 0) {
      return [];
    }

    while (this.values[startIndex - 1] && this.values[startIndex - 1].value === start) {
      startIndex--;
    }

    while (this.values[endIndex + 1] && this.values[endIndex + 1].value === end) {
      endIndex++;
    }

    if (this.values[endIndex].value === end) {
      endIndex++;
    }

    return this.values.slice(startIndex, endIndex);
  }

  insert (value, index) {
    this.values.splice(index, 0, value);
    return this;
  }

  bulkAdd (items = []) {
    this.dirty = true;
    this.values = this.values.concat([].concat(items));
    return this;
  }

  sort () {
    this.values.sort(function (a, b) {
      return +b.value - +a.value;
    }).reverse();
    this.dirty = false;
    return this;
  }
}
