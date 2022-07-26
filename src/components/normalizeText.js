const normalizeText = function (text) {
    const normalize = text
      .toUpperCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    return normalize;
  }
  module.exports = normalizeText