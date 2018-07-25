const select = require("unist-util-select");
const axios = require("axios");

const OEMBED_PROVIDERS_URL = "https://oembed.com/providers.json";

exports.fetchOembedProviders = async () => {
  const response = await axios.get(OEMBED_PROVIDERS_URL);
  return response.data;
};

exports.selectPossibleOembedLinks = markdownAST => {
  return select(markdownAST, "paragraph link:only-child");
};

exports.tranformsLinkNodeToOembedNode = (node, oembedResult) => {
  node.type = "html";
  node.value = oembedResult.html;
  return node;
};
