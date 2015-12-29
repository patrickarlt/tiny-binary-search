export default class BinarySearchIndex {
  constructor (values = []) {
    this.values = [].concat(values);
  }

  query (value) {
    var index = this.getIndex(value);
    return this.values[index];
  }

  getIndex (value) {
    if (this.dirty) {
      this.sort();
    }

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

  insert (item) {
    this.values.splice(this.getIndex(item.value), 0, item);
    return this;
  }

  bulkAdd (items = [], sort = false) {
    this.values = this.values.concat([].concat(items));

    if (sort) {
      this.sort();
    } else {
      this.dirty = true;
    }

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
